import argparse
import hashlib
import json
import os
from pathlib import Path
import signal
import socket
import stat
import subprocess
import time
from datetime import datetime, timezone
from urllib.request import urlopen

OLD = '0c3df6e1b64b0d664e3669e3137aa6480111e59940e16e61984506fa1b1206a2'
SERVER = 'bf97bcc6342f3ef12d4eeb742e7e98bfb6f0c5d64c8eec81ebbdd40cb62c023f'
TARGET = Path('/opt/samuel-studio-inquiry/handler.mjs')
UNIT = 'samuel-studio-inquiry.service'
NODE = '/opt/defiant-node/current/bin/node'

def digest(value):
    return hashlib.sha256(value).hexdigest()

def run(*args):
    return subprocess.check_output(args, text=True, stderr=subprocess.DEVNULL).strip()

def app_ids():
    return {unit: run('systemctl', 'show', unit, '--property=InvocationID', '--value')
            for unit in ('defiant-api.service', 'defiant-worker.service')}

def atomic_write(path, content):
    temporary = path.with_name(path.name + '.ops-recipient-update')
    descriptor = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o644)
    with os.fdopen(descriptor, 'wb') as stream:
        stream.write(content)
        stream.flush()
        os.fsync(stream.fileno())
    os.chmod(temporary, 0o644)
    os.replace(temporary, path)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--manifest-sha', required=True)
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    source = Path(__file__).resolve().parent
    manifest_bytes = (source / 'manifest.json').read_bytes()
    if digest(manifest_bytes) != args.manifest_sha:
        raise RuntimeError('Manifest hash mismatch.')
    manifest = json.loads(manifest_bytes)
    if set(manifest) != {'handler.mjs', 'update.py', 'recipient.test.mjs'}:
        raise RuntimeError('Unexpected package files.')
    payloads = {}
    for filename, expected in manifest.items():
        path = source / filename
        info = path.lstat()
        if not stat.S_ISREG(info.st_mode) or info.st_nlink != 1 or info.st_size > 50000:
            raise RuntimeError('Unsafe package file.')
        payloads[filename] = path.read_bytes()
        if digest(payloads[filename]) != expected:
            raise RuntimeError('Package hash mismatch.')
    if socket.gethostname() != 'defiant':
        raise RuntimeError('Unexpected host.')
    for path, expected in ((TARGET, OLD), (TARGET.with_name('server.mjs'), SERVER)):
        info = path.lstat()
        if not stat.S_ISREG(info.st_mode) or info.st_uid != 0 or info.st_nlink != 1 or stat.S_IMODE(info.st_mode) != 0o644:
            raise RuntimeError('Unexpected installed file metadata.')
        if digest(path.read_bytes()) != expected:
            raise RuntimeError('Installed source drift. Stop and review; do not force.')
    for unit in (UNIT, 'caddy.service', 'defiant-api.service', 'defiant-worker.service'):
        if run('systemctl', 'is-active', unit) != 'active':
            raise RuntimeError('Expected live service is not active.')
    run(NODE, '--check', str(source / 'handler.mjs'))
    if not args.apply:
        print(json.dumps({'status': 'preflight-passed', 'emailSent': False, 'expectedRecipient': 'ops@ondefiant.com'}))
        return
    if os.geteuid() != 0:
        raise RuntimeError('Attended sudo is required.')
    before_ids = app_ids()
    old_bytes = TARGET.read_bytes()
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    backup = Path('/var/backups/samuel-studio-inquiry') / ('ops-recipient-' + stamp)
    backup.mkdir(mode=0o700)
    preimage = backup / 'handler.mjs.before'
    preimage.write_bytes(old_bytes)
    preimage.chmod(0o600)
    new_bytes = payloads['handler.mjs']
    changed = False
    def interrupt(_signum, _frame):
        raise KeyboardInterrupt()
    signal.signal(signal.SIGTERM, interrupt)
    try:
        if digest(TARGET.read_bytes()) != OLD:
            raise RuntimeError('Concurrent source drift.')
        atomic_write(TARGET, new_bytes)
        changed = True
        run('systemctl', 'restart', UNIT)
        ready = None
        for _ in range(15):
            try:
                with urlopen('http://127.0.0.1:8790/api/studio-inquiry', timeout=12) as response:
                    ready = json.load(response)
                if ready.get('enabled') is True and ready.get('routingVersion') == 'studio-ops-v1':
                    break
            except Exception:
                pass
            time.sleep(1)
        if not ready or ready.get('enabled') is not True or ready.get('routingVersion') != 'studio-ops-v1':
            raise RuntimeError('New routing readiness was not confirmed.')
        if app_ids() != before_ids or run('systemctl', 'is-active', 'caddy.service') != 'active':
            raise RuntimeError('Existing service state changed; investigate.')
        receipt = {'status': 'ops-recipient-active-awaiting-external-verification', 'recipient': 'ops@ondefiant.com',
                   'routingVersion': 'studio-ops-v1', 'emailSent': False, 'beforeSHA256': OLD,
                   'afterSHA256': digest(new_bytes), 'beforeBackup': str(preimage), 'existingAppInvocationsUnchanged': True}
        receipt_path = Path('/var/lib/samuel-studio-inquiry/ops-recipient-receipt.json')
        if receipt_path.exists():
            raise RuntimeError('Recipient update receipt already exists; inspect before proceeding.')
        receipt_path.write_text(json.dumps(receipt, indent=2) + '\n')
        receipt_path.chmod(0o644)
        print(json.dumps(receipt, indent=2))
    except BaseException:
        if changed and digest(TARGET.read_bytes()) == digest(new_bytes):
            atomic_write(TARGET, old_bytes)
            run('systemctl', 'restart', UNIT)
        raise

if __name__ == '__main__':
    try:
        main()
    except BaseException as error:
        print('Update did not complete. Review the retained preimage and current service state. ' + type(error).__name__)
        raise SystemExit(1)
