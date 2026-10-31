#!/usr/bin/env python3
"""Drift-checked, founder-attended installation. Never prints credential values."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shlex
import signal
import socket
import stat
import subprocess
import sys
import time
import urllib.error
import urllib.request

CADDY = Path('/etc/caddy/Caddyfile')
PREIMAGE = '45e154b269e9d4548860a14faab4b399c2d7f9f5a77d6fe5abe9cd70255db318'
NODE = Path('/opt/defiant-node/current/bin/node')
NODE_SHA = 'e32e2d16081cf644f88392934288086e7662529d0d43277c34f7aad2207cfafb'
ROOT = Path('/opt/samuel-studio-inquiry')
UNIT = Path('/etc/systemd/system/samuel-studio-inquiry.service')
RECEIPTS = Path('/var/lib/samuel-studio-inquiry')
KEY = Path('/etc/defiant/credentials/brevo.key')
FILES = {'handler.mjs', 'server.mjs', 'samuel-studio-inquiry.service', 'caddy-route.txt', 'install.py', 'relay.test.mjs', 'install_test.py', 'README.md'}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def file_sha(path):
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def run(args, **kwargs):
    result = subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=25, **kwargs)
    if result.returncode:
        raise RuntimeError('Command failed: ' + Path(args[0]).name)
    return result.stdout.strip()


def sources(package, manifest_sha):
    manifest_data = (package / 'manifest.json').read_bytes()
    if sha(manifest_data) != manifest_sha:
        raise RuntimeError('Package manifest drift.')
    manifest = json.loads(manifest_data)
    if set(manifest) != FILES:
        raise RuntimeError('Unexpected package files.')
    values = {}
    for name, digest in manifest.items():
        path = package / name
        meta = path.lstat()
        if not stat.S_ISREG(meta.st_mode) or meta.st_nlink != 1 or meta.st_size > 100000:
            raise RuntimeError('Unsafe package file.')
        data = path.read_bytes()
        if sha(data) != digest:
            raise RuntimeError('Package source drift.')
        values[name] = data
    return values


def candidate_caddy(before, route):
    marker = b'{$DEFIANT_PILOT_HOST} {\n'
    if before.count(marker) != 1 or b'/api/studio-inquiry' in before:
        raise RuntimeError('Unexpected proxy layout.')
    return before.replace(marker, marker + route, 1)


def atomic_write(path, data, mode):
    temp = path.with_name(path.name + '.studio-inquiry-new')
    with temp.open('xb') as stream:
        os.fchmod(stream.fileno(), mode)
        stream.write(data)
        stream.flush()
        os.fsync(stream.fileno())
    os.replace(temp, path)


def identity(unit):
    if run(['systemctl', 'is-active', unit]) != 'active':
        raise RuntimeError('Existing live service unavailable.')
    return run(['systemctl', 'show', unit, '--property=InvocationID', '--value'])


def install(values):
    if os.geteuid() != 0 or socket.gethostname() != 'defiant':
        raise RuntimeError('Expected founder sudo on defiant.')
    before = CADDY.read_bytes()
    if sha(before) != PREIMAGE or file_sha(NODE) != NODE_SHA:
        raise RuntimeError('Live proxy/runtime drift; stop for review.')
    if any(path.exists() or path.is_symlink() for path in (ROOT, UNIT, RECEIPTS)):
        raise RuntimeError('Existing relay state; refusing overwrite/reinstall.')
    meta = KEY.lstat()
    if not stat.S_ISREG(meta.st_mode) or meta.st_uid != 0 or meta.st_mode & 0o077 or meta.st_nlink != 1 or not 1 <= meta.st_size <= 16384:
        raise RuntimeError('Existing credential metadata not accepted.')
    environment = shlex.split(run(['systemctl', 'show', 'caddy.service', '--property=Environment', '--value']))
    host = next((value.split('=', 1)[1] for value in environment if value.startswith('DEFIANT_PILOT_HOST=')), None)
    if host != 'pilot.ondefiant.com':
        raise RuntimeError('Unexpected live HTTPS host.')
    existing = {name: identity(name) for name in ('defiant-api.service', 'defiant-worker.service')}
    identity('caddy.service')
    candidate = candidate_caddy(before, values['caddy-route.txt'])
    validation_env = dict(os.environ, DEFIANT_PILOT_HOST=host)
    backup = Path('/var/backups/samuel-studio-inquiry') / time.strftime('%Y%m%dT%H%M%SZ', time.gmtime())
    backup.mkdir(parents=True, mode=0o700)
    atomic_write(backup / 'Caddyfile.before', before, 0o600)
    atomic_write(backup / 'Caddyfile.candidate', candidate, 0o600)
    run(['/usr/bin/caddy', 'validate', '--config', str(backup / 'Caddyfile.candidate'), '--adapter', 'caddyfile'], env=validation_env)
    ROOT.mkdir(mode=0o755)
    RECEIPTS.mkdir(mode=0o755)
    for name in ('handler.mjs', 'server.mjs'):
        atomic_write(ROOT / name, values[name], 0o644)
    atomic_write(UNIT, values['samuel-studio-inquiry.service'], 0o644)
    changed_proxy = False
    try:
        run(['systemd-analyze', 'verify', str(UNIT)])
        run(['systemctl', 'daemon-reload'])
        run(['systemctl', 'start', UNIT.name])
        ready = None
        for _ in range(20):
            try:
                with urllib.request.urlopen('http://127.0.0.1:8790/api/studio-inquiry', timeout=12) as response:
                    ready = json.load(response)
                break
            except urllib.error.URLError:
                time.sleep(0.25)
        if ready != {'enabled': True}:
            raise RuntimeError('Fixed-host Brevo readiness did not pass; no email sent.')
        if CADDY.read_bytes() != before:
            raise RuntimeError('Proxy changed concurrently; no overwrite.')
        atomic_write(CADDY, candidate, 0o644)
        changed_proxy = True
        run(['systemctl', 'reload', 'caddy.service'])
        if any(identity(name) != value for name, value in existing.items()):
            raise RuntimeError('Existing API/worker identity changed; review required.')
        run(['systemctl', 'enable', UNIT.name])
        receipt = {'status': 'installed-awaiting-external-verification', 'host': host,
            'endpoint': 'https://pilot.ondefiant.com/api/studio-inquiry', 'emailSent': False,
            'caddyBeforeSHA256': sha(before), 'caddyAfterSHA256': sha(candidate),
            'sourceHashes': {name: sha(data) for name, data in values.items()},
            'existingAppInvocationsUnchanged': True, 'beforeBackup': str(backup / 'Caddyfile.before')}
        atomic_write(RECEIPTS / 'install-receipt.json', json.dumps(receipt, indent=2).encode(), 0o644)
        print(json.dumps(receipt, indent=2))
    except BaseException:
        try:
            if changed_proxy:
                if CADDY.read_bytes() == candidate:
                    atomic_write(CADDY, before, 0o644)
                    run(['systemctl', 'reload', 'caddy.service'])
                else:
                    print('Proxy drift: manual review required; no overwrite.', file=sys.stderr)
        finally:
            subprocess.run(['systemctl', 'disable', '--now', UNIT.name], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=25)
        print('Relay activation failed. New files and rollback preimage retained; do not blindly rerun.', file=sys.stderr)
        raise


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--manifest-sha', required=True)
    parser.add_argument('--install', action='store_true')
    args = parser.parse_args()
    values = sources(Path(__file__).resolve().parent, args.manifest_sha)
    if not args.install:
        if sha(CADDY.read_bytes()) != PREIMAGE or file_sha(NODE) != NODE_SHA:
            raise RuntimeError('Host drift; do not install.')
        print('Source hashes and live proxy/runtime preimages match. No changes, credentials, or provider calls.')
        return
    def interrupted(_signum, _frame):
        raise RuntimeError('Operator interrupted activation.')
    signal.signal(signal.SIGTERM, interrupted)
    signal.signal(signal.SIGINT, interrupted)
    install(values)


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
