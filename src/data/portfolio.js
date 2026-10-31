import { portfolioGalleryItems } from './gallery'
import { withBase } from '../utils/paths'
import curatedPortfolio from './curatedPortfolio.json'

const samStudioCover = new URL('../../SamStudio1.png', import.meta.url).href
const allStreetCover = new URL('../../AllStreet1.png', import.meta.url).href
const colombiaCover = new URL('../../Colombia1.png', import.meta.url).href
const defiantModelsCover = withBase('portfolio-assets/cover-defiant-models.png')

function makeLookup(items) {
  return new Map(items.map((item) => [item.id, item]))
}

function pickItems(lookup, ids) {
  return ids.map((id) => lookup.get(id)).filter(Boolean)
}

function toEditorialTitle(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/^20\d{6}-/, '')
    .replace(/^untitled-/i, 'Untitled ')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function createEditorialFashionItem(file, title = toEditorialTitle(file)) {
  return {
    id: file.replace(/\.[^.]+$/, ''),
    src: new URL(`../../Editorial  Creative Fasion/${file}`, import.meta.url).href,
    alt: `${title} from Samuel Studio.`,
    title,
    categories: ['Fashion', 'Editorial'],
    featured: true,
  }
}

const galleryLookup = makeLookup(portfolioGalleryItems)

const defiantModelsItems = [
  createEditorialFashionItem('2021.08_YoungTiff SE1-607-Edit-Edit.jpg', 'Monochrome Frame'),
  createEditorialFashionItem('2021.08_YoungTiff SE1-1144-Edit-Edit.jpg', 'Editorial Line'),
  createEditorialFashionItem('2021.08_YoungTiff SE1-1965.jpg', 'Blue Hour'),
  createEditorialFashionItem('2021.08_YoungTiff SE1-198-Edit.JPG', 'Runway Edge'),
  createEditorialFashionItem('2021.08_YoungTiff SE1-281-Edit-2.jpg', 'Styled Pause'),
  createEditorialFashionItem('2021.08_YoungTiff SE1-376-Edit-2.jpg', 'Wild Rhythm'),
  createEditorialFashionItem('20211105-untitled-1029-2.jpg', 'Power Study'),
  createEditorialFashionItem('20211105-untitled-1188.jpg'),
  createEditorialFashionItem('20211105-untitled-1357.jpg'),
  createEditorialFashionItem('20211105-untitled-1373.jpg'),
  createEditorialFashionItem('20211105-untitled-1399.jpg'),
  createEditorialFashionItem('20211105-untitled-955.jpg'),
  createEditorialFashionItem('20211105-untitled-999.jpg'),
  createEditorialFashionItem('20230314-A30A1501-2.jpg'),
  createEditorialFashionItem('20230914-A30A5376.jpg'),
  createEditorialFashionItem('20230914-A30A5507.jpg'),
  createEditorialFashionItem('20240324-untitled-280.jpg'),
  createEditorialFashionItem('20240324-untitled-34.jpg'),
  createEditorialFashionItem('20240324-untitled-513.jpg'),
  createEditorialFashionItem('20240324-untitled-910.jpg'),
  createEditorialFashionItem('20240324-untitled-948.jpg'),
  createEditorialFashionItem('A30A0388-17.jpg'),
  createEditorialFashionItem('untitled-1184-Edit.jpg'),
  createEditorialFashionItem('untitled-153.jpg'),
  createEditorialFashionItem('untitled-159.jpg'),
  createEditorialFashionItem('untitled-388.jpg'),
  createEditorialFashionItem('untitled-410-2.jpg'),
]

const defiantBoudoirIds = [
  'flame-dress',
  'negris',
  'negris-2',
  'negris-3',
  'negris-4',
  'rain',
  'roses',
  'self',
  'self-port',
  'flower',
  'contemplate-women',
  'women-serious',
]

const allStreetIds = [
  'jeans',
  'jeans-ripped',
  'jeans-women',
  'wild-pants',
  'casual',
  'car-women',
  'jet',
  'jet-2',
  'brown-dress',
  'silver-dress',
  'blue-dress',
  'modern-black-white',
]

const colombiaIds = [
  'artist',
  'confidence',
  'contemplate-women',
  'flower',
  'group',
  'looking-up-women',
  'man',
  'self',
  'self-port',
  'women',
  'women-6',
  'women-serious',
  'headshots_personal_branding_013',
  'headshots_personal_branding_014',
  'headshots_personal_branding_015',
  'headshots_personal_branding_016',
  'headshots_personal_branding_017',
]

