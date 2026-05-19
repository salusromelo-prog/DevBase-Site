'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import Reveal from '@/components/reveal'

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="23" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="23" fill="rgba(34,197,94,0.07)" />
      <path
        d="M14 24.5l7 7 13-14"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.5))' }}
      />
    </svg>
  )
}

function ObrigadoContent() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 160px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* Glow verde */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }} />
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 460 }}>

        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <CheckIcon />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 38px)',
            fontWeight: 700,
            letterSpacing: '-1.2px',
            lineHeight: 1.1,
            margin: 0,
            color: 'var(--text)',
          }}>
            Compra confirmada! 🎉
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p style={{ marginTop: 12, fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6 }}>
            Enviamos o link de acesso para o email usado na compra.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div style={{
            marginTop: 32,
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '28px 24px',
            textAlign: 'left',
          }}>
            <span className="section-label" style={{ marginBottom: 12 }}>
              // próximo passo
            </span>

            <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>
              Verifique sua caixa de entrada e a pasta de spam. O email chega em instantes com o link para acessar seu conteúdo.
            </p>

            <Link
              href="/acesso/login"
              className="btn btn-primary"
              style={{ marginTop: 20, width: '100%', justifyContent: 'center', display: 'flex' }}
            >
              Acessar conteúdo →
            </Link>

            <Link
              href="/acesso/login"
              style={{
                display: 'block',
                marginTop: 12,
                textAlign: 'center',
                fontSize: 13,
                color: 'var(--text-3)',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              Não recebi o email
            </Link>

            <p style={{ marginTop: 20, fontSize: 12, color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6 }}>
              Dúvidas?{' '}
              <a
                href="mailto:devbasebr@gmail.com"
                style={{ color: 'var(--text-2)', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                devbasebr@gmail.com
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div style={{ marginTop: 36 }}>
            <Link
              href="/"
              style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-3)' }}
            >
              Voltar para devbase.tools
            </Link>
          </div>
        </Reveal>

      </div>
    </div>
  )
}

export default function ObrigadoPage() {
  return (
    <Suspense>
      <ObrigadoContent />
    </Suspense>
  )
}
