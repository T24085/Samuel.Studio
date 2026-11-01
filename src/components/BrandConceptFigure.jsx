export function BrandConceptFigure({ collection }) {
  return (
    <figure className="mt-6 max-w-sm">
      <div className="aspect-[3/4] overflow-hidden bg-[#f1f0ea]">
        <img
          src={collection.coverSrc}
          alt={collection.coverAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain opacity-60 grayscale"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-parchment/70">
        AI-generated mood concept, not a photograph of the collection. Clothing designs and release details are still in development.
      </figcaption>
    </figure>
  )
}
