import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import Aurora from '@/components/Aurora'
import HeroCanvas from '@/components/hero-canvas'
import IdeaDeck from '@/components/visual/idea-deck'
import CpfDemo from '@/components/visual/cpf-demo'
import CatalogShelf from '@/components/produtos/catalog-shelf'
import ProductPath from '@/components/produtos/product-path'
import ComboMerge from '@/components/produtos/combo-merge'
import ProdutosFaq from '@/components/produtos/produtos-faq'
import { PRODUTOS } from '@/data/produtos'

export const metadata: Metadata = {
  title: 'Produtos · DevBase',
  description:
    'Boilerplate Next.js, componentes brasileiros e 100 ideias de Micro SaaS. Pagamento único, sem assinatura. Feito pro mercado BR.',
  openGraph: {
    title: 'Produtos · DevBase',
    description:
      'Boilerplate Next.js, componentes brasileiros e 100 ideias de Micro SaaS. Pagamento único, sem assinatura. Feito pro mercado BR.',
    url: 'https://devbase.tools/produtos',
    images: [{ url: '/og.png' }],
  },
}

/* Cada ficha do catálogo mostra o produto funcionando, não uma foto dele:
   o baralho de ideias gira, o CPF valida de verdade enquanto você digita,
   o terminal roda o setup. É a peça mais honesta que a página tem. */
const ARTES: Record<string, ReactNode> = {
  'micro-saas': (
    <div className="art art--deck">
      <span className="art-lbl">{'// um card do acervo'}</span>
      <IdeaDeck />
      <span className="art-sub">→ 100 cards como esse, com problema, público, monetização, stack e MVP</span>
    </div>
  ),
  boilerplate: (
    <div className="art art--term">
      <div className="codecard">
        <div className="browser-bar">
          <i /><i /><i />
          <span className="url">~/meu-saas — zsh</span>
        </div>
        <div className="cc-body">
          <div><span className="p">~</span> <span className="d">$</span> npx create-devbase-app meu-saas</div>
          <div className="ok">✓ clonando template</div>
          <div className="ok">✓ instalando dependências</div>
          <div className="ok">✓ configurando .env · supabase · pagar.me</div>
          <div><span className="p">~/meu-saas</span> <span className="d">$</span> pnpm dev</div>
          <div className="k">▲ ready — auth ✓ payments ✓ db ✓</div>
          <div><span className="p">~/meu-saas</span> <span className="d">$</span> <span className="cc-caret" /></div>
        </div>
      </div>
    </div>
  ),
  components: (
    <div className="art art--cpf">
      <CpfDemo />
    </div>
  ),
  combo: (
    <div className="art art--merge">
      <ComboMerge />
    </div>
  ),
}

const PASSOS = [
  { n: '01', t: 'Você escolhe e paga', d: 'PIX, boleto ou cartão. Preço em real, sem IOF. Pagamento único — não existe cobrança recorrente em nenhum produto.' },
  { n: '02', t: 'O acesso chega por e-mail', d: 'Em até 15 minutos depois da confirmação. Sem fila, sem liberação manual, sem "aguarde nosso contato".' },
  { n: '03', t: 'É seu, para sempre', d: 'Acesso vitalício, com as atualizações que a gente publicar depois já inclusas. Use em quantos projetos quiser.' },
]

