import { Link } from 'react-router-dom'

export function BrandLogo({ to = '/', size = 'md', inverted = false }) {
  const lockupClass = size === 'lg' ? 'brand-lockup brand-lockup-lg' : 'brand-lockup'

  return (
    <Link to={to} className={lockupClass} aria-label="GAPA">
      <span className="brand-mark">
        <img src="/gapa-logo.png" alt="Logo de GAPA" />
      </span>
      <span className="brand-word" style={inverted ? { color: '#FBFBFA' } : undefined}>
        GAPA
      </span>
    </Link>
  )
}
