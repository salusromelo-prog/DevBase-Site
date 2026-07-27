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
/* ganho da roda, por PIXEL de rolagem — não por unidade de deltaY.
   deltaY só vem em pixels quando deltaMode é 0; o Firefox manda linhas
   (deltaMode 1, ~3 por clique) e alguns modos de página mandam telas
   (deltaMode 2). Sem normalizar, o mesmo gesto rendia 100 aqui e 3 lá,
   e no Firefox o hero pedia ~370 cliques de roda pra abrir. */
const WHEEL_GAIN = 0.0009
/* teto do passo de UM evento, em px. Trackpad com inércia despeja
   centenas de pixels num evento só; sem teto isso vira um salto. Como
   o trackpad compensa em frequência (dezenas de eventos por gesto), o
   curso total continua o mesmo — só deixa de ser dado em degraus. */
const WHEEL_MAX_STEP = 150
/* passo por tecla (ArrowDown/PageDown/Space) */
const KEY_STEP = 0.18
/* constante de tempo da perseguição alvo→pintado, em segundos: quanto
   o valor pintado leva pra cobrir ~63% da distância que falta.

   0.11 na roda porque um clique dela dura ~330ms de movimento visível
   contra 50–100ms de intervalo entre cliques — folga de sobra pra um
   degrau emendar no outro sem vão. Subir mais suaviza pouco e custa
   caro: num gesto rápido o atraso é τ × velocidade, e em 0.14 a cena
   já ficava um quarto do curso atrás do dedo.

   O dedo pede metade disso: a rolagem nativa já vem suave, aqui a
   suavização só tira a granulação do evento de scroll, e atraso demais
   sob o dedo lê como elástico. */
const TAU = { wheel: 0.11, touch: 0.07 }
/* abaixo disto encosta no alvo e o laço se desliga: perseguição
   exponencial nunca chega no destino sozinha, e sem o encaixe o
   `v >= 1` que libera a página jamais dispararia. */
const SETTLE = 0.0004
/* trilho do toque: fração de viewport que o dedo percorre até a
   expansão fechar. O .seh-track ganha essa altura a mais e o palco fica
   sticky dentro dele — é isso que segura a mídia na tela SEM precisar
   de preventDefault. */
const TOUCH_TRACK = 0.85
/* histerese do children, como no original: liga em 1, desliga abaixo de
   0.75 — assim ele não pisca perto do fim do curso */
const CONTENT_OFF = 0.75
/* geometria da mídia, do componente original */
const W0 = 300, H0 = 400
const WGROW = { narrow: 650, wide: 1250 }
const HGROW = { narrow: 200, wide: 400 }
/* teto da mídia contra a viewport. Os mesmos números do max-width /
   max-height do CSS, mas aplicados aqui — o clamp precisa entrar no
   CÁLCULO do quadro, não depois dele: deixado só pro CSS, o card batia
   no teto no meio do curso e ficava congelado até o fim. Numa tela de
   800px de altura o teto chegava em v≈0.7, ou seja, o último terço do
   scroll não movia mais nada. */
const VW_CAP = 0.95, VH_CAP = 0.85
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

/* ── curvas ──────────────────────────────────────────────────────────
   O progresso é um só, mas cada camada o lê por uma curva diferente. É
   daí que vem a profundidade: se tudo andasse no mesmo ritmo linear, a
   cena leria como um bloco só sendo escalado. */

/* Smoothstep amaciado: 30% linear + 70% smoothstep.

   Aqui quem conduz é a mão do usuário, não um relógio, e isso muda o
   que serve de curva. Smoothstep puro tem derivada ZERO em v=0: o
   primeiro clique de roda não moveria quase nada e leria como travado.
   Um ease-out faz o contrário — derivada alta no começo, o card dá um
   tranco no primeiro clique. A fatia linear garante a resposta
   imediata que scroll pede; a fatia smoothstep tira o canto vivo das
   duas pontas. E é simétrica, então voltar pra cima tem exatamente o
   mesmo tato de descer. */
const soft = (v: number) => 0.3 * v + 0.7 * (v * v * (3 - 2 * v))

/* texto: adiantado. As metades do título precisam ter liberado o meio
   ANTES de a mídia chegar no tamanho final, senão a última fatia do
   curso é o card crescendo por cima de letra ainda em trânsito. */
