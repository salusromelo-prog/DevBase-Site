'use client'

import { MotionConfig, motion } from 'framer-motion'

/* ================================================================
   FORMAS FLUTUANTES — a assinatura do modelo de referência.
   Pílulas desfocadas em gradiente, giradas, em movimento perpétuo.
   Só índigo/violeta (a referência usa 5 cores, 3 fora da marca).

   O modelo original só oscilava o eixo Y. Aqui cada pílula também
   deriva no X, gira alguns graus e "respira" na escala — e cada uma
   tem duração e sinais próprios, para o campo nunca sincronizar e
   parecer vivo em vez de um loop repetido.

   Um conjunto por seção, e cada um com POSIÇÕES próprias: repetir o
   mesmo conjunto página abaixo denunciaria o copiar-e-colar. O hero
   leva cinco formas e a entrada caindo de cima; as seções internas
   levam duas cada, sem entrada (elas nascem fora da tela) e com
   opacidade menor, para sugerir a linguagem sem disputar com o texto.
   Sempre nas bordas: a coluna central do conteúdo fica livre.

   Reduced motion resolvido por <MotionConfig reducedMotion="user">,
   e não ramificando `initial` em useReducedMotion() — que renderiza
   markup diferente no servidor e no cliente (hydration mismatch).
   ================================================================ */

type Shape = {
  w: number
  h: number
  rotate: number
  delay: number
  tone: 'a' | 'b' | 'c'
  pos: string
  /* deriva perpétua: amplitudes (px / graus) e duração do ciclo (s).
     Sinais alternados entre irmãs desencontram as fases. */
  dx: number
  dy: number
  dr: number
  sc: number
  dur: number
}

export type ShapeSet = 'hero' | 'show' | 'steps' | 'orc' | 'close'

const SETS: Record<ShapeSet, Shape[]> = {
  hero: [
    { w: 600, h: 140, rotate: 12, delay: 0.3, tone: 'a', pos: 'h1', dx: 38, dy: 26, dr: 4, sc: 1.04, dur: 19 },
    { w: 500, h: 120, rotate: -15, delay: 0.5, tone: 'b', pos: 'h2', dx: -30, dy: -22, dr: -5, sc: 1.05, dur: 15 },
    { w: 300, h: 80, rotate: -8, delay: 0.4, tone: 'c', pos: 'h3', dx: 24, dy: -18, dr: 6, sc: 1.03, dur: 21 },
    { w: 200, h: 60, rotate: 20, delay: 0.6, tone: 'b', pos: 'h4', dx: -20, dy: 24, dr: -7, sc: 1.06, dur: 13 },
    { w: 150, h: 40, rotate: -25, delay: 0.7, tone: 'a', pos: 'h5', dx: 16, dy: 20, dr: 8, sc: 1.05, dur: 17 },
  ],
  show: [
    { w: 440, h: 110, rotate: -12, delay: 0, tone: 'a', pos: 's1', dx: 22, dy: 18, dr: 3, sc: 1.03, dur: 24 },
    { w: 240, h: 64, rotate: 18, delay: 0, tone: 'b', pos: 's2', dx: -16, dy: -14, dr: -5, sc: 1.04, dur: 18 },
  ],
  steps: [
    { w: 380, h: 96, rotate: 14, delay: 0, tone: 'b', pos: 't1', dx: -20, dy: 16, dr: -4, sc: 1.03, dur: 22 },
    { w: 260, h: 70, rotate: -18, delay: 0, tone: 'c', pos: 't2', dx: 18, dy: -15, dr: 5, sc: 1.04, dur: 26 },
  ],
  orc: [
    { w: 420, h: 104, rotate: -16, delay: 0, tone: 'a', pos: 'o1', dx: 24, dy: -16, dr: 4, sc: 1.03, dur: 20 },
    { w: 280, h: 74, rotate: 15, delay: 0, tone: 'b', pos: 'o2', dx: -18, dy: 18, dr: -6, sc: 1.05, dur: 25 },
  ],
  close: [
    { w: 400, h: 100, rotate: -16, delay: 0, tone: 'c', pos: 'c1', dx: 20, dy: 20, dr: -3, sc: 1.04, dur: 23 },
    { w: 280, h: 74, rotate: 20, delay: 0, tone: 'a', pos: 'c2', dx: -22, dy: -16, dr: 6, sc: 1.03, dur: 19 },
  ],
}

const FOREVER = Number.POSITIVE_INFINITY

function Pill({ shape, entrance }: { shape: Shape; entrance: boolean }) {
  const { w, h, rotate, delay, tone, pos, dx, dy, dr, sc, dur } = shape

  return (
    <motion.div
      className={`pfs-shape pfs--${pos}`}
      initial={entrance ? { opacity: 0, y: -150, rotate: rotate - 15 } : false}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        className="pfs-shape__body"
        style={{ width: w, height: h }}
        animate={{ x: [0, dx, 0], y: [0, dy, 0], rotate: [0, dr, 0], scale: [1, sc, 1] }}
        transition={{
          duration: dur,
          repeat: FOREVER,
          ease: 'easeInOut',
          // a escala respira no dobro do ritmo da deriva
          scale: { duration: dur / 2, repeat: FOREVER, ease: 'easeInOut' },
        }}
      >
        <span className={`pfs-shape__fill pfs-shape__fill--${tone}`} />
      </motion.div>
    </motion.div>
  )
}

export default function PfShapes({ set }: { set: ShapeSet }) {
  const entrance = set === 'hero'

  return (
    <MotionConfig reducedMotion="user">
      <div className={`pfs pfs--${set}`} aria-hidden="true">
        {SETS[set].map((s) => (
          <Pill key={s.pos} shape={s} entrance={entrance} />
        ))}
      </div>
    </MotionConfig>
  )
}
