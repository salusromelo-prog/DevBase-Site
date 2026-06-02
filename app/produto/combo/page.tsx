import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'

export const metadata: Metadata = {
  title: 'Combo DevBase — A base e as peças. O kit completo pra lançar.',
  description: 'Boilerplate + Components juntos. A fundação do SaaS e os 8 componentes brasileiros — tudo que você precisa do login ao checkout, com desconto.',
}

const CHECKOUT = 'https://pay.kiwify.com.br/Y6jViIR'

export default function ProdutoCombo() {
  return (
    <div className="p-combo">
      {/* ===== HERO ===== */}
      <header className="phead">
        <HeroCanvas variant="silk" className="phead-canvas" />
        <div className="phead-veil" />
        <div className="wrap">
          <span className="eyebrow center on-dark">// combo · R$ 197</span>
          <h1 data-split>a base <span className="grad">e</span> as peças. o kit completo pra lançar.</h1>
          <p>Boilerplate + Components juntos. A fundação do SaaS e os 8 componentes brasileiros — tudo que você precisa do login ao checkout, com desconto.</p>
          <div className="combo-badge">
            <span className="combo-old">R$ 214</span>
            <span className="combo-now">R$ 197</span>
            <span className="combo-save">economize R$ 17</span>
          </div>
          <div className="hero-cta" style={{ marginTop: 36 }}>
            <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Comprar o combo — R$ 197 <span className="arr">→</span>
            </a>
            <a href="#inclui" className="btn btn-glass btn-lg">Ver o que inclui ↓</a>
          </div>
        </div>
      </header>

      {/* ===== ARGUMENTO ===== */}
      <section className="sec" data-rail="argumento">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// faz sentido junto</span>
            <h2 data-split>O Boilerplate te dá a estrutura. Os Components, os detalhes.</h2>
            <p>
              O Boilerplate resolve auth, pagamento, dashboard e deploy — o esqueleto do SaaS. Mas todo formulário brasileiro ainda precisa de CPF validado, CEP que preenche, botão PIX que funciona. É aí que entram os Components.<br /><br />
              Sozinhos, cada um resolve uma parte. Juntos, cobrem do login ao checkout sem buraco.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== O QUE INCLUI ===== */}
      <section id="inclui" className="sec soft" data-rail="inclui">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow">// dois produtos, um preço</span>
            <h2 data-split>Tudo do Boilerplate. Tudo dos Components.</h2>
          </Reveal>
          <div className="combo-cols" data-depth-stagger>
            <Reveal className="depth">
              <div className="combo-col">
                <div className="combo-col-head">
                  <span className="combo-col-tag">Boilerplate</span>
                  <span className="combo-col-price">R$ 147</span>
                </div>
                <ul className="combo-list">
                  {[
                    'Next.js 14 + TypeScript + Tailwind',
                    'Auth Supabase completo',
                    'Pagar.me — PIX, boleto e cartão',
                    'Dashboard com métricas',
                    'Painel admin',
                    'E-mail transacional com Resend',
                    'Deploy Vercel em 1 clique',
                    'Documentação 100% PT-BR',
                  ].map((item, i) => (
                    <li key={i}><span className="b">+</span>{item}</li>
                  ))}
                </ul>
                <a href="/produto/boilerplate" className="btn btn-line btn-sm" style={{ marginTop: 24 }}>
                  Ver detalhes do Boilerplate
                </a>
              </div>
            </Reveal>
            <Reveal delay={100} className="depth">
              <div className="combo-col">
                <div className="combo-col-head">
                  <span className="combo-col-tag">Components</span>
                  <span className="combo-col-price">R$ 67</span>
                </div>
                <ul className="combo-list">
                  {[
                    'Input CPF/CNPJ com validação',
                    'CEP com busca ViaCEP',
                    'Telefone BR com máscara',
                    'Seletor de banco (20 bancos)',
                    'PIX Button com QR Code',
                    'Input de cartão com Luhn',
                    '100% TypeScript, sem `any`',
                    'Zero dependências pesadas',
                  ].map((item, i) => (
                    <li key={i}><span className="b">+</span>{item}</li>
                  ))}
                </ul>
                <a href="/produto/components" className="btn btn-line btn-sm" style={{ marginTop: 24 }}>
                  Ver detalhes dos Components
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== A CONTA ===== */}
      <section className="sec" data-rail="conta">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// a matemática</span>
            <h2 data-split>R$ 147 + R$ 67 = R$ 214. No combo, R$ 197.</h2>
            <p>
              Você leva os dois por menos do que custam separados. Não é muito desconto — é honesto. Mas se você vai usar os dois (e vai, se está lançando um SaaS pro Brasil), não faz sentido pagar mais caro comprando avulso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== OFERTA ===== */}
      <section className="sec soft" data-rail="oferta">
        <div className="wrap">
          <Reveal className="offer-block">
            <span className="eyebrow">// oferta</span>
            <div className="offer-price">
              <span className="offer-old">R$ 214</span>
              <span className="offer-now">R$ 197</span>
            </div>
            <p className="offer-sub">Os dois produtos, acesso vitalício a ambos, pagamento único. Atualizações incluídas.</p>
            <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Comprar o combo — R$ 197 <span className="arr">→</span>
            </a>
            <p className="offer-note">acesso imediato aos dois após a compra</p>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="sec tight" data-rail="comecar">
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2 data-split>Pega a base e as peças de uma vez. Começa a construir.</h2>
              <div className="hero-cta">
                <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Comprar o combo — R$ 197 <span className="arr">→</span>
                </a>
                <a href="/produtos" className="btn btn-glass btn-lg">Ver produtos avulsos →</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .p-combo .eyebrow { color: #818cf8; font-size: 14px; letter-spacing: 0.12em; }
        .p-combo .phead .wrap { text-align: center; }
        .p-combo .phead h1 { margin-left: auto; margin-right: auto; }
        .p-combo .phead > .wrap > p { margin-left: auto; margin-right: auto; max-width: 56ch; }
        .p-combo .btn-primary {
          background: linear-gradient(110deg, #6366f1, #8b5cf6);
          box-shadow: 0 8px 24px -10px rgba(99,102,241,0.6);
          border: none;
        }
        .p-combo .btn-primary:hover {
          background: linear-gradient(110deg, #4f46e5, #7c3aed);
          transform: translateY(-2px);
        }
        .p-combo .phead h1 .grad {
          background: linear-gradient(110deg, #a5b4fc, #c4b5fd);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .combo-badge { display: flex; align-items: baseline; justify-content: center; gap: 12px; margin: 28px 0 0; flex-wrap: wrap; }
        .combo-old { font-size: 20px; color: rgba(244,243,251,0.45); text-decoration: line-through; }
        .combo-now { font-size: 44px; font-weight: 700; letter-spacing: -0.04em; color: #fff; line-height: 1; }
        .combo-save { font-family: var(--mono); font-size: 13px; color: #86efac; padding: 5px 10px; border-radius: 999px; border: 1px solid rgba(134,239,172,0.3); }
        .combo-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 720px) { .combo-cols { grid-template-columns: 1fr; } }
        .combo-col { border-radius: var(--r); border: 1px solid var(--line); background: var(--bg); padding: 30px; height: 100%; display: flex; flex-direction: column; }
        .combo-col-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 20px; }
        .combo-col-tag { font-family: var(--mono); font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
        .combo-col-price { font-size: 22px; font-weight: 700; letter-spacing: -0.03em; color: var(--ink-2); }
        .combo-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .combo-list li { font-size: 14px; color: var(--ink-2); display: grid; grid-template-columns: 16px 1fr; gap: 9px; }
        .combo-list li .b { color: #818cf8; }
        .offer-block { max-width: 560px; }
        .offer-price { display: flex; align-items: baseline; gap: 16px; margin: 20px 0 16px; }
        .offer-old { font-size: 22px; color: var(--muted); text-decoration: line-through; }
        .offer-now { font-size: 56px; font-weight: 700; letter-spacing: -0.04em; background: linear-gradient(110deg, #6366f1, #8b5cf6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
        .offer-sub { font-size: 16px; color: var(--body); margin-bottom: 28px; max-width: 50ch; }
        .offer-note { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 14px; }
      `}</style>
    </div>
  )
}
