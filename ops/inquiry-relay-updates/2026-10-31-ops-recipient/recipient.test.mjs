import test from 'node:test'
import assert from 'node:assert/strict'
import { createHandler, recipient } from './handler.mjs'

test('fixed Ops destination, verified sender, visitor Reply-To and no customer auto-reply', async () => {
  let calls = 0
  const handler = createHandler({ apiKey: 'synthetic-key', send: async (url, options) => {
    calls++
    assert.equal(url, 'https://api.brevo.com/v3/smtp/email')
    const mail = JSON.parse(options.body)
    assert.equal(recipient, 'ops@ondefiant.com')
    assert.deepEqual(mail.to, [{ email: recipient, name: 'Samuel Studio' }])
    assert.equal(mail.sender.email, 'notifications@notify.ondefiant.com')
    assert.equal(mail.replyTo.email, 'client@example.com')
    assert.equal(mail.bcc, undefined)
    assert.equal(mail.cc, undefined)
    return Response.json({ messageId: 'synthetic-message' }, { status: 201 })
  } })
  const result = await handler(new Request('http://local/api/studio-inquiry', {
    method: 'POST', headers: { origin: 'https://www.samuel.studio', 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Local Test', email: 'client@example.com', phone: '202-555-0147',
      service: 'Private Portraits', preferredDate: '2026-12-01', message: 'Synthetic test, no real provider calls.',
      formStartedAt: Date.now() - 10000, website: '', to: 'untrusted@example.com' }),
  }))
  assert.equal(result.status, 202)
  assert.equal(calls, 1)
})

test('readiness reports the Ops routing version without sending an email', async () => {
  const handler = createHandler({ apiKey: 'synthetic-key', send: async url => {
    assert.equal(url, 'https://api.brevo.com/v3/senders')
    return Response.json({ senders: [{ email: 'notifications@notify.ondefiant.com', active: true }] })
  } })
  const response = await handler(new Request('http://local/api/studio-inquiry'))
  assert.deepEqual(await response.json(), { enabled: true, routingVersion: 'studio-ops-v1' })
})
