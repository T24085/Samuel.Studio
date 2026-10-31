import test from 'node:test'
import assert from 'node:assert/strict'
import { bookingServiceOptions } from '../src/data/services.js'
import { prepareInquiry } from '../src/lib/prepareInquiry.js'
import { submitInquiry } from '../src/lib/submitInquiry.js'
import { validateInquiry } from '../ops/inquiry-relay/handler.mjs'
import { partnerEmailHref, referralOffer, referralQuestions } from '../src/data/referrals.js'

const base = { name: 'Test Client', email: 'client@example.com', phone: '202-555-0147',
  preferredDate: '2026-12-01', message: 'Synthetic local test. Please discuss the project.', website: '', formStartedAt: Date.now() - 10000 }

test('all eight service choices produce payloads accepted by the unchanged live relay validator', () => {
  assert.equal(bookingServiceOptions.length, 8)
  for (const option of bookingServiceOptions) {
    const payload = prepareInquiry({ ...base, service: option.value, referredBy: 'Alex / alex@example.com' })
    assert.ok(validateInquiry(payload), option.value)
    assert.ok(payload.message.includes('Alex / alex@example.com'))
    assert.ok(payload.message.endsWith(base.message))
    assert.ok(!Object.hasOwn(payload, 'referredBy'))
    if (option.routingService) assert.ok(payload.message.includes(`Inquiry type: ${option.label}`))
  }
})

test('blank referrals leave the original service and message unchanged', () => {
  const input = { ...base, service: 'Private Portraits' }
  assert.deepEqual(prepareInquiry({ ...input, referredBy: '  ' }), input)
})

test('referral claims remain unverified and cannot overrun the provider message limit', () => {
  const payload = prepareInquiry({ ...base, service: 'Corporate & Commercial Events', message: 'x'.repeat(3600), referredBy: 'a'.repeat(200) })
  assert.ok(payload.message.includes('attribution unverified'))
  assert.ok(payload.message.length <= 4000)
  assert.throws(() => prepareInquiry({ ...base, service: 'Private Events', message: 'x'.repeat(4000) }))
  assert.throws(() => prepareInquiry({ ...base, referredBy: 'a'.repeat(201) }))
  const clean = prepareInquiry({ ...base, referredBy: 'Alex\n\t alex@example.com' })
  assert.ok(clean.message.includes('Alex alex@example.com'))
})

test('the delivery helper includes event type and referral details in the actual outbound JSON', async () => {
  await submitInquiry({ ...base, service: 'Private Events', referredBy: 'REF-ALEX' }, async (_url, options) => {
    const body = JSON.parse(options.body)
    assert.equal(body.service, 'Private Portraits')
    assert.ok(body.message.includes('Private Events'))
    assert.ok(body.message.includes('REF-ALEX'))
    return Response.json({ ok: true }, { status: 202 })
  })
})

test('partner requests use Ops email and the offer clearly applies to each referred client', () => {
  assert.ok(referralOffer.includes('from each client you refer'))
  assert.ok(partnerEmailHref.startsWith('mailto:ops@ondefiant.com?'))
  const parameters = new URLSearchParams(partnerEmailHref.split('?')[1])
  assert.equal(parameters.get('subject'), 'Samuel Studio - Referral Partner Information')
  assert.ok(parameters.get('body').includes('My name:'))
  assert.ok(referralQuestions.some(item => item.answer.includes('separately to each new client')))
})
