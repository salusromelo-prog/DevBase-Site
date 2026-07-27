'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { motion } from 'framer-motion'

export type ScrollExpandMediaProps = {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  posterSrc?: string
  /** opcional: sem ela o fundo é o gradiente escuro da marca (.seh-bg) */
  bgImageSrc?: string
  title?: string
  date?: string
  scrollToExpand?: string
  /** mix-blend-difference no título; falso quando o fundo já é colorido */
  textBlend?: boolean
  children?: ReactNode
}

/* ── calibragem ──────────────────────────────────────────────────── */
/* ganho da roda — valor do componente original */
const WHEEL_GAIN = 0.0009
/* passo por tecla (ArrowDown/PageDown/Space) */
const KEY_STEP = 0.18
/* trilho do toque: fração de viewport que o dedo percorre até a
   expansão fechar. O .seh-track ganha essa altura a mais e o palco fica
   sticky dentro dele — é isso que segura a mídia na tela SEM precisar
   de preventDefault. */
const TOUCH_TRACK = 0.85
/* histerese do children, como no original: liga em 1, desliga abaixo de
   0.75 — assim ele não pisca perto do fim do curso */
const CONTENT_OFF = 0.75
/* geometria da mídia, do componente original (o clamp final é do CSS) */
const W0 = 300, H0 = 400
const WGROW = { narrow: 650, wide: 1250 }
const HGROW = { narrow: 200, wide: 400 }
const SHIFT = { narrow: 180, wide: 150 } /* afastamento do título, em vw */
/* ────────────────────────────────────────────────────────────────── */

/* Como a expansão é dirigida:
   · 'wheel'  — desktop de ponteiro fino. A roda é interceptada e a
                página fica presa no topo até a mídia abrir. É o
                comportamento original do componente.
   · 'touch'  — dedo. NADA é interceptado: o progresso sai da posição de
                scroll nativa e o palco sticky segura a mídia. A rolagem
                continua sendo a do sistema, sem travamento.
   · 'static' — prefers-reduced-motion. Mídia já aberta, children já
                visível, nenhum listener.
   'idle' é só o primeiro render, antes de medir o ambiente, pra que
   servidor e cliente pintem o mesmo frame. */
