import { Link } from 'react-router-dom'

export function BrandLogo({ to = '/', subtitle, size = 'md' }) {
  return (
    <Link to={to} className={`brand-lockup brand-lockup-${size}`} aria-label="GAPA">
      <img
        className="brand-logo-image"
        src="/gapa-logo.png"
        alt="Logo de GAPA"
      />
      {subtitle ? <p className="brand-kicker">{subtitle}</p> : null}
    </Link>
  )
}
