import { portfolioGalleryItems } from './gallery'
import { withBase } from '../utils/paths'

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
      'A cast-forward chapter built for strong silhouettes, disciplined styling, and image sets that hold their shape across campaigns, lookbooks, and launch material.',
    previewItems: defiantModelsItems,
    linkLabel: 'Visit Defiant Models',
    href: 'https://defiantmodels.com/',
    external: true,
    collectionLink: '/portfolio/defiant-models',
    albumSlugs: ['editorial-campaign', 'fashion-commercial'],
    coverSrc: defiantModelsCover,
    coverAlt: 'Defiant Models magazine cover.',
  },
  {
    slug: 'defiant-boudoir',
    eyebrow: 'Within the Studio / Sensual Identity',
    title: 'Defiant Boudoir',
    description:
      'An elevated, cinematic approach to sensual identity and personal expression.',
    body:
      'This chapter is shaped for clients who want intimate portraiture that still feels modern, elegant, and visually controlled.',
    previewItems: pickItems(galleryLookup, defiantBoudoirIds),
    linkLabel: 'Visit Defiant Boudoir',
    href: 'https://defiantboudoir.com/',
    external: true,
    collectionLink: '/portfolio/defiant-boudoir',
    albumSlugs: ['personal-identity', 'private-lifestyle'],
    coverSrc: withBase('portfolio-assets/cover-defiant-boudoir.png'),
    coverAlt: 'Defiant Boudoir magazine cover.',
  },
  {
    slug: 'samuel-studio',
    eyebrow: 'Within the Studio / Brand House',
    title: 'Samuel Studio',
    description:
      'The parent magazine that frames the full studio family with a broader editorial voice.',
    body:
      'This issue acts as the studio overview and links the brand chapters into one premium family of work.',
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
    href: '/portfolio/samuel-studio',
    external: false,
    collectionLink: '/portfolio/samuel-studio',
    albumSlugs: ['editorial-campaign', 'fashion-commercial', 'personal-identity'],
    coverSrc: samStudioCover,
    coverAlt: 'Samuel Studio magazine cover.',
  },
  {
    slug: 'allstreet-apparel',
    eyebrow: 'Within the Studio / Culture',
    title: 'AllStreet Apparel',
    description:
      'A future-facing expression of culture, identity, and visual storytelling.',
    body:
      'Developed for apparel, lifestyle, and cultural projects that need a sharper commercial rhythm with enough edge to feel current.',
    previewItems: pickItems(galleryLookup, allStreetIds),
    linkLabel: 'Collection link',
    href: '/portfolio/allstreet-apparel',
    external: false,
    collectionLink: '/portfolio/allstreet-apparel',
    albumSlugs: ['fashion-commercial', 'editorial-campaign'],
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
    collectionLink: '/portfolio/colombia',
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
      ? 'Front cover / lead story'
      : index === 1
        ? 'Feature spread / intimate study'
      : index === 2
          ? 'Style file / culture chapter'
          : 'Studio notes / local archive',
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

export const portfolioAlbums = [
  {
    slug: 'editorial-campaign',
    eyebrow: 'Album house / Editorial',
    title: 'Editorial / Campaign',
    description:
      'High-concept campaigns, brand stories, and editorial sets with directed momentum.',
    body:
      'This album house brings together the studio work that feels the most narrative-forward: polished styling, controlled light, and imagery that can carry a launch or campaign rollout.',
    previewItems: pickItems(galleryLookup, editorialCampaignIds),
    sourceCollections: ['defiant-models', 'allstreet-apparel', 'colombia'],
  },
  {
    slug: 'fashion-commercial',
    eyebrow: 'Album house / Fashion',
    title: 'Fashion / Commercial',
    description:
      'Styling, product energy, and commercial visuals with a sharper visual edge.',
    body:
      'These images are meant to sit comfortably in lookbooks, retail campaigns, and social rollout systems without losing their editorial tone.',
    previewItems: pickItems(galleryLookup, fashionCommercialIds),
    sourceCollections: ['defiant-models', 'allstreet-apparel'],
  },
  {
    slug: 'personal-identity',
    eyebrow: 'Album house / Portrait',
    title: 'Personal Identity',
    description:
      'Portrait sessions centered on self-definition, presence, and emotional tone.',
    body:
      'This is where the studio leans into nuanced portraiture, making space for self-expression without losing the deliberate visual language that ties the work together.',
    previewItems: pickItems(galleryLookup, personalIdentityIds),
    sourceCollections: ['defiant-boudoir', 'colombia'],
  },
  {
    slug: 'private-lifestyle',
    eyebrow: 'Album house / Lifestyle',
    title: 'Private & Lifestyle',
    description:
      'Intimate, low-pressure storytelling for quieter moments and personal archives.',
    body:
      'A softer, more observational archive that still carries the studio standard in tone, composition, and finish.',
    previewItems: pickItems(galleryLookup, privateLifestyleIds),
    sourceCollections: ['defiant-boudoir', 'colombia'],
  },
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
  headline: 'Samuel Studio is the parent house for a growing editorial family.',
  description:
    'The portfolio is now laid out like a real magazine spread. The left side leads with the cover image, while the right side reads like a contents page and editorial note.',
  issueNote:
    'Use this section as the front page for the brand system. The collection pages and album houses sit below it.',
}
