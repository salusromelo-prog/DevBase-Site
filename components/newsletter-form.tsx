'use client'

import { useState } from 'react'
import SectionLabel from './section-label'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'sending') return
    setStatus('sending')
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // silent
    }
    setStatus('done')
    setTimeout(() => {
      setStatus('idle')
      setEmail('')
    }, 1600)
  }

  return (
    <div className="newsletter">
      <SectionLabel>// fique por dentro</SectionLabel>
      <h2>Novos produtos em breve.</h2>
      <p>Deixa seu e-mail e avisamos quando lançarmos algo novo. Sem spam.</p>
      <form className="inline-input" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="seu@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status !== 'idle'}
        />
        <button type="submit" disabled={status === 'sending'}>
          {status === 'done' ? '✓ Recebido' : status === 'sending' ? 'Enviando…' : <>Me avisar <span className="arrow">→</span></>}
        </button>
      </form>
    </div>
  )
}
