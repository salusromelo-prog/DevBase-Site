import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'DevBase Components — Os componentes BR que você sempre reescreve',
  description: '8 componentes React prontos pro mercado brasileiro. CPF, CNPJ, CEP, PIX, banco — com validação, máscara e TypeScript. Copia, cola, funciona.',
}

const CHECKOUT = 'https://pay.kiwify.com.br/7OQNJ1C'

export default function ProdutoComponents() {
  return (
    <div className="p-comp">
      <Nav />
      {/* ===== HERO ===== */}
      <header className="phead">
        <HeroCanvas variant="silk" className="phead-canvas" />
        <div className="phead-veil" />
        <div className="wrap">
          <span className="eyebrow center on-dark">// components · R$ 67</span>
          <h1 data-split>os componentes BR que você <span className="grad">sempre reescreve.</span></h1>
          <p>8 componentes React prontos pro mercado brasileiro. CPF, CNPJ, CEP, PIX, banco — com validação, máscara e TypeScript. Copia, cola, funciona.</p>
          <div className="hero-cta" style={{ marginTop: 36 }}>
            <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Comprar agora — R$ 67 <span className="arr">→</span>
            </a>
            <a href="#componentes" className="btn btn-glass btn-lg">Ver os componentes ↓</a>
          </div>
          <div className="prod-stats">
            <div className="ps-item"><span className="ps-n" data-count="8">0</span><span className="ps-l">componentes</span></div>
            <div className="ps-item"><span className="ps-n" data-count="0">0</span><span className="ps-l">deps pesadas</span></div>
            <div className="ps-item"><span className="ps-n" data-count="100">0</span><span className="ps-u">%</span><span className="ps-l">TypeScript</span></div>
          </div>
        </div>
      </header>

      {/* ===== DOR ===== */}
      <section className="sec" data-rail="dor">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// de novo isso</span>
            <h2 data-split>Todo projeto BR começa com o mesmo input de CPF.</h2>
            <p>
              Você já escreveu validação de CPF umas trinta vezes. E de CNPJ. E a máscara de telefone. E aquele autocomplete de CEP que chama a ViaCEP. Cada projeto novo, a mesma meia hora copiando de um projeto velho, ajustando o regex, testando o dígito verificador de novo.<br /><br />
              São componentes pequenos. Mas somados, é um dia inteiro de trabalho que não diferencia nada — todo mundo precisa, ninguém quer fazer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== CUSTO ===== */}
      <section className="sec soft" data-rail="custo">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// a soma dos pequenos</span>
            <h2 data-split>Não é um componente. São oito, em todo projeto, pra sempre.</h2>
            <p>
              Um input de CPF com validação você resolve em 20 minutos. Mas é CPF, CNPJ, CEP, telefone, seletor de banco, botão PIX, cartão com Luhn... E aí você descobre que o dígito verificador do CNPJ tem um caso de borda que você esqueceu, e o cliente reclama que o CEP da cidade dele não preenche.<br /><br />
              Manutenção infinita de código que devia ser commodity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== COMPONENTES ===== */}
      <section id="componentes" className="sec" data-rail="componentes">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="eyebrow">// a caixa de ferramentas</span>
            <h2 data-split>Os 8 que todo SaaS brasileiro precisa. Resolvidos.</h2>
          </Reveal>
          <div className="feat-grid" data-depth-stagger>
            {[
              { t: 'Input CPF/CNPJ', d: 'Máscara + validação de dígito automática' },
              { t: 'CEP com ViaCEP', d: 'Digita o CEP, preenche o endereço sozinho' },
              { t: 'Telefone BR', d: 'Máscara com DDD, fixo e celular' },
              { t: 'Seletor de banco', d: '20 bancos com código e logo' },
              { t: 'PIX Button', d: 'Gera QR Code e copia-e-cola' },
              { t: 'Input de cartão', d: 'Bandeira + validação Luhn' },
              { t: 'Todos em TypeScript', d: 'Tipados, sem `any`' },
              { t: 'Zero dependências pesadas', d: 'Só React e Tailwind' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 60} className="depth">
                <div className="fcard">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIAL ===== */}
      <section className="sec soft" data-rail="diferencial">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// porque importa</span>
            <h2 data-split>Validação errada de CPF é cliente perdido no checkout.</h2>
            <p>
              Um regex de CPF que aceita <code>111.111.111-11</code> deixa fraude passar. Um CEP que não preenche faz o cliente desistir da compra. Esses componentes não são enfeite — são a diferença entre um formulário que converte e um que trava na hora de pagar.<br /><br />
              Testados com os casos de borda que você só descobre em produção.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== OBJEÇÃO ===== */}
      <section className="sec" data-rail="objecao">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">// "acho um no npm"</span>
            <h2 data-split>Acha. Cinco, na verdade — todos abandonados.</h2>
            <p>
              A maioria das libs BR do npm tem o último commit de 2021, dependências quebradas e zero suporte a TypeScript moderno. Aqui é código limpo, atual, que você lê e entende.<br /><br />
              Pagamento único, seu pra sempre, use em quantos projetos quiser.
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
              <span className="offer-now">R$ 67</span>
            </div>
            <p className="offer-sub">Pagamento único. Acesso vitalício. Os 8 componentes, atualizações incluídas.</p>
            <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Comprar agora — R$ 67 <span className="arr">→</span>
            </a>
            <p className="offer-note">acesso imediato após a compra · combina com o Boilerplate — <a href="/produto/combo" style={{ color: 'var(--primary)' }}>veja o combo</a></p>
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
              <h2 data-split>Para de reescrever o input de CPF. Foca no produto.</h2>
              <div className="hero-cta">
                <a href={CHECKOUT} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Comprar agora — R$ 67 <span className="arr">→</span>
                </a>
                <a href="/produto/combo" className="btn btn-glass btn-lg">Ver o combo →</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .p-comp .eyebrow { color: #8b5cf6; font-size: 14px; letter-spacing: 0.12em; }
        .p-comp .phead .wrap { text-align: center; }
        .p-comp .phead h1 { margin-left: auto; margin-right: auto; }
        .p-comp .phead > .wrap > p { margin-left: auto; margin-right: auto; max-width: 56ch; }
        .p-comp .phead .prod-stats { justify-content: center; }
        .p-comp .btn-primary { background: #8b5cf6; box-shadow: 0 8px 24px -10px rgba(139,92,246,0.6); }
        .p-comp .btn-primary:hover { background: #7c3aed; }
        .p-comp .phead h1 .grad {
          background: linear-gradient(110deg, #c4b5fd, #a78bfa 40%, #ddd6fe 65%, #c4b5fd);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .p-comp .offer-now { color: #8b5cf6; }
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
        .offer-now { font-size: 56px; font-weight: 700; letter-spacing: -0.04em; color: var(--primary); line-height: 1; }
        .offer-sub { font-size: 16px; color: var(--body); margin-bottom: 28px; max-width: 50ch; }
        .offer-note { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 14px; }
        /* depth */
        .p-comp .sec:nth-child(even) { background: #f5f5f7; }
        .p-comp .sec { border-top: 1px solid #e5e5e5; }
        .p-comp .phead-veil { background: radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.18) 0%, transparent 65%); }
        .p-comp .ctaband-veil { background: radial-gradient(ellipse 70% 50% at 50% -5%, rgba(139,92,246,0.08) 0%, transparent 60%), linear-gradient(180deg, rgba(10,9,19,0.2), rgba(10,9,19,0.7)); }
      `}</style>
    </div>
  )
}
