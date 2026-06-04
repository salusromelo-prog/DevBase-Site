export default function CostMeter({
  value,
  unit,
  label,
  contrast,
}: {
  value: number
  unit: string
  label: string
  contrast?: string
}) {
  return (
    <div className="cm-wrap">
      <div className="cm-meter">
        <span className="cm-n" data-count={value}>0</span>
        <span className="cm-u">{unit}</span>
      </div>
      <div className="cm-bar"><span className="cm-fill" /></div>
      <p className="cm-lbl">{label}</p>
      {contrast && (
        <p className="cm-contrast">→ <strong>{contrast}</strong></p>
      )}
    </div>
  )
}
