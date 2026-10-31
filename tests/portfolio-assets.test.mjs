import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'

const albums = JSON.parse(readFileSync(new URL('../src/data/curatedPortfolio.json', import.meta.url)))
const provenance = JSON.parse(readFileSync(new URL('../ops/curation/photo-provenance-2026-10-31.json', import.meta.url)))
const counts = {
  'editorial-campaign': 12, 'fashion-commercial': 12, 'studio-fashion': 12,
  'commercial-lifestyle': 10, 'beauty-portrait': 12, 'personal-identity': 12,
  'creative-portraits': 10, 'private-lifestyle': 12, 'boudoir-intimate': 2,
  'private-events': 12, 'commercial-events': 12,
}

test('all eleven albums contain only the approved first-pass primary selections', () => {
  assert.deepEqual(Object.keys(albums), Object.keys(counts))
  assert.equal(Object.values(albums).flat().length, 118)
  const ids = new Set()
  for (const [slug, items] of Object.entries(albums)) {
    assert.equal(items.length, counts[slug])
    for (const item of items) {
      assert.ok(!ids.has(item.id))
      ids.add(item.id)
      assert.match(item.src, new RegExp(`^photos/portfolio-intake/${slug}/\\d{2}\\.webp$`))
      assert.equal(item.thumbnailSrc, item.src.replace('.webp', '-thumb.webp'))
      assert.ok(item.alt.length > 25)
      assert.ok(item.width > 0 && item.width <= 2200)
      assert.ok(item.height > 0 && item.height <= 2200)
      assert.ok(item.thumbnailWidth > 0 && item.thumbnailWidth <= 960)
      assert.ok(!JSON.stringify(item).includes('C:\\'))
    }
  }
})

test('every responsive image exists as a bounded WebP, with matching full-image provenance', () => {
  let total = 0
  assert.equal(provenance.images.length, 118)
  const byPath = new Map(provenance.images.map(item => [item.webFile, item]))
  for (const item of Object.values(albums).flat()) {
    for (const path of [item.src, item.thumbnailSrc]) {
      const file = new URL(`../public/${path}`, import.meta.url)
      const bytes = readFileSync(file)
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP')
      assert.ok(statSync(file).size < 1024 * 1024, path)
      total += bytes.length
      if (path === item.src) {
        const original = byPath.get(path)
        assert.ok(original, path)
        assert.equal(createHash('sha256').update(bytes).digest('hex'), original.webSHA256)
        assert.match(original.sourceSHA256, /^[a-f0-9]{64}$/)
      }
    }
  }
  assert.ok(total < 50 * 1024 * 1024)
})
