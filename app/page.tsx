import Link from 'next/link'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import StatCard from '@/components/stat-card'
import Marquee from '@/components/marquee'
import PainChips from '@/components/pain-chips'
import NewsletterForm from '@/components/newsletter-form'

export default function Home() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero-aurora" aria-hidden="true">
          <span className="a1" />
          <span className="a2" />
          <span className="a3" />
        </div>
        <div className="wrap">
          <Reveal>
            <div className="pill" style={{ display: 'inline-flex', marginBottom: 32 }}>
              <span className="dot" aria-hidden="true" />
              devbase — v1 · 2025
            </div>
          </Reveal>
          <Reveal>
            <h1>
              Ferramentas para
              <br />
              <span className="accent">devs brasileiros.</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="sub">
              Construímos o que o dev BR precisa — sem documentação em inglês, sem preço em dólar, sem suporte que ignora.
            </p>
          </Reveal>
          <Reveal>
            <div className="cta-row">
              <Link href="/produtos" className="btn btn-primary">
                Conhecer produtos <span className="arrow">→</span>
              </Link>
              <a href="https://devbase.jobs" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                DevBase Jobs
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="stats">
              <div className="stat">
                <div className="k">2</div>
                <div className="v">produtos ativos</div>
              </div>
              <div className="stat">
                <div className="k">BR</div>
                <div className="v">feito por devs BR</div>
              </div>
              <div className="stat">
                <div className="k">100%</div>
                <div className="v">em português</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Tech marquee ===== */}
      <Marquee />

      {/* ===== Por que existimos ===== */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>// por que existimos</SectionLabel>
              <h2>O dev brasileiro merece ferramentas feitas pra ele.</h2>
              <p>Não adaptações mal traduzidas. Produtos que entendem nossa realidade.</p>
            </div>
          </Reveal>
          <div className="grid-3 stagger">
            <Reveal>
              <div className="feat">
                <div className="ico" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 9c0-1.1.9-2 2-2h2a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h2c1.1 0 2-.9 2-2" />
                    <path d="M12 6v1M12 17v1" />
                  </svg>
                </div>
                <h3>Preço em real</h3>
                <p>Sem conversão de dólar, sem IOF, sem surpresa no cartão. Pagamento único em PIX, boleto ou cartão.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="feat">
                <div className="ico" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h3>Docs em português</h3>
                <p>Tutoriais, exemplos e suporte 100% em PT-BR. Você não precisa traduzir nada pra começar.</p>
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
                <h3>Feito pra nossa stack</h3>
                <p>Pagar.me, Asaas, Mercado Pago, Next.js e Supabase já integrados. Nada de gambiarra pra fazer funcionar no Brasil.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Nossos produtos ===== */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>// nossos produtos</SectionLabel>
              <h2>O que construímos até agora.</h2>
              <p>Dois produtos no ar. Mais chegando.</p>
            </div>
          </Reveal>
          <div className="products-grid">
            <Reveal>
              <article className="product">
                <div><span className="badge badge-live">● ao vivo</span></div>
                <h3>DevBase Boilerplate</h3>
                <p className="desc">Boilerplate SaaS pronto pro mercado brasileiro. Auth, pagamentos em PIX/boleto/cartão, dashboard e deploy — tudo configurado.</p>
                <ul>
                  <li>Next.js 14 + TypeScript + Tailwind</li>
                  <li>Auth com Supabase</li>
                  <li>Pagar.me · PIX · boleto · cartão</li>
                  <li>Dashboard e painel admin</li>
                </ul>
                <div className="ft">
                  <div className="price">
                    <span className="big green">R$ 297</span>
                    <span className="small">pagamento único · vitalício</span>
                  </div>
                  <Link href="/produtos" className="btn btn-primary">
                    Comprar <span className="arrow">→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
            <Reveal>
              <article className="product">
                <div><span className="badge badge-beta">◉ beta</span></div>
                <h3>DevBase Jobs</h3>
                <p className="desc">Job board para devs brasileiros. Salário obrigatório em toda vaga, stack real e remoto verificado.</p>
                <ul>
                  <li>Salário sempre visível</li>
                  <li>Stack real do dia a dia</li>
                  <li>Remoto verificado</li>
                  <li>Alertas por e-mail</li>
                </ul>
                <div className="ft">
                  <div className="price">
                    <span className="big indigo">Grátis</span>
                    <span className="small">em beta · sempre gratuito</span>
                  </div>
                  <a href="https://devbase.jobs" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Acessar <span className="arrow">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Quem somos ===== */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>// quem somos</SectionLabel>
              <h2>Três devs de Goiânia. Construindo do zero.</h2>
              <p>Sem investidor, sem escritório, sem frescura.</p>
            </div>
          </Reveal>
          <div className="two-col">
            <div className="text">
              <Reveal>
                <p>
                  A DevBase nasceu da frustração de quem vive o mercado tech brasileiro. Boilerplate genérico que ignora pagamento em real. Vagas sem salário. Ferramentas em inglês com suporte que demora 3 dias pra responder.
                </p>
                <p>
                  Decidimos construir o que gostaríamos de ter. Produto por produto. Do zero. Em português.{' '}
                  <strong style={{ color: '#fff' }}>Samuel</strong>,{' '}
                  <strong style={{ color: '#fff' }}>Isaque</strong> e{' '}
                  <strong style={{ color: '#fff' }}>Daniel</strong> tocam tudo — código, design, suporte, conteúdo.
                </p>
                <p>
                  Começamos em 2025 com dois produtos no ar e uma promessa simples: lançamos coisa pronta. Não vendemos promessa.
                </p>
              </Reveal>
            </div>
            <div className="stats-col">
              <Reveal delay={0}><StatCard label="Fundada em" value="2025" meta="Goiânia · GO" /></Reveal>
              <Reveal delay={80}><StatCard label="Time" value="3 fundadores" meta="Samuel · Isaque · Daniel" /></Reveal>
              <Reveal delay={160}><StatCard label="Foco" value="Devs BR" meta="Ferramentas para o mercado brasileiro" /></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sua dor como dev ===== */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head centered">
              <SectionLabel>// sua dor como dev</SectionLabel>
              <h2>Qual é o seu maior problema como dev brasileiro?</h2>
              <p>Sua resposta vira o nosso próximo produto.</p>
            </div>
          </Reveal>
          <Reveal>
            <PainChips />
          </Reveal>
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <NewsletterForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
