import { withBase } from '../utils/paths'

export const galleryModes = ['Panorama', 'Cinema', 'Overhead', 'Showcase', 'Gallery', 'Standard']
export const categoryTabs = ['All', 'Portraits', 'Branding', 'Couples', 'Studio', 'Editorial', 'Fashion', 'Lifestyle', 'Fine Art']

const galleryFiles = [
  'artist.jpg',
  'blue-dress.jpg',
  'boots.jpg',
  'bridge-women.jpg',
  'brown-dress.jpg',
  'candid.jpg',
  'car-women.jpg',
  'casual.jpg',
  'cheetah.jpg',
  'cheetah-2.jpg',
  'cheetah-3.jpg',
  'collection.png',
  'confidence.jpg',
  'contemplate-women.jpg',
  'flame-dress.jpg',
  'flower.jpg',
  'group.jpg',
  'happy-women.jpg',
  'jeans.jpg',
  'jeans-ripped.jpg',
  'jeans-women.jpg',
  'jet.jpg',
  'jet-2.jpg',
  'looking-up-women.jpg',
  'man.jpg',
  'modern-black-white.jpg',
  'negris.jpg',
  'negris-2.jpg',
  'negris-3.jpg',
  'negris-4.jpg',
  'power.jpg',
  'power-2.jpg',
  'rain.jpg',
  'roses.jpg',
  'self.jpg',
  'self-port.jpg',
  'silver-dress.jpg',
  'wild-pants.jpg',
  'women.jpg',
  'women-6.jpg',
  'women-serious.jpg',
]

