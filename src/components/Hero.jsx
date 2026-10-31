import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import curatedPortfolio from '../data/curatedPortfolio.json'
import { HeroSocialLinks } from './HeroSocialLinks'
import { withBase } from '../utils/paths'
import '../styles/hero.css'

const heroImage = curatedPortfolio['studio-fashion'].find(item => item.id === 'intake-03-25')

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="studio-hero" className="home-snap-section relative isolate mt-20 overflow-hidden bg-ink text-ivory lg:mt-[5.5rem]">
      <img
        src={withBase(heroImage.src)}
        srcSet={`${withBase(heroImage.thumbnailSrc)} ${heroImage.thumbnailWidth}w, ${withBase(heroImage.src)} ${heroImage.width}w`}
        sizes="100vw"
        alt={heroImage.alt}
        width={heroImage.width}
        height={heroImage.height}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-[58%_top] lg:object-top"
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      <div className="hero-socials absolute inset-x-0 top-4 z-10 sm:top-6">
        <div className="studio-shell"><HeroSocialLinks /></div>
      </div>

      <div className="hero-content studio-shell relative z-10 flex min-h-[min(34rem,calc(100svh-15rem))] items-end pb-8 pt-36 sm:pb-12 lg:min-h-[min(44rem,calc(100svh-8rem))] lg:pt-32">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="hero-copy max-w-xl space-y-5 lg:max-w-[30rem]"
        >
          <h1 className="font-display text-4xl leading-[1.05] text-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
            The Real You, Through an Editorial Eye.
          </h1>
          <p className="hero-description max-w-lg text-sm leading-6 text-ivory drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] sm:text-base sm:leading-7">
            Editorial fashion, personal branding, and portraits by Samuel Cary.
            <span className="hidden sm:inline"> Thoughtful direction, a feel for light, and space for your own energy to come through. Photographs that feel like you, at your best.</span>
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link to="/portfolio" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ivory/65 bg-ink/70 px-5 py-3 text-sm text-ivory transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              View Portfolio <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/booking" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-ivory/65 bg-ink/50 px-5 py-3 text-sm text-ivory transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              Book a Session
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
