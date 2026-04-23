export const services = [
  {
    title: 'Editorial / Campaign Photography',
    label: 'Campaign-led',
    quote: 'Quote only',
    description:
      'Cinematic image direction for fashion labels, campaign visuals, and brand stories that need a polished editorial edge.',
    deliverables: ['Campaign concepting', 'Lookbook direction', 'Location and set planning', 'Retouched final selects'],
    cta: 'Request campaign quote',
    mood: 'Sharper light, higher contrast',
    audience: 'Fashion labels, campaign worlds, lookbooks',
  },
  {
    title: 'Personal Brand Identity',
    label: 'Signature tier',
    quote: 'Quote only',
    description:
      'For founders, creatives, and public-facing professionals who need a visual identity with depth, polish, and narrative consistency.',
    deliverables: ['Creative direction', 'Moodboard and styling guidance', 'Multiple compositions', 'Usage-ready gallery'],
    cta: 'Build my brand identity',
    mood: 'Warmer, polished, assured',
    audience: 'Founders, influencers, visible personal brands',
  },
  {
    title: 'Visual Story Projects',
    label: 'Narrative-led',
    quote: 'Quote only',
    description:
      'Narrative-led visuals for startups, artists, and concept-driven work that needs atmosphere and intentional pacing.',
    deliverables: ['Brief development', 'Shot sequencing', 'On-location or studio coverage', 'Cinematic edits'],
    cta: 'Shape a visual story',
    mood: 'Moodier, slower, cinematic',
    audience: 'Startups, artists, concept-driven launches',
  },
  {
    title: 'Portrait (Private Sessions)',
    label: 'Private sessions',
    quote: 'Quote only',
    description:
      'Private portrait sessions shaped with calm direction, understated luxury, and refined final imagery.',
    deliverables: ['Gentle posing guidance', 'Single-subject focus', 'Retouched portraits', 'Print-ready delivery'],
    cta: 'Book a private session',
    mood: 'Softer, intimate, quieter',
    audience: 'Private portrait clients, personal keepsakes',
  },
]

export const bookingServiceOptions = services.map((service) => ({
  value: service.title,
  label: service.title,
}))
