'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { Barcode, CreditCard } from 'lucide-react'
import { STACK, type StackItem } from './stack-logos'

/* Mecânica do scroll-morph-hero (21st.dev / prashantsom75), reescrita em dois
   pontos que não sobrevivem fora de uma demo isolada:

   1. O original prende a roda do mouse (`wheel` + preventDefault incondicional)
      e roda um scroll virtual próprio. No meio de uma página isso é uma
      armadilha: ao passar o cursor pela seção o scroll da página morre e não
      volta. Aqui o progresso vem do scroll real, com wrapper alto + sticky.
   2. O original usa framer-motion e re-renderiza os 20 cards a cada frame.
      Como o projeto não tinha nenhuma lib de animação, as posições são escritas
      direto no style via rAF — mesma curva, zero dependência nova. */

const N = STACK.length

/* precisa bater com .smorph-card no globals.css */
const CARD = { w: 68, h: 84 }
const CARD_MOBILE = { w: 46, h: 58 }

/* amplitude da deriva do arco, em frações de um passo entre cards */
const DRIFT = 0.35

/* fases da entrada, em ms a partir do momento em que a seção aparece */
const T_LINE = 900
const T_CIRCLE = 2200

/* janelas do scroll: círculo segura, vira arco, e o arco deriva no fim */
const MORPH_FROM = 0.12
const MORPH_TO = 0.7
const SHUFFLE_TO = 1

type Pose = { x: number; y: number; rot: number; scale: number }

/* Espalhamento de entrada. Determinístico de propósito: Math.random no render
   quebra a regra de pureza do React e o sorteio não acrescenta nada aqui —
   o estado só aparece por ~1s antes da fileira se formar. */
const noise = (n: number) => {
  const s = Math.sin(n * 127.1) * 43758.5453
  return s - Math.floor(s) - 0.5
}
const SCATTER: Pose[] = Array.from({ length: N }, (_, i) => ({
  x: noise(i + 1) * 1400,
  y: noise(i + 41) * 900,
  rot: noise(i + 83) * 180,
  scale: 0.6,
}))

const REDUCED = '(prefers-reduced-motion: reduce)'
const subscribeMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}
const allowsMotion = () => !window.matchMedia(REDUCED).matches

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const between = (v: number, a: number, b: number) => clamp01((v - a) / (b - a))

function LogoMark({ item }: { item: StackItem }) {
  if (item.path) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={item.path} fill="currentColor" />
      </svg>
    )
  }
  const Icon = item.icon === 'barcode' ? Barcode : CreditCard
  return <Icon aria-hidden="true" strokeWidth={1.5} />
}

