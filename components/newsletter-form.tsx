'use client'

import { useState } from 'react'

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
    setTimeout(() => { setStatus('idle'); setEmail('') }, 1600)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="email"
          placeholder="seu@email.com"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={status !== 'idle'}
        />
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'done' ? '✓ Recebido' : status === 'sending' ? 'Enviando…' : <>Me avisar <span className="arr">→</span></>}
        </button>
      </div>
    </form>
  )
}
