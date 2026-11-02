import test from 'node:test'
import assert from 'node:assert/strict'
import { buildFallbackReply } from '../src/lib/chatFallback.js'

const user = (content) => ({ role: 'user', content })
const assistant = (content) => ({ role: 'assistant', content })
const reply = (messages) => buildFallbackReply(messages, 'studio@example.com')

test('dating profiles acknowledge known use without a founder pitch', () => {
  const result = reply([user('Some new shots for my dating profiles')])
  assert.match(result, /Dating-profile/)
  assert.match(result, /When/)
  assert.doesNotMatch(result, /founder|audience|where will.*used/i)
})

test('personal branding is not classified as a product campaign', () => {
  assert.match(reply([user('Portraits for my personal brand')]), /Personal branding/)
})

test('known timing and location advance to style', () => {
  const result = reply([user('Dating profiles in Houston next weekend')])
  assert.match(result, /look or mood/)
  assert.doesNotMatch(result, /When would|Where would/)
})

test('short answers retain the previous conversation purpose', () => {
  assert.match(reply([
    user('Dating profile pictures'),
    assistant('When would you like to shoot?'),
    user('In about six weeks'),
  ]), /Where would/)
})

test('a complete brief offers handoff without repeating questions', () => {
  const result = reply([user('Natural dating profile photos outdoors in Houston next month')])
  assert.match(result, /booking form/)
  assert.doesNotMatch(result, /When would|Where would|What look/)
})

test('pricing followup retains earlier purpose and timing', () => {
  const result = reply([user('Dating portraits next Saturday'), assistant('Where would you like to shoot?'), user('What is the cost?')])
  assert.match(result, /Pricing depends/)
  assert.match(result, /Where would/)
  assert.doesNotMatch(result, /What kind|When would/)
})

test('a custom purpose answer advances instead of asking its use again', () => {
  assert.match(reply([assistant('What kind of photographs would you like, and what will you use them for?'), user('For a book jacket')]), /When would/)
})

test('a relative timeframe in the opening brief is remembered', () => {
  assert.match(reply([user('Dating photos in about six weeks')]), /Where would/)
})

test('requests for location suggestions count as an answered preference', () => {
  const result = reply([user('Dating photos next week'), assistant('Where would you like to shoot, or would you like help choosing a location?'), user('Can you suggest somewhere?')])
  assert.match(result, /look or mood/)
  assert.doesNotMatch(result, /Where would/)
})

test('long location answers are retained', () => {
  assert.match(reply([user('Dating photos next week'), assistant('Where would you like to shoot?'), user('At the botanical gardens where I spend a lot of time, because I would like the photographs to reflect my interests and feel like a normal afternoon rather than a studio session.')]), /look or mood/)
})

test('events acknowledge known timing and location', () => {
  const result = reply([user('Corporate event in Houston next Friday')])
  assert.match(result, /event/)
  assert.doesNotMatch(result, /What kind|When would|Where would/)
})

test('website projects do not get photography intake questions', () => {
  const result = reply([user('I need a website for my business')])
  assert.match(result, /dev.samuel.studio/)
  assert.doesNotMatch(result, /When would you like to shoot/)
})
