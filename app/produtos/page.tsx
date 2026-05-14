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
          <div className="products-grid products-grid-3">
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
                priceOld="R$ 297"
                priceColor="green"
                priceLabel="lançamento · acesso vitalício"
                ctaLabel="Comprar agora"
                ctaHref="https://saas-kit-br-salusromelo-progs-projects.vercel.app"
                ctaExternal
              />
            </Reveal>
            <Reveal>
              <ProductCard
                badge="live"
                badgeLabel="● ao vivo"
                title="DevBase Components"
                desc="Kit de componentes React prontos para o mercado brasileiro. CPF, CNPJ, CEP, PIX, parcelamento e cartão — sem dependências pesadas."
                features={[
                  'CPF/CNPJ Input com validação automática',
                  'CEP Input com busca via ViaCEP',
                  'Telefone com máscara (celular e fixo)',
                  'Seletor de Banco (20 bancos BR)',
                  'Pix Button com QR Code e copia-e-cola',
                  'Parcelamento Select com fórmula Price',
                  'Cartão de Crédito Form com validação Luhn',
                ]}
                price="R$ 67"
                priceColor="green"
                priceLabel="acesso vitalício · TypeScript + Tailwind"
                ctaLabel="Comprar agora"
                ctaHref="https://pay.kiwify.com.br/7OQNJ1C"
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

          <div className="combo-wrap">
            <Reveal>
              <ProductCard
                badge="combo"
                badgeLabel="◈ combo"
                title="Boilerplate + Components"
                desc="Os dois produtos juntos com desconto. Tudo que você precisa pra lançar um SaaS brasileiro do zero — estrutura completa e componentes prontos."
                features={[
                  'Tudo do DevBase Boilerplate',
                  'Next.js 14 + TypeScript + Tailwind CSS',
                  'Auth, pagamentos, dashboard e painel admin',
                  'Tudo do DevBase Components',
                  'CPF/CNPJ, CEP, Telefone, PIX e Cartão',
                  'Parcelamento com fórmula Price',
                  'Documentação 100% em PT-BR',
                  'Acesso vitalício a ambos os produtos',
                ]}
                price="R$ 197"
                priceOld="R$ 214"
                priceColor="gold"
                priceLabel="combo · economia de R$ 17"
                ctaLabel="Comprar combo"
                ctaHref="https://pay.kiwify.com.br/d4yYNFy"
                ctaExternal
                highlight
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
