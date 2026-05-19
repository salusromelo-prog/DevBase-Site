'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Globe, ChevronDown, ChevronUp } from 'lucide-react'
import Logo from '@/components/logo'
import { ideias, automacoes, type Ideia, type Automacao } from './data'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const DIFICULDADE_STYLE: Record<string, { color: string; bg: string }> = {
  'Fácil':   { color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  'Médio':   { color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
  'Difícil': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
}

const POTENCIAL_STYLE: Record<string, { color: string; bg: string }> = {
  'Alto':  { color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  'Médio': { color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
}

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 8px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 500,
      color,
      background: bg,
      border: `1px solid ${color}30`,
      lineHeight: '18px',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}

function MercadoIcon({ mercado }: { mercado: Ideia['mercado'] }) {
  if (mercado === 'br') {
    return <span style={{ fontSize: '13px', lineHeight: 1 }}>🇧🇷</span>
  }
  if (mercado === 'global') {
    return <Globe size={13} style={{ color: '#6b7280', flexShrink: 0 }} />
  }
  return <span style={{ fontSize: '12px', lineHeight: 1 }}>🌎</span>
}

function IdeiaCard({ ideia }: { ideia: Ideia }) {
  const [open, setOpen] = useState(false)
  const dif = DIFICULDADE_STYLE[ideia.dificuldade]
  const pot = POTENCIAL_STYLE[ideia.potencial]

  return (
    <div
      onClick={() => setOpen(v => !v)}
      style={{
        background: '#0f0f0f',
        border: `1px solid ${open ? '#6366f1' : '#1e1e1e'}`,
        borderRadius: '10px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6366f1', letterSpacing: '0.05em' }}>
            #{String(ideia.id).padStart(3, '0')}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
            {ideia.titulo}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, paddingTop: '14px' }}>
          <MercadoIcon mercado={ideia.mercado} />
          {open
            ? <ChevronUp size={13} style={{ color: '#6b7280' }} />
            : <ChevronDown size={13} style={{ color: '#6b7280' }} />
          }
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        <Badge label={ideia.dificuldade} color={dif.color} bg={dif.bg} />
        <Badge label={`Potencial ${ideia.potencial}`} color={pot.color} bg={pot.bg} />
      </div>

      {open && (
        <div
          onClick={e => e.stopPropagation()}
          style={{ borderTop: '1px solid #1e1e1e', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          {([
            ['Problema', ideia.problema],
            ['Público', ideia.publico],
            ['Monetização', ideia.monetizacao],
            ['Stack', ideia.stack],
            ['MVP', ideia.mvp],
          ] as [string, string][]).map(([label, value]) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6366f1', marginBottom: '2px', letterSpacing: '0.05em' }}>
                {label.toLowerCase()}
              </p>
              <p style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.55 }}>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AutomacaoCard({ auto }: { auto: Automacao }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      onClick={() => setOpen(v => !v)}
      style={{
        background: '#0f0f0f',
        border: `1px solid ${open ? '#6366f1' : '#1e1e1e'}`,
        borderRadius: '10px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6366f1', letterSpacing: '0.05em' }}>
            #{String(auto.id).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
            {auto.titulo}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, paddingTop: '14px' }}>
          <Badge label="Automação" color="#6366f1" bg="rgba(99,102,241,0.1)" />
          {open
            ? <ChevronUp size={13} style={{ color: '#6b7280' }} />
            : <ChevronDown size={13} style={{ color: '#6b7280' }} />
          }
        </div>
      </div>

      {open && (
        <div
          onClick={e => e.stopPropagation()}
          style={{ borderTop: '1px solid #1e1e1e', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {[
            { label: 'o que faz', value: auto.oQueFaz },
            { label: 'ferramentas', value: auto.ferramentas },
            { label: 'monetização', value: auto.monetizacao },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6366f1', marginBottom: '2px', letterSpacing: '0.05em' }}>
                {label}
              </p>
              <p style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.55 }}>{value}</p>
            </div>
          ))}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6366f1', marginBottom: '6px', letterSpacing: '0.05em' }}>
              fluxo
            </p>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {auto.fluxo.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6366f1', minWidth: '16px', paddingTop: '2px' }}>
                    {i + 1}.
                  </span>
                  <span style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.55 }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '40px 0 16px' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6366f1', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: '#1e1e1e' }} />
    </div>
  )
}

export default function MicroSaasPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'no-access' | 'ok'>('loading')

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/acesso/login'); return }

      const { data } = await supabase
        .from('acessos')
        .select('produto')
        .eq('email', session.user.email!)
        .single()

      if (!data) { router.replace('/acesso/login'); return }

      const produto = data.produto as string
      if (produto !== 'microsaas' && produto !== 'combo') {
        setStatus('no-access')
        return
      }

      setStatus('ok')
    }
    check()
  }, [router])

  if (status === 'loading') {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#6b7280' }}>verificando acesso...</p>
      </div>
    )
  }

  if (status === 'no-access') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{
          background: '#0f0f0f',
          border: '1px solid #1e1e1e',
          borderRadius: '14px',
          padding: '40px 32px',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6366f1', marginBottom: '12px' }}>
            // acesso negado
          </p>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
            Você não tem acesso a este produto
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
            Este conteúdo está disponível apenas para quem adquiriu o pacote{' '}
            <span style={{ color: '#6366f1' }}>Micro SaaS</span> ou o{' '}
            <span style={{ color: '#6366f1' }}>Combo</span>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', fontFamily: 'var(--font-inter)' }}>
      <style>{`
        .ms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 12px;
        }
        @media (max-width: 640px) {
          .ms-grid { grid-template-columns: 1fr; }
        }
        .ms-back-btn {
          background: #6366f1;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 13px;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.15s;
        }
        .ms-back-btn:hover { opacity: 0.85; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: '1px solid #1e1e1e',
        padding: '20px 32px',
        background: '#0a0a0a',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backdropFilter: 'blur(12px)',
        width: '100%',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          {/* Left: logo */}
          <Link href="/" aria-label="DevBase" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Logo size="md" />
          </Link>

          {/* Center: breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
            <span style={{ color: '#2a2a2a', fontSize: '16px' }}>/</span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#a1a1aa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              100 Micro SaaS + 25 Automações
            </span>
          </div>

          {/* Right: badges + back */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#6366f1',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '20px',
              padding: '3px 10px',
            }}>
              100 ideias
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#6b7280',
              background: 'rgba(107,114,128,0.1)',
              border: '1px solid rgba(107,114,128,0.2)',
              borderRadius: '20px',
              padding: '3px 10px',
            }}>
              25 automações
            </span>
            <Link href="/" className="ms-back-btn">← Voltar</Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px 80px' }}>
        {/* Hero */}
        <div style={{ padding: '48px 0 32px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6366f1', marginBottom: '10px' }}>
            // bem-vindo ao acervo
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '12px' }}>
            100 ideias de Micro SaaS
            <br />
            <span style={{ color: '#6366f1' }}>prontas para construir</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, maxWidth: '540px' }}>
            Cada ideia tem problema, público, monetização, stack e escopo de MVP. Clique em qualquer card para ver todos os detalhes.
          </p>
        </div>

        {/* Seção 1: Ideias */}
        <SectionDivider label="// 100 ideias de micro SaaS" />

        <div className="ms-grid">
          {ideias.map(ideia => <IdeiaCard key={ideia.id} ideia={ideia} />)}
        </div>

        {/* Seção 2: Automações */}
        <SectionDivider label="// 25 automações prontas" />

        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, maxWidth: '540px', marginBottom: '20px' }}>
          Automações com fluxo passo a passo, ferramentas recomendadas e modelo de monetização — para vender como serviço ou usar internamente.
        </p>

        <div className="ms-grid">
          {automacoes.map(auto => <AutomacaoCard key={auto.id} auto={auto} />)}
        </div>
      </div>
    </div>
  )
}
