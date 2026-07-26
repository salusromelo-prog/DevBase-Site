'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

/* ================================================================
   /sobre — "foco que se desloca"

   Uma composição contínua controlada por scroll: o palco fica fixo
   (sticky) e o progresso de 0→1 dentro do trecho alto do container
   decide qual frase está em foco e o quanto a aurora de fundo já
   cresceu. Um único IntersectionObserver liga/desliga um único loop
   de rAF — nada de listeners por elemento, nada de lib nova.

   M0–M5 vivem aqui, centralizados, entrando/saindo desfocados. M6
   (a bifurcação) também mora aqui — mas sem saída: ela assenta e
   fica, porque logo abaixo, fora do sticky, a seção .sobre-split
   (estática, sempre clicável) continua exatamente de onde ela parou.
   ================================================================ */

type BeatKind = 'line' | 'person' | 'value' | 'split'

interface BeatDef {
  id: string
  kind: BeatKind
  start: number
  end: number
  noExit?: boolean
  offsetY?: number
  text: string
  sub?: string
  href?: string
  linkLabel?: string
  side?: 'l' | 'r'
}

/* limites 0..1 de cada momento — larguras pensadas pro conteúdo:
   M4/M5 ganham mais faixa porque carregam 3 batidas cada. */
function bounds(weights: number[]): [number, number][] {
  const out: [number, number][] = []
  let acc = 0
  for (const w of weights) {
    out.push([acc, acc + w])
    acc += w
  }
  return out
}
function thirds([start, end]: [number, number]): [number, number][] {
  const w = (end - start) / 3
  return [
    [start, start + w],
    [start + w, start + 2 * w],
    [start + 2 * w, end],
  ]
}

const [m0, m1, m2, m3, m4, m5, m6] = bounds([0.12, 0.12, 0.14, 0.12, 0.17, 0.17, 0.16])
const [m4a, m4b, m4c] = thirds(m4)
const [m5a, m5b, m5c] = thirds(m5)

/* datas e ordem reais — mesmos marcos já levantados em data/gitlog.ts:
   fundação mai/2025, DevBase Boilerplate primeiro, depois Components
   e o pacote Micro SaaS, depois a virada pra /empresas em jul/2026. */
const BEATS: BeatDef[] = [
  {
    id: 'm0',
    kind: 'line',
    start: m0[0],
    end: m0[1],
    text: 'Maio de 2025. Três pessoas decidem que Goiânia também constrói software.',
  },
  {
    id: 'm1',
    kind: 'line',
    start: m1[0],
    end: m1[1],
    text: 'DevBase Boilerplate entra no ar. A internet brasileira ganha uma ferramenta a mais.',
  },
  {
    id: 'm2',
    kind: 'line',
    start: m2[0],
    end: m2[1],
    text: 'DevBase Components e o pacote 100 Micro SaaS, na sequência. Cada lançamento, uma promessa cumprida.',
  },
  {
    id: 'm3',
    kind: 'line',
    start: m3[0],
    end: m3[1],
    text: 'Depois, a pergunta: por que só devs? A DevBase passa a construir também para quem empreende.',
  },
  { id: 'm4a', kind: 'person', start: m4a[0], end: m4a[1], text: 'Samuel', sub: 'founder · produto e dev', offsetY: -22 },
  { id: 'm4b', kind: 'person', start: m4b[0], end: m4b[1], text: 'Isaque', sub: 'co-founder · marketing', offsetY: 0 },
  { id: 'm4c', kind: 'person', start: m4c[0], end: m4c[1], text: 'Daniel', sub: 'co-founder · marketing', offsetY: 22 },
  { id: 'm5a', kind: 'value', start: m5a[0], end: m5a[1], text: 'Transparência acima de tudo.' },
  { id: 'm5b', kind: 'value', start: m5b[0], end: m5b[1], text: 'Português primeiro.' },
  { id: 'm5c', kind: 'value', start: m5c[0], end: m5c[1], text: 'Real antes de escala.' },
  {
    id: 'm6l',
    kind: 'split',
    start: m6[0],
    end: m6[1],
    noExit: true,
    side: 'l',
    text: 'Constrói produtos?',
    href: '/produtos',
    linkLabel: 'Ver o catálogo',
  },
  {
    id: 'm6r',
    kind: 'split',
    start: m6[0],
    end: m6[1],
    noExit: true,
    side: 'r',
    text: 'Tem uma empresa?',
    href: '/empresas',
    linkLabel: 'Conhecer as soluções',
  },
]

const TRACK_VH = 820 // comprimento total do trecho scroll-driven

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function focusPhase(t: number, maxBlur: number, noExit?: boolean) {
  const ENTRY = 0.25
  if (t <= 0) return { blur: maxBlur, scale: 1.08, opacity: 0 }
  if (t < ENTRY) {
    const e = easeOutCubic(t / ENTRY)
    return { blur: maxBlur * (1 - e), scale: 1.08 - 0.08 * e, opacity: e }
  }
  if (noExit || t < 0.75) return { blur: 0, scale: 1, opacity: 1 }
  if (t >= 1) return { blur: maxBlur, scale: 0.94, opacity: 0 }
  const x = easeOutCubic((t - 0.75) / 0.25)
  return { blur: maxBlur * x, scale: 1 - 0.06 * x, opacity: 1 - x }
}

