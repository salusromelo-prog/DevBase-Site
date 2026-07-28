'use client'

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface AnimatedMarqueeHeroProps {
  /** Pílula acima do título. Omitir deixa o título abrir a página sozinho. */
  tagline?: string
  /** String (anima palavra a palavra) ou JSX pronto. */
  title: React.ReactNode
  description: string
  ctaText: string
  ctaHref: string
  /** Link discreto abaixo do botão principal. */
  secondaryText?: string
  secondaryHref?: string
  /** URLs já dimensionadas — o carrossel duplica a lista para fechar o loop. */
  images: string[]
  /** Segundos para uma volta completa do carrossel. */
  marqueeDuration?: number
  className?: string
}

const RISE: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 110, damping: 20 },
  },
}

const STAGGER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}

const FADE_EDGES =
  'linear-gradient(to bottom, transparent, #000 22%, #000 76%, transparent)'

export function AnimatedMarqueeHero({
  tagline,
  title,
  description,
  ctaText,
  ctaHref,
  secondaryText,
  secondaryHref,
  images,
  marqueeDuration = 60,
  className,
}: AnimatedMarqueeHeroProps) {
  const reduced = useReducedMotion()

  /* duas cópias lado a lado: deslocar 50% devolve o container à posição
     inicial, então a volta do loop não tem emenda visível */
  const loop = [...images, ...images]

  return (
    <section
      className={cn(
        'relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-white',
        className
      )}
    >
      {/* brilho índigo — mesmo respiro do resto da /empresas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-12%] -z-10 h-[640px] w-[min(900px,100vw)] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(closest-side, rgba(99,102,241,0.075), transparent 72%)',
        }}
      />

      <motion.div
        initial={reduced ? false : 'hidden'}
        animate="show"
        variants={STAGGER}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-10 pt-[calc(var(--nav-h)+40px)] text-center"
      >
        {tagline && (
          <motion.span
            variants={RISE}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[rgba(99,102,241,0.22)] bg-[rgba(99,102,241,0.06)] px-4 py-1.5 font-[family-name:var(--mono)] text-[12px] uppercase tracking-[0.1em] text-[#6366f1]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6366f1]" />
            {tagline}
          </motion.span>
        )}

        {/* os `!` não são preguiça: globals.css é CSS sem @layer, então as
            regras de elemento (h1 { font-weight: 700 } e p { margin: 0 })
            ganham das utilities do Tailwind, que vivem em @layer utilities */}
        <motion.h1
          variants={STAGGER}
          className="m-0 font-[family-name:var(--font-fraunces)] text-[clamp(2.25rem,4.6vw,3.6rem)] font-normal! leading-[1.08]! tracking-[-0.02em]! text-[#1a1a1a]! [text-wrap:balance] [&_em]:italic [&_em]:text-[#6366f1]!"
        >
          {typeof title === 'string' ? (
            title.split(' ').map((word, i) => (
              <motion.span key={`${word}-${i}`} variants={RISE} className="inline-block">
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            <motion.span variants={RISE} className="inline-block">
              {title}
            </motion.span>
          )}
        </motion.h1>

        <motion.p
          variants={RISE}
          className="mt-7! max-w-[60ch] text-[1.0625rem] leading-[1.7] text-[#444]"
        >
          {description}
        </motion.p>

        <motion.div variants={RISE} className="mt-9 flex flex-col items-center gap-5">
          <a href={ctaHref} target="_blank" rel="noopener" className="btn-wa">
            {ctaText} <span className="arr">→</span>
          </a>

          {secondaryText && secondaryHref && (
            <a
              href={secondaryHref}
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-[#56565f] transition-colors hover:text-[#1a1a1a]"
            >
              {secondaryText}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          )}
        </motion.div>
      </motion.div>

      {/* ===== carrossel de fotos ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative w-full flex-shrink-0 select-none overflow-hidden"
        style={{ maskImage: FADE_EDGES, WebkitMaskImage: FADE_EDGES }}
      >
        <motion.div
          className="flex w-max gap-4 py-5 md:gap-5"
          animate={reduced ? undefined : { x: ['0%', '-50%'] }}
          transition={
            reduced
              ? undefined
              : { ease: 'linear', duration: marqueeDuration, repeat: Infinity }
          }
        >
          {loop.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="aspect-[3/4] h-40 flex-shrink-0 overflow-hidden rounded-2xl border border-[rgba(26,26,26,0.08)] bg-[#f5f5f7] shadow-[0_26px_50px_-28px_rgba(26,26,26,0.5)] sm:h-52 md:h-64 lg:h-[18rem]"
              style={{ rotate: i % 2 === 0 ? '-2.5deg' : '3deg' }}
            >
              {/* <img> e não next/image: as URLs já vêm cortadas e em WebP pela
                  CDN de origem, e o carrossel é decorativo — passar 24 cards
                  pelo otimizador do Next só somaria latência. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                width={600}
                height={800}
                loading={i < 6 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AnimatedMarqueeHero
