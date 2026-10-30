export const inquiryEndpoint = 'https://allstreetlabs.com/api/studio-inquiry'

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
