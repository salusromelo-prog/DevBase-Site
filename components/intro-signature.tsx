'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

/* ── calibragem ────────────────────────────────────────────────── */
const DURATION = 4.5              // duração da cena, em segundos
const INTRO_WIDTH = 'min(560px, 84vw)' // escala de marca, não de tela
/* ──────────────────────────────────────────────────────────────── */

/* A cena é composta em coordenadas fixas de 1280×720 e depois reduzida
   por um único scale. Assim toda a coreografia — grade, partículas,
   lockup — encolhe junta e a composição nunca se desmonta. */
const STAGE_W = 1280
const STAGE_H = 720

const COL = {
  sq1: '#7C7BF8',
  sq2: '#5D5CEF',
  faceTop: '#ECEAFB',
  faceRight: '#D8D5F6',
  faceLeft: '#C2BFEE',
  platform: 'rgba(255,255,255,0.55)',
  accent: '#5B5AF0',
  text: '#FFFFFF',
}

/* Cubo isométrico centrado em (0,0). */
const FACE_TOP = 'M0,-60 L52,-30 L0,0 L-52,-30 Z'
const FACE_RIGHT = 'M0,0 L52,-30 L52,34 L0,64 Z'
const FACE_LEFT = 'M-52,-30 L0,0 L0,64 L-52,34 Z'

const WORD = 'dev/base'
const WORD_W = 632

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

const Easing = {
  linear: (t: number) => t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
}

/* trecho suavizado: 0 antes de start, eased 0..1 em [start, start+dur], 1 depois */
const seg = (t: number, start: number, dur: number, ease = Easing.easeOutCubic) =>
  ease(clamp((t - start) / dur, 0, 1))
const ramp = (t: number, start: number, dur: number) => clamp((t - start) / dur, 0, 1)

/* ruído determinístico: as partículas caem sempre nos mesmos lugares,
   então servidor e cliente desenham o mesmo primeiro frame. */