export const portfolioCollections = [
  {
    slug: 'defiant-models',
    eyebrow: 'Within the Studio / Editorial',
    title: 'Defiant Models',
    description:
      'Model-led editorial with a sharper commercial line.',
    body:
      'Model portfolios and creative collaborations, with attention to expression, styling, and the range each person brings to a shoot.',
    previewItems: defiantModelsItems,
    linkLabel: 'Visit Defiant Models',
    href: 'https://defiantmodels.com/',
    external: true,
    collectionLink: '/brands/defiant-models',
    albumSlugs: ['editorial-campaign', 'fashion-commercial'],
    coverSrc: defiantModelsCover,
    coverAlt: 'Defiant Models magazine cover.',
  },
  {
    slug: 'defiant-boudoir',
    eyebrow: 'Within the Studio / Sensual Identity',
    title: 'Defiant Boudoir',
    description:
      'Intimate portraits shaped around confidence, expression, and your own comfort.',
    body:
      'We plan the look and boundaries together, then take time to find the light, movement, and expressions that feel right for you.',
    previewItems: pickItems(galleryLookup, defiantBoudoirIds),
    linkLabel: 'Visit Defiant Boudoir',
    href: 'https://defiantboudoir.com/',
    external: true,
    collectionLink: '/brands/defiant-boudoir',
    albumSlugs: ['personal-identity', 'private-lifestyle'],
    coverSrc: withBase('portfolio-assets/cover-defiant-boudoir.png'),
    coverAlt: 'Defiant Boudoir magazine cover.',
  },
  {
    slug: 'samuel-studio',
    eyebrow: 'Within the Studio / Brand House',
    title: 'Samuel Studio',
    description:
      'Fashion, personal branding, and portraits by Samuel Cary.',
    body:
      'Editorial experience meets a personal approach to photography, with projects built around the people and ideas in front of the camera.',
    previewItems: pickItems(galleryLookup, [
      'collection',
      'group',
      'modern-black-white',
      'artist',
      'confidence',
      'blue-dress',
      'women',
      'women-6',
      'silver-dress',
      'man',
      'flower',
      'wild-pants',
    ]),
    linkLabel: 'Visit Samuel Studio',
    href: '/brands/samuel-studio',
    external: false,
    collectionLink: '/brands/samuel-studio',
    albumSlugs: ['editorial-campaign', 'fashion-commercial', 'personal-identity'],
    coverSrc: samStudioCover,
    coverAlt: 'Samuel Studio magazine cover.',
  },
  {
    slug: 'allstreet-apparel',
    eyebrow: 'Within the Studio / Culture',
    title: 'AllStreet Apparel',
    description:
      'A streetwear brand in development. First collection coming soon.',
    body:
      'AllStreet Apparel is a future streetwear brand Sam is developing, bringing his interest in fashion, photography, and street culture into a collection of his own.',
    comingSoon: true,
    previewItems: [],
    linkLabel: 'Collection link',
    href: '/brands/allstreet-apparel',
    external: false,
    collectionLink: '/brands/allstreet-apparel',
    albumSlugs: [],
    coverSrc: allStreetCover,
    coverAlt: 'AllStreet Apparel magazine cover.',
  },
  {
    slug: 'colombia',
    eyebrow: 'Within the Studio / Colombia',
    title: 'Colombia at the Core',
    description:
      'A portrait essay shaped by place, character, and a quieter kind of authority.',
    body:
      'This chapter gathers the Colombia archive as a single visual chapter: grounded faces, restrained light, and images that breathe instead of compete.',
    previewItems: pickItems(galleryLookup, colombiaIds),
    linkLabel: 'View full collection',
    href: '/portfolio/colombia',
    external: false,
    collectionLink: '/brands/colombia',
    albumSlugs: ['personal-identity', 'private-lifestyle', 'editorial-campaign'],
    coverSrc: colombiaCover,
    coverAlt: 'Samuel Studio Colombia magazine cover.',
  },
]

export const portfolioMagazineIssues = portfolioCollections.map((collection, index) => ({
  ...collection,
  issueNumber: String(index + 1).padStart(2, '0'),
  issueTitle:
    index === 0
      ? 'Front Cover / Lead Story'
      : index === 1
        ? 'Feature Spread / Intimate Study'
      : index === 2
          ? 'Style File / Culture Chapter'
          : 'Studio Notes / Local Archive',
  issueNote:
    index === 0
      ? 'Lead with the strongest cover and let the rest of the issue unfold like a real print publication.'
      : index === 1
        ? 'This chapter keeps the tone cinematic and personal.'
        : index === 2
          ? 'The culture pages sit between fashion energy and brand storytelling.'
          : 'The Colombia chapter closes the magazine with a portrait essay rooted in place, light, and character.',
})) 

const editorialCampaignIds = [
  'artist',
  'blue-dress',
  'cheetah',
  'cheetah-2',
  'cheetah-3',
  'confidence',
  'collection',
  'modern-black-white',
  'power',
  'power-2',
  'silver-dress',
  'boots',
  'group',
  'man',
  'women-6',
  'flame-dress',
]

const fashionCommercialIds = [
  'brown-dress',
  'blue-dress',
  'boots',
  'cheetah',
  'cheetah-2',
  'cheetah-3',
  'jeans',
  'jeans-ripped',
  'jeans-women',
  'jet',
  'jet-2',
  'silver-dress',
  'wild-pants',
  'modern-black-white',
  'power',
  'power-2',
]

