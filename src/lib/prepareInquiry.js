import { bookingServiceOptions } from '../data/services.js'

export function prepareInquiry(values) {
  const option = bookingServiceOptions.find(item => item.value === values.service)
  const { referredBy, ...payload } = values
  const referral = typeof referredBy === 'string' ? referredBy.trim().replace(/\s+/g, ' ') : ''
  if (referral.length > 200) throw new Error('Please shorten the referral details before sending.')
  const notes = []
  if (option?.routingService) notes.push(`Inquiry type: ${option.label}`)
  if (referral) notes.push(`Referred by (client supplied; attribution unverified): ${referral}`)
  if (!notes.length) return payload

  // Preserve extra inquiry types and referral claims in the existing relay's message field.
  const message = `${notes.join('\n')}\n\n${values.message}`
  if (message.length > 4000) throw new Error('Please shorten your inquiry before sending.')
  return { ...payload, service: option?.routingService || values.service, message }
}