export default function SobreFocusScroll() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqMobile = window.matchMedia('(max-width: 760px)')
    setReducedMotion(mqMotion.matches)
    setMobile(mqMobile.matches)
    const onMotion = () => setReducedMotion(mqMotion.matches)
    const onMobile = () => setMobile(mqMobile.matches)
    mqMotion.addEventListener('change', onMotion)
    mqMobile.addEventListener('change', onMobile)
    return () => {
      mqMotion.removeEventListener('change', onMotion)
      mqMobile.removeEventListener('change', onMobile)
    }
  }, [])

  if (reducedMotion) return <SobreStatic />
  return <SobreScrollDriven mobile={mobile} />
}

function SobreScrollDriven({ mobile }: { mobile: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<HTMLDivElement>(null)
  const beatEls = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const track = trackRef.current
    const aurora = auroraRef.current
    const split = splitRef.current
    if (!track || !aurora || !split) return

    const maxBlur = mobile ? 12 : 16
    let raf = 0

    const apply = () => {
      const rect = track.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0

      BEATS.forEach((b, i) => {
        const el = beatEls.current[i]
        if (!el) return
        const span = b.end - b.start
        const t = span > 0 ? clamp((p - b.start) / span, 0, 1) : p >= b.start ? 1 : 0
        const { blur, scale, opacity } = focusPhase(t, maxBlur, b.noExit)
        el.style.opacity = String(opacity)
        el.style.filter = `blur(${blur}px)`
        el.style.transform = `translateY(${b.offsetY ?? 0}px) scale(${scale})`
        el.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none'
      })

      // aurora reativa: cresce e ganha a 2ª cor até o fim de M3, pulsa em M4/M5, e cede lugar à bifurcação em M6
      const growT = clamp(p / m3[1], 0, 1)
      const r = lerp(150, 500, easeOutCubic(growT))
      const violetT = clamp((p - m1[0]) / (m3[1] - m1[0]), 0, 1)
      let op = lerp(0.16, 0.55, growT)
      if (p >= m4[0] && p < m6[0]) {
        const cyclePos = ((p - m4[0]) / (m6[0] - m4[0])) * 6
        const withinBeat = cyclePos - Math.floor(cyclePos)
        op += Math.max(0, 1 - withinBeat * 5) * 0.12
      }
      const splitT = clamp((p - m6[0]) / (m6[1] - m6[0]), 0, 1)
      op = clamp(op * (1 - splitT * 0.7), 0, 0.7)

      aurora.style.setProperty('--fx-r', `${r}px`)
      aurora.style.setProperty('--fx-op', String(op))
      aurora.style.setProperty('--fx-violet', String(violetT))
      split.style.setProperty('--fx-split', String(splitT))

      raf = requestAnimationFrame(apply)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(apply)
        } else {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 }
    )
    io.observe(track)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [mobile])

  return (
    <div className="focus-track" ref={trackRef} style={{ height: `${TRACK_VH}vh` }}>
      <div className="focus-stage">
        <div className="focus-aurora" ref={auroraRef} aria-hidden="true">
          <span className="focus-glow focus-glow-1" />
          <span className="focus-glow focus-glow-2" />
        </div>
        <div className="focus-split-bg" ref={splitRef} aria-hidden="true" />

        <div className="focus-text-layer">
          {BEATS.map((b, i) =>
            b.kind === 'split' ? null : (
              <div
                key={b.id}
                ref={el => {
                  beatEls.current[i] = el
                }}
                className={`focus-beat focus-beat--${b.kind}`}
              >
                <p className="focus-beat-text">{b.text}</p>
                {b.sub && <p className="focus-beat-sub">{b.sub}</p>}
              </div>
            )
          )}
        </div>

        <div className="focus-m6">
          {BEATS.map((b, i) =>
            b.kind !== 'split' ? null : (
              <Link
                key={b.id}
                href={b.href!}
                ref={el => {
                  beatEls.current[i] = el
                }}
                className={`focus-m6-half focus-m6-half--${b.side}`}
              >
                <span className="focus-m6-q">{b.text}</span>
                <span className="focus-m6-link">
                  {b.linkLabel} <span className="split-arr">→</span>
                </span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}

/* prefers-reduced-motion: nada de sticky/rAF — seções empilhadas,
   textos nítidos, aurora já no tamanho final. M6 não é repetido aqui:
   a seção .sobre-split (estática, logo depois) já cumpre esse papel. */
function SobreStatic() {
  const storyBeats = BEATS.filter(b => b.kind !== 'split')
  return (
    <div className="focus-static">
      <div className="focus-static-aurora" aria-hidden="true">
        <span className="focus-glow focus-glow-1" />
        <span className="focus-glow focus-glow-2" />
      </div>
      {storyBeats.map(b => (
        <section key={b.id} className={`focus-static-m focus-beat--${b.kind}`}>
          <p className="focus-beat-text">{b.text}</p>
          {b.sub && <p className="focus-beat-sub">{b.sub}</p>}
        </section>
      ))}
    </div>
  )
}
