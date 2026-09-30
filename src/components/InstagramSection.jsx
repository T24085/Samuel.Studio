import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { InstagramIcon } from './InstagramIcon'
import { portfolioGalleryItems } from '../data/gallery'
import { site } from '../data/site'

const previewFrames = [
  { id: 'A30A0259', label: 'Beauty', position: '50% 35%' },
  { id: '2021.08_YoungTiff SE1-1760-Edit', label: 'Editorial', position: '55% 35%' },
  { id: 'untitled-2359', label: 'Portraits', position: '50% 40%' },
]

export function InstagramSection() {
  const reduceMotion = useReducedMotion()
  const instagram = site.socials.find((social) => social.label === 'Instagram')
  if (!instagram) return null

  const handle = `@${new URL(instagram.href).pathname.split('/').filter(Boolean)[0]}`

  return (
    <section
      id="instagram"
      aria-labelledby="instagram-heading"
      className="home-snap-section relative isolate overflow-hidden border-y border-gold-500/20 bg-emerald-900 py-16 text-ivory sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(198,161,91,0.16),transparent_60%),linear-gradient(135deg,rgba(10,51,45,0.8),rgba(4,25,21,0.4))]" />
      <div className="studio-shell relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold-200">
            <InstagramIcon size={20} />
            Follow the studio
          </div>
          <h2 id="instagram-heading" className="mt-6 max-w-md font-display text-5xl leading-[1.02] sm:text-6xl">
            The studio,<br />in your feed.
          </h2>
          <a
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${handle} on Instagram (opens in a new tab)`}
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-display text-3xl text-gold-200 underline decoration-gold-500/40 underline-offset-8 transition hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:text-4xl"
          >
            {handle}
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
          <p className="mt-7 max-w-sm text-sm leading-7 text-parchment/80 sm:text-base">
            Portraits, editorial stories, and a closer look at Samuel Studio. Stay connected with the work on Instagram.
          </p>
          <a
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram (opens in a new tab)"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-gold-500 bg-gold-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-900 transition hover:border-gold-100 hover:bg-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-900 sm:px-6 sm:tracking-[0.2em]"
          >
            Follow on Instagram <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div>
          <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">
            {previewFrames.map((frame, index) => {
              const image = portfolioGalleryItems.find((item) => item.id === frame.id)
              if (!image) return null

              return (
                <motion.a
                  key={frame.id}
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Explore Samuel Studio ${frame.label.toLowerCase()} on Instagram (opens in a new tab)`}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
                  className={`group relative block overflow-hidden border border-gold-500/25 bg-ink shadow-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-900 ${index === 1 ? 'aspect-[3/5]' : 'aspect-[3/4]'}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    width={index === 1 ? 384 : 576}
                    height={index === 1 ? 640 : 768}
                    style={{ objectPosition: frame.position }}
                    className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-2 text-center text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-ivory sm:p-4 sm:text-[0.65rem] sm:tracking-[0.2em]">
                    {frame.label}
                  </span>
                </motion.a>
              )
            })}
          </div>
          <p className="mt-5 text-center text-xs leading-6 text-parchment/65">A selection of studio work. Explore more on Instagram.</p>
        </div>
      </div>
    </section>
  )
}
