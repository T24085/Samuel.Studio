import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createHandler } from './handler.mjs';
import { createRelayServer } from './server.mjs';

const clock = Date.now();
const input = { name: 'Synthetic Test', email: 'test@example.com', phone: '555-0100', service: 'Private Portraits', preferredDate: '2026-12-01', message: 'Dating profile photographs.', website: '', formStartedAt: clock - 5000 };
const origin = 'https://www.samuel.studio';
const request = (body = input, from = origin, method = 'POST') => new Request('http://localhost/api/studio-inquiry', { method, headers: { origin: from, 'content-type': 'application/json' }, ...(method === 'POST' ? { body: JSON.stringify(body) } : {}) });

test('fixed sender/recipient, visitor Reply-To, no HTML or user-controlled routing', async () => {
  const handler = createHandler({ apiKey: ' synthetic-key ', now: () => clock, send: async (url, options) => {
    assert.equal(url, 'https://api.brevo.com/v3/smtp/email');
    assert.equal(options.headers['api-key'], 'synthetic-key');
    assert.equal(options.redirect, 'error');
    const body = JSON.parse(options.body);
    assert.equal(body.sender.email, 'notifications@notify.ondefiant.com');
    assert.equal(body.to[0].email, 'studiodefiant@gmail.com');
    assert.equal(body.to.length, 1);
    assert.equal(body.replyTo.email, input.email);
    assert.equal(body.htmlContent, undefined);
    return Response.json({ messageId: 'synthetic-id' }, { status: 201 });
  } });
  const response = await handler(request({ ...input, to: 'ignored@example.com' }));
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get('access-control-allow-origin'), origin);
});

test('invalid fields, bots, origins, timing, and body limits never reach provider', async () => {
  let calls = 0;
  const handler = createHandler({ apiKey: 'synthetic', now: () => clock, send: async () => { calls++; throw new Error('must not send'); } });
  for (const body of [null, [], { ...input, email: 'bad' }, { ...input, email: 'a<b@example.com' }, { ...input, service: 'bad' }, { ...input, preferredDate: '2026-02-31' }, { ...input, formStartedAt: clock }, { ...input, website: 'spam' }]) {
    assert.equal((await handler(request(body))).status, 422);
  }
  assert.equal((await handler(request(input, 'https://evil.example'))).status, 403);
  assert.equal((await handler(request({ ...input, message: 'x'.repeat(17000) }))).status, 413);
  assert.equal(calls, 0);
});

test('provider failure and ambiguous acceptance never return success or leak details', async () => {
  for (const send of [async () => Response.json({ message: 'private provider text' }, { status: 401 }), async () => Response.json({}, { status: 201 }), async () => { throw new Error('private-key'); }]) {
    const response = await createHandler({ apiKey: 'synthetic', now: () => clock, send })(request());
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /private|key/);
  }
});

test('readiness coalesces concurrent checks and caches only safe metadata', async () => {
  let calls = 0;
  const handler = createHandler({ apiKey: 'synthetic', now: () => clock, send: async url => {
    calls++; assert.equal(url, 'https://api.brevo.com/v3/senders');
    return Response.json({ senders: [{ email: 'notifications@notify.ondefiant.com', active: true }] });
  } });
  const responses = await Promise.all([handler(request(null, origin, 'GET')), handler(request(null, origin, 'GET'))]);
  assert.deepEqual(await responses[0].json(), { enabled: true });
  assert.deepEqual(await responses[1].json(), { enabled: true });
  assert.equal(calls, 1);
  assert.equal((await handler(request(null, origin, 'OPTIONS'))).status, 204);
});

async function withServer(options, run) {
  const server = createRelayServer(options);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try { await run(`http://127.0.0.1:${server.address().port}`); }
  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}

test('HTTP bridge routes exact path and enforces request, origin, method, and IP limits', async () => {
  let calls = 0;
  await withServer({ perMinute: 1, handler: async () => { calls++; return Response.json({ ok: true }, { status: 202 }); } }, async base => {
    assert.equal((await fetch(base + '/elsewhere')).status, 404);
    assert.equal((await fetch(base + '/api/studio-inquiry', { method: 'PUT' })).status, 405);
    assert.equal((await fetch(base + '/api/studio-inquiry', { method: 'POST', headers: { origin: 'https://evil.example' } })).status, 403);
    const options = { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: '{}' };
    assert.equal((await fetch(base + '/api/studio-inquiry', options)).status, 202);
    assert.equal((await fetch(base + '/api/studio-inquiry', options)).status, 429);
    assert.equal(calls, 1);
  });
});

test('HTTP bridge caps body length before provider processing', async () => {
  await withServer({ handler: async () => { throw new Error('must not reach'); } }, async base => {
    const result = await fetch(base + '/api/studio-inquiry', { method: 'POST', headers: { origin }, body: 'x'.repeat(17000) });
    assert.equal(result.status, 413);
  });
});

test('global mail budgets apply across distinct client addresses', async () => {
  await withServer({ perDay: 1, handler: async () => Response.json({ ok: true }, { status: 202 }) }, async base => {
    const post = address => fetch(base + '/api/studio-inquiry', { method: 'POST', headers: { origin, 'x-forwarded-for': address }, body: '{}' });
    assert.equal((await post('192.0.2.1')).status, 202);
    assert.equal((await post('192.0.2.2')).status, 429);
  });
});
