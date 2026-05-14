import Link from 'next/link'
import Badge from './badge'

interface ProductCardProps {
  title: string
  desc: string
  features: string[]
  price: string
  priceOld?: string
  priceColor: 'green' | 'indigo' | 'gold'
  priceLabel: string
  ctaLabel: string
  ctaHref: string
  ctaExternal?: boolean
  badge: 'live' | 'beta' | 'combo'
  badgeLabel: string
  highlight?: boolean
}

export default function ProductCard({
  title,
  desc,
  features,
  price,
  priceOld,
  priceColor,
  priceLabel,
  ctaLabel,
  ctaHref,
  ctaExternal,
  badge,
  badgeLabel,
  highlight,
}: ProductCardProps) {
  return (
    <article className={`product${highlight ? ' product-highlight' : ''}`}>
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
          {priceOld && <span className="old">{priceOld}</span>}
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
