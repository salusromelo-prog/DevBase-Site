import type { Metadata } from 'next'
import HomeHero from '@/components/home-hero'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'
import SectionShell from '@/components/visual/section-shell'
import SectionTransition from '@/components/visual/section-transition'
import CodeDissolve from '@/components/visual/code-dissolve'
import AccentBleed from '@/components/visual/accent-bleed'

export const metadata: Metadata = {
  title: 'DevBase — Construa. Lance. Cresça.',
  description:
    'Empresa brasileira de tecnologia. Produtos para desenvolvedores e sites profissionais para empresas. Feito em Goiânia, para o Brasil.',
  openGraph: {
    title: 'DevBase — Construa. Lance. Cresça.',
    description:
      'Empresa brasileira de tecnologia. Produtos para desenvolvedores e sites profissionais para empresas. Feito em Goiânia, para o Brasil.',
    url: 'https://devbase.tools',
    images: [{ url: '/og.png' }],
  },
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function Home() {
  return (
    <>
      <HomeHero />
      <SectionTransition />

      {/* ===== STACK STRIP ===== */}
      <section className="strip sx-curtain">
        <div className="wrap"><div className="strip-lbl">A stack que já vem configurada</div></div>
        <div className="strip-track">
          {['Next.js 14', 'TypeScript 5.4', 'Supabase', 'Pagar.me PIX', 'Tailwind CSS', 'Resend', 'Vercel', 'Boleto · Cartão',
            'Next.js 14', 'TypeScript 5.4', 'Supabase', 'Pagar.me PIX', 'Tailwind CSS', 'Resend', 'Vercel', 'Boleto · Cartão'].map((item, i) => (
            <span key={i} className="strip-item">{item}</span>
          ))}
        </div>
      </section>

      {/* ===== POR QUE EXISTIMOS ===== */}
      <SectionShell rail="por-que" bleed="tr" style={{ borderTop: '2px solid #e2e8f0' }}>
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// por que existimos</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">
            <span className="eyebrow">Por que existimos</span>
            <h2 data-split>O dev brasileiro merece ferramentas feitas pra ele.</h2>
            <p>Não adaptações mal traduzidas. Produtos que entendem a nossa realidade — do pagamento à documentação.</p>
          </Reveal>
          <div className="values">
            <Reveal delay={0} className="depth">
              <div className="vcard">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 9c0-1.1.9-2 2-2h2a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h2c1.1 0 2-.9 2-2" />
                    <path d="M12 6v1M12 17v1" />
                  </svg>
                </div>
                <h3>Preço em real</h3>
                <p>Sem conversão de dólar, sem IOF, sem surpresa no cartão. Pagamento único em PIX, boleto ou cartão.</p>
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
                <h3>Docs em português</h3>
                <p>Tutoriais, exemplos e suporte 100% em PT-BR. Você não precisa traduzir nada pra começar a construir.</p>
              </div>
            </Reveal>
            <Reveal delay={160} className="depth">
              <div className="vcard">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3>Feito pra nossa stack</h3>
                <p>Pagar.me, Mercado Pago, Next.js e Supabase já integrados. Nada de gambiarra pra funcionar no Brasil.</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="code-dissolve">
            <CodeDissolve />
          </Reveal>
        </div>
      </SectionShell>

      {/* ===== SHOWCASE — Boilerplate ===== */}
      <SectionShell rail="boilerplate" soft style={{ borderTop: '2px solid #e2e8f0' }}>
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// produto em destaque</span><span className="sec-rule__line" /></div>
          <div className="showcase">
            <Reveal className="sc-copy">
              <span className="eyebrow">Produto em destaque</span>
              <h2 data-split>Do repositório ao mercado, em dias.</h2>
              <p className="lead">O DevBase Boilerplate entrega a parte chata já pronta — auth, pagamentos, dashboard e deploy. Você foca no que torna o seu produto único.</p>
              <ul className="sc-list">
                <li><span className="ck">{CHECK}</span>Auth completo com Supabase + magic link</li>
                <li><span className="ck">{CHECK}</span>Pagar.me integrado — PIX, boleto e cartão</li>
                <li><span className="ck">{CHECK}</span>Dashboard, painel admin e billing portal</li>
              </ul>
              <a href="/produto/boilerplate" className="btn btn-dark">Ver o boilerplate <span className="arr">→</span></a>
            </Reveal>
            <Reveal className="blur">
              <div className="codecard">
                <div className="browser-bar">
                  <i /><i /><i />
                  <span className="url">~/meu-saas — zsh</span>
                </div>
                <div className="cc-body">
                  <div><span className="p">~</span> <span className="d">$</span> npx create-devbase-app meu-saas</div>
                  <div className="ok">✓ clonando template</div>
                  <div className="ok">✓ instalando dependências (1.2k)</div>
                  <div className="ok">✓ configurando .env · supabase · pagar.me</div>
                  <div><span className="p">~/meu-saas</span> <span className="d">$</span> pnpm dev</div>
                  <div className="k">▲ next.js 14.2.0 — ready in 1.4s</div>
                  <div className="d">&nbsp;&nbsp;➜ auth ✓ &nbsp; payments ✓ &nbsp; db ✓</div>
                  <div><span className="p">~/meu-saas</span> <span className="d">$</span> <span className="cc-caret" /></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* ===== PRODUCT CATALOG OVERVIEW ===== */}
      <SectionShell rail="catalogo" bleed="bl" style={{ borderTop: '2px solid #e2e8f0' }}>
        <div className="wrap wrap-wide">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// para devs — pagamento único, sem assinatura</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head center">
            <span className="eyebrow center">O catálogo</span>
            <h2 data-split>Tudo que a DevBase construiu.</h2>
            <p>Produtos avulsos que resolvem problemas reais. Pagamento único ou gratuito — sem assinatura.</p>
          </Reveal>
          <div className="cards">
            <Reveal delay={0} className="pcard span6">
              <div className="ptop"><span className="pchip live"><span className="d" />ao vivo · novo</span></div>
              <h3>100 Micro SaaS + 25 Automações</h3>
              <p className="pdesc">100 ideias validadas com problema, público, monetização, stack e MVP — prontas pra executar.</p>
              <div className="pfoot">
                <div className="price"><span className="now green">R$ 29,90</span><span className="s">pagamento único · vitalício</span></div>
                <a href="/produto/micro-saas" className="btn btn-primary btn-sm">Detalhes <span className="arr">→</span></a>
              </div>
            </Reveal>
            <Reveal delay={80} className="pcard span6">
              <div className="ptop"><span className="pchip live"><span className="d" />ao vivo</span></div>
              <h3>DevBase Boilerplate</h3>
              <p className="pdesc">Kit Next.js completo pra lançar SaaS no Brasil. Auth, pagamentos, dashboard e deploy configurados.</p>
              <div className="pfoot">
                <div className="price"><span className="old">R$ 297</span><span className="now green">R$ 147</span><span className="s">acesso vitalício</span></div>
                <a href="/produto/boilerplate" className="btn btn-primary btn-sm">Detalhes <span className="arr">→</span></a>
              </div>
            </Reveal>
            <Reveal delay={0} className="pcard span4">
              <div className="ptop"><span className="pchip live"><span className="d" />ao vivo</span></div>
              <h3>DevBase Components</h3>
              <p className="pdesc">8 componentes React pro mercado BR: CPF, CNPJ, CEP, PIX e cartão.</p>
              <div className="pfoot">
                <div className="price"><span className="now indigo">R$ 67</span><span className="s">vitalício</span></div>
                <a href="/produto/components" className="btn btn-line btn-sm">Detalhes</a>
              </div>
            </Reveal>
            <Reveal delay={80} className="pcard span4">
              <div className="ptop"><span className="pchip"><span className="d" style={{ background: 'var(--violet)' }} />✦ combo</span></div>
              <h3>Boilerplate + Components</h3>
              <p className="pdesc">Os dois produtos juntos, com desconto. Tudo pra lançar do zero.</p>
              <div className="pfoot">
                <div className="price"><span className="old">R$ 214</span><span className="now green">R$ 197</span><span className="s">economia de R$ 17</span></div>
                <a href="/produto/combo" className="btn btn-line btn-sm">Detalhes</a>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* ===== FIGURES ===== */}
      <SectionShell tight soft style={{ borderTop: '2px solid #e2e8f0', paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="wrap wrap-wide">
          <div className="figs">
            <Reveal delay={0} className="fig">
              <div className="n" data-count="5">0</div>
              <div className="fig-bar"><span className="fig-bar__fill" /></div>
              <div className="l">produtos no ar</div>
            </Reveal>
            <Reveal delay={80} className="fig">
              <div className="n">2025</div>
              <div className="fig-bar"><span className="fig-bar__fill" /></div>
              <div className="l">fundada em Goiânia</div>
            </Reveal>
            <Reveal delay={160} className="fig">
              <div className="n">100<span className="u">%</span></div>
              <div className="fig-bar"><span className="fig-bar__fill" /></div>
              <div className="l">em português</div>
            </Reveal>
            <Reveal delay={240} className="fig">
              <div className="n" data-count="3">0</div>
              <div className="fig-bar"><span className="fig-bar__fill" /></div>
              <div className="l">devs construindo</div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* ===== PARA EMPRESAS ===== */}
      <section id="empresas" style={{
        background: '#f5f5f7',
        padding: '120px 0',
      }}>
        <div className="wrap" style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
          <Reveal>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: '#6366f1',
              letterSpacing: '0.05em',
              marginBottom: '40px',
            }}>// para empresas</span>
            <h2 style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 400,
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1a1a1a',
              marginBottom: '48px',
            }}>
              Seu cliente já procurou você no Google hoje.{' '}
              O que ele encontrou?
            </h2>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#444', marginBottom: '24px' }}>
              Se a resposta é &quot;nada&quot; — ou pior, o concorrente — você está perdendo
              cliente sem nem ficar sabendo. Cartão de visita fica na gaveta.
              Instagram sozinho não convence quem vai gastar dinheiro de verdade.
            </p>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#444', marginBottom: '24px' }}>
              Um site profissional trabalha por você o dia inteiro: aparece quando
              procuram pelo seu serviço, responde as perguntas de sempre e passa
              confiança antes mesmo da primeira conversa. Inclusive às onze da noite
              de um domingo.
            </p>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#444', marginBottom: '56px' }}>
              A DevBase constrói sites com a mesma engenharia dos produtos que
              programadores pagam para usar. Rápido de abrir, seguro, e desenhado
              para o seu negócio — não um modelo pronto com o seu logo em cima.
            </p>
            <h3 style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 600,
              fontSize: 'clamp(22px, 3vw, 30px)',
              color: '#1a1a1a',
              marginBottom: '28px',
            }}>Como funciona</h3>
            <ol style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 56px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {[
                'Conversa — você conta o que precisa. Sem compromisso.',
                'Proposta — escopo e valor claros, sem surpresa no meio do caminho.',
                'Site no ar — você acompanha tudo até a publicação.',
              ].map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', fontSize: '18px', color: '#444', lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700, color: '#1a1a1a', minWidth: '24px' }}>{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <a
              href="https://wa.me/5562999071814?text=Ol%C3%A1!%20Quero%20um%20site%20para%20minha%20empresa."
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#25D366',
                color: '#fff',
                fontWeight: 700,
                fontSize: '17px',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              Chamar no WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <SectionShell rail="manifesto" bleed="center" style={{ borderTop: '2px solid #e2e8f0' }}>
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// manifesto</span><span className="sec-rule__line" /></div>
          <Reveal className="manifesto blur depth">
            <span className="eyebrow center" style={{ marginBottom: 28 }}>Manifesto</span>
            <p>A internet brasileira não precisa de mais <span className="ac">promessa</span>. Precisa de <span className="on">coisa no ar</span>. A DevBase é a base que você constrói em cima.</p>
          </Reveal>
        </div>
      </SectionShell>

      {/* ===== CTA BAND ===== */}
      <SectionShell rail="comecar" tight style={{ borderTop: '2px solid #e2e8f0', paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <AccentBleed corner="center" size={70} intensity={0.12} />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2 data-split>Construa em cima de uma base que já funciona.</h2>
              <p>Ferramentas feitas por devs brasileiros, pro mercado brasileiro. Comece pelo que faz sentido pra você.</p>
              <div className="hero-cta">
                <a href="/produtos" className="btn btn-primary btn-lg">Ver todos os produtos <span className="arr">→</span></a>
                <a href="/empresa" className="btn btn-glass btn-lg">Conhecer a DevBase</a>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  )
}