const personalIdentityIds = [
  'artist',
  'confidence',
  'contemplate-women',
  'group',
  'looking-up-women',
  'man',
  'self',
  'self-port',
  'women',
  'women-6',
  'women-serious',
  'flower',
]

const privateLifestyleIds = [
  'bridge-women',
  'candid',
  'car-women',
  'casual',
  'happy-women',
  'rain',
  'roses',
  'collection',
  'flower',
  'women',
  'women-6',
  'brown-dress',
]

export const portfolioSections = [
  { id: 'fashion-editorial', title: 'Fashion & Editorial', description: 'Creative fashion stories, studio work, and campaigns made on location.' },
  { id: 'people-occasions', title: 'People & Occasions', description: 'Personal branding, portraits, and photographs of the people and moments that matter.' },
]

function curatedItems(slug) {
  return (curatedPortfolio[slug] ?? []).map((item) => ({
    ...item,
    src: withBase(item.src),
    thumbnailSrc: withBase(item.thumbnailSrc),
  }))
}

function album({ slug, title, section, description, items = [] }) {
  const uniqueItems = [...new Map(items.map((item) => [item.src, item])).values()]
  return {
    slug,
    title,
    section,
    eyebrow: `Portfolio / ${title}`,
    description,
    body: description,
    previewItems: uniqueItems.map((item, index) => ({
      ...item,
      title,
      alt: item.alt || `${title}, photograph ${index + 1} by Samuel Cary.`,
      categories: item.categories || [title],
    })),
    sourceCollections: [],
  }
}

export const portfolioAlbums = [
  album({
    slug: 'editorial-campaign', title: 'Editorial & Creative Fashion', section: 'fashion-editorial',
    description: 'Signature fashion work, creative collaborations, and magazine editorials, with room for character and experimentation.',
    items: curatedItems('editorial-campaign'),
  }),
  album({
    slug: 'fashion-commercial', title: 'Fashion on Location', section: 'fashion-editorial',
    description: 'Fashion in real settings, from lifestyle stories to location campaigns.',
    items: curatedItems('fashion-commercial'),
  }),
  album({
    slug: 'studio-fashion', title: 'Studio Fashion', section: 'fashion-editorial',
    description: 'Clean studio photographs with attention to clothing, shape, and the details of a collection.',
    items: curatedItems('studio-fashion'),
  }),
  album({
    slug: 'commercial-lifestyle', title: 'Commercial Lifestyle', section: 'fashion-editorial',
    description: 'People, products, and everyday settings photographed for brands and commercial projects.',
    items: curatedItems('commercial-lifestyle'),
  }),
  album({
    slug: 'beauty-portrait', title: 'Beauty & Portrait', section: 'fashion-editorial',
    description: 'Beauty portraits exploring expression, light, makeup, and the details of a face.',
    items: curatedItems('beauty-portrait'),
  }),
  album({
    slug: 'personal-identity', title: 'Personal Branding & Headshots', section: 'people-occasions',
    description: 'Professional portraits and photographs that introduce you and the work you do.',
    items: curatedItems('personal-identity'),
  }),
  album({ slug: 'creative-portraits', title: 'Creative Portraits', section: 'people-occasions', description: 'Portraits for musicians, artists, and people with a particular idea to explore.', items: curatedItems('creative-portraits') }),
  album({ slug: 'private-lifestyle', title: 'Personal Portraits', section: 'people-occasions', description: 'Portraits for yourself, the people close to you, and personal milestones.', items: curatedItems('private-lifestyle') }),
  album({ slug: 'boudoir-intimate', title: 'Boudoir & Intimate', section: 'people-occasions', description: 'Intimate portraits planned around your comfort, confidence, and expression.', items: curatedItems('boudoir-intimate') }),
  album({ slug: 'private-events', title: 'Private Events', section: 'people-occasions', description: 'Engagements, sweet sixteens, celebrations, and time with the people who matter.', items: curatedItems('private-events') }),
  album({ slug: 'commercial-events', title: 'Corporate & Commercial Events', section: 'people-occasions', description: 'Conferences, company gatherings, and events that bring a business community together.', items: curatedItems('commercial-events') }),
]

export const portfolioCollectionsBySlug = new Map(
  portfolioCollections.map((collection) => [collection.slug, collection]),
)

export const portfolioAlbumsBySlug = new Map(
  portfolioAlbums.map((album) => [album.slug, album]),
)

export const portfolioMagazineHero = {
  eyebrow: 'Magazine / Portfolio',
  title: 'The Studio Family',
  coverSrc: samStudioCover,
  coverAlt: 'Samuel Studio The Studio Family magazine cover.',
  headline: 'Samuel Studio Is the Parent House for a Growing Editorial Family.',
  description:
    'The portfolio is now laid out like a real magazine spread. The left side leads with the cover image, while the right side reads like a contents page and editorial note.',
  issueNote:
    'Use this section as the front page for the brand system. The collection pages and album houses sit below it.',
}
