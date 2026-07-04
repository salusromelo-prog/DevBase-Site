import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'
import PainChips from '@/components/pain-chips'
import NewsletterForm from '@/components/newsletter-form'
import SectionShell from '@/components/visual/section-shell'
import SectionTransition from '@/components/visual/section-transition'

export const metadata: Metadata = { title: 'Empresa · DevBase' }

export default function Empresa() {
  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <header className="phead">
        <HeroCanvas variant="silk" className="phead-canvas" />
        <div className="phead-veil" />
        <div className="wrap">
          <span className="eyebrow on-dark">Quem somos</span>
          <h1 data-split>Três devs de Goiânia. Construindo do zero.</h1>
          <p>Sem investidor, sem escritório, sem frescura. Código, design, suporte e conteúdo — tudo na mão.</p>
        </div>
      </header>
      <SectionTransition />

      {/* ===== HISTÓRIA ===== */}
      <SectionShell rail="historia" bleed="tr" className="sx-curtain">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// nossa história</span><span className="sec-rule__line" /></div>
          <div className="showcase">
            <Reveal className="sc-copy">
              <span className="eyebrow">Nossa história</span>
              <h2>Nasceu da frustração de quem vive o mercado tech BR.</h2>
            </Reveal>
            <Reveal>
              <div style={{ fontSize: 18, color: 'var(--body)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 18 }}>
                  Boilerplate genérico que assume Stripe. Vagas com &quot;salário a combinar&quot;. Ferramentas em inglês com docs que ninguém traduz. Suporte que demora 3 dias pra responder uma issue.
                </p>
                <p style={{ marginBottom: 18 }}>
                  Decidimos construir o que gostaríamos de ter. Produto por produto. Do zero. Em português. <strong style={{ color: 'var(--ink)' }}>Samuel</strong>, <strong style={{ color: 'var(--ink)' }}>Isaque</strong> e <strong style={{ color: 'var(--ink)' }}>Daniel</strong> tocam tudo.
                </p>
                <p>
                  Começamos em 2025 com produtos no ar e uma promessa simples: <strong style={{ color: 'var(--ink)' }}>lançamos coisa pronta. Não vendemos promessa.</strong>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* ===== TIMELINE ===== */}
      <SectionShell rail="timeline" tight soft>
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// a linha do tempo</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">
            <span className="eyebrow">A linha do tempo</span>
            <h2>Do incômodo ao produto.</h2>
          </Reveal>
          <Reveal className="timeline">
            <span className="tl-spine" aria-hidden="true" />
            <div className="tl-row">
              <div className="yr">2025</div>
              <div>
                <h3>A DevBase nasce</h3>
                <p>Três devs decidem parar de reclamar e começar a construir as ferramentas que faltavam pro mercado brasileiro.</p>
              </div>
            </div>
            <div className="tl-row">
              <div className="yr">2025</div>
              <div>
                <h3>Boilerplate + Components</h3>
                <p>Os primeiros produtos no ar: um kit SaaS pronto pro Brasil e uma biblioteca de componentes React com CPF, CNPJ, CEP, PIX e cartão.</p>
              </div>
            </div>
            <div className="tl-row">
              <div className="yr">2026</div>
              <div>
                <h3>100 Micro SaaS</h3>
                <p>100 ideias validadas + 25 automações — a entrada perfeita pra quem quer lançar o primeiro produto.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* ===== VALORES ===== */}
      <SectionShell rail="valores" bleed="bl">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// nossos valores</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">
            <span className="eyebrow">Nossos valores</span>
            <h2 data-split>Três regras. Nenhuma negociável.</h2>
          </Reveal>
          <div className="values">
            <Reveal delay={0} className="depth">
              <div className="vcard">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3>Transparência acima de tudo</h3>
                <p>Preço visível, stack real, salário obrigatório. Nenhum produto nosso esconde o que importa.</p>
              </div>
            </Reveal>
            <Reveal delay={80} className="depth">
              <div className="vcard">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h3>Português primeiro</h3>
                <p>Documentação, suporte e produto em PT-BR. O dev br não precisa traduzir pra usar ferramenta boa.</p>
              </div>
            </Reveal>
            <Reveal delay={160} className="depth">
              <div className="vcard">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
                  </svg>
                </div>
                <h3>Real antes de escala</h3>
                <p>Não lançamos promessa, lançamos produto. Sem &quot;em breve&quot; sem data marcada.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* ===== MANIFESTO ===== */}
      <SectionShell id="manifesto" rail="manifesto" soft bleed="center">
        <div className="wrap">
          <Reveal className="manifesto blur depth">
            <span className="eyebrow center" style={{ marginBottom: 28 }}>Manifesto</span>
            <p>A internet brasileira não precisa de mais <span className="ac">promessa</span>. Precisa de <span className="on">coisa no ar</span>. A DevBase é a base que você constrói em cima.</p>
          </Reveal>
        </div>
      </SectionShell>

      {/* ===== TIME ===== */}
      <SectionShell id="time">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// o time</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">
            <span className="eyebrow">O time</span>
            <h2>Quem está construindo.</h2>
          </Reveal>
          <div className="team">
            <Reveal delay={0}>
              <div className="member">
                <div className="av">SL</div>
                <div className="nm">Samuel Lustosa Rodrigues Melo</div>
                <div className="rl">founder · dev</div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="member">
                <div className="av">IL</div>
                <div className="nm">Isaque Lustosa Rodrigues Melo</div>
                <div className="rl">co-founder</div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="member">
                <div className="av">DO</div>
                <div className="nm">Daniel de Oliveira Pimenta Melo</div>
                <div className="rl">co-founder</div>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* ===== PARTICIPE ===== */}
      <SectionShell rail="participe" tight soft>
        <div className="wrap wrap-wide">
          <Reveal className="sec-head">
            <span className="eyebrow">Participe</span>
            <h2>Sua voz vira o próximo produto.</h2>
          </Reveal>
          <div className="panels">
            <Reveal className="panel">
              <span className="eyebrow">Sua dor como dev</span>
              <h3>Qual é o seu maior problema?</h3>
              <p>Marca o que mais te incomoda — ou escreve com suas palavras.</p>
              <PainChips />
            </Reveal>
            <Reveal delay={80} className="panel">
              <span className="eyebrow">Fique por dentro</span>
              <h3>Novos produtos em breve.</h3>
              <p>Deixa seu e-mail e a gente avisa quando lançar algo novo. Sem spam.</p>
              <NewsletterForm />
              <div style={{ marginTop: 26, borderTop: '1px solid var(--line)', paddingTop: 22 }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Roadmap aberto</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14.5, color: 'var(--body)' }}>
                  <div><span style={{ color: 'var(--signal)', fontWeight: 700 }}>✓</span>&nbsp; 100 Micro SaaS <span style={{ color: 'var(--muted)' }}>· lançado</span></div>
                  <div><span style={{ color: 'var(--signal)', fontWeight: 700 }}>✓</span>&nbsp; Components BR <span style={{ color: 'var(--muted)' }}>· lançado</span></div>
                  <div><span style={{ color: 'var(--primary)', fontWeight: 700 }}>▸</span>&nbsp; próximo produto <span style={{ color: 'var(--muted)' }}>· quando estiver pronto</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* ===== CTA BAND ===== */}
      <SectionShell tight>
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2>Feito por devs BR, pra devs BR.</h2>
              <p>Conheça as ferramentas que a gente construiu pra deixar a vida do dev brasileiro mais fácil.</p>
              <div className="hero-cta">
                <a href="/produtos" className="btn btn-primary btn-lg">Ver produtos <span className="arr">→</span></a>
                <a href="/#empresas" className="btn btn-glass btn-lg">Sites para empresas</a>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  )
}
