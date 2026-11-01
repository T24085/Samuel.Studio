import '../styles/brand-covers.css'
import { withBase } from '../utils/paths'

export function BrandCover({ collection, loading = 'lazy', className = '' }) {
  const design = collection.coverDesign
  return (
    <div className={`brand-cover brand-cover--${design.theme} brand-cover--${collection.slug} ${className}`} data-brand-cover={collection.slug}>
      {collection.coverSrc ? (
        <img src={collection.coverSrc} alt={collection.coverAlt} className="brand-cover-photo" loading={loading} decoding="async" style={{ objectPosition: design.imagePosition }} />
      ) : null}
      {design.theme === 'concept' && <span className="brand-cover-monogram" aria-hidden="true">AS</span>}
      <div className="brand-cover-type">
        <div className="brand-cover-header">
          {design.logo ? (
            <img src={withBase(design.logo)} alt={collection.title} className="brand-cover-logo" loading={loading} decoding="async" />
          ) : (
            <span className="brand-cover-masthead">{design.masthead.map(line => <span key={line}>{line}</span>)}</span>
          )}
          <span className="brand-cover-kicker">{design.kicker}</span>
        </div>
        <div className="brand-cover-story">
          <span className="brand-cover-headline">{design.headline.map(line => <span key={line}>{line}</span>)}</span>
          <span className="brand-cover-rule" aria-hidden="true" />
          <span className="brand-cover-footer">{design.footer}</span>
        </div>
      </div>
    </div>
  )
}