const portfolioSources = {
  artist: new URL('../../Headshots Personal Branding/headshots_personal_branding_001.jpg', import.meta.url).href,
  confidence: new URL('../../Headshots Personal Branding/headshots_personal_branding_002.jpg', import.meta.url).href,
  'contemplate-women': new URL('../../Headshots Personal Branding/headshots_personal_branding_003.jpg', import.meta.url).href,
  flower: new URL('../../Headshots Personal Branding/headshots_personal_branding_004.jpg', import.meta.url).href,
  group: new URL('../../Headshots Personal Branding/headshots_personal_branding_005.jpg', import.meta.url).href,
  'looking-up-women': new URL('../../Headshots Personal Branding/headshots_personal_branding_006.jpg', import.meta.url).href,
  man: new URL('../../Headshots Personal Branding/headshots_personal_branding_007.jpg', import.meta.url).href,
  self: new URL('../../Headshots Personal Branding/headshots_personal_branding_008.jpg', import.meta.url).href,
  'self-port': new URL('../../Headshots Personal Branding/headshots_personal_branding_009.jpg', import.meta.url).href,
  women: new URL('../../Headshots Personal Branding/headshots_personal_branding_010.jpg', import.meta.url).href,
  'women-6': new URL('../../Headshots Personal Branding/headshots_personal_branding_011.jpg', import.meta.url).href,
  'women-serious': new URL('../../Headshots Personal Branding/headshots_personal_branding_012.jpg', import.meta.url).href,

  'bridge-women': new URL('../../Commercial Life Style/commercial_lifestyle_001.jpg', import.meta.url).href,
  candid: new URL('../../Commercial Life Style/commercial_lifestyle_002.jpg', import.meta.url).href,
  'car-women': new URL('../../Commercial Life Style/commercial_lifestyle_003.jpg', import.meta.url).href,
  casual: new URL('../../Commercial Life Style/commercial_lifestyle_004.jpg', import.meta.url).href,
  'happy-women': new URL('../../Commercial Life Style/commercial_lifestyle_005.jpg', import.meta.url).href,
  rain: new URL('../../Commercial Life Style/commercial_lifestyle_006.jpg', import.meta.url).href,
  roses: new URL('../../Commercial Life Style/commercial_lifestyle_007.jpg', import.meta.url).href,
  collection: new URL('../../Commercial Life Style/commercial_lifestyle_008.jpg', import.meta.url).href,

  'blue-dress': new URL('../../Editorial  Creative Fasion/2021.08_YoungTiff SE1-1144-Edit-Edit.jpg', import.meta.url).href,
  boots: new URL('../../Editorial  Creative Fasion/2021.08_YoungTiff SE1-1521-Edit-Edit.JPG', import.meta.url).href,
  cheetah: new URL('../../Editorial  Creative Fasion/2021.08_YoungTiff SE1-1965.jpg', import.meta.url).href,
  'cheetah-2': new URL('../../Editorial  Creative Fasion/2021.08_YoungTiff SE1-198-Edit.JPG', import.meta.url).href,
  'cheetah-3': new URL('../../Editorial  Creative Fasion/2021.08_YoungTiff SE1-281-Edit-2.jpg', import.meta.url).href,
  'flame-dress': new URL('../../Editorial  Creative Fasion/2021.08_YoungTiff SE1-376-Edit-2.jpg', import.meta.url).href,
  'modern-black-white': new URL('../../Editorial  Creative Fasion/2021.08_YoungTiff SE1-607-Edit-Edit.jpg', import.meta.url).href,
  power: new URL('../../Editorial  Creative Fasion/20211105-untitled-1029-2.jpg', import.meta.url).href,

  'power-2': new URL('../../Fashion Studio Clean Commercial/fashion_studio_clean_commercial_001.jpg', import.meta.url).href,
  'silver-dress': new URL('../../Fashion Studio Clean Commercial/fashion_studio_clean_commercial_002.jpg', import.meta.url).href,
  'wild-pants': new URL('../../Fashion Studio Clean Commercial/fashion_studio_clean_commercial_003.jpg', import.meta.url).href,

  'brown-dress': new URL('../../Fashion On Location Lifestyle Campaign/fashion_on_location_lifestyle_campaign_001.jpg', import.meta.url).href,
  jeans: new URL('../../Fashion On Location Lifestyle Campaign/fashion_on_location_lifestyle_campaign_002.jpg', import.meta.url).href,
  'jeans-ripped': new URL('../../Fashion On Location Lifestyle Campaign/fashion_on_location_lifestyle_campaign_003.jpg', import.meta.url).href,
  'jeans-women': new URL('../../Fashion On Location Lifestyle Campaign/fashion_on_location_lifestyle_campaign_004.jpg', import.meta.url).href,
  jet: new URL('../../Fashion On Location Lifestyle Campaign/fashion_on_location_lifestyle_campaign_005.jpg', import.meta.url).href,
  'jet-2': new URL('../../Fashion On Location Lifestyle Campaign/fashion_on_location_lifestyle_campaign_006.jpg', import.meta.url).href,
  'negris': new URL('../../Beauty & Portrait/2021.08_YoungTiff SE1-1372-Edit.jpg', import.meta.url).href,
  'negris-2': new URL('../../Beauty & Portrait/2021.08_YoungTiff SE1-1493-Edit.jpg', import.meta.url).href,
  'negris-3': new URL('../../Beauty & Portrait/2021.08_YoungTiff SE1-1760-Edit.jpg', import.meta.url).href,
  'negris-4': new URL('../../Beauty & Portrait/2021.08_YoungTiff SE1-1821-Edit.jpg', import.meta.url).href,
}

const titleOverrides = {
  'artist.jpg': 'Quiet Authority',
  'bridge-women.jpg': 'Held in Light',
  'candid.jpg': 'Candid Moment',
  'collection.png': 'Collection',
  'confidence.jpg': 'Confidence',
  'contemplate-women.jpg': 'Still Thought',
  'flower.jpg': 'Botanical Accent',
  'group.jpg': 'Collected Presence',
  'happy-women.jpg': 'Easy Joy',
  'looking-up-women.jpg': 'Looking Up',
  'modern-black-white.jpg': 'Monochrome Frame',
  'negris.jpg': 'Private Luxury',
  'negris-2.jpg': 'Toned Restraint',
  'negris-3.jpg': 'Editorial Line',
  'negris-4.jpg': 'Velvet Tension',
  'self-port.jpg': 'Self Portrait',
  'women-6.jpg': 'Flow State',
  'women-serious.jpg': 'Clear Intent',
}

