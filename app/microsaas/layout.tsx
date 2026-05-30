export const dynamic = 'force-dynamic'

export default function MicroSaaSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {children}
    </div>
  )
}
