import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const selection = JSON.parse(readFileSync(new URL('../src/data/homeFeaturedSelection.json', import.meta.url)))
const albums = JSON.parse(readFileSync(new URL('../src/data/curatedPortfolio.json', import.meta.url)))

test('homepage features eight explicit photographs spanning seven curated albums', () => {
  assert.equal(selection.length, 8)
  assert.equal(new Set(selection.map(item => item.id)).size, 8)
  assert.equal(new Set(selection.map(item => item.album)).size, 7)
  for (const item of selection) {
    const photograph = albums[item.album].find(photo => photo.id === item.id)
    assert.ok(photograph, item.id)
    assert.ok(existsSync(new URL(`../public/${photograph.src}`, import.meta.url)))
    assert.ok(existsSync(new URL(`../public/${photograph.thumbnailSrc}`, import.meta.url)))
    assert.ok(photograph.alt.length > 25)
    assert.ok(item.categories.length > 0)
  }
})

test('homepage labels describe actual photography lanes rather than invented image names', () => {
  assert.deepEqual(selection.map(item => item.title), [
    'Editorial Fashion', 'Fashion on Location', 'Beauty', 'Professional Headshots',
    'Editorial Portraits', 'Creative Portraits', 'Personal Portraits', 'Engagements',
  ])
})
