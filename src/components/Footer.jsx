import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { InstagramIcon } from './InstagramIcon'
import { site, navLinks } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  const reduceMotion = useReducedMotion()
  const instagram = site.socials.find((social) => social.label === 'Instagram')

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
          {instagram ? (
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Samuel Studio on Instagram (opens in a new tab)"
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-gold-500/35 bg-emerald-700/35 px-4 py-3 text-sm text-gold-100 transition hover:border-gold-500 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <InstagramIcon size={19} />
              Follow on Instagram
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : null}
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
