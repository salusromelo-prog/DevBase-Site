import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'
import Aurora from '@/components/Aurora'
import PainTerminal from '@/components/visual/pain-terminal'
import CostMeter from '@/components/visual/cost-meter'
import IdeaDeck from '@/components/visual/idea-deck'

export const metadata: Metadata = {
  title: '100 Micro SaaS — Você não tem falta de skill, tem falta de ideia validada',
  description: '100 ideias de micro SaaS com problema, público, monetização, stack e escopo de MVP. Mais 25 automações prontas pra vender.',
  openGraph: {
    title: '100 Micro SaaS + 25 Automações — DevBase',
    description:
      '100 ideias validadas com problema, público, monetização e stack. Mais 25 automações prontas pra vender.',
    url: 'https://devbase.tools/produto/micro-saas',
    images: [{ url: '/og.png' }],
  },
}

const CHECKOUT = 'https://pay.kiwify.com.br/5cyFrhr'

export default function ProdutoMicroSaas() {
  return (
    <div className="p-micro">
      {/* ===== HERO ===== */}
      <header className="phead">
        <HeroCanvas variant="aurora" className="phead-canvas" />
        <Aurora intensity={0.4} speed={0.8} layers={2} colors={['#0d9488', '#6366f1']} />
        <div className="phead-veil" />
        <div className="wrap">
          <h1 data-split>você não tem falta de skill. tem falta de <span className="grad">ideia validada.</span></h1>
          <p>100 ideias de micro SaaS com problema, público, monetização, stack e escopo de MVP. Mais 25 automações prontas pra vender. O ponto de partida pra quem sabe codar mas não sabe o quê.</p>
          <div className="hero-cta" style={{ marginTop: 36 }}>
            <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Quero as 100 ideias — R$ 29,90 <span className="arr">→</span>
            </a>
            <a href="#como-funciona" className="btn btn-glass btn-lg">Como funciona ↓</a>
          </div>
          <div className="prod-stats">
            <div className="ps-item"><span className="ps-n">100</span><span className="ps-l">ideias</span></div>
            <div className="ps-item"><span className="ps-n">25</span><span className="ps-l">automações</span></div>
            <div className="ps-item"><span className="ps-n">R$29,90</span><span className="ps-l">uma vez</span></div>
          </div>
        </div>
      </header>

      {/* ===== DOR ===== */}
      <section className="sec" data-rail="dor">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// sexta de noite</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">            <h2 data-split>Você sabe construir qualquer coisa. Não sabe o quê.</h2>
            <p>
              Abre o editor com a melhor das intenções. Cria a pasta do projeto. <code>npx create-next-app</code>. E aí... trava. Não no código — na pergunta. <em>O que eu faço?</em><br /><br />
              Vai pro Twitter "buscar inspiração". Duas horas depois fechou o editor sem escrever nada. A ideia que parecia boa na cabeça não tem público, ou já existe, ou você não faz ideia de como cobraria por ela. A página em branco venceu de novo.
            </p>
          </Reveal>
          <Reveal className="pain-terminal">
            <PainTerminal
              label="// sexta de noite, de novo"
              lines={[
                'npx create-next-app ideia-saas',
                '// o que eu faço com isso?',
                'abre Twitter pra buscar inspiração',
                '2h depois — fecha o editor sem escrever nada',
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ===== CUSTO ===== */}
      <section className="sec soft" data-rail="custo">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// o ciclo</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">            <h2 data-split>O problema nunca foi sua capacidade técnica.</h2>
            <p>
              Você tem o skill pra construir um SaaS inteiro. O que falta é a faísca certa — uma ideia que tenha problema real, público que paga, e escopo pequeno o suficiente pra sair em um fim de semana.<br /><br />
              Sem isso, o talento fica parado. Mês após mês, "vou começar um projeto" que nunca começa.
            </p>
          </Reveal>
          <Reveal>
            <CostMeter
              value={6}
              unit="meses"
              label="procurando a ideia certa sem método"
              contrast="R$ 29,90 — 100 ideias filtradas, problema e público documentados"
            />
          </Reveal>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section id="como-funciona" className="sec" data-rail="conteudo">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// o acervo</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head center">            <h2 data-split>100 ideias que já passaram pelo filtro difícil.</h2>
            <p>Cada uma com o que importa pra decidir em 5 minutos se vale construir:</p>
          </Reveal>
          <div className="feat-grid" data-depth-stagger>
            {[
              { t: 'O problema', d: 'A dor real que a ideia resolve' },
              { t: 'O público', d: 'Quem paga e por quê' },
              { t: 'Monetização', d: 'Modelo e faixa de preço sugerida' },
              { t: 'A stack', d: 'O que usar pra construir' },
              { t: 'Escopo do MVP', d: 'O mínimo pra validar rápido' },
              { t: 'Dificuldade', d: 'Fácil, médio ou avançado' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 60} className="depth">
                <div className="fcard">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: 48 }}>
            <div className="bonus-card">
              <span className="eyebrow">// bônus</span>
              <p>E mais <strong>25 automações</strong> prontas — fluxos que você empacota e vende como serviço, sem nem precisar de um SaaS completo.</p>
            </div>
          </Reveal>
          <Reveal style={{ marginTop: 56 }}>
            <div className="idea-deck-wrap">
              <p className="idea-deck-eyebrow">// exemplo de ideia do acervo</p>
              <IdeaDeck />
              <p className="idea-deck-sub">→ 100 cards como esse, com problema, público, monetização, stack e MVP</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== DIFERENCIAL ===== */}
      <section className="sec soft" data-rail="diferencial">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// não é lista de blog</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">            <h2 data-split>"50 ideias de SaaS" do Google é lixo reciclado.</h2>
            <p>
              Você já viu as listas: "app de delivery", "clone do Uber", "rede social pra nicho X". Genéricas, sem público definido, sem modelo de cobrança, copiadas de site gringo.<br /><br />
              Aqui cada ideia foi pensada pro mercado brasileiro, com o caminho de monetização explícito. Não é inspiração vaga — é um plano de partida.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== OBJEÇÃO ===== */}
      <section className="sec" data-rail="objecao">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// "ideia é o de menos"</span><span className="sec-rule__line" /></div>
          <Reveal className="sec-head">            <h2 data-split>Pra quem já começou, sim. Pra quem está parado, é tudo.</h2>
            <p>
              Execução vale mais que ideia — quando você já está executando. Mas se faz seis meses que você "vai começar um projeto" e não saiu do lugar, o que te trava não é execução: é não saber em cima do quê executar.<br /><br />
              R$ 29,90 pra destravar isso é o melhor custo-benefício do seu ano.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== OFERTA ===== */}
      <section className="sec soft" data-rail="oferta">
        <div className="wrap">
          <div className="sec-rule"><span className="sec-rule__line" /><span className="sec-rule__label">// oferta</span><span className="sec-rule__line" /></div>
          <Reveal className="offer-block">            <div className="offer-price">
              <span className="offer-now">R$ 29,90</span>
            </div>
            <p className="offer-sub">100 ideias + 25 automações. Pagamento único. Acesso vitalício ao dashboard, com novas ideias adicionadas.</p>
            <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Quero as 100 ideias — R$ 29,90 <span className="arr">→</span>
            </a>
            <p className="offer-note">acesso imediato após a compra</p>
            <p className="delivery-note">Acesso entregue por e-mail em até 15 minutos após a confirmação do pagamento.</p>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="sec tight" data-rail="comecar">
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="aurora" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2 data-split>Escolhe uma ideia hoje. Lança esse mês.</h2>
              <p>O talento você já tem. Falta só o ponto de partida.</p>
              <div className="hero-cta">
                <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Quero as 100 ideias — R$ 29,90 <span className="arr">→</span>
                </a>
                <a href="/produtos" className="btn btn-glass btn-lg">Ver todos os produtos</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .p-micro .eyebrow { color: #0d9488; font-size: 14px; letter-spacing: 0.12em; }
        .p-micro .phead .wrap { text-align: center; }
        .p-micro .phead h1 { margin-left: auto; margin-right: auto; }
        .p-micro .phead > .wrap > p { margin-left: auto; margin-right: auto; max-width: 56ch; }
        .p-micro .phead .prod-stats { justify-content: center; }
        .p-micro .btn-primary { background: #0d9488; box-shadow: 0 8px 24px -10px rgba(217,119,6,0.5); }
        .p-micro .btn-primary:hover { background: #0f766e; }
        .p-micro .phead h1 .grad {
          background: linear-gradient(110deg, #fde68a, #fbbf24 40%, #fde68a);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .p-micro .offer-now { color: #0d9488; }
        .prod-stats { display: flex; gap: 48px; margin-top: 52px; flex-wrap: wrap; }
        .ps-item { display: flex; flex-direction: column; gap: 4px; align-items: center; }
        .ps-n { font-size: 38px; font-weight: 700; letter-spacing: -0.04em; color: #fff; line-height: 1; }
        .ps-u { font-size: 22px; font-weight: 700; color: rgba(244,243,251,0.7); }
        .ps-l { font-size: 13px; color: rgba(244,243,251,0.55); font-family: var(--mono); }
        .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1100px) { .feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .feat-grid { grid-template-columns: 1fr; } }
        .fcard { border-radius: var(--r); border: 1px solid var(--line); background: var(--bg); padding: 26px; height: 100%; }
        .fcard h3 { font-size: 16px; letter-spacing: -0.02em; margin-bottom: 9px; }
        .fcard p { font-size: 14px; color: var(--body); line-height: 1.6; }
        .bonus-card { border-radius: var(--r); border: 1px solid rgba(217,119,6,0.25); background: rgba(217,119,6,0.06); padding: 28px; }
        .bonus-card p { font-size: 17px; color: var(--body); margin-top: 12px; }
        .p-micro .offer-block { max-width: 560px; border: 1px solid var(--line-2); border-radius: 16px; padding: 48px; background: var(--bg-soft); box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .offer-price { display: flex; align-items: baseline; gap: 16px; margin: 20px 0 16px; }
        .offer-old { font-size: 22px; color: var(--muted); text-decoration: line-through; }
        .offer-now { font-size: 56px; font-weight: 700; letter-spacing: -0.04em; color: var(--primary); line-height: 1; }
        .offer-sub { font-size: 16px; color: var(--body); margin-bottom: 28px; max-width: 50ch; }
        .offer-note { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 14px; }
        .delivery-note { font-family: var(--mono); font-size: 12px; color: var(--muted); opacity: 0.7; text-align: center; margin-top: 8px; }
        /* depth */
        .p-micro .sec:nth-child(even) { background: #f5f5f7; }
        .p-micro .sec { border-top: 2px solid #e2e8f0; counter-increment: p-sec; }
        .p-micro .sec.tight { padding-top: 96px; padding-bottom: 96px; }
        .p-micro .phead-veil { background: radial-gradient(ellipse at 50% 60%, rgba(13,148,136,0.18) 0%, transparent 65%); }
        .p-micro .ctaband-veil { background: radial-gradient(ellipse 70% 50% at 50% -5%, rgba(217,119,6,0.08) 0%, transparent 60%), linear-gradient(180deg, rgba(10,9,19,0.2), rgba(10,9,19,0.7)); }
        .p-micro .ctaband { border-top: 1px solid rgba(255,255,255,0.08); }
        /* section numbers */
        .p-micro { counter-reset: p-sec; }
        .p-micro .sec::before { content: counter(p-sec, decimal-leading-zero); position: absolute; top: -20px; left: -10px; font-size: 120px; font-weight: 900; font-family: var(--mono); color: currentColor; opacity: 0.04; pointer-events: none; user-select: none; z-index: 0; line-height: 1; }
      `}</style>
    </div>
  )
}
