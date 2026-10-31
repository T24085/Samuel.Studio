import curatedPortfolio from './curatedPortfolio.json'
import selection from './homeFeaturedSelection.json'
import { withBase } from '../utils/paths'

export const homeFeaturedItems = selection.map(({ album, id, title, categories }) => {
  const photograph = curatedPortfolio[album].find(item => item.id === id)
  if (!photograph) throw new Error(`Missing homepage photograph: ${id}`)
  return {
    ...photograph,
    title,
    categories,
    albumSlug: album,
    src: withBase(photograph.src),
    thumbnailSrc: withBase(photograph.thumbnailSrc),
  }
})