const easeCopy = (v: number) => soft(clamp01(v * 1.14))
/* halo e fundo: atrasados, um fio atrás da mídia — a luz parece reagir
   ao card em vez de ser parte dele, e o fundo não escurece antes de a
   mídia justificar o escuro */
const easeDepth = (v: number) => soft(v) ** 1.25

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

  /* alvo (para onde o input mandou ir) e pintado (onde a cena está
     agora). Manter os dois separados é o que dá continuidade: o input
     chega em degraus, o pintado atravessa os degraus quadro a quadro. */
  const targetRef = useRef(0)
  const progressRef = useRef(0)
  const expandedRef = useRef(false)
  const contentRef = useRef(false)
  const narrowRef = useRef(false)
  const staticRef = useRef(false)
  const tauRef = useRef(TAU.wheel)
  /* tamanho final da mídia nesta viewport; medido fora do paint pra não
     ler layout a cada quadro */
  const sizeRef = useRef({ w: W0 + WGROW.wide, h: H0 + HGROW.wide })
  const raf = useRef(0)
  /* timestamp do quadro anterior; 0 significa "laço parado" */
  const lastT = useRef(0)

  /* O progresso é escrito direto no DOM, não no state: um render do
     React por evento de roda derrubava o FPS pela metade sob CPU 4x
     (a subárvore inteira, children incluído, reconciliava a cada
     frame). O state guarda só as duas transições discretas — abriu,
     mostrou o children — que acontecem uma vez cada. */
  /* onde a mídia termina nesta viewport. Nunca abaixo do tamanho
     inicial: numa janela muito baixa o teto ficaria menor que H0 e o
     card encolheria conforme o scroll avança. */
  const measure = useCallback(() => {
    const k = narrowRef.current ? 'narrow' : 'wide'
    sizeRef.current = {
      w: Math.max(W0, Math.min(W0 + WGROW[k], window.innerWidth * VW_CAP)),
      h: Math.max(H0, Math.min(H0 + HGROW[k], window.innerHeight * VH_CAP)),
    }
  }, [])

  const paint = useCallback((v: number) => {
    const m = soft(v)
    const c = easeCopy(v)
    const d = easeDepth(v)

    const media = mediaRef.current
    if (media) {
      const { w, h } = sizeRef.current
      /* arredondado pra meio pixel: sem isso a largura muda em frações
         mínimas todo quadro e o navegador reflui o card à toa em
         movimentos que não rendem um pixel de diferença na tela */
      media.style.width = `${Math.round((W0 + m * (w - W0)) * 2) / 2}px`
      media.style.height = `${Math.round((H0 + m * (h - H0)) * 2) / 2}px`
    }
    if (bgRef.current) bgRef.current.style.opacity = String(1 - d)
    if (veilRef.current) veilRef.current.style.opacity = String(0.7 - m * 0.3)

    /* o halo que a mídia joga no escuro. Só transform e opacity — as
       duas propriedades que o compositor resolve sozinho — pra ele
       poder crescer todo frame sem custar layout. */
    if (bloomRef.current) {
      bloomRef.current.style.transform = `translate(-50%, -50%) scale(${0.62 + d * 1.05})`
      bloomRef.current.style.opacity = String(0.5 + d * 0.42)
    }

    /* em reduced-motion o progresso já nasce em 1: aplicar o
       afastamento jogaria o h1 pra fora da tela e a página ficaria
       sem título visível. */
    const shift = staticRef.current ? 0 : c * SHIFT[narrowRef.current ? 'narrow' : 'wide']
    if (headRef.current) headRef.current.style.transform = `translateX(${-shift}vw)`
    if (tailRef.current) tailRef.current.style.transform = `translateX(${shift}vw)`
    if (dateRef.current) dateRef.current.style.transform = `translateX(${-shift}vw)`
    if (cueRef.current) {
      cueRef.current.style.transform = `translateX(${shift}vw)`
      /* a dica some no primeiro terço: assim que o gesto começou ela já
         cumpriu o papel, e segurá-la até o fim só suja o quadro */
      cueRef.current.style.opacity = String(1 - clamp01(v * 3))
    }
  }, [])

  /* as duas transições discretas da cena. Ficam fora do paint porque
     custam render do React e acontecem uma vez cada, não por quadro. */
  const sync = useCallback((v: number) => {
    const full = v >= 1
    if (full !== expandedRef.current) {
      expandedRef.current = full
      setExpanded(full)
    }
    const on = full ? true : v < CONTENT_OFF ? false : contentRef.current
    if (on !== contentRef.current) {
      contentRef.current = on
      setShowContent(on)
    }
  }, [])

  /* O laço. Roda enquanto o pintado não alcançou o alvo e se desliga
     sozinho quando alcança — nada de rAF eterno queimando bateria numa
     página parada.

     O passo é `1 - e^(-dt/τ)`, não um lerp de fator fixo: com fator
     fixo a suavização depende da taxa de quadros, e o mesmo gesto
     ficaria duas vezes mais rápido num monitor de 120Hz que num de 60.
     Assim a curva é a mesma em qualquer taxa, inclusive quando o
     navegador engasga e pula quadros. */
  const start = useCallback(() => {
    /* função nomeada, não useCallback: ela precisa agendar a si mesma, e
       um useCallback não pode se referenciar dentro do próprio corpo */
    const frame = (t: number) => {
      const dt = lastT.current ? Math.min((t - lastT.current) / 1000, 0.05) : 1 / 60
      lastT.current = t

      const target = targetRef.current
      const dist = target - progressRef.current
      let v: number

      if (Math.abs(dist) < SETTLE) {
        v = target
        raf.current = 0
        lastT.current = 0
      } else {
        v = progressRef.current + dist * (1 - Math.exp(-dt / tauRef.current))
        raf.current = requestAnimationFrame(frame)
      }

      progressRef.current = v
      paint(v)
      sync(v)
    }

    /* zerado pra que o primeiro quadro não calcule um dt gigante contra
       o timestamp de quando o laço parou */
    lastT.current = 0
    raf.current = requestAnimationFrame(frame)
  }, [paint, sync])

  /* input só mexe no alvo; quem desenha é o laço */
  const commit = useCallback(
    (raw: number) => {
      const next = clamp01(raw)
      if (next === targetRef.current) return
      targetRef.current = next
      if (!raf.current) start()
    },
    [start]
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
      tauRef.current = next === 'touch' ? TAU.touch : TAU.wheel
      measure()
      if (next === 'static') {
        targetRef.current = 1
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

    /* o teto da mídia é medido contra a viewport, então redimensionar a
       janela (ou girar o aparelho, ou a barra do navegador móvel
       recolher) muda o tamanho final */
    const onResize = () => {
      measure()
      paint(staticRef.current ? 1 : progressRef.current)
    }

    const mqs = [reduce, fine, wide]
    mqs.forEach(m => m.addEventListener('change', pick))
    window.addEventListener('resize', onResize)
    return () => {
      mqs.forEach(m => m.removeEventListener('change', pick))
      window.removeEventListener('resize', onResize)
    }
  }, [paint, measure])

  /* ── desktop: roda intercepta, página travada até abrir ────────── */
  useEffect(() => {
    if (mode !== 'wheel') return

    /* deltaY em pixels, venha ele como pixel, linha ou página, e com
       teto pra que um único evento não vire um salto */
    const step = (e: WheelEvent) => {
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      const px = e.deltaY * unit
      const capped = px < -WHEEL_MAX_STEP ? -WHEEL_MAX_STEP
        : px > WHEEL_MAX_STEP ? WHEEL_MAX_STEP
          : px
      return capped * WHEEL_GAIN
    }

    const onWheel = (e: WheelEvent) => {
      if (expandedRef.current) {
        /* já aberto: só volta a recolher se o usuário insistir pra cima
           com a página no topo */
        if (e.deltaY < 0 && window.scrollY <= 5) {
          e.preventDefault()
          commit(targetRef.current + step(e))
        }
        return
      }
      e.preventDefault()
      /* soma no ALVO, não no pintado: somar no pintado faria cada evento
         partir de onde a animação ainda está, e o curso encolheria
         sozinho quanto mais rápido o gesto — o hero abriria em passos
         cada vez menores */
      commit(targetRef.current + step(e))
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
      commit(targetRef.current + (down ? KEY_STEP : -KEY_STEP))
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
