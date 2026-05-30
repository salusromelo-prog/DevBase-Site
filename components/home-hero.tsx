'use client'

import { useState, useEffect } from 'react'
import HeroCanvas, { type HeroVariant } from './hero-canvas'

const VARIANTS: { v: HeroVariant; label: string }[] = [
  { v: 'silk', label: 'ondas' },
  { v: 'aurora', label: 'aurora' },
  { v: 'flow', label: 'fluxo' },
]

export default function HomeHero() {
  const [variant, setVariant] = useState<HeroVariant>('silk')

  useEffect(() => {
    const saved = localStorage.getItem('db-hero') as HeroVariant | null
    if (saved && ['silk', 'aurora', 'flow'].includes(saved)) setVariant(saved)
  }, [])

  function switchVariant(v: HeroVariant) {
    setVariant(v)
    localStorage.setItem('db-hero', v)
  }

  return (
    <header className="hero">
      <HeroCanvas variant={variant} className="hero-canvas" />
      <div className="hero-veil" />
      <div className="wrap hero-inner">
        <h1>
          Ferramentas para{' '}
          <span className="grad">devs brasileiros.</span>
        </h1>
        <p className="hero-sub">
          Construímos o que o dev BR sempre precisou — sem documentação em inglês, sem preço em dólar, sem suporte que ignora. Produto por produto, do zero, em português.
        </p>
        <div className="hero-cta">
          <a href="/produtos" className="btn btn-primary btn-lg">
            Conhecer produtos <span className="arr">→</span>
          </a>
          <a href="/empresa" className="btn btn-glass btn-lg">Quem somos</a>
        </div>
      </div>
      <div className="scrollcue">
        <span className="ln" />
        scroll
      </div>
      <div className="hero-switch" aria-label="estilo da animação">
        <div className="pills">
          {VARIANTS.map(({ v, label }) => (
            <button
              key={v}
              className={variant === v ? 'on' : ''}
              onClick={() => switchVariant(v)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
