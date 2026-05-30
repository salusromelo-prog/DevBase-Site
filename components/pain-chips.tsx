'use client'

import { useState } from 'react'

const CHIPS = [
  'setup/boilerplate',
  'vagas sem salário',
  'só em inglês',
  'pagamentos BR',
  'docs ruins',
  'suporte ausente',
]

export default function PainChips() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [texto, setTexto] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  function toggle(chip: string) {
    setSelected(prev => {
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
        body: JSON.stringify({ tags: [...selected], texto, email: email || undefined }),
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
    <form onSubmit={handleSubmit}>
      <div className="chips">
        {CHIPS.map(chip => (
          <span
            key={chip}
            className={`chip${selected.has(chip) ? ' on' : ''}`}
            onClick={() => toggle(chip)}
            role="checkbox"
            aria-checked={selected.has(chip)}
            tabIndex={0}
            onKeyDown={e => e.key === ' ' && (e.preventDefault(), toggle(chip))}
          >
            {chip}
          </span>
        ))}
      </div>
      <textarea
        placeholder="Ou descreve com suas palavras..."
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />
      <div className="field">
        <input
          type="email"
          placeholder="seu@email.com (opcional)"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'done' ? '✓ Recebido' : status === 'sending' ? 'Enviando…' : <>Enviar <span className="arr">→</span></>}
        </button>
      </div>
    </form>
  )
}