function rnd(i: number, s: number) {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const ICX = 301 // centro do ícone, em coordenadas de palco
const ICY = 345

const PARTS = Array.from({ length: 26 }, (_, i) => ({
  sx: rnd(i, 1) * STAGE_W,
  sy: rnd(i, 2) * STAGE_H,
  jx: (rnd(i, 5) - 0.5) * 70,
  jy: (rnd(i, 6) - 0.5) * 70,
  delay: 0.45 + rnd(i, 3) * 0.55,
  size: 2.5 + rnd(i, 4) * 4,
}))

const AMB = Array.from({ length: 16 }, (_, i) => ({
  x: rnd(i, 7) * STAGE_W,
  baseY: rnd(i, 8) * STAGE_H,
  size: 1.6 + rnd(i, 9) * 2.8,
  speed: 10 + rnd(i, 10) * 20,
  phase: rnd(i, 11) * 6.28,
}))

/* A cena, desenhada inteiramente a partir de t. Sem estado interno: o
   mesmo t sempre produz o mesmo frame. */
function Signature({ t }: { t: number }) {
  const gridOp = ramp(t, 0.15, 0.9) * 0.5
  const gridScale = 1 + 0.06 * seg(t, 0, DURATION, Easing.linear)
  const glowBreath = 0.85 + 0.15 * Math.sin(t * 1.6)
  const glowOp = ramp(t, 0.1, 0.8)

  const sqE = seg(t, 0.55, 0.5, Easing.easeOutBack)
  const iconScale = 0.6 + 0.4 * sqE
  const iconOp = ramp(t, 0.55, 0.28)
  const fTop = seg(t, 0.85, 0.55)
  const fLeft = seg(t, 0.97, 0.55)
  const fRight = seg(t, 1.07, 0.55)
  const platP = seg(t, 1.4, 0.35, Easing.easeOutBack)
  const cubeSettle = seg(t, 0.85, 0.9, Easing.easeOutBack)
  const cubeRot = (1 - cubeSettle) * -10

  const shimP = seg(t, 1.5, 0.7, Easing.easeInOutCubic)
  const shimX = -90 + shimP * 320
  const shimOp = clamp(Math.sin(shimP * Math.PI), 0, 1) * 0.7

  const reflOp = ramp(t, 1.7, 0.5) * 0.16

  const ring = (start: number) => {
    const rp = clamp((t - start) / 0.95, 0, 1)
    return { on: t > start && rp < 1, scale: 0.3 + 2.4 * rp, op: (1 - rp) * 0.45 }
  }
  const r1 = ring(1.55)
  const r2 = ring(2.95)

  const sweep = seg(t, 2.05, 0.85, Easing.easeInOutCubic)

  /* cada face entra deslizando da sua própria direção */
  const faceStyle = (op: number, tx: number, ty: number): CSSProperties => ({
    opacity: op,
    transform: `translate(${(1 - op) * tx}px, ${(1 - op) * ty}px)`,
    transformOrigin: '0px 0px',
  })

  return (
    <>
      {/* grade de pontos ao fundo — a máscara radial apaga as bordas,
          então o palco reduzido não vira um retângulo visível */}
      <div
        style={{
          position: 'absolute',
          inset: '-6%',
          backgroundImage:
            'radial-gradient(rgba(124,123,248,0.5) 1.4px, transparent 1.4px)',
          backgroundSize: '42px 42px',
          opacity: gridOp,
          transform: `scale(${gridScale})`,
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 48%, #000 20%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 48%, #000 20%, transparent 78%)',
        }}
      />

      {/* brilho central, respirando */}
      <div
        style={{
          position: 'absolute',
          left: ICX + 130,
          top: ICY,
          width: 900,
          height: 900,
          marginLeft: -450,
          marginTop: -450,
          borderRadius: '50%',
          pointerEvents: 'none',
          background:
            'radial-gradient(circle, rgba(93,92,239,0.30), rgba(93,92,239,0) 62%)',
          opacity: glowOp * glowBreath,
          filter: 'blur(4px)',
        }}
      />

      <svg
        width={STAGE_W}
        height={STAGE_H}
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {/* partículas convergindo pro ícone */}
        {PARTS.map((p, i) => {
          const cp = seg(t, p.delay, 0.9, Easing.easeInCubic)
          const op = Math.min(ramp(t, p.delay, 0.15), 1 - cp) * 0.9
          if (op <= 0.001) return null
          return (
            <circle
              key={i}
              cx={p.sx + (ICX + p.jx - p.sx) * cp}
              cy={p.sy + (ICY + p.jy - p.sy) * cp}
              r={p.size}
              fill={COL.sq1}
              opacity={op}
            />
          )
        })}

        {/* poeira ambiente subindo em loop */}
        {AMB.map((a, i) => {
          const y = (((a.baseY - t * a.speed) % 760) + 760) % 760 - 20
          const tw = 0.12 + 0.22 * (0.5 + 0.5 * Math.sin(t * 2 + a.phase))
          return (
            <circle
              key={`a${i}`}
              cx={a.x}
              cy={y}
              r={a.size}
              fill="#fff"
              opacity={tw * ramp(t, 0.4, 0.6)}
            />
          )
        })}

        {/* dois pulsos de anel: um quando o cubo fecha, outro no fim */}
        {r1.on && (
          <circle
            cx={ICX}
            cy={ICY}
            r={70}
            fill="none"
            stroke={COL.sq1}
            strokeWidth="2"
            opacity={r1.op}
            style={{ transform: `scale(${r1.scale})`, transformOrigin: `${ICX}px ${ICY}px` }}
          />
        )}
        {r2.on && (
          <circle
            cx={ICX}
            cy={ICY}
            r={70}
            fill="none"
            stroke={COL.accent}
            strokeWidth="1.5"
            opacity={r2.op}
            style={{ transform: `scale(${r2.scale})`, transformOrigin: `${ICX}px ${ICY}px` }}
          />
        )}
      </svg>

      {/* lockup: ícone + marca */}
      <div
        style={{
          position: 'absolute',
          left: ICX - 100,
          top: ICY - 100,
          display: 'flex',
          alignItems: 'center',
          gap: 46,
        }}
      >
        <div style={{ width: 200, height: 200, position: 'relative', flexShrink: 0 }}>
          {/* reflexo no piso */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 208,
              width: 200,
              height: 200,
              transform: 'scaleY(-1)',
              opacity: reflOp,
              maskImage: 'linear-gradient(to top, #000, transparent 72%)',
              WebkitMaskImage: 'linear-gradient(to top, #000, transparent 72%)',
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 46,
                background: `linear-gradient(145deg, ${COL.sq1}, ${COL.sq2})`,
              }}
            />
          </div>

          {/* o quadrado da marca */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 46,
              background: `linear-gradient(145deg, ${COL.sq1}, ${COL.sq2})`,
              boxShadow: `0 24px 60px rgba(80,79,235,${0.5 * iconOp}), inset 0 1px 0 rgba(255,255,255,0.28)`,
              transform: `scale(${iconScale})`,
              opacity: iconOp,
            }}
          />

          {/* o cubo se montando dentro dele */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${0.9 + 0.1 * cubeSettle}) rotate(${cubeRot}deg)`,
              transformOrigin: 'center',
            }}
          >
            <svg
              width="150"
              height="176"
              viewBox="-72 -80 144 176"
              style={{ display: 'block', overflow: 'visible' }}
            >
              <rect
                x="-34"
                y="76"
                width="68"
                height="8"
                rx="4"
                fill={COL.platform}
                style={{ transform: `scaleX(${platP})`, transformOrigin: '0px 80px' }}
              />
              <path d={FACE_LEFT} fill={COL.faceLeft} style={faceStyle(fLeft, -70, 40)} />
              <path d={FACE_RIGHT} fill={COL.faceRight} style={faceStyle(fRight, 70, 40)} />
              <path d={FACE_TOP} fill={COL.faceTop} style={faceStyle(fTop, 0, -78)} />
            </svg>
          </div>

          {/* lustro atravessando o quadrado */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 46,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -40,
                left: shimX,
                width: 70,
                height: 280,
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
                transform: 'rotate(18deg)',
                opacity: shimOp,
                filter: 'blur(2px)',
              }}
            />
          </div>
        </div>

        {/* a palavra, revelada por uma barra de luz que a varre */}
        <div style={{ position: 'relative', height: 132, width: WORD_W, flexShrink: 0 }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              fontFamily: 'var(--mono)',
              fontWeight: 700,
              fontSize: 128,
              lineHeight: '132px',
              letterSpacing: '-0.02em',
              color: COL.text,
              whiteSpace: 'pre',
              clipPath: `inset(-24% ${(1 - sweep) * 100}% -24% 0)`,
              textShadow: sweep < 1 ? '0 0 22px rgba(124,123,248,0.6)' : 'none',
            }}
          >
            {WORD.split('').map((ch, i) => (
              <span key={i} style={{ color: ch === '/' ? COL.accent : COL.text }}>
                {ch}
              </span>
            ))}
          </div>
          {sweep > 0.001 && sweep < 0.999 && (
            <div
              style={{
                position: 'absolute',
                top: -12,
                left: sweep * WORD_W - 3,
                width: 6,
                height: 156,
                background: COL.accent,
                boxShadow: `0 0 26px 7px ${COL.accent}`,
                borderRadius: 3,
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

/* A entrada do site. Só na home, só na primeira visita da sessão (a marca
   vem do script inline do <head>, escrita antes do primeiro paint).

   Este componente decide QUANDO sair; quem apaga o overlay é sempre o CSS.
   As saídas — fim da cena, skip e failsafe — convergem numa animação, e o
   desmonte escuta o animationend dela. Se a hidratação falhar e nada disto
   rodar, o failsafe do CSS ainda derruba o overlay: a página nunca fica
   presa atrás de uma tela preta. */
export default function IntroSignature() {
  const [done, setDone] = useState(false)
  const [t, setT] = useState(0)
  const [scale, setScale] = useState(0)
  const overlay = useRef<HTMLDivElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const saindo = useRef(false)

  /* o palco é autoral em 1280×720; o scale real vem da largura medida,
     porque CSS não sabe dividir um comprimento por outro. */
  useEffect(() => {
    const node = box.current
    if (!node) return
    const medir = () => setScale(node.clientWidth / STAGE_W)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    /* sem a marca do head: reload, rota interna, reduced-motion.
       Nada a tocar — tira o nó do caminho e sai. */
    if (!root.classList.contains('db-splash')) {
      setDone(true)
      return
    }

    const node = overlay.current
    let raf = 0

    /* uma só porta de saída */
    const sair = () => {
      if (saindo.current) return
      saindo.current = true
      cancelAnimationFrame(raf)
      root.classList.add('db-out')
    }

    const limpar = () => {
      root.classList.remove('db-splash', 'db-skip', 'db-out')
      setDone(true)
    }

    /* o fim real é o fim da animação de saída, qualquer que tenha sido o
       caminho até ela — inclusive o failsafe puro do CSS. */
    const onAnimEnd = (e: AnimationEvent) => {
      if (e.animationName === 'is-out' || e.animationName === 'is-failsafe') limpar()
    }
    node?.addEventListener('animationend', onAnimEnd)

    /* o skip é marcado pelo script do <head> (que já escuta desde antes da
       hidratação); aqui só acompanhamos pra parar o relógio junto. */
    const onSkip = () => {
      if (saindo.current) return
      saindo.current = true
      cancelAnimationFrame(raf)
    }
    const evs = ['pointerdown', 'keydown', 'touchstart'] as const
    evs.forEach(e =>
      document.addEventListener(e, onSkip, { passive: true, capture: true })
    )

    const t0 = performance.now()
    const frame = (now: number) => {
      const elapsed = (now - t0) / 1000
      if (elapsed >= DURATION) {
        setT(DURATION)
        sair()
        return
      }
      setT(elapsed)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      node?.removeEventListener('animationend', onAnimEnd)
      evs.forEach(e => document.removeEventListener(e, onSkip, true))
    }
  }, [])

  if (done) return null

  return (
    <div className="intro-signature" ref={overlay} aria-hidden="true">
      <div className="is-box" ref={box} style={{ width: INTRO_WIDTH }}>
        <div
          className="is-stage"
          style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
        >
          {/* antes da primeira medição o scale é 0: o palco existe, mas não
              pinta nada — evita um flash em tamanho de autoria. */}
          {scale > 0 && <Signature t={t} />}
        </div>
      </div>
    </div>
  )
}