const portfolioGroups = [
  {
    ids: [
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
    ],
    titles: [
      'Quiet Authority',
      'Still Light',
      'Private Thought',
      'Botanical Accent',
      'Collected Presence',
      'Upward Gaze',
      'Studio Man',
      'Inner Self',
      'Self Portrait',
      'Golden Skin',
      'Flow State',
      'Clear Intent',
    ],
    categories: ['Portraits', 'Studio'],
  },
  {
    ids: ['bridge-women', 'candid', 'car-women', 'casual', 'happy-women', 'rain', 'roses', 'collection'],
    titles: ['Open Air', 'Afternoon Pause', 'Urban Ease', 'Casual Motion', 'Easy Joy', 'Rain Study', 'Rose Quiet', 'Collected Scene'],
    categories: ['Lifestyle', 'Commercial'],
  },
  {
    ids: ['blue-dress', 'boots', 'cheetah', 'cheetah-2', 'cheetah-3', 'flame-dress', 'modern-black-white', 'power'],
    titles: ['Editorial Line', 'Blue Hour', 'Runway Edge', 'Styled Pause', 'Wild Rhythm', 'Heat Study', 'Monochrome Frame', 'Power Study'],
    categories: ['Fashion', 'Editorial'],
  },
  {
    ids: ['power-2', 'silver-dress', 'wild-pants'],
    titles: ['Studio Press', 'Clean Tailoring', 'Kinetic Shape'],
    categories: ['Fashion', 'Commercial'],
  },
  {
    ids: ['brown-dress', 'jeans', 'jeans-ripped', 'jeans-women', 'jet', 'jet-2'],
    titles: ['Street Story', 'Denim Quiet', 'Ripped Motion', 'City Denim', 'Terminal', 'Departure'],
    categories: ['Fashion', 'Lifestyle'],
  },
  {
    ids: ['negris', 'negris-2', 'negris-3', 'negris-4'],
    titles: ['Velvet Skin', 'Soft Line', 'Editorial Glow', 'Midnight Tone'],
    categories: ['Portraits', 'Beauty'],
  },
]

const portfolioTitleOverrides = Object.fromEntries(
  portfolioGroups.flatMap(({ ids, titles }) => ids.map((id, index) => [id, titles[index] ?? toTitleCase(id)])),
)

const portfolioCategoryOverrides = Object.fromEntries(
  portfolioGroups.flatMap(({ ids, categories }) => ids.map((id) => [id, categories])),
)

function toTitleCase(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function inferCategories(fileName) {
  const name = fileName.toLowerCase()

  if (/(bridge|happy|candid|car-women|casual|rain|roses|collection|flower)/.test(name)) {
    return ['Lifestyle', 'Fine Art']
  }

  if (/(artist|confidence|contemplate|group|man|self|looking-up|women-serious|women\.jpg|self-port)/.test(name)) {
    return ['Portraits', 'Studio']
  }

  if (/(dress|boots|cheetah|flame|jeans|jet|negris|power|silver|wild-pants|modern-black-white)/.test(name)) {
    return ['Fashion', 'Editorial']
  }

  return ['Editorial', 'Branding']
}

export const galleryItems = galleryFiles.map((file, index) => {
  const title = titleOverrides[file] ?? toTitleCase(file)
  const id = file.replace(/\.[^.]+$/, '')
  return {
    id,
    src: withBase(`photos/${file}`),
    alt: `${title} from Samuel Studio.`,
    title,
    categories: inferCategories(file),
    featured: index < 8 || ['collection.png', 'women-6.jpg', 'modern-black-white.jpg'].includes(file),
  }
})

export const portfolioGalleryItems = galleryFiles.map((file, index) => {
  const title = titleOverrides[file] ?? toTitleCase(file)
  const id = file.replace(/\.[^.]+$/, '')
  return {
    id,
    src: portfolioSources[id] ?? withBase(`photos/${file}`),
    alt: `${title} from Samuel Studio.`,
    title: portfolioTitleOverrides[id] ?? title,
    categories: portfolioCategoryOverrides[id] ?? inferCategories(file),
    featured: index < 8 || ['collection.png', 'women-6.jpg', 'modern-black-white.jpg'].includes(file),
  }
})
