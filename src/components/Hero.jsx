import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Camera } from 'lucide-react'
import { galleryItems } from '../data/gallery'
import { FanArcBackdrop, GoldFrame } from './DecorativeElements'
import { withBase } from '../utils/paths'

export function Hero() {
  const heroImage = galleryItems.find((item) => item.id === 'women-6') ?? galleryItems[0]
  const reduceMotion = useReducedMotion()
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const startPlayback = () => {
      video.play().catch(() => {})
    }

    if (video.readyState >= 1) {
      startPlayback()
    } else {
      video.addEventListener('loadedmetadata', startPlayback, { once: true })
    }

    return () => {
      video.removeEventListener('loadedmetadata', startPlayback)
      video.pause()
    }
  }, [])

  return (
    <section className="home-snap-section relative min-h-[100svh] overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0 z-0">
        {reduceMotion ? (
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            src={withBase('videos/hero-background.mp4')}
            poster={heroImage.src}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,24,22,0.72)_0%,rgba(9,24,22,0.48)_38%,rgba(9,24,22,0.66)_100%),linear-gradient(180deg,rgba(10,51,45,0.36)_0%,rgba(17,17,17,0.56)_100%)]" />
      </div>
      <FanArcBackdrop className="left-0 top-0 opacity-65" />
      <div className="studio-shell relative z-10 flex min-h-[100svh] items-end pt-28 pb-14 md:pb-18">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.65fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="max-w-3xl space-y-7"
          >
            <div className="space-y-5">
              <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.02em] text-ivory md:text-7xl lg:text-[5.8rem]">
                Portraits shaped by light, restraint, and presence.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-parchment/78 md:text-lg">
                Samuel Studio creates cinematic imagery designed around identity, presence, and perception.
                {' '}
                We work with individuals and brands to shape how they are seen, through refined, intentional visual storytelling.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-[#c6a15b] bg-transparent px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#c6a15b] shadow-[inset_0_0_0_1px_rgba(198,161,91,0.28)] transition hover:border-[#f7e8c8] hover:bg-[rgba(198,161,91,0.08)] hover:text-[#f7e8c8]"
              >
                View Portfolio <ArrowRight size={15} />
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full border border-[#c6a15b] bg-transparent px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#c6a15b] shadow-[inset_0_0_0_1px_rgba(198,161,91,0.28)] transition hover:border-[#f7e8c8] hover:bg-[rgba(198,161,91,0.08)] hover:text-[#f7e8c8]"
              >
                Book a Session
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <motion.div
              className="relative"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -4, 0],
                      rotate: [0, 0.4, 0],
                    }
              }
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            >
              {!reduceMotion ? (
                <>
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-5 rounded-[2.1rem] bg-[radial-gradient(circle_at_50%_50%,rgba(198,161,91,0.28),rgba(198,161,91,0.1)_28%,transparent_72%)] blur-2xl"
                    animate={{
                      opacity: [0.35, 0.78, 0.35],
                      scale: [0.985, 1.02, 0.985],
                    }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 rounded-[1.9rem] border border-gold/35 shadow-[0_0_0_1px_rgba(198,161,91,0.08),0_0_28px_rgba(198,161,91,0.16),0_0_80px_rgba(198,161,91,0.08)]"
                    animate={{
                      opacity: [0.48, 0.92, 0.48],
                      boxShadow: [
                        '0 0 0 1px rgba(198,161,91,0.08), 0 0 28px rgba(198,161,91,0.14), 0 0 80px rgba(198,161,91,0.08)',
                        '0 0 0 1px rgba(198,161,91,0.16), 0 0 38px rgba(198,161,91,0.24), 0 0 120px rgba(198,161,91,0.14)',
                        '0 0 0 1px rgba(198,161,91,0.08), 0 0 28px rgba(198,161,91,0.14), 0 0 80px rgba(198,161,91,0.08)',
                      ],
                    }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </>
              ) : null}

              <GoldFrame
                className="relative z-10 p-4 shadow-[0_18px_90px_rgba(0,0,0,0.44)]"
                style={{
                  borderColor: 'rgba(247, 205, 102, 0.94)',
                  boxShadow:
                    '0 18px 90px rgba(0,0,0,0.44), 0 0 0 1px rgba(247,205,102,0.28), 0 0 34px rgba(247,205,102,0.24), 0 0 96px rgba(198,161,91,0.12)',
                }}
              >
                <div className="relative overflow-hidden rounded-[1.35rem]">
                  <motion.img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="h-[34rem] w-full object-cover object-center md:h-[41rem]"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1.03, 1.07, 1.03],
                            x: [0, -8, 0],
                            y: [0, -6, 0],
                          }
                    }
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[0.64rem] uppercase tracking-[0.32em] text-gold/75">Featured work</p>
                      <p className="mt-2 font-display text-3xl text-ivory">Cinematic studio portrait</p>
                    </div>
                    <div className="rounded-full border border-gold/25 bg-ink/65 p-3 text-gold/80">
                      <Camera size={18} />
                    </div>
                  </div>
                </div>
              </GoldFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