export default function StackMorph() {
  /* O snapshot de servidor é sempre `false`: o SSR entrega o estado estático,
     que é também o que quem pediu reduced-motion continua vendo e o que fica
     se o JS falhar. A animação é ligada por cima, depois da hidratação — e
     desliga sozinha se a preferência mudar durante a visita. */
  const animated = useSyncExternalStore(subscribeMotion, allowsMotion, () => false)

  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const introRef = useRef<HTMLDivElement>(null)
  const arcTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return
    const wrap = wrapRef.current
    const stage = stageRef.current
    if (!wrap || !stage) return

    let raf = 0
    let introStart = 0
    let morph = 0
    let shuffle = 0
    let parallax = 0
    let parallaxTarget = 0

    /* o loop só existe enquanto a seção está na tela; fora dela não há nada
       para calcular e deixar um rAF vivo o resto da página inteira é desperdício */
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.3 && !introStart) introStart = performance.now()
          if (e.isIntersecting) start()
          else stop()
        }
      },
      { threshold: [0, 0.3] },
    )
    io.observe(stage)

    /* guardado normalizado (-1..1); a amplitude em px é decidida no frame,
       junto com a geometria que reserva espaço pra ela */
    const onMouseMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect()
      parallaxTarget = ((e.clientX - r.left) / r.width - 0.5) * 2
    }
    /* parallax só onde faz sentido; em toque não há cursor pra seguir */
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (fine) stage.addEventListener('mousemove', onMouseMove)

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)

      const rect = wrap.getBoundingClientRect()
      const W = stage.offsetWidth
      const H = stage.offsetHeight
      if (!W || !H) return

      /* progresso do scroll dentro do trecho sticky */
      const travel = rect.height - H
      const p = travel > 0 ? clamp01(-rect.top / travel) : 0

      morph += (between(p, MORPH_FROM, MORPH_TO) - morph) * 0.12
      shuffle += (between(p, MORPH_TO, SHUFFLE_TO) - shuffle) * 0.12
      parallax += (parallaxTarget - parallax) * 0.06

      /* entrada: espalhado -> fileira -> círculo */
      const elapsed = introStart ? now - introStart : 0
      const toLine = easeOut(clamp01(elapsed / T_LINE))
      const toCircle = easeOut(between(elapsed, T_LINE, T_CIRCLE))

      const isMobile = W < 768
      const minDim = Math.min(W, H)

      /* largo o bastante para o headline caber dentro do anel, apertado o
         bastante para o card do topo não sumir atrás da navbar fixa */
      const circleR = Math.min(minDim * 0.35, 300)
      const lineGap = isMobile ? 46 : 78
      const lineW = (N - 1) * lineGap

      /* O arco do original é fechado (130° de abertura) porque distribui 20
         fotos; com 8 logos as pontas mergulhavam pra fora da viewport. Aqui a
         geometria é derivada da largura e da queda desejadas — arco raso e
         largo, com os 8 cards dentro da tela. */
      const card = isMobile ? CARD_MOBILE : CARD

      /* a escala do arco sai da largura disponível: 8 cards lado a lado
         precisam caber, senão as pontas somem no overflow do palco */
      const fit = (((W - 32) / N) * 0.92) / card.w
      const arcScale = Math.min(Math.max(fit, isMobile ? 0.8 : 1), isMobile ? 1 : 1.7)

      /* meia-diagonal, porque o card chega girado nas pontas do arco */
      const halfDiag = (Math.hypot(card.w, card.h) * arcScale) / 2
      const parallaxMax = Math.min(W * 0.04, 60)

      /* a deriva empurra a ponta do arco além do vão, então ela entra no
         orçamento — senão o último card é comido pelo overflow do palco */
      const budget = W / 2 - halfDiag - parallaxMax - 16
      const driftShare = (DRIFT * 1.05) / (N - 1)
      const halfSpan = Math.max(W * 0.2, budget / (1 + driftShare))

      const drop = H * (isMobile ? 0.1 : 0.16)
      const halfAngle = 2 * Math.atan(drop / halfSpan)
      const arcR = halfSpan / Math.sin(halfAngle)
      const spread = (halfAngle * 360) / Math.PI      // 2 * halfAngle em graus
      const step = spread / (N - 1)
      const startAngle = -90 - spread / 2
      const arcCenterY = H * (isMobile ? 0.14 : 0.18) + arcR

      for (let i = 0; i < N; i++) {
        const node = cardRefs.current[i]
        if (!node) continue

        const line: Pose = { x: i * lineGap - lineW / 2, y: 0, rot: 0, scale: 1 }

        const circleDeg = (i / N) * 360
        const circleRad = (circleDeg * Math.PI) / 180
        const circle: Pose = {
          x: Math.cos(circleRad) * circleR,
          y: Math.sin(circleRad) * circleR,
          rot: circleDeg + 90,
          scale: 1,
        }

        /* deriva suave no fim da rolagem. O original varria 80% da abertura
           para paginar entre 20 fotos; com 8 cards todos já visíveis isso só
           jogaria metade deles pra fora — aqui é só um respiro. */
        const arcDeg = startAngle + i * step - (shuffle - 0.5) * step * DRIFT
        const arcRad = (arcDeg * Math.PI) / 180
        const arc: Pose = {
          x: Math.cos(arcRad) * arcR + parallax * parallaxMax,
          y: Math.sin(arcRad) * arcR + arcCenterY,
          rot: arcDeg + 90,
          scale: arcScale,
        }

        const from = SCATTER[i]
        const base: Pose = {
          x: lerp(lerp(from.x, line.x, toLine), circle.x, toCircle),
          y: lerp(lerp(from.y, line.y, toLine), circle.y, toCircle),
          rot: lerp(lerp(from.rot, line.rot, toLine), circle.rot, toCircle),
          scale: lerp(lerp(from.scale, line.scale, toLine), circle.scale, toCircle),
        }

        const x = lerp(base.x, arc.x, morph)
        const y = lerp(base.y, arc.y, morph)
        const rot = lerp(base.rot, arc.rot, morph)
        const scale = lerp(base.scale, arc.scale, morph)

        node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        node.style.opacity = String(toLine)
      }

      if (introRef.current) {
        const vis = toCircle * clamp01(1 - morph * 2.2)
        introRef.current.style.opacity = String(vis)
      }
      if (arcTextRef.current) {
        const vis = between(morph, 0.65, 1)
        arcTextRef.current.style.opacity = String(vis)
        arcTextRef.current.style.transform = `translateY(${((1 - vis) * 18).toFixed(2)}px)`
      }
    }

    return () => {
      stop()
      io.disconnect()
      if (fine) stage.removeEventListener('mousemove', onMouseMove)
    }
  }, [animated])

  if (!animated) {
    return (
      <section className="smorph smorph--static sec-dark" aria-label="A stack que já vem configurada">
        <div className="wrap">
          <p className="smorph-lbl">{'// a stack'}</p>
          <h2 className="smorph-title">A stack que já vem configurada</h2>
          <ul className="smorph-grid">
            {STACK.map((item) => (
              <li key={item.name} className="smorph-tile">
                <span className="smorph-mark">
                  <LogoMark item={item} />
                </span>
                <span className="smorph-name">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  return (
    <section ref={wrapRef} className="smorph sec-dark" aria-label="A stack que já vem configurada">
      <div ref={stageRef} className="smorph-stage">
        <div ref={introRef} className="smorph-intro">
          <h2 className="smorph-title">A stack que já vem configurada</h2>
          <p className="smorph-hint">role para explorar</p>
        </div>

        <div ref={arcTextRef} className="smorph-arctext">
          <h3>Você não configura nada disso.</h3>
          <p>Auth, banco, pagamentos e deploy já vêm ligados — e documentados em português.</p>
        </div>

        <div className="smorph-field">
          {STACK.map((item, i) => (
            <div
              key={item.name}
              className="smorph-card"
              ref={(el) => {
                cardRefs.current[i] = el
              }}
            >
              <div className="smorph-flip">
                <div className="smorph-face smorph-face--front">
                  <LogoMark item={item} />
                </div>
                <div className="smorph-face smorph-face--back">
                  <span>{item.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
