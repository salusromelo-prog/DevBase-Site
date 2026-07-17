import type { Metadata } from 'next'
import HomeHero from '@/components/home-hero'
import Aurora from '@/components/Aurora'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'
import SectionShell from '@/components/visual/section-shell'
import AccentBleed from '@/components/visual/accent-bleed'
import BizArt from '@/components/biz-art'
import BizReveal from '@/components/biz-reveal'

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

      {/* faixa dark contínua: UMA aurora por trás de todas as seções
          (não uma por seção); a máscara esmaece nas bordas claras */}
      <div className="dark-zone">
      <Aurora className="aurora-fx--mask" intensity={0.55} />

      {/* ===== A DEVBASE — faixa institucional ===== */}
      <section className="who">
        <div className="wrap">
          <Reveal>
            <span className="who-label">// a devbase</span>
            <p className="who-text">
              Somos uma empresa de tecnologia de Goiânia, fundada em 2025. Três pessoas
              construindo produtos para quem desenvolve e sites para quem empreende.
            </p>
            <p className="who-manifesto">
              A internet brasileira não precisa de mais <span className="ac">promessa</span>.
              Precisa de coisa no ar.
            </p>
            <a href="/sobre" className="who-link">Conhecer a DevBase →</a>
          </Reveal>
        </div>
      </section>

      {/* ===== STACK STRIP ===== */}
      <section className="strip sec-dark">
        <div className="wrap"><div className="strip-lbl">A stack que já vem configurada</div></div>
        <div className="strip-mask">
        <div className="strip-track">
          {['Next.js 14', 'TypeScript 5.4', 'Supabase', 'Pagar.me PIX', 'Tailwind CSS', 'Resend', 'Vercel', 'Boleto · Cartão',
            'Next.js 14', 'TypeScript 5.4', 'Supabase', 'Pagar.me PIX', 'Tailwind CSS', 'Resend', 'Vercel', 'Boleto · Cartão'].map((item, i) => (
            <span key={i} className="strip-item">{item}</span>
          ))}
        </div>
        </div>
      </section>

      {/* ===== POR QUE EXISTIMOS + PRODUTO EM DESTAQUE (fundidas) ===== */}
      <SectionShell rail="por-que" tone="dark" bleed="tr" className="sec-dark sec-dark--alt">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// por que existimos</span><span className="sec-rule__line" /></div>
          <div className="showcase">
            <Reveal className="sc-copy">
              <span className="eyebrow on-dark">Por que existimos</span>
              <h2 data-split>O dev brasileiro merece ferramentas feitas pra ele.</h2>
              <p className="lead">
                Não adaptações mal traduzidas. Produtos que entendem a nossa realidade —
                do pagamento à documentação. O DevBase Boilerplate entrega a parte chata
                já pronta: você foca no que torna o seu produto único.
              </p>
              <ul className="sc-list">
                <li><span className="ck">{CHECK}</span>Preço em real — PIX, boleto e cartão, sem IOF</li>
                <li><span className="ck">{CHECK}</span>Docs, tutoriais e suporte 100% em PT-BR</li>
                <li><span className="ck">{CHECK}</span>Auth, pagamentos, dashboard e deploy configurados</li>
              </ul>
              <a href="/produto/boilerplate" className="btn btn-primary">Ver o boilerplate <span className="arr">→</span></a>
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
      <SectionShell rail="catalogo" tone="dark" bleed="bl" className="sec-dark">
        <div className="wrap wrap-wide">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// para devs — pagamento único, sem assinatura</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head center">
            <span className="eyebrow on-dark center">O catálogo</span>
            <h2 data-split>Tudo que a DevBase construiu.</h2>
            <p>Produtos avulsos que resolvem problemas reais. Pagamento único ou gratuito — sem assinatura.</p>
          </Reveal>
          <div className="cards">
            <Reveal delay={0} className="pcard span6 glow-teal">
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
            <Reveal delay={0} className="pcard span4 glow-violet">
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
          <Reveal>
            <div className="catalog-note">4 produtos no ar · Goiânia, desde 2025</div>
          </Reveal>
        </div>
      </SectionShell>
      </div>{/* /dark-zone */}

      {/* ===== PARA EMPRESAS — teaser (claro: aurora não entra) ===== */}
      <section id="empresas" className="biz-teaser">
        <div className="wrap">
          <div className="biz-grid2">
            <BizReveal>
              <span className="biz-label">// para empresas</span>
              <h2>Seu negócio precisa estar <em>no ar</em>.</h2>
              <p>
                A mesma engenharia dos nossos produtos, a serviço do seu negócio.
                Sites profissionais e sistemas sob medida — do jeito que a sua
                empresa precisa.
              </p>
              <a href="/empresas" className="btn btn-dark">Conhecer <span className="arr">→</span></a>
            </BizReveal>
            <BizReveal delay={150}>
              <BizArt className="biz-art--sm" />
            </BizReveal>
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <SectionShell rail="comecar" tone="dark" tight className="sec-dark sec-dark--alt">
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
                <a href="/sobre" className="btn btn-glass btn-lg">Conhecer a DevBase</a>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  )
}
