const BROKEN = [
  'configurar auth...',
  'integrar PIX...',
  'montar dashboard...',
  'deploy...',
]

export default function CodeDissolve() {
  return (
    <div className="cd-term">
      <div className="cd-bar">
        <span className="cd-dot" /><span className="cd-dot" /><span className="cd-dot" />
      </div>
      <div className="cd-body">
        {BROKEN.map((line, i) => (
          <div key={i} className="cd-line" style={{ '--d': `${i * 160}ms` } as React.CSSProperties}>
            <span className="cd-err">✗ {line}</span>
          </div>
        ))}
        <div className="cd-line" style={{ '--d': `${BROKEN.length * 160 + 80}ms` } as React.CSSProperties}>
          <span className="cd-ok">✓ com a DevBase, já vem pronto</span>
        </div>
      </div>
    </div>
  )
}
