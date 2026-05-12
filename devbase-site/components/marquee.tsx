const ITEMS = [
  'Next.js 14',
  'TypeScript',
  'Supabase',
  'Pagar.me',
  'Tailwind CSS',
  'Resend',
  'Vercel',
  'PIX · boleto · cartão',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
