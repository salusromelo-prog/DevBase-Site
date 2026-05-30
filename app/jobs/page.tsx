import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'

export const metadata: Metadata = { title: 'Jobs · DevBase' }

export default function Jobs() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Reveal>
            <SectionLabel>// devbase jobs</SectionLabel>
          </Reveal>
          <Reveal>
            <h1>O job board para devs brasileiros.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">Salário obrigatório. Stack real. Remoto verificado. Sem enrolação.</p>
          </Reveal>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">

          {/* Card principal */}
          <Reveal>
            <article className="product" style={{ maxWidth: 680 }}>
              <div><span className="badge badge-beta">◉ beta gratuito</span></div>
              <h3>DevBase Jobs</h3>
              <p className="desc">
                Job board pra dev brasileiro. Sem vaga fake, sem &ldquo;salário a combinar&rdquo;, sem stack inflada. Transparência por padrão.
              </p>
              <ul>
                <li>Salário obrigatório em toda vaga</li>
                <li>Stack real do dia a dia</li>
                <li>Remoto verificado</li>
                <li>Alertas por e-mail da sua stack</li>
                <li>Publicação de vaga grátis pra empresas</li>
              </ul>
              <div className="ft">
                <div className="price">
                  <span className="big indigo">Grátis</span>
                  <span className="small">em beta · sempre gratuito pra devs</span>
                </div>
                <a
                  href="https://devbase.jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Acessar vagas <span className="arrow">→</span>
                </a>
              </div>
            </article>
          </Reveal>

          {/* Por que criamos */}
          <Reveal>
            <div className="section-head" style={{ marginTop: 72 }}>
              <SectionLabel>// por que criamos</SectionLabel>
              <h2>Porque &ldquo;salário a combinar&rdquo; é desrespeito.</h2>
              <p>Dev BR merece saber o salário antes de fazer entrevista. Simples assim.</p>
            </div>
          </Reveal>

          <div className="grid-3 stagger" style={{ marginTop: 0 }}>
            <Reveal>
              <div className="feat">
                <div className="ico" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 9c0-1.1.9-2 2-2h2a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h2c1.1 0 2-.9 2-2" />
                    <path d="M12 6v1M12 17v1" />
                  </svg>
                </div>
                <h3>Salário obrigatório</h3>
                <p>Toda vaga precisa informar a faixa salarial. Sem exceção. Sem &ldquo;a combinar&rdquo;.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="feat">
                <div className="ico" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3>Stack real</h3>
                <p>Listamos o que você vai usar de verdade, não a buzzword word do deck do investidor.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="feat">
                <div className="ico" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3>Remoto verificado</h3>
                <p>Remoto real: sem &ldquo;híbrido obrigatório&rdquo;, sem &ldquo;remoto mas na cidade X&rdquo;.</p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>
    </>
  )
}
