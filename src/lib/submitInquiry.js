export const inquiryEndpoint = 'https://pilot.ondefiant.com/api/studio-inquiry'

export async function inquiryIsAvailable(send = fetch) {
  try {
    const response = await send(inquiryEndpoint, { credentials: 'omit', signal: AbortSignal.timeout(12000) })
    return response.ok && (await response.json())?.enabled === true
  } catch {
    return false
  }
}

export async function submitInquiry(values, send = fetch) {
  const response = await send(inquiryEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    signal: AbortSignal.timeout(25000),
    body: JSON.stringify(values),
  })
  const result = await response.json()
  if (!response.ok || result?.ok !== true) throw new Error('Inquiry sending was not confirmed.')
}