type Mode = 'idle' | 'wheel' | 'touch' | 'static'

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/* useLayoutEffect avisa no console quando roda no servidor */
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  children,
}: ScrollExpandMediaProps) {
  const [mode, setMode] = useState<Mode>('idle')
  const [expanded, setExpanded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const bgRef = useRef<HTMLDivElement>(null)
  const bloomRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLSpanElement>(null)
  const tailRef = useRef<HTMLSpanElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const cueRef = useRef<HTMLParagraphElement>(null)

  const progressRef = useRef(0)
  const expandedRef = useRef(false)
  const contentRef = useRef(false)
  const narrowRef = useRef(false)
  const staticRef = useRef(false)
  const raf = useRef(0)

  /* O progresso é escrito direto no DOM, não no state: um render do
     React por evento de roda derrubava o FPS pela metade sob CPU 4x
     (a subárvore inteira, children incluído, reconciliava a cada
     frame). O state guarda só as duas transições discretas — abriu,
     mostrou o children — que acontecem uma vez cada. */
  const paint = useCallback((v: number) => {
    const k = narrowRef.current ? 'narrow' : 'wide'
    const media = mediaRef.current
    if (media) {
      media.style.width = `${W0 + v * WGROW[k]}px`
      media.style.height = `${H0 + v * HGROW[k]}px`
    }
    if (bgRef.current) bgRef.current.style.opacity = String(1 - v)
    if (veilRef.current) veilRef.current.style.opacity = String(0.7 - v * 0.3)

    /* o halo que a mídia joga no escuro. Só transform e opacity — as
       duas propriedades que o compositor resolve sozinho — pra ele
       poder crescer todo frame sem custar layout. */
    if (bloomRef.current) {
      bloomRef.current.style.transform = `translate(-50%, -50%) scale(${0.62 + v * 1.05})`
      bloomRef.current.style.opacity = String(0.5 + v * 0.42)
    }

    /* em reduced-motion o progresso já nasce em 1: aplicar o
       afastamento jogaria o h1 pra fora da tela e a página ficaria
       sem título visível. */
    const shift = staticRef.current ? 0 : v * SHIFT[k]
    if (headRef.current) headRef.current.style.transform = `translateX(${-shift}vw)`
    if (tailRef.current) tailRef.current.style.transform = `translateX(${shift}vw)`
    if (dateRef.current) dateRef.current.style.transform = `translateX(${-shift}vw)`
    if (cueRef.current) {
      cueRef.current.style.transform = `translateX(${shift}vw)`
      cueRef.current.style.opacity = String(1 - v)
    }
  }, [])

  const commit = useCallback(
    (raw: number) => {
      const next = clamp01(raw)
      if (next === progressRef.current) return
      progressRef.current = next
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = 0
        const v = progressRef.current
        paint(v)

        const full = v >= 1
        if (full !== expandedRef.current) {
          expandedRef.current = full
          setExpanded(full)
        }
        const on = v >= 1 ? true : v < CONTENT_OFF ? false : contentRef.current
        if (on !== contentRef.current) {
          contentRef.current = on
          setShowContent(on)
        }
      })
    },
    [paint]
  )

  /* o React só pinta o quadro de v = 0 (o mesmo do servidor); qualquer
     render posterior desfaria o que o paint escreveu, então repintamos
     antes de o browser desenhar. Sem lista de dependências de
     propósito: vale pra TODO render, venha ele de onde vier. */
  useIsoLayoutEffect(() => {
    paint(staticRef.current ? 1 : progressRef.current)
  })

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  /* qual das três mecânicas usar.
     Desktop exige ponteiro fino E largura: um tablet tem largura de
     desktop mas não tem roda — cair no modo 'wheel' ali prenderia a
     página no topo pra sempre, já que nada faria o progresso andar. */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const wide = window.matchMedia('(min-width: 768px)')

    const pick = () => {
      const next: Mode = reduce.matches
        ? 'static'
        : fine.matches && wide.matches
          ? 'wheel'
          : 'touch'
      staticRef.current = next === 'static'
      narrowRef.current = !wide.matches
      if (next === 'static') {
        progressRef.current = 1
        expandedRef.current = true
        contentRef.current = true
        setExpanded(true)
        setShowContent(true)
      }
      paint(staticRef.current ? 1 : progressRef.current)
      setMode(next)
    }
    pick()

    const mqs = [reduce, fine, wide]
    mqs.forEach(m => m.addEventListener('change', pick))
    return () => mqs.forEach(m => m.removeEventListener('change', pick))
  }, [paint])

  /* ── desktop: roda intercepta, página travada até abrir ────────── */
  useEffect(() => {
    if (mode !== 'wheel') return

    const onWheel = (e: WheelEvent) => {
      if (expandedRef.current) {
        /* já aberto: só volta a recolher se o usuário insistir pra cima
           com a página no topo */
        if (e.deltaY < 0 && window.scrollY <= 5) {
          e.preventDefault()
          commit(progressRef.current + e.deltaY * WHEEL_GAIN)
        }
        return
      }
      e.preventDefault()
      commit(progressRef.current + e.deltaY * WHEEL_GAIN)
    }

    /* sem isto o lock abaixo prenderia quem navega por teclado: a roda
       é o único jeito de avançar, e PageDown não gera evento de wheel */
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' '
      const up = e.key === 'ArrowUp' || e.key === 'PageUp'
      if (!down && !up) return
      if (expandedRef.current && !(up && window.scrollY <= 5)) return
      e.preventDefault()
      commit(progressRef.current + (down ? KEY_STEP : -KEY_STEP))
    }

    /* o lock em si: barra de rolagem, âncoras e a restauração de scroll
       do browser também tentam sair do topo antes da hora */
    const onScroll = () => {
      if (!expandedRef.current && window.scrollY > 0) window.scrollTo(0, 0)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [mode, commit])

  /* ── toque: scroll nativo, listener passivo, zero preventDefault ── */
  useEffect(() => {
    if (mode !== 'touch') return
    const read = () => commit(window.scrollY / (window.innerHeight * TOUCH_TRACK))
    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [mode, commit])

  const words = title ? title.trim().split(/\s+/) : []
  const head = words[0] ?? ''
  const tail = words.slice(1).join(' ')

  return (
    <section className="seh" data-mode={mode} data-expanded={expanded ? '' : undefined}>
      <div
        className="seh-track"
        style={
          mode === 'touch'
            ? { height: `calc(100dvh + ${TOUCH_TRACK * 100}dvh)` }
            : undefined
        }
      >
        <div className="seh-stage">
          {/* o fundo, que some conforme a mídia toma a tela */}
          <div
            ref={bgRef}
            className="seh-bg"
            style={bgImageSrc ? { backgroundImage: `url(${bgImageSrc})` } : undefined}
            aria-hidden="true"
          />

          {/* o halo, atrás da mídia: é ele que faz o cartão parecer uma
              fonte de luz no escuro em vez de um retângulo parado */}
          <div ref={bloomRef} className="seh-bloom" aria-hidden="true">
            <span className="seh-bloom__i" />
          </div>

          {/* a mídia que cresce */}
          <div ref={mediaRef} className="seh-media" style={{ width: W0, height: H0 }}>
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                tabIndex={-1}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mediaSrc} alt={title ?? ''} />
            )}
            {/* véu: clareia junto com a mídia, pra ela ganhar presença */}
            <div ref={veilRef} className="seh-veil" style={{ opacity: 0.7 }} aria-hidden="true" />
          </div>

          {/* as duas metades do título abrem pros lados e dão passagem
              pra mídia que cresce entre elas */}
          <div className={`seh-copy${textBlend ? ' seh-copy--blend' : ''}`}>
            <h1 className="seh-title">
              <span ref={headRef} className="seh-title__a">{head}</span>
              {tail && <span ref={tailRef} className="seh-title__b">{tail}</span>}
            </h1>

            {date && <p ref={dateRef} className="seh-date">{date}</p>}
            {scrollToExpand && mode !== 'static' && (
              <p ref={cueRef} className="seh-cue">
                <span className="seh-cue__ln" aria-hidden="true" />
                {scrollToExpand}
              </p>
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="seh-content"
        initial={false}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 14 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        aria-hidden={showContent ? undefined : true}
      >
        {children}
      </motion.div>
    </section>
  )
}
