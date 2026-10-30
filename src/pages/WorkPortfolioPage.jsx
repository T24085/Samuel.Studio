import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SEO } from '../components/SEO'
import { portfolioAlbums, portfolioSections } from '../data/portfolio'

export function WorkPortfolioPage() {
  return (
    <>
      <SEO
        title="Portfolio"
        description="Explore Samuel Cary's fashion editorials, commercial photography, personal branding, and portraits."
        path="/portfolio"
      />
      <section className="studio-shell pb-24 pt-28 text-ivory sm:pt-32">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Portfolio</p>
        <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">A Look at the Work.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-parchment/80">
          Fashion, personal branding, and portraits. Explore the albums to see how the approach changes with the person, the setting, and the idea.
        </p>
        {portfolioSections.map((section) => {
          const albums = portfolioAlbums.filter((album) => album.section === section.id && album.previewItems.length > 0)
          if (!albums.length) return null
          return (
          <section key={section.id} className="mt-16 border-t border-white/15 pt-10" aria-labelledby={section.id}>
            <h2 id={section.id} className="font-display text-4xl">{section.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-parchment/80">{section.description}</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {albums.map((album) => {
            const cover = album.previewItems[0]
            return (
              <Link
                key={album.slug}
                to={`/portfolio/albums/${album.slug}`}
                className="group block overflow-hidden rounded-lg border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                {cover ? (
                  <div className="aspect-[4/3] overflow-hidden bg-black">
                    <img src={cover.src} alt={cover.alt} loading="lazy" className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]" />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-3xl">{album.title}</h3>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-parchment/80">{album.description}</p>
                </div>
              </Link>
            )
          })}
            </div>
          </section>
          )
        })}
      </section>
    </>
  )
}
