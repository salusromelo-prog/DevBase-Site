'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'sent' | 'not_found' | 'error'

export default function AcessoLoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/send-access-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.status === 404) {
        setStatus('not_found')
        return
      }

      if (!res.ok) {
        setStatus('error')
        return
      }

      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px 24px',
      backgroundImage: 'radial-gradient(ellipse 600px 400px at 50% 40%, rgba(99,102,241,0.07), transparent 70%)',
    }}>

      {/* Card */}
      <div style={{
        background: '#0f0f0f',
        border: '1px solid #1e1e1e',
        borderRadius: '14px',
        padding: '36px 32px',
        width: '100%',
        maxWidth: '400px',
      }}>

        {status === 'sent' ? (
          <SentState email={email} onReset={() => setStatus('idle')} />
        ) : (
          <>
            {/* Product badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#1a1a2e',
              border: '1px solid #2d2d5e',
              borderRadius: '20px',
              padding: '4px 12px',
              marginBottom: '16px',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                color: '#818cf8',
                letterSpacing: '0.2px',
              }}>
                DevBase Boilerplate
              </span>
            </div>

            {/* Header */}
            <p style={{
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              color: '#6366f1',
              letterSpacing: '0.4px',
              margin: '0 0 10px',
            }}>
              // acesso à plataforma
            </p>
            <h1 style={{
              margin: '0 0 8px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '-0.5px',
              color: '#ffffff',
            }}>
              Entrar na plataforma
            </h1>
            <p style={{
              margin: '0 0 24px',
              fontSize: '13px',
              color: '#6b7280',
              lineHeight: '1.6',
            }}>
              Digite o email usado na compra. Vamos enviar um link de acesso direto, sem senha.
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: '#1e1e1e', marginBottom: '20px' }} />

            {/* Included items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {[
                'Código-fonte completo do boilerplate',
                'Documentação e guias de setup',
                'Atualizações futuras incluídas',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#6366f1', fontSize: '12px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '12px', color: '#4b5563' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <label style={{
                display: 'block',
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#6b7280',
                marginBottom: '8px',
              }}>
                email da compra
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  background: '#141414',
                  border: '1px solid #1e1e1e',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  fontSize: '14px',
                  color: '#ffffff',
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box',
                  marginBottom: '12px',
                  transition: 'border-color .15s ease',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                onBlur={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
              />

              {status === 'not_found' && (
                <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#f87171', lineHeight: '1.5' }}>
                  Email não encontrado. Confirme o email usado na compra.
                </p>
              )}

              {status === 'error' && (
                <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#f87171' }}>
                  Erro ao enviar o email. Tente novamente.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !email}
                style={{
                  width: '100%',
                  background: '#6366f1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'inherit',
                  cursor: status === 'loading' || !email ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' || !email ? 0.5 : 1,
                  transition: 'opacity .15s ease, background .15s ease',
                }}
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar link de acesso'}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Footer note */}
      <p style={{
        marginTop: '20px',
        fontSize: '12px',
        color: '#374151',
        textAlign: 'center',
      }}>
        Problemas com o acesso?{' '}
        <a href="mailto:devbasebr@gmail.com" style={{ color: '#6366f1', textDecoration: 'none' }}>
          devbasebr@gmail.com
        </a>
      </p>

    </div>
  )
}

function SentState({ email, onReset }: { email: string; onReset: () => void }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(34,197,94,0.08)',
        border: '1px solid rgba(34,197,94,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div style={{
        background: 'rgba(34,197,94,0.05)',
        border: '1px solid rgba(34,197,94,0.15)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <p style={{ margin: '0 0 6px', fontWeight: '600', fontSize: '15px', color: '#ffffff' }}>
          Verifique seu email
        </p>
        <p style={{ margin: '0', fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>
          Enviamos um link de acesso para{' '}
          <span style={{ color: '#ffffff', fontFamily: 'var(--mono)', fontSize: '12px' }}>{email}</span>.
          <br />O link expira em 1 hora.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        style={{
          background: 'none',
          border: 'none',
          color: '#6b7280',
          fontSize: '13px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          padding: '4px',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        }}
      >
        Tente novamente com outro email
      </button>
    </div>
  )
}
