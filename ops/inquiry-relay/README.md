# Samuel Studio Fixed-IP Inquiry Relay

Prepared, not deployed. Public endpoint after activation:
`https://pilot.ondefiant.com/api/studio-inquiry`.

Separate Node/systemd service, loopback port 8790, DynamicUser, 128 MiB memory
and 20% CPU caps. Caddy forwards only the exact inquiry path and overwrites
forwarded IP headers. Existing DEFIANT API/worker code, database, routes,
credentials, release pointers, DNS and website hosting are not changed.

Only the existing Brevo key is supplied by systemd LoadCredential. No key is
copied into this source/package, exposed to the operator, or placed in Vite.
The service receives no DEFIANT database, auth or R2 credentials.
Sender: `Samuel Studio <notifications@notify.ondefiant.com>`.
Recipient: `studiodefiant@gmail.com`. Reply-To: validated visitor address.
No marketing signup, customer auto-reply, or test email during installation.

Bounds: 16,000-byte body, fixed validated services, honeypot/timing guard,
five POSTs/minute/IP, two concurrent requests, 40 accepted messages/hour and
100/day process-wide. Rate counters are in memory and reset on service
restart; this is not a provider billing cap. Provider health checks coalesce
and cache for 20 seconds; no automatic email retries. No message/IP logging.
Public inquiry endpoints can still be abused; monitor provider usage and
review CAPTCHA or a durable queue if real traffic warrants it.

Run `node --test relay.test.mjs` and `python3 -B install_test.py` with only
synthetic fixtures. The installer requires the exact manifest SHA, expected
existing Caddy and Node hashes, root-only existing key metadata, and the
known hostname. Default invocation is a read-only preflight. Activation
requires explicit `--install` through founder sudo. It validates the new
Caddy configuration, preserves the old proxy configuration, requires actual
fixed-host Brevo readiness, reloads (not restarts) Caddy and verifies the
DEFIANT API/worker invocations remain unchanged. Failure restores its own
proxy change if no concurrent drift and stops/disables only the new relay.
New service files and the preimage remain for review, not silently deleted.

Root activation is an attended step. Do not bypass sudo, read credential
contents, relax Brevo IP restrictions, or rerun on drift. Installed non-secret
receipt: `/var/lib/samuel-studio-inquiry/install-receipt.json`.

After activation: independently verify TLS, readiness, preflight, invalid
origin/payload rejection, and existing DEFIANT private/internal boundaries.
Then switch the website endpoint and publish only that change, excluding
pending Nova chat work. Send a new delivery test only with Sam approval.
The Netlify route remains the old route until an explicit retirement decision.

Recovery: root pre-change Caddy file is retained under
`/var/backups/samuel-studio-inquiry/`. Code and install sources must be saved
in the Samuel Studio repository. The existing protected Brevo key has its
own DEFIANT recovery process; this relay does not broaden or claim coverage
of existing scheduled backup jobs. No broad VPS cleanup is part of this task.
