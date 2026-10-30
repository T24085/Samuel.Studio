import { ArrowUpRight } from 'lucide-react'

export function WebServicesSection({ compact = false }) {
  return (
    <section
      aria-labelledby={compact ? 'home-web-services' : 'web-services'}
      className={`border-y border-gold/15 bg-[#10251f] text-ivory ${compact ? 'home-snap-section py-14 sm:py-16' : 'py-16 sm:py-20'}`}
    >
      <div className="studio-shell grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Web & App Services</p>
          <h2
            id={compact ? 'home-web-services' : 'web-services'}
            className={`mt-4 max-w-3xl font-display leading-tight ${compact ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'}`}
          >
            {compact ? 'Your Brand, Beyond the Photograph.' : 'Websites & Digital Experiences'}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-parchment/85">
            {compact
              ? 'Bring your images, message, and online presence together with website design and application development.'
              : 'Websites and applications for businesses, creatives, and brands. From a portfolio site to a custom tool, we help shape the design, content, and development around what you need.'}
          </p>
        </div>
        <a
          href="https://dev.samuel.studio/"
          className="inline-flex min-h-12 w-full items-center justify-center gap-3 border border-gold/65 px-5 py-4 text-center text-sm text-ivory transition hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-fit lg:justify-self-end"
        >
          <span>Explore Web & App Services</span>
          <ArrowUpRight size={18} className="shrink-0" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
