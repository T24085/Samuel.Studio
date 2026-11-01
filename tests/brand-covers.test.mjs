import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'

const root = new URL('../', import.meta.url)
const selections = JSON.parse(await readFile(new URL('src/data/brandCoverSelections.json', root)))
const curated = JSON.parse(await readFile(new URL('src/data/curatedPortfolio.json', root)))
const items = new Map(Object.values(curated).flat().map(item => [item.id, item]))
for (const selection of Object.values(selections)) if (selection.customImage) items.set(selection.customImage.id, selection.customImage)

test('five covers use Sam intake photography or a clearly labelled AI mood concept', async () => {
  assert.equal(Object.keys(selections).length, 5)
  for (const [slug, design] of Object.entries(selections)) {
    if (slug === 'allstreet-apparel') {
      assert.equal(design.imageID, null)
      assert.equal(design.conceptImage, 'photos/brand-covers/allstreet-concept.png')
      assert.ok((await stat(new URL('public/' + design.conceptImage, root))).size > 0)
      assert.match(design.footer, /AI concept/)
      assert.deepEqual(design.previewIDs, [])
      assert.match(design.headline.join(' '), /in development/)
      continue
    }
    assert.ok(design.previewIDs.includes(design.imageID))
    for (const id of design.previewIDs) {
      const item = items.get(id)
      assert.ok(item, `Unknown image ${id}`)
      assert.match(item.src, /^photos\/(portfolio-intake|brand-covers)\//)
      assert.ok((await stat(new URL('public/' + item.src, root))).size > 0)
    }
  }
})

test('Colombia images are restricted to the described window and bedroom shoot', () => {
  assert.deepEqual(selections.colombia.previewIDs, ['intake-04-14', 'intake-04-13', 'intake-04-18', 'intake-04-24', 'intake-04-26'])
  assert.equal(selections.colombia.imageID, 'intake-04-14')
  assert.equal(selections['defiant-boudoir'].previewIDs.length, 2)
})

test('Studio and Boudoir use original signatures while Models retains an editorial masthead', async () => {
  for (const slug of ['defiant-boudoir', 'samuel-studio']) {
    assert.equal(selections[slug].logo, `photos/brand-covers/${slug}-signature.webp`)
    const bytes = await readFile(new URL('public/' + selections[slug].logo, root))
    assert.equal(bytes.subarray(8,12).toString(), 'WEBP')
    assert.ok(bytes.length < 250000)
  }
  assert.equal(selections['defiant-models'].logo, undefined)
  assert.deepEqual(selections['defiant-models'].masthead, ['DEFIANT MODELS'])
  assert.equal(selections.colombia.logo, undefined)
  assert.equal(selections['allstreet-apparel'].logo, undefined)
})

test('brand previews expose sample photographs or an explicitly labelled concept on both entry points', async () => {
  const modal = await readFile(new URL('src/pages/PortfolioPage.jsx', root), 'utf8')
  const collection = await readFile(new URL('src/pages/PortfolioCollectionPage.jsx', root), 'utf8')
  const concept = await readFile(new URL('src/components/BrandConceptFigure.jsx', root), 'utf8')
  assert.match(modal, /Sample photographs/)
  assert.match(modal, /<BrandConceptFigure collection=\{collection\}/)
  assert.match(collection, /<BrandConceptFigure collection=\{collection\}/)
  assert.match(concept, /AI-generated mood concept, not a photograph of the collection/)
})

test('new Models image is the provenance-pinned, bounded WebP with no alternate external source', async () => {
  const bytes = await readFile(new URL('public/photos/brand-covers/defiant-models.webp', root))
  assert.equal(bytes.subarray(8,12).toString(), 'WEBP')
  assert.ok(bytes.length < 300000)
  assert.equal(createHash('sha256').update(bytes).digest('hex'), 'b0dd52739a41d10fac09a166a8030c7b85951d542923bdb962435ff3af3abbeb')
})

test('cover text does not invent magazine sales, interviews, agency claims or a launched apparel collection', async () => {
  assert.doesNotMatch(JSON.stringify(selections), /\$|MAY 2024|exclusive interview|model management|shop now|25 pages/i)
  const data = await readFile(new URL('src/data/portfolio.js',root),'utf8')
  assert.match(data, /href: 'https:\/\/ondefiant.com\/'/)
  assert.match(data, /external: false,\s+platformStatus: 'DEFIANT platform link coming soon.'/)
  assert.doesNotMatch(data, /href: 'https:\/\/defiantmodels.com/)
  const hero = await readFile(new URL('src/components/PortfolioHero.jsx',root),'utf8')
  assert.equal((hero.match(/<BrandCover /g)||[]).length,2)
})
