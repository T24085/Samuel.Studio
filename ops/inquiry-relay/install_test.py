import hashlib
import json
from pathlib import Path
import tempfile
import unittest
import install


class InstallerTests(unittest.TestCase):
    def test_only_expected_host_is_extended(self):
        before = b'{\n}\n{$DEFIANT_PILOT_HOST} {\n    reverse_proxy 127.0.0.1:8788\n}\n'
        route = b'    handle /api/studio-inquiry { reverse_proxy 127.0.0.1:8790 }\n'
        result = install.candidate_caddy(before, route)
        self.assertEqual(result.replace(route, b'', 1), before)

    def test_layout_drift_and_existing_route_refused(self):
        for value in (b'other {\n}', b'{$DEFIANT_PILOT_HOST} {\n/api/studio-inquiry', b'{$DEFIANT_PILOT_HOST} {\n{$DEFIANT_PILOT_HOST} {\n'):
            with self.assertRaises(RuntimeError):
                install.candidate_caddy(value, b'new route')

    def test_manifest_pins_all_files_and_refuses_tampering(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            manifest = {}
            for name in install.FILES:
                value = ('fixture ' + name).encode()
                (root / name).write_bytes(value)
                manifest[name] = hashlib.sha256(value).hexdigest()
            data = json.dumps(manifest).encode()
            (root / 'manifest.json').write_bytes(data)
            digest = hashlib.sha256(data).hexdigest()
            self.assertEqual(set(install.sources(root, digest)), install.FILES)
            (root / 'server.mjs').write_bytes(b'tampered')
            with self.assertRaises(RuntimeError):
                install.sources(root, digest)
            with self.assertRaises(RuntimeError):
                install.sources(root, 'wrong-manifest')


if __name__ == '__main__':
    unittest.main()
