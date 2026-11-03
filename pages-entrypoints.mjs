import { copyFile, mkdir } from 'node:fs/promises'
import { createServer } from 'vite'

// Load the same route data as the browser, including Vite's asset and JSON imports.
const vite = await createServer({ server: { middlewareMode: true, watch: null } })
try {
  const { portfolioAlbums, portfolioCollections } = await vite.ssrLoadModule('/src/data/portfolio.js')
  const { services } = await vite.ssrLoadModule('/src/data/services.js')
  const routes = [
    'about', 'booking', 'contact', 'refer', 'referrals', 'services', 'portfolio', 'brands',
    ...services.map(({ slug }) => `services/${slug}`),
    ...portfolioAlbums.map(({ slug }) => `portfolio/albums/${slug}`),
    ...portfolioCollections.flatMap(({ slug }) => [`brands/${slug}`, `portfolio/${slug}`]),
  ]
  for (const route of routes) {
    await mkdir(`dist/${route}`, { recursive: true })
    await copyFile('dist/index.html', `dist/${route}/index.html`)
  }
  await copyFile('dist/index.html', 'dist/404.html')
  console.log(`Generated ${routes.length} direct-link entries.`)
} finally {
  await vite.close()
}
