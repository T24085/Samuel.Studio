export const origins = new Set(['https://samuel.studio', 'https://www.samuel.studio']);
const services = new Set(['Editorial & Campaign Work', 'Personal Identity', 'Visual Story Projects', 'Private Portraits']);
const clean = (value, max) => typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, max) : '';
const validEmail = value => /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]{2,}$/.test(value) && value.length <= 254;
export const sender = 'notifications@notify.ondefiant.com';
export const recipient = 'ops@ondefiant.com';

export function validateInquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const value = {
    name: clean(input.name, 100), email: clean(input.email, 254), phone: clean(input.phone, 60),
    service: clean(input.service, 100), preferredDate: clean(input.preferredDate, 10),
    message: typeof input.message === 'string' ? input.message.trim().slice(0, 4000) : '',
  };
  const date = new Date(`${value.preferredDate}T12:00:00Z`);
  if (!value.name || !validEmail(value.email) || !value.phone || !services.has(value.service) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value.preferredDate) || Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== value.preferredDate || !value.message) return null;
  return value;
}

export function createHandler({ apiKey, send = fetch, now = Date.now }) {
  if (typeof apiKey !== 'string' || !apiKey.trim() || /[\r\n]/.test(apiKey.trim())) throw new Error('Invalid mail configuration.');
  const key = apiKey.trim();
  let health = null;
  let healthUntil = 0;
  let pendingHealth = null;
  async function readiness() {
    if (health && now() < healthUntil) return health;
    if (pendingHealth) return pendingHealth;
    pendingHealth = (async () => {
      try {
        const response = await send('https://api.brevo.com/v3/senders', {
          headers: { 'api-key': key, accept: 'application/json' }, redirect: 'error',
          signal: AbortSignal.timeout(10000),
        });
        if (!response.ok) {
          await response.body?.cancel();
          return { enabled: false, reason: 'provider_access_unavailable' };
        }
        const result = await response.json();
        return { enabled: result.senders?.some(item => item.email === sender && item.active === true) === true };
      } catch { return { enabled: false, reason: 'provider_unavailable' }; }
    })();
    try { health = await pendingHealth; healthUntil = now() + 20000; return health; }
    finally { pendingHealth = null; }
  }

  return async request => {
    const origin = request.headers.get('origin');
    const headers = {
      'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', vary: 'Origin',
      ...(origins.has(origin) ? {
        'access-control-allow-origin': origin, 'access-control-allow-methods': 'GET, POST, OPTIONS',
        'access-control-allow-headers': 'Content-Type',
      } : {}),
    };
    const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers });
    if (request.method === 'GET') return json({ ...await readiness(), routingVersion: 'studio-ops-v1' });
    if (!origins.has(origin)) return json({ ok: false }, 403);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'POST') return json({ ok: false }, 405);
    if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ ok: false }, 415);
    let input;
    try {
      const body = await request.text();
      if (new TextEncoder().encode(body).length > 16000) return json({ ok: false }, 413);
      input = JSON.parse(body);
    } catch { return json({ ok: false }, 400); }
    const value = validateInquiry(input);
    if (!value) return json({ ok: false }, 422);
    const elapsed = now() - Number(input.formStartedAt);
    if (input.website || !input.formStartedAt || !Number.isFinite(elapsed) || elapsed < 2500 || elapsed > 86400000) return json({ ok: false }, 422);
    try {
      const response = await send('https://api.brevo.com/v3/smtp/email', {
        method: 'POST', headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
        redirect: 'error', signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          sender: { name: 'Samuel Studio', email: sender }, to: [{ email: recipient, name: 'Samuel Studio' }],
          replyTo: { email: value.email, name: value.name }, subject: `Samuel Studio inquiry: ${value.service}`,
          tags: ['samuel-studio-inquiry'],
          textContent: ['New inquiry from samuel.studio', `Name: ${value.name}`, `Email: ${value.email}`,
            `Phone: ${value.phone}`, `Service: ${value.service}`, `Preferred date: ${value.preferredDate}`,
            `Received: ${new Date(now()).toISOString()}`, '', value.message].join('\n'),
        }),
      });
      if (response.status !== 201) { await response.body?.cancel(); return json({ ok: false }, 502); }
      const result = await response.json();
      return result?.messageId ? json({ ok: true }, 202) : json({ ok: false }, 502);
    } catch { return json({ ok: false }, 502); }
  };
}
