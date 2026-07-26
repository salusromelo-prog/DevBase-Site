import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import SobreFocusScroll from '@/components/sobre-focus-scroll'

export const metadata: Metadata = {
  title: 'Sobre · DevBase',
  description: 'Empresa de tecnologia de Goiânia. Produtos para devs, sites e sistemas para empresas. Fundada em 2025.',
}

export default function Sobre() {
  return (
    <div className="page-dark">
      <header className="page-head">
        <div className="wrap">
          <Reveal>
            <SectionLabel>// sobre a DevBase</SectionLabel>
          </Reveal>
          <Reveal>
            <h1>Uma empresa de tecnologia de Goiânia.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">Construímos produtos para quem desenvolve e sites para quem empreende.</p>
          </Reveal>
        </div>
      </header>

      {/* foco que se desloca — a história inteira, controlada por scroll */}
      <SobreFocusScroll />

      {/* fecho em duas vozes — continuação direta da bifurcação de M6 */}
      <section className="sobre-split">
        <a href="/produtos" className="split-half split-dev">
          <span className="split-q">Constrói produtos?</span>
          <span className="split-link">Ver o catálogo <span className="split-arr">→</span></span>
        </a>
        <a href="/empresas" className="split-half split-biz">
          <span className="split-q">Tem uma empresa?</span>
          <span className="split-link">Conhecer as soluções <span className="split-arr">→</span></span>
        </a>
      </section>
    </div>
  )
}
