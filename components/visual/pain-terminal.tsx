import type { CSSProperties } from 'react'

export default function PainTerminal({
  lines,
  label = '// erro em produção',
}: {
  lines: string[]
  label?: string
}) {
  return (
    <div className="pt-term">
      <div className="pt-bar">
        <span className="pt-dot" /><span className="pt-dot" /><span className="pt-dot" />
        <span className="pt-label">{label}</span>
      </div>
      <div className="pt-body">
        {lines.map((line, i) => (
          <div
            key={i}
            className="pt-line"
            style={{ '--pi': i } as CSSProperties}
          >
            <span className="pt-icon">✗</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
