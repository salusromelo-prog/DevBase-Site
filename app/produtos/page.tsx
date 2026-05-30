import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'

export const metadata: Metadata = { title: 'Produtos · DevBase' }

export default function Produtos() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Reveal>
            <SectionLabel>// produtos</SectionLabel>
          </Reveal>
          <Reveal>
            <h1>O que construímos.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">Produtos avulsos. Pagamento único ou gratuito. Sem assinatura.</p>
          </Reveal>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="products-grid">
            <Reveal>
              <article className="product">
                <div><span className="badge badge-live">● ao vivo</span></div>
                <h3>DevBase Boilerplate</h3>
                <p className="desc">
                  Boilerplate SaaS pronto pro mercado brasileiro. Auth, pagamentos, dashboard, painel admin e deploy — tudo configurado. Você foca no produto.
                </p>
                <ul>
                  <li>Next.js 14 + TypeScript + Tailwind CSS</li>
                  <li>Auth completo com Supabase</li>
                  <li>Pagar.me: PIX, boleto e cartão</li>
                  <li>Dashboard com métricas</li>
                  <li>Painel admin completo</li>
                  <li>E-mail transacional com Resend</li>
                  <li>Deploy na Vercel com 1 clique</li>
                  <li>Documentação 100% em PT-BR</li>
                </ul>
                <div className="ft">
                  <div className="price">
                    <span className="big green">R$ 297</span>
                    <span className="small">pagamento único · acesso vitalício</span>
                  </div>
                  <a
                    href="https://saas-kit-br-salusromelo-progs-projects.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Comprar agora <span className="arrow">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
            <Reveal>
              <article className="product">
                <div><span className="badge badge-beta">◉ beta gratuito</span></div>
                <h3>DevBase Jobs</h3>
                <p className="desc">
                  Job board pra dev brasileiro. Sem vaga fake, sem &ldquo;salário a combinar&rdquo;, sem stack inflada. Transparência por padrão.
                </p>
                <ul>
                  <li>Salário obrigatório em toda vaga</li>
                  <li>Stack real do dia a dia</li>
                  <li>Remoto verificado</li>
                  <li>Alertas por e-mail da sua stack</li>
                  <li>Publicação de vaga grátis pra empresas</li>
                </ul>
                <div className="ft">
                  <div className="price">
                    <span className="big indigo">Grátis</span>
                    <span className="small">em beta · sempre gratuito pra devs</span>
                  </div>
                  <a
                    href="https://devbase.jobs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Acessar <span className="arrow">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
