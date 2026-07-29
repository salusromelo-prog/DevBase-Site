'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

/* O caminho: a mesma ideia do resto do site — o scroll é o motor.
   Uma linha é desenhada conforme a seção sobe e as estações acendem
   quando a frente da linha passa por elas.

   Tudo se resolve com uma variável só (--p, 0→1): a linha é um scaleX,
   a cabeça é um left em %, e o acender de cada estação é um clamp em
   cima da distância entre --p e o limiar dela. Nenhum estilo é escrito
   por elemento a cada frame, só a var no nó raiz.

   O valor de repouso de --p é 1 (tudo aceso): sem JS, sem rAF ou com
   prefers-reduced-motion, o leitor recebe o diagrama pronto. */

type Estacao = {
  /* fração do curso em que a estação acende */
  t: number
  fase: string
  titulo: string
  texto: string
  produto?: { nome: string; href: string; accent: string }
}

const ESTACOES: Estacao[] = [
  {
    t: 0.02,
    fase: 'sexta de noite',
    titulo: 'Você não sabe o que construir.',
    texto: 'O editor abre, a pasta é criada, e a pergunta trava tudo antes da primeira linha.',
    produto: { nome: '100 Micro SaaS', href: '#micro-saas', accent: '#2dd4bf' },
  },
  {
    t: 0.3,
    fase: 'semana 1',
    titulo: 'Sabe o quê. Falta a base.',
    texto: 'Auth, banco, webhook de pagamento, e-mail, deploy. Duas semanas antes da primeira tela sua.',
    produto: { nome: 'Boilerplate', href: '#boilerplate', accent: '#818cf8' },
  },
  {
    t: 0.56,
    fase: 'antes de cobrar',
    titulo: 'Falta o que é do Brasil.',
    texto: 'CPF que valida de verdade, CEP que preenche, PIX que gera QR Code. O detalhe que decide o checkout.',
    produto: { nome: 'Components', href: '#components', accent: '#a78bfa' },
  },
  {
    t: 0.82,
    fase: 'no ar',
    titulo: 'Seu produto recebendo o primeiro pagamento.',
    texto: 'É o único lugar onde a base para de importar — e o que você construiu em cima começa.',
  },
]

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export default function ProductPath() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let vivo = false

    const frame = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight

      /* começa quando o topo do bloco cruza 82% da tela e fecha quando a
         base cruza 62% — sobra caminho depois da última estação acender,
         senão o traço termina fora do campo de visão */
      const inicio = vh * 0.82
      const curso = r.height + inicio - vh * 0.62
      const p = clamp01((inicio - r.top) / Math.max(1, curso))
      el.style.setProperty('--p', p.toFixed(4))
    }

    const agenda = () => {
      if (!raf && vivo) raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(
      ([e]) => {
        vivo = e.isIntersecting
        if (vivo) agenda()
      },
      { threshold: 0 },
    )
    io.observe(el)

    window.addEventListener('scroll', agenda, { passive: true })
    window.addEventListener('resize', agenda)
    /* primeira medida imediata: quem chega com a seção já na tela
       (link com âncora, reload no meio da página) não vê o estado cheio */
    vivo = true
    frame()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', agenda)
      window.removeEventListener('resize', agenda)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="cpath">
      <div className="cpath-track" aria-hidden="true">
        <span className="cpath-line" />
        <span className="cpath-head" />
      </div>

      <ol className="cpath-list">
        {ESTACOES.map((e) => (
          <li
            key={e.titulo}
            className="cpath-st"
            style={{ '--t': e.t, '--ac': e.produto?.accent ?? '#f4f3fb' } as CSSProperties}
          >
            <span className="cpath-dot" aria-hidden="true" />
            <span className="cpath-fase">{e.fase}</span>
            <h3>{e.titulo}</h3>
            <p>{e.texto}</p>
            {e.produto ? (
              <a href={e.produto.href} className="cpath-prod">
                <span className="cpath-prod__d" aria-hidden="true" />
                {e.produto.nome}
              </a>
            ) : (
              <span className="cpath-prod cpath-prod--fim">
                <span className="cpath-prod__d" aria-hidden="true" />
                seu produto
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
