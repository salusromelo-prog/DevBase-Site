'use client'

import { useState } from 'react'

const CHIPS = [
  'Perco horas em setup/boilerplate',
  'Vagas sem salário visível',
  'Ferramentas só em inglês',
  'Pagamentos BR complicados',
  'Documentação ruim ou em inglês',
  'Suporte que não responde',
]

export default function PainChips() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [texto, setTexto] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  function toggle(chip: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(chip)) next.delete(chip)
      else next.add(chip)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      await fetch('/api/sugestao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chips: [...selected], texto, email: email || undefined }),
      })
    } catch {
      // silent
    }
    setStatus('done')
    setTimeout(() => {
      setStatus('idle')
      setSelected(new Set())
      setTexto('')
      setEmail('')
    }, 1600)
  }

  return (
    <div className="pain-card">
      <form onSubmit={handleSubmit}>
        <div className="chip-grid">
          {CHIPS.map((chip) => (
            <div
              key={chip}
              className={`chip${selected.has(chip) ? ' on' : ''}`}
              onClick={() => toggle(chip)}
              role="checkbox"
              aria-checked={selected.has(chip)}
              tabIndex={0}
              onKeyDown={(e) => e.key === ' ' && (e.preventDefault(), toggle(chip))}
            >
              <span className="tick" aria-hidden="true" />
              {chip}
            </div>
          ))}
        </div>
        <textarea
          placeholder="Ou descreve com suas palavras..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div className="field-row">
          <input
            type="email"
            placeholder="seu e-mail (opcional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'done' ? '✓ Recebido' : status === 'sending' ? 'Enviando…' : <>Enviar sugestão <span className="arrow">→</span></>}
          </button>
        </div>
      </form>
    </div>
  )
}
