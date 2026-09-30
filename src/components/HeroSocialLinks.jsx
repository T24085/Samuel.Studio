import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/site'
import { InstagramIcon } from './InstagramIcon'

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 3h3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1.1V16a6 6 0 1 1-6-6h1v3h-1a3 3 0 1 0 3 3V3Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 21v-8h3l.5-3H14V8.5c0-1 .3-1.5 1.6-1.5H18V4h-2.6C12.3 4 11 5.5 11 8.4V10H8v3h3v8h3Z" />
    </svg>
  )
}

const socialIcons = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  Facebook: FacebookIcon,
}

export function HeroSocialLinks() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.nav
      aria-label="Follow Samuel Studio"
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
      className="flex w-full shrink-0 items-center justify-end gap-2"
    >
      {site.socials.filter((social) => socialIcons[social.label]).map((social) => {
        const Icon = socialIcons[social.label]

        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Samuel Studio on ${social.label} (opens in a new tab)`}
            title={`Follow on ${social.label}`}
            className="hero-social-link inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ink/30 text-gold-100 shadow-[inset_0_1px_0_rgba(245,240,230,0.05)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/15 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-900 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
        )
      })}
    </motion.nav>
  )
}
