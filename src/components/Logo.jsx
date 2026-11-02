import { Link } from 'react-router-dom'
import { withBase } from '../utils/paths'
import '../styles/logo.css'

export function Logo({ compact = false }) {
  const signatureSrc = withBase('photos/brand-covers/samuel-studio-signature.webp')
  return (
    <Link to="/" className={`studio-logo${compact ? ' studio-logo--compact' : ''}`} aria-label="Samuel Studio home">
      <span className="studio-logo-art" style={{ '--studio-signature-mask': `url("${signatureSrc}")` }}>
        <img
          src={signatureSrc}
          alt="Samuel Studio"
          width="1600"
          height="318"
          className="studio-logo-signature"
          decoding="async"
        />
      </span>
      <span className="studio-logo-descriptor">Photography &amp; Creative Direction</span>
    </Link>
  )
}
