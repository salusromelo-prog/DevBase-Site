'use client'

import HeroCanvas from './hero-canvas'

export default function HomeHero() {
  return (
    <header className="hero">
      <HeroCanvas variant="silk" className="hero-canvas" />
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
    </header>
  )
}
