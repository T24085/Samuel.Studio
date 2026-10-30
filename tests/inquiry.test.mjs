import test from 'node:test'
import assert from 'node:assert/strict'
import { submitInquiry, inquiryEndpoint } from '../src/lib/submitInquiry.js'

test('sends inquiry to the server relay without browser credentials', async () => {
  await submitInquiry({ name: 'Test Client' }, async (url, options) => {
    assert.equal(url, inquiryEndpoint)
    assert.equal(options.credentials, 'omit')
    assert.equal(options.headers['api-key'], undefined)
    assert.deepEqual(JSON.parse(options.body), { name: 'Test Client' })
    return Response.json({ ok: true }, { status: 202 })
  })
})

test('rejects provider failures, invalid responses, and transport errors', async () => {
  for (const send of [
    async () => Response.json({ ok: false }, { status: 502 }),
    async () => Response.json({}),
    async () => new Response('<html>Error</html>'),
    async () => { throw new Error('offline') },
  ]) await assert.rejects(submitInquiry({}, send))
})
