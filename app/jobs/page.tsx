import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'

export const metadata: Metadata = { title: 'DevBase Jobs · DevBase' }

export default function Jobs() {
  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <header className="phead">
        <HeroCanvas variant="silk" className="phead-canvas" />
        <div className="phead-veil" />
        <div className="wrap">
          <span className="eyebrow on-dark">DevBase Jobs · beta gratuito</span>
          <h1>Salário obrigatório. Sempre.</h1>
          <p>O job board honesto pra dev brasileiro. Sem &quot;salário a combinar&quot;, sem vaga fantasma, sem stack inflada. Transparência por padrão.</p>
          <div className="hero-cta" style={{ marginTop: 32 }}>
            <a href="https://dev-base-jobs.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Ver vagas <span className="arr">→</span>
            </a>
            <a href="https://dev-base-jobs.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-lg">
              Publicar vaga grátis
            </a>
          </div>
        </div>
      </header>

      {/* ===== POR QUE É DIFERENTE ===== */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// por que é diferente</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">
            <span className="eyebrow">Por que é diferente</span>
            <h2>Tudo que um job board deveria ter.</h2>
          </Reveal>
          <div className="values">
            <Reveal delay={0}>
              <div className="vcard">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 9c0-1.1.9-2 2-2h2a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h2c1.1 0 2-.9 2-2" />
                    <path d="M12 6v1M12 17v1" />
                  </svg>
                </div>
                <h3>Salário visível</h3>
                <p>Toda vaga mostra a faixa salarial. É regra, não opção. Você não perde tempo com proposta abaixo do esperado.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="vcard">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3>Stack real</h3>
                <p>A stack que aparece na vaga é a que você vai usar. Sem lista inflada de 20 tecnologias que ninguém toca.</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="vcard">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3>Remoto verificado</h3>
                <p>Remoto é remoto. A gente verifica antes de publicar — nada de &quot;remoto&quot; que vira presencial depois.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== VAGAS ILUSTRATIVAS ===== */}
      <section className="sec tight soft">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// exemplo de vagas</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">
            <span className="eyebrow">Exemplo de vagas</span>
            <h2>Transparência logo na lista.</h2>
          </Reveal>
          <Reveal className="joblist">
            <div className="jrow">
              <div className="jl" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>N</div>
              <div>
                <div className="jt">Dev Full-stack Pleno</div>
                <div className="jm">Nubank · remoto · React + Node</div>
              </div>
              <div className="js">R$ 12–16k</div>
            </div>
            <div className="jrow">
              <div className="jl" style={{ background: 'linear-gradient(135deg,#a78bfa,#c084fc)' }}>Q</div>
              <div>
                <div className="jt">Eng. Backend Sênior</div>
                <div className="jm">QuintoAndar · híbrido · Go</div>
              </div>
              <div className="js">R$ 18–24k</div>
            </div>
            <div className="jrow">
              <div className="jl" style={{ background: 'linear-gradient(135deg,#4338ca,#6366f1)' }}>I</div>
              <div>
                <div className="jt">Front-end Júnior</div>
                <div className="jm">iFood · remoto · Next.js</div>
              </div>
              <div className="js">R$ 6–8k</div>
            </div>
            <div className="jrow">
              <div className="jl" style={{ background: 'linear-gradient(135deg,#7c3aed,#a78bfa)' }}>S</div>
              <div>
                <div className="jt">Dev Mobile Flutter</div>
                <div className="jm">Stone · remoto · Flutter</div>
              </div>
              <div className="js">R$ 10–14k</div>
            </div>
          </Reveal>
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
            Vagas ilustrativas. Veja as reais no DevBase Jobs.
          </p>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="sec tight">
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2>Encontre uma vaga que respeita o seu tempo.</h2>
              <p>Gratuito pra devs, sempre. Empresas publicam vagas sem custo durante o beta.</p>
              <div className="hero-cta">
                <a href="https://dev-base-jobs.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Acessar o DevBase Jobs <span className="arr">→</span>
                </a>
                <a href="/produtos" className="btn btn-glass btn-lg">Ver outros produtos</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
