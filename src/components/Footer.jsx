import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { site, navLinks } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.footer
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="border-t border-gold/10 bg-ink text-ivory"
    >
      <div className="studio-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-4"
        >
          <Logo compact />
          <p className="max-w-md text-sm leading-7 text-parchment/72">
            {site.tagline}
          </p>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.06 }}
        >
          <h2 className="text-xs uppercase tracking-[0.35em] text-gold/80">Navigate</h2>
          <div className="mt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-parchment/72 transition hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
        >
          <h2 className="text-xs uppercase tracking-[0.35em] text-gold/80">Contact</h2>
          <div className="mt-4 space-y-2 text-sm text-parchment/72">
            <a href={`mailto:${site.email}`} className="block transition hover:text-ivory">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="block transition hover:text-ivory">
              {site.phone}
            </a>
            <p>{site.location}</p>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
        className="border-t border-gold/10 py-4 text-center text-[0.72rem] uppercase tracking-[0.3em] text-parchment/45"
      >
        Samuel Studio. Editorial portraiture with restraint and depth.
      </motion.div>
    </motion.footer>
  )
}
