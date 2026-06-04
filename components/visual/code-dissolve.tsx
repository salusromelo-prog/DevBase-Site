import type { CSSProperties } from 'react'

const LINES = [
  'configurar auth do zero',
  'integrar PIX e boleto',
  'montar dashboard',
  'painel admin',
  'deploy e variáveis de env',
]

export default function CodeDissolve() {
  return (
    <div className="cd-term">
      <div className="cd-bar">
        <span className="cd-dot" /><span className="cd-dot" /><span className="cd-dot" />
      </div>
      <div className="cd-body">
        {LINES.map((line, i) => (
          <div key={i} className="cd-line" style={{ '--d': `${i * 160}ms` } as CSSProperties}>
            <span className="cd-x">✗</span>
            <span className="cd-lbl">{line}</span>
          </div>
        ))}
        <div className="cd-line" style={{ '--d': `${LINES.length * 160 + 120}ms` } as CSSProperties}>
          <span className="cd-check">✓</span>
          <span className="cd-lbl cd-lbl--ok">com a DevBase, já vem pronto</span>
        </div>
      </div>
    </div>
  )
}
