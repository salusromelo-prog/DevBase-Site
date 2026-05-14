type BadgeVariant = 'live' | 'beta' | 'combo'

const VARIANTS: Record<BadgeVariant, string> = {
  live:  'badge badge-live',
  beta:  'badge badge-beta',
  combo: 'badge badge-combo',
}

export default function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  return <span className={VARIANTS[variant]}>{children}</span>
}
