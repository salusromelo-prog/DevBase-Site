'use client'

import HeroCanvas from './hero-canvas'
import Aurora from './Aurora'

export default function HomeHero() {
  return (
    <header className="hero">
      <HeroCanvas variant="silk" className="hero-canvas" />
      {/* a mais viva do site — acima do canvas, abaixo do veil/conteúdo */}
      <Aurora intensity={1} />
      <div className="hero-veil" />
      <div className="wrap hero-inner">
        <h1>
          <span className="grad">Construa. Lance. Cresça.</span>
        </h1>
        <p className="hero-sub">
          Ferramentas para quem desenvolve. Sites para quem empreende.{' '}
          Software feito em Goiânia, para o Brasil.
        </p>
        <div className="hero-cta">
          <a href="/produtos" className="btn btn-primary btn-lg">
            Ver produtos <span className="arr">→</span>
          </a>
          <a href="/empresas" className="btn btn-glass btn-lg">Quero um site para minha empresa</a>
        </div>
      </div>
      <div className="scrollcue">
        <span className="ln" />
        scroll
      </div>
    </header>
  )
}
