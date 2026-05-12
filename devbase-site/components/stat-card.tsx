export default function StatCard({
  label,
  value,
  meta,
}: {
  label: string
  value: string
  meta: string
}) {
  return (
    <div className="stat-card">
      <span className="label">{label}</span>
      <span className="v">{value}</span>
      <span className="meta">{meta}</span>
    </div>
  )
}
