'use client'

import { motion, useReducedMotion } from 'framer-motion'

/* ================================================================
   BACKGROUND PATHS — adaptado do hero de referência do time.
   Curvas SVG fluindo em duas camadas cruzadas (posição 1 e -1),
   em índigo/violeta (paleta DevBase). Fixo atrás da página inteira
   — não só do hero — pra acompanhar o scroll de /sobre inteiro.
   ================================================================ */

const N_PATHS = 24
const PALETTE = ['#6366f1', '#8b5cf6'] // índigo, violeta — alterna por traço

function FloatingPaths({ position }: { position: number }) {
  const reduced = useReducedMotion()

  const paths = Array.from({ length: N_PATHS }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: PALETTE[i % PALETTE.length],
    width: 0.5 + i * 0.03,
    opacity: 0.1 + i * 0.03,
  }))

  return (
    <svg
      className="paths-svg"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke={path.color}
          strokeWidth={path.width}
          strokeOpacity={path.opacity}
          initial={reduced ? false : { pathLength: 0.3, opacity: 0.6 }}
          animate={
            reduced
              ? undefined
              : {
                  pathLength: 1,
                  opacity: [0.3, 0.6, 0.3],
                  pathOffset: [0, 1, 0],
                }
          }
          transition={{
            duration: 20 + (path.id % 10),
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
      ))}
    </svg>
  )
}

export default function BackgroundPaths() {
  return (
    <div className="sobre-paths" aria-hidden="true">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  )
}
