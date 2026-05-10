import { Link } from 'react-router-dom'

export function BrandLogo({ to = '/', size = 'md' }) {
  const iconSize = size === 'lg' ? 'text-5xl' : size === 'sm' ? 'text-xl' : 'text-2xl'
  const textSize = size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-xl' : 'text-2xl'

  return (
    <Link to={to} className="flex items-center gap-2" aria-label="GAPA">
      <span className={`material-symbols-outlined text-primary ${iconSize}`}>diversity_1</span>
      <span className={`font-headline italic font-bold text-primary ${textSize}`}>GAPA</span>
    </Link>
  )
}
