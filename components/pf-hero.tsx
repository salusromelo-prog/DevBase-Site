'use client'

import { MotionConfig, motion } from 'framer-motion'
import PfShapes from './pf-shapes'

/* ================================================================
   HERO /portfolio — composição centrada do modelo de referência:
   título em duas linhas (a segunda em gradiente índigo→violeta) e
   dois CTAs, sobre as formas flutuantes.
   ================================================================ */

// entrada em cascata: cada bloco entra 0.2s depois do anterior
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
}

export default function PfHero({
  title1,
  title2,
  sub,
  ctaHref,
  ctaLabel,
  altHref,
  altLabel,
}: {
  title1: string
  title2: string
  sub: string
  ctaHref: string
  ctaLabel: string
  altHref: string
  altLabel: string
}) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="pfh">
        <div className="pfh-glow" aria-hidden="true" />
        <PfShapes set="hero" />

        <div className="wrap pfh-content">
          <motion.h1 custom={0} variants={fadeUp} initial="hidden" animate="visible" className="pfh-title">
            <span className="pf-grad-w">{title1}</span>
            <span className="pf-grad-v">{title2}</span>
          </motion.h1>

          <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible" className="pfh-sub">
            {sub}
          </motion.p>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="pf-cta-row">
            <a href={ctaHref} className="pf-btn">
              {ctaLabel} <span className="arr">→</span>
            </a>
            <a href={altHref} target="_blank" rel="noopener" className="pf-ghost">
              {altLabel} <span className="arr">→</span>
            </a>
          </motion.div>
        </div>

        {/* véu inferior: assenta as formas e entrega o preto pro corpo */}
        <div className="pfh-veil" aria-hidden="true" />
      </section>
    </MotionConfig>
  )
}
