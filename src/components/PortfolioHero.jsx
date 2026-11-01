import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { portfolioCollections } from '../data/portfolio'
import { BrandCover } from './BrandCover'

const coverPositions = {
  'defiant-models': {
    left: '0%',
    top: '4%',
    width: '28%',
    rotate: -10,
    z: 60,
  },
  'defiant-boudoir': {
    left: '21%',
    top: '-1%',
    width: '29%',
    rotate: -3,
    z: 70,
  },
  'samuel-studio': {
    left: '45%',
    top: '2%',
    width: '29%',
    rotate: 7,
    z: 65,
  },
  'allstreet-apparel': {
    left: '9%',
    top: '43%',
    width: '31%',
    rotate: -8,
    z: 35,
  },
  colombia: {
    left: '38%',
    top: '40%',
    width: '32%',
    rotate: 6,
    z: 40,
  },
}

function MagazineCover({ collection, activeSlug, onSelect, reduceMotion }) {
  const position = coverPositions[collection.slug]
  const isActive = activeSlug === collection.slug
  const hasSelection = activeSlug !== null
  const lift = isActive ? -18 : hasSelection ? 8 : 0
  const shift = isActive ? 82 : hasSelection ? 10 : 0
  const scale = isActive ? 1.1 : hasSelection ? 0.96 : 1
  const rotate = isActive ? 0 : position.rotate
  const opacity = hasSelection && !isActive ? 0.8 : 1

  return (
    <motion.button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onSelect?.(collection.slug)
      }}
      aria-label={collection.title}
      className={[
        'absolute aspect-[3/4] cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-black/20 shadow-[0_35px_90px_rgba(0,0,0,0.75)] outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#c9a14a] focus-visible:ring-offset-0',
      ].join(' ')}
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        zIndex: isActive ? 70 : position.z,
        transformOrigin: 'center center',
      }}
      initial={false}
      animate={{
        opacity,
        x: shift,
        y: lift,
        scale,
        rotate,
      }}
      transition={{ type: 'spring', stiffness: 170, damping: 18 }}
      whileHover={
        reduceMotion
          ? { zIndex: 120 }
          : {
              zIndex: 120,
              y: isActive ? -28 : -14,
              scale: isActive ? 1.12 : 1.05,
              rotate: isActive ? 0 : position.rotate * 0.3,
            }
      }
      whileFocus={{
        zIndex: 120,
        y: isActive ? -28 : -14,
        scale: isActive ? 1.12 : 1.05,
        rotate: isActive ? 0 : position.rotate * 0.3,
      }}
    >
      <BrandCover collection={collection} loading={collection.slug === 'defiant-models' ? 'eager' : 'lazy'} />
    </motion.button>
  )
}

function MobileCover({ collection, index, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onSelect?.(collection.slug)
      }}
      className="aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
      aria-label={collection.title}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
    >
      <BrandCover collection={collection} loading="eager" />
    </motion.button>
  )
}

export function PortfolioHero({ activeSlug = null, onMagazineSelect }) {
  const reduceMotion = useReducedMotion()
  const covers = portfolioCollections

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#080807] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(201,161,74,0.16),transparent_30%),radial-gradient(circle_at_14%_82%,rgba(255,255,255,0.08),transparent_24%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3),transparent_35%,rgba(0,0,0,0.82))]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.8)_1px,transparent_0)] [background-size:20px_20px]" />

      <div className="relative z-10 mx-auto min-h-[100svh] max-w-[1700px] px-6 pb-16 pt-28 sm:px-8 md:px-10 lg:px-12 lg:pt-24">
        <div className="relative lg:min-h-[calc(100svh-7rem)]">
          <motion.div
            className="relative z-10 max-w-4xl lg:max-w-[39%]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#c9a14a]">
              Brands / Creative Projects
            </p>

            <h1 className="max-w-3xl font-display text-5xl font-medium uppercase leading-[0.94] text-white sm:text-6xl lg:text-[3.25rem] xl:text-[4.1rem]">
              Different Ideas.
              <br />
              <span className="text-[#c9a14a]">A Shared Eye.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Explore the brands and projects connected to Samuel Studio, from model portfolios and intimate portraits to a future streetwear collection.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-8">
              <a
                href="/portfolio"
                className="inline-flex items-center gap-3 border border-[#c9a14a] px-7 py-4 text-xs font-medium uppercase text-[#c9a14a] transition hover:bg-[#c9a14a] hover:text-black"
              >
                View Photography <ArrowUpRight size={16} aria-hidden="true" />
              </a>

            </div>
          </motion.div>

          <motion.div
            className="absolute left-[42%] right-[-4%] top-[0.5rem] hidden h-[62rem] lg:z-30 lg:block"
            initial={false}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
          >
            <div className="relative h-full w-full overflow-visible" onClick={() => onMagazineSelect?.()}>
              {covers.map((collection, index) => (
                <MagazineCover
                  key={collection.slug}
                  collection={collection}
                  index={index}
                  activeSlug={activeSlug}
                  onSelect={onMagazineSelect}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
        >
          {covers.map((collection, index) => (
            <MobileCover key={collection.slug} collection={collection} index={index} onSelect={onMagazineSelect} />
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080807] to-transparent" />
    </section>
  )
}
