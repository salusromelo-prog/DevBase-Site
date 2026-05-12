import Link from 'next/link'
import Badge from './badge'

interface ProductCardProps {
  title: string
  desc: string
  features: string[]
  price: string
  priceColor: 'green' | 'indigo'
  priceLabel: string
  ctaLabel: string
  ctaHref: string
  ctaExternal?: boolean
  badge: 'live' | 'beta'
  badgeLabel: string
}

export default function ProductCard({
  title,
  desc,
  features,
  price,
  priceColor,
  priceLabel,
  ctaLabel,
  ctaHref,
  ctaExternal,
  badge,
  badgeLabel,
}: ProductCardProps) {
  return (
    <article className="product">
      <div>
        <Badge variant={badge}>{badgeLabel}</Badge>
      </div>
      <h3>{title}</h3>
      <p className="desc">{desc}</p>
      <ul>
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <div className="ft">
        <div className="price">
          <span className={`big ${priceColor}`}>{price}</span>
          <span className="small">{priceLabel}</span>
        </div>
        {ctaExternal ? (
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {ctaLabel} <span className="arrow">→</span>
          </a>
        ) : (
          <Link href={ctaHref} className="btn btn-primary">
            {ctaLabel} <span className="arrow">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}
