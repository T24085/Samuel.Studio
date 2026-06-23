import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FanArcBackdrop, VerticalTag } from './DecorativeElements'

export function CTASection() {
  const reduceMotion = useReducedMotion()
  const MotionLink = motion(Link)

  return (
    <section className="home-snap-section relative overflow-hidden bg-ink py-24 text-ivory">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(198,161,91,0.14),transparent_40%),radial-gradient(circle_at_top_right,rgba(245,240,230,0.06),transparent_30%)]" />
      <FanArcBackdrop className="opacity-35" />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="studio-shell relative"
      >
        <motion.div
          className="gold-frame relative flex flex-col gap-8 p-8 md:p-10 lg:flex-row lg:items-center lg:justify-between"
          initial={reduceMotion ? false : { y: 16 }}
          whileInView={reduceMotion ? undefined : { y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,240,230,0.18),rgba(198,161,91,0.7),rgba(245,240,230,0.18),transparent)] opacity-70"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.42, 0.88, 0.42],
                    x: ['-2%', '2%', '-2%'],
                  }
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="max-w-2xl space-y-4">
            <VerticalTag>Booking banner</VerticalTag>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              A premium session, directed with clarity and care.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-parchment/72">
              From intimate portraits to editorial storytelling, Samuel Studio is designed for clients who value restraint, polish, and images that feel enduring.
            </p>
          </div>
          <motion.div className="flex flex-wrap gap-4">
            <MotionLink
              to="/booking"
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-gold/80 bg-[linear-gradient(180deg,rgba(198,161,91,0.98),rgba(168,132,67,0.92))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink shadow-[0_0_0_1px_rgba(198,161,91,0.32),0_10px_28px_rgba(198,161,91,0.18)] transition hover:-translate-y-px hover:border-gold hover:bg-[linear-gradient(180deg,rgba(212,177,105,1),rgba(184,145,75,0.96))] hover:text-ink"
            >
              Book a Session
            </MotionLink>
            <MotionLink
              to="/portfolio"
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-gold/70 bg-ink/45 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ivory shadow-[0_0_0_1px_rgba(198,161,91,0.18)] transition hover:-translate-y-px hover:border-gold hover:bg-ink/65 hover:text-gold/95"
            >
              View Portfolio
            </MotionLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
