const basePath = import.meta.env.BASE_URL

function normalizePath(path = '') {
  return path.replace(/^\/+/, '')
}

export function withBase(path = '') {
  const normalizedPath = normalizePath(path)
  return normalizedPath ? `${basePath}${normalizedPath}` : basePath
}

export function siteUrl(path = '/') {
  if (typeof window === 'undefined') {
    return withBase(path)
  }

  const baseUrl = new URL(basePath, window.location.origin)
  const normalizedPath = normalizePath(path)
  return new URL(normalizedPath || '.', baseUrl).href
}
