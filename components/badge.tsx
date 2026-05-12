type BadgeVariant = 'live' | 'beta'

const VARIANTS: Record<BadgeVariant, string> = {
  live: 'badge badge-live',
  beta: 'badge badge-beta',
}

export default function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  return <span className={VARIANTS[variant]}>{children}</span>
}