export default function Produtos() {
  return (
    <div className="page-dark p-catalogo">
      {/* catálogo: presença discreta — o produto é o protagonista */}
      <Aurora intensity={0.45} speed={0.9} colors={['#6366f1', '#8b5cf6', '#0d9488']} />

      {/* ===== ABERTURA + PRATELEIRA ===== */}
      <header className="cat-head">
        <div className="wrap wrap-wide">
          <Reveal>
            <SectionLabel>{'// catálogo'}</SectionLabel>
          </Reveal>
          <Reveal>
            <h1>
              Quatro produtos.<br />
              <span className="grad">Uma base só.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="sub">
              Tudo que a DevBase construiu para quem desenvolve. Pagamento único, sem
              assinatura, feito pro mercado brasileiro.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="cat-facts">
              <li><b>4</b> produtos no ar</li>
              <li>a partir de <b>R$ 29,90</b></li>
              <li>PIX, boleto ou cartão</li>
              <li>acesso vitalício</li>
            </ul>
          </Reveal>
          <Reveal delay={220}>
            <CatalogShelf />
          </Reveal>
        </div>
      </header>

      {/* ===== O CAMINHO ===== */}
      <section className="section" id="caminho">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>{'// o caminho'}</SectionLabel>
              <h2>Onde cada produto entra.</h2>
              <p className="lead">
                Não são quatro coisas soltas. São quatro pontos da mesma linha — do
                notebook aberto sem ideia até o primeiro pagamento caindo.
              </p>
            </div>
          </Reveal>
          <ProductPath />
        </div>
      </section>

      {/* ===== CATÁLOGO ===== */}
      <section className="section" id="catalogo">
        <div className="wrap wrap-wide">
          <Reveal>
            <div className="section-head">
              <SectionLabel>{'// as fichas'}</SectionLabel>
              <h2>O que tem dentro de cada um.</h2>
            </div>
          </Reveal>

          <div className="prows">
            {PRODUTOS.map((p) => (
              <Reveal key={p.id} className="prow-slot">
                <article
                  id={p.id}
                  className="prow"
                  data-n={p.n}
                  style={{ '--ac': p.accent, '--acb': p.accentBtn } as CSSProperties}
                >
                  <div className="prow-copy">
                    <div className="prow-top">
                      <span className="prow-n">{p.n}</span>
                      <span className={`pchip${p.chip.live ? ' live' : ''}`}>
                        <span className="d" />
                        {p.chip.txt}
                      </span>
                      <span className="prow-linha">{p.linha}</span>
                    </div>

                    <h3>{p.nome}</h3>
                    <p className="prow-desc">{p.desc}</p>

                    <ul className="prow-list">
                      {p.itens.map((it) => (
                        <li key={it}><span className="b">+</span>{it}</li>
                      ))}
                    </ul>

                    <div className="prow-foot">
                      <div className="price">
                        {p.preco.de && <span className="old">{p.preco.de}</span>}
                        <span className={`now ${p.preco.tom}`}>{p.preco.por}</span>
                        <span className="s">{p.preco.nota}</span>
                      </div>
                      <div className="prow-btns">
                        <a href={p.href} className="btn btn-line btn-sm">Detalhes</a>
                        <a
                          href={p.checkout}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm prow-buy"
                        >
                          Comprar <span className="arr">→</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="prow-art">{ARTES[p.id]}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARAÇÃO ===== */}
      <section className="section" id="comparar">
        <div className="wrap wrap-wide">
          <Reveal>
            <div className="section-head">
              <SectionLabel>{'// lado a lado'}</SectionLabel>
              <h2>Qual é o seu caso.</h2>
              <p className="lead">
                Nenhum dos quatro é "o melhor". Eles resolvem problemas diferentes —
                a pergunta é em qual dos quatro você está travado hoje.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="ctable">
              <div className="ctable-row ctable-row--head" aria-hidden="true">
                <span>produto</span>
                <span>resolve</span>
                <span>pra quem é</span>
                <span>preço</span>
              </div>
              {PRODUTOS.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  className="ctable-row"
                  style={{ '--ac': p.accent } as CSSProperties}
                >
                  <span className="ct-nome" data-l="produto">
                    <span className="ct-dot" aria-hidden="true" />
                    {p.nome}
                  </span>
                  <span data-l="resolve">{p.resolve}</span>
                  <span data-l="pra quem">{p.paraQuem}</span>
                  <span className="ct-preco" data-l="preço">
                    {p.preco.por}
                    <span className="arr" aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== COMO FUNCIONA A COMPRA ===== */}
      <section className="section" id="compra">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>{'// da compra ao acesso'}</SectionLabel>
              <h2>Três passos. Nenhum deles é esperar.</h2>
            </div>
          </Reveal>
          <div className="cpassos">
            {PASSOS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="cpasso">
                  <span className="cpasso__n">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" id="faq">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>{'// perguntas'}</SectionLabel>
              <h2>O que costumam perguntar antes de comprar.</h2>
            </div>
          </Reveal>
          <Reveal>
            <ProdutosFaq />
          </Reveal>
        </div>
      </section>

      {/* ===== FECHO ===== */}
      <section className="section cat-fecho">
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2>Escolhe um. Lança esse mês.</h2>
              <p>
                Todo produto aqui existe porque um de nós travou nesse ponto antes.
                Se você está travado no mesmo, o caminho já está desenhado.
              </p>
              <div className="hero-cta">
                <a href="#catalogo" className="btn btn-primary btn-lg">
                  Voltar ao catálogo <span className="arr">↑</span>
                </a>
                <a href="/empresas" className="btn btn-glass btn-lg">
                  Tenho uma empresa, não um SaaS
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
