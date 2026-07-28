'use client'

import { motion, useReducedMotion } from 'framer-motion'

/* ================================================================
   HERO /sobre — título entra letra a letra sobre o sistema vivo.
   O gradiente por letra (não por frase) é proposital: cada glifo
   ganha o próprio recorte de cor, e o efeito "brilha" no drop-in.
   A cor fica monocromática (branco → branco/60, em .sobre-hero-title
   .ltr): o índigo da marca aparece só nos traços do fundo e nos
   micro-accents das seções, pra tipografia não competir com eles.
   ================================================================ */

export default function SobreHero({
  badge,
  title,
  sub,
}: {
  badge: string
  title: string
  sub: string
}) {
  const reduced = useReducedMotion()
  const words = title.split(' ')

  return (
    <header className="page-head sobre-hero">
      <div className="wrap">
        <motion.span
          className="hero-badge"
          initial={reduced ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <b>DevBase</b> · {badge}
        </motion.span>

        <h1 className="sobre-hero-title">
          {words.map((word, wi) => (
            <span key={wi} className="w">
              {Array.from(word).map((letter, li) => (
                <motion.span
                  key={`${wi}-${li}`}
                  className="ltr"
                  initial={reduced ? false : { y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: reduced ? 0 : wi * 0.1 + li * 0.025,
                    type: 'spring',
                    stiffness: 150,
                    damping: 22,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="sub"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.9, duration: 0.7 }}
        >
          {sub}
        </motion.p>
      </div>

      <div className="scrollcue">
        <span className="ln" />
        scroll
      </div>
    </header>
  )
}
