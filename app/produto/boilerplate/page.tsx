import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'DevBase Boilerplate — Do repositório ao mercado em dias',
  description: 'O único boilerplate Next.js feito pro Brasil. PIX, boleto e Pagar.me nativos. Auth, billing, dashboard e deploy — documentação 100% em português.',
}

const CHECKOUT = 'https://pay.kiwify.com.br/d4yYNFy'

export default function ProdutoBoilerplate() {
  return (
    <div className="p-boiler">
      <Nav />
      {/* ===== HERO ===== */}
      <header className="phead">
        <HeroCanvas variant="silk" className="phead-canvas" />
        <div className="phead-veil" />
        <div className="wrap">
          <span className="eyebrow center on-dark">// boilerplate · R$ 147</span>
          <h1 data-split>do repositório ao mercado. <span className="grad">em dias, não meses.</span></h1>
          <p>O único boilerplate Next.js feito pro Brasil. PIX, boleto e Pagar.me nativos. Auth, billing, dashboard e deploy — documentação 100% em português.</p>
          <div className="hero-cta" style={{ marginTop: 36 }}>
            <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Comprar agora — R$ 147 <span className="arr">→</span>
            </a>
            <a href="#features" className="btn btn-glass btn-lg">Ver o que vem dentro ↓</a>
          </div>
          <div className="prod-stats">
            <div className="ps-item"><span className="ps-n" data-count="2">0</span><span className="ps-u">h</span><span className="ps-l">de setup</span></div>
            <div className="ps-item"><span className="ps-n" data-count="8">0</span><span className="ps-l">integrações</span></div>
            <div className="ps-item"><span className="ps-n" data-count="100">0</span><span className="ps-u">%</span><span className="ps-l">PT-BR</span></div>
          </div>
        </div>
      </header>

      {/* ===== DOR ===== */}
      <section className="sec" data-rail="dor">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// domingo, 23h</span>
            <h2 data-split>Você abriu o projeto sexta. É domingo e o PIX ainda não confirma.</h2>
            <p>
              Era pra ser simples. Você teve a ideia na segunda, prototipou a tela na quarta, e no fim de semana ia "só plugar o pagamento e subir".<br /><br />
              Aí a realidade: o webhook do gateway chega mas você não sabe qual campo tem o status. O e-mail de confirmação cai no spam. O magic link expira sozinho. O painel admin você ainda nem começou. A tabela de usuários tem um bug de RLS no Supabase que você descobre às 2h da manhã.<br /><br />
              Domingo virou madrugada de segunda. O produto que importava não recebeu <strong>uma linha de código.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== CUSTO REAL ===== */}
      <section className="sec soft" data-rail="custo">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// a conta que ninguém faz</span>
            <h2 data-split>Toda semana remontando a base custa mais que R$ 147.</h2>
            <p>
              Faz a conta. Auth completo, com refresh token e RLS: 2 a 3 dias. Pagamento com PIX, boleto e cartão que realmente confirma: mais 3 a 4 dias. Dashboard, admin e e-mail transacional: outra semana.<br /><br />
              São <strong>duas semanas</strong> que você repete em todo projeto novo. E o pior nem é o tempo — é que metade dos projetos morre exausta na fase de encanamento, antes de chegar no produto.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="sec" data-rail="features">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow">// a base</span>
            <h2 data-split>Tudo que todo SaaS precisa, já resolvido e testado.</h2>
            <p>Você clona, configura as variáveis, e em ~2 horas tem rodando: login, pagamento brasileiro que confirma de verdade, dashboard e admin. Aí você finalmente trabalha no que diferencia o seu produto.</p>
          </Reveal>
          <div className="feat-grid" data-depth-stagger>
            {[
              { t: 'Next.js 14 + TypeScript + Tailwind', d: 'Stack moderna, type-safe, sem gambiarras' },
              { t: 'Auth completo com Supabase', d: 'Login, magic link, RLS configurado e pronto' },
              { t: 'Pagar.me nativo', d: 'PIX, boleto e cartão que confirmam de verdade' },
              { t: 'Dashboard com métricas', d: 'MRR, usuários, churn — prontos pra usar' },
              { t: 'Painel admin', d: 'Gerencie usuários e vendas sem SQL na mão' },
              { t: 'E-mail transacional com Resend', d: 'Confirmação, recuperação e boas-vindas' },
              { t: 'Deploy Vercel em 1 clique', d: 'Do clone ao ar sem dor de cabeça' },
              { t: 'Documentação 100% PT-BR', d: 'A parte que não existe em lugar nenhum' },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 60} className="depth">
                <div className="fcard">
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIAL BR ===== */}
      <section className="sec soft" data-rail="diferencial">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// feito aqui, pra cá</span>
            <h2 data-split>Tutorial gringo não fala de PIX.</h2>
            <p>
              Todo boilerplate do Gumroad assume Stripe e cartão internacional. Nenhum resolve boleto, documenta Pagar.me ou fala a sua língua. Quando trava às 2h, a resposta no Stack Overflow está em inglês, pra um problema que não é o seu.<br /><br />
              Aqui a documentação foi escrita por quem vende pro mercado brasileiro.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== OBJEÇÃO ===== */}
      <section className="sec" data-rail="objecao">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// "mas eu faria sozinho"</span>
            <h2 data-split>Faria. A pergunta é se vale a pena.</h2>
            <p>
              Você sabe configurar auth e integrar pagamento. Não é sobre capacidade — é sobre onde seu tempo rende mais. Cada hora no encanamento é uma hora fora do produto que vende.<br /><br />
              Pagamento único. Sem assinatura. Sem lock-in. O código é seu pra sempre.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== OFERTA ===== */}
      <section className="sec soft" data-rail="oferta">
        <div className="wrap">
          <Reveal className="offer-block">
            <span className="eyebrow">// oferta de lançamento</span>
            <div className="offer-price">
              <span className="offer-old">R$ 297</span>
              <span className="offer-now">R$ 147</span>
            </div>
            <p className="offer-sub">Metade do preço, por tempo de lançamento. Pagamento único via PIX, boleto ou cartão. Acesso vitalício, incluindo atualizações.</p>
            <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Comprar agora — R$ 147 <span className="arr">→</span>
            </a>
            <p className="offer-note">pagamento 100% seguro · acesso imediato após a compra</p>
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
              <h2 data-split>Para de remontar a fundação. Começa a enviar produto.</h2>
              <p>O próximo domingo você pode passar construindo o que importa — ou debugando webhook de pagamento de novo.</p>
              <div className="hero-cta">
                <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Comprar agora — R$ 147 <span className="arr">→</span>
                </a>
                <a href="/produtos" className="btn btn-glass btn-lg">Ver todos os produtos</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .p-boiler .eyebrow { color: #6366f1; font-size: 14px; letter-spacing: 0.12em; }
        .p-boiler .phead .wrap { text-align: center; }
        .p-boiler .phead h1 { margin-left: auto; margin-right: auto; }
        .p-boiler .phead > .wrap > p { margin-left: auto; margin-right: auto; max-width: 56ch; }
        .p-boiler .phead .prod-stats { justify-content: center; }
        .p-boiler .btn-primary { background: #6366f1; box-shadow: 0 8px 24px -10px rgba(99,102,241,0.6); }
        .p-boiler .btn-primary:hover { background: #4f46e5; }
        .p-boiler .phead h1 .grad {
          background: linear-gradient(110deg, #a5b4fc, #818cf8 40%, #c4b5fd 65%, #a5b4fc);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .prod-stats { display: flex; gap: 48px; margin-top: 52px; flex-wrap: wrap; }
        .ps-item { display: flex; flex-direction: column; gap: 4px; align-items: center; }
        .ps-n { font-size: 38px; font-weight: 700; letter-spacing: -0.04em; color: #fff; line-height: 1; }
        .ps-u { font-size: 22px; font-weight: 700; color: rgba(244,243,251,0.7); }
        .ps-l { font-size: 13px; color: rgba(244,243,251,0.55); font-family: var(--mono); }
        .feat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        @media (max-width: 1100px) { .feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .feat-grid { grid-template-columns: 1fr; } }
        .fcard { border-radius: var(--r); border: 1px solid var(--line); background: var(--bg); padding: 26px; height: 100%; }
        .fcard h3 { font-size: 16px; letter-spacing: -0.02em; margin-bottom: 9px; }
        .fcard p { font-size: 14px; color: var(--body); line-height: 1.6; }
        .offer-block { max-width: 560px; }
        .offer-price { display: flex; align-items: baseline; gap: 16px; margin: 20px 0 16px; }
        .offer-old { font-size: 22px; color: var(--muted); text-decoration: line-through; }
        .offer-now { font-size: 56px; font-weight: 700; letter-spacing: -0.04em; color: #6366f1; line-height: 1; }
        .offer-sub { font-size: 16px; color: var(--body); margin-bottom: 28px; max-width: 50ch; }
        .offer-note { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 14px; }
        /* depth */
        .p-boiler .sec:nth-child(even) { background: #f5f5f7; }
        .p-boiler .sec { border-top: 1px solid #e5e5e5; }
        .p-boiler .phead-veil { background: radial-gradient(ellipse at 50% 60%, rgba(99,102,241,0.18) 0%, transparent 65%); }
        .p-boiler .ctaband-veil { background: radial-gradient(ellipse 70% 50% at 50% -5%, rgba(99,102,241,0.08) 0%, transparent 60%), linear-gradient(180deg, rgba(10,9,19,0.2), rgba(10,9,19,0.7)); }
      `}</style>
    </div>
  )
}
