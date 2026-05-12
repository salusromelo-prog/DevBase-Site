import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import ProductCard from '@/components/product-card'

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
              <ProductCard
                badge="live"
                badgeLabel="● ao vivo"
                title="DevBase Boilerplate"
                desc="Boilerplate SaaS pronto pro mercado brasileiro. Auth, pagamentos, dashboard, painel admin e deploy — tudo configurado. Você foca no produto."
                features={[
                  'Next.js 14 + TypeScript + Tailwind CSS',
                  'Auth completo com Supabase',
                  'Pagar.me: PIX, boleto e cartão',
                  'Dashboard com métricas',
                  'Painel admin completo',
                  'E-mail transacional com Resend',
                  'Deploy na Vercel com 1 clique',
                  'Documentação 100% em PT-BR',
                ]}
                price="R$ 147"
                priceColor="green"
                priceLabel="pagamento único · acesso vitalício"
                ctaLabel="Comprar agora"
                ctaHref="https://saas-kit-br-salusromelo-progs-projects.vercel.app"
                ctaExternal
              />
            </Reveal>
            <Reveal>
              <ProductCard
                badge="beta"
                badgeLabel="◉ beta gratuito"
                title="DevBase Jobs"
                desc="Job board pra dev brasileiro. Sem vaga fake, sem 'salário a combinar', sem stack inflada. Transparência por padrão."
                features={[
                  'Salário obrigatório em toda vaga',
                  'Stack real do dia a dia',
                  'Remoto verificado',
                  'Alertas por e-mail da sua stack',
                  'Publicação de vaga grátis pra empresas',
                ]}
                price="Grátis"
                priceColor="indigo"
                priceLabel="em beta · sempre gratuito pra devs"
                ctaLabel="Acessar"
                ctaHref="https://dev-base-jobs.vercel.app"
                ctaExternal
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
