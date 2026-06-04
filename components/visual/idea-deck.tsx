'use client'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const IDEAS = [
  { tag: 'fácil', title: 'Validador de CNPJ em lote', market: 'Contadores BR', price: 'R$ 29/mês' },
  { tag: 'fácil', title: 'Alerta de vencimento de CNH', market: 'Motoristas', price: 'R$ 4/mês' },
  { tag: 'médio', title: 'Monitor de precificação', market: 'E-commerce BR', price: 'R$ 49/mês' },
  { tag: 'fácil', title: 'Extrato PIX automático', market: 'Freelancers', price: 'R$ 19/mês' },
  { tag: 'médio', title: 'Dashboard de links afiliados', market: 'Criadores BR', price: 'R$ 37/mês' },
]

export default function IdeaDeck() {
  const [active, setActive] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let id: ReturnType<typeof setInterval>
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          id = setInterval(() => setActive(a => (a + 1) % IDEAS.length), 3200)
        } else {
          clearInterval(id)
        }
      },
      { threshold: 0.2 }
    )
    if (wrapRef.current) io.observe(wrapRef.current)
    return () => { clearInterval(id); io.disconnect() }
  }, [])

  return (
    <div ref={wrapRef} className="idea-deck" aria-label="Exemplos de ideias do acervo">
      {IDEAS.map((idea, i) => {
        const offset = (i - active + IDEAS.length) % IDEAS.length
        return (
          <div
            key={i}
            className={`idea-card${offset === 0 ? ' active' : ''}`}
            style={{
              '--offset': offset,
              pointerEvents: offset > 2 ? 'none' : 'auto',
            } as CSSProperties}
            onClick={() => setActive(i)}
          >
            <div className="idea-card__tag">{idea.tag}</div>
            <h4>{idea.title}</h4>
            <div className="idea-card__meta">
              <span>{idea.market}</span>
              <span className="idea-card__price">{idea.price}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
