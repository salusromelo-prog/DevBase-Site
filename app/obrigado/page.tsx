'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Reveal from '@/components/reveal'

type Produto = 'boilerplate' | 'kit-componentes' | 'combo'

interface ProdutoConfig {
  subtitulo: string
  texto: string
  botaoLabel: string
  botaoHref: string
  instrucoes?: string[]
}

const PRODUTOS: Record<Produto, ProdutoConfig> = {
  boilerplate: {
    subtitulo: 'Seu DevBase Boilerplate está pronto.',
    texto: 'Clique no botão abaixo para baixar o ZIP com todo o código, documentação e instruções de setup.',
    botaoLabel: 'Baixar Boilerplate →',
    botaoHref: 'https://drive.google.com/uc?export=download&id=18JQJQJHe3nMjAwnpq4Chny2jJmR5S7wd',
    instrucoes: [
      "Clique em 'Baixar Boilerplate' acima — o download começa automaticamente",
      'Extraia o arquivo ZIP em uma pasta do seu projeto',
      'Copie o arquivo .env.example para .env.local e preencha suas chaves',
      'Rode npm install e depois npm run dev',
      'Acesse http://localhost:3000 — seu SaaS está no ar',
      'Personalize à vontade — o código é todo seu',
    ],
  },
  'kit-componentes': {
    subtitulo: 'Seu Kit de Componentes BR está pronto.',
    texto: 'Clique no botão abaixo para baixar o ZIP com todos os componentes e documentação.',
    botaoLabel: 'Baixar Kit →',
    botaoHref: 'https://drive.google.com/file/d/1YzibsQeuNNA_-NfDN56viJRf71XSBDQ_/view?usp=sharing',
    instrucoes: [
      "Clique em 'Baixar Kit' acima — o download começa automaticamente",
      "Copie a pasta kit-componentes-br para dentro do seu projeto Next.js",
      "Rode npm install para instalar as dependências do seu projeto",
      "Para usar o PixButton, instale também: npm install qrcode.react",
      "Importe os componentes direto de kit-componentes-br — sem configuração extra",
    ],
  },
  combo: {
    subtitulo: 'Seu combo Boilerplate + Components está pronto.',
    texto: 'Clique nos botões abaixo para baixar os dois ZIPs — o Boilerplate e o Kit de Componentes BR.',
    botaoLabel: 'Baixar Boilerplate →',
    botaoHref: 'https://drive.google.com/uc?export=download&id=18JQJQJHe3nMjAwnpq4Chny2jJmR5S7wd',
    instrucoes: [
      "Baixe os dois arquivos acima",
      "Extraia cada ZIP em sua respectiva pasta",
      "Copie o .env.example do Boilerplate para .env.local e preencha suas chaves",
      "Rode npm install e depois npm run dev no Boilerplate",
      "Copie a pasta kit-componentes-br para dentro do seu projeto",
      "Acesse http://localhost:3000 — seu SaaS está no ar com os componentes prontos",
    ],
  },
}

function CheckIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
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
  const searchParams = useSearchParams()
  const produto = searchParams.get('produto') as Produto | null
  const config = produto ? (PRODUTOS[produto] ?? null) : null
  const emailSent = useRef(false)

  useEffect(() => {
    const email = searchParams.get('customer_email')
    if (!email || !produto || emailSent.current) return
    emailSent.current = true
    fetch('/api/send-purchase-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, produto }),
    }).catch(() => {})
  }, [searchParams, produto])

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Glow verde de fundo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)',
            filter: 'blur(24px)',
          }}
        />
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 460 }}>

        {/* Check icon */}
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <CheckIcon />
          </div>
        </Reveal>

        {/* Título */}
        <Reveal delay={80}>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 38px)',
              fontWeight: 700,
              letterSpacing: '-1.2px',
              lineHeight: 1.1,
              margin: 0,
              color: 'var(--text)',
            }}
          >
            Compra confirmada!
          </h1>
        </Reveal>

        {/* Subtítulo */}
        <Reveal delay={140}>
          <p
            style={{
              marginTop: 12,
              fontSize: 16,
              color: 'var(--text-2)',
              lineHeight: 1.6,
            }}
          >
            {config ? config.subtitulo : 'Obrigado pela sua compra!'}
          </p>
        </Reveal>

        {/* Card */}
        <Reveal delay={200}>
          <div
            style={{
              marginTop: 32,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '28px 24px',
              textAlign: 'left',
            }}
          >
            <span className="section-label" style={{ marginBottom: 12 }}>
              // próximo passo
            </span>

            <p
              style={{
                margin: '12px 0 0',
                fontSize: 14,
                color: 'var(--text-2)',
                lineHeight: 1.7,
              }}
            >
              {config
                ? config.texto
                : 'Em breve você receberá as instruções de acesso no seu email.'}
            </p>

            {config && (
              <>
                <a
                  href={config.botaoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
                >
                  <DownloadIcon />
                  {config.botaoLabel}
                </a>

                {produto === 'combo' && (
                  <a
                    href="https://drive.google.com/file/d/1YzibsQeuNNA_-NfDN56viJRf71XSBDQ_/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}
                  >
                    <DownloadIcon />
                    Baixar Components →
                  </a>
                )}

                {config.instrucoes && (
                  <div style={{ marginTop: 24 }}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--mono)',
                        fontSize: 11,
                        letterSpacing: '0.1em',
                        color: '#6366f1',
                        marginBottom: 12,
                      }}
                    >
                      // como começar
                    </span>
                    <ol style={{ margin: 0, padding: '0 0 0 18px' }}>
                      {config.instrucoes.map((step, i) => (
                        <li
                          key={i}
                          style={{
                            fontFamily: 'var(--mono)',
                            fontSize: 12,
                            color: '#a1a1aa',
                            lineHeight: 1.7,
                            marginBottom: i < config.instrucoes!.length - 1 ? 6 : 0,
                          }}
                        >
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <p
                  style={{
                    marginTop: 14,
                    fontSize: 12,
                    color: 'var(--text-3)',
                    textAlign: 'center',
                    lineHeight: 1.6,
                  }}
                >
                  Dúvidas? Entre em contato:{' '}
                  <a
                    href="mailto:contato@devbase.tools"
                    style={{
                      color: 'var(--text-2)',
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                      transition: 'color .15s ease',
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
                  >
                    contato@devbase.tools
                  </a>
                </p>
              </>
            )}
          </div>
        </Reveal>

        {/* Rodapé */}
        <Reveal delay={280}>
          <div style={{ marginTop: 36 }}>
            <Link
              href="https://devbase.tools"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: 'var(--text-3)',
                transition: 'color .15s ease',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-3)')}
            >
              Voltar para devbase.tools
            </Link>
          </div>
        </Reveal>

      </div>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M7.5 1v9m0 0L4 6.5M7.5 10l3.5-3.5M2 13h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ObrigadoPage() {
  return (
    <Suspense>
      <ObrigadoContent />
    </Suspense>
  )
}