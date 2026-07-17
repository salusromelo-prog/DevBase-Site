import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import Aurora from '@/components/Aurora'

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

const CHECKOUT = {
  microSaas: 'https://pay.kiwify.com.br/5cyFrhr',
  boilerplate: 'https://pay.kiwify.com.br/d4yYNFy',
  components: 'https://pay.kiwify.com.br/7OQNJ1C',
  combo: 'https://pay.kiwify.com.br/Y6jViIR',
}

export default function Produtos() {
  return (
    <div className="page-dark p-produtos">
      {/* catálogo: presença discreta — o produto é o protagonista */}
      <Aurora intensity={0.4} />

      {/* ===== HERO ===== */}
      <header className="page-head">
        <div className="wrap">
          <Reveal>
            <SectionLabel>// produtos</SectionLabel>
          </Reveal>
          <Reveal>
            <h1>Tudo que a DevBase construiu.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">Pagamento único, sem assinatura. Feito pro mercado brasileiro.</p>
          </Reveal>
        </div>
      </header>

      {/* ===== CATÁLOGO ===== */}
      <section className="section">
        <div className="wrap wrap-wide">
          <div className="cards">
            {/* Micro SaaS — produto de entrada, em destaque */}
            <Reveal delay={0} className="pcard span6 glow-teal">
              <div className="ptop"><span className="pchip live"><span className="d" />ao vivo · novo</span></div>
              <h3>100 Micro SaaS + 25 Automações</h3>
              <p className="pdesc">O ponto de partida pra qualquer dev que quer lançar um produto. 100 ideias validadas, prontas pra executar.</p>
              <ul className="plist">
                <li><span className="b">+</span>100 ideias com problema e MVP</li>
                <li><span className="b">+</span>25 automações pra monetizar</li>
                <li><span className="b">+</span>público, monetização e stack de cada uma</li>
                <li><span className="b">+</span>dashboard exclusivo de acesso</li>
                <li><span className="b">+</span>acesso vitalício + atualizações</li>
              </ul>
              <div className="pfoot">
                <div className="price"><span className="now green">R$ 29,90</span><span className="s">pagamento único</span></div>
                <div className="pbtns">
                  <a href="/produto/micro-saas" className="btn btn-line btn-sm">Detalhes</a>
                  <a href={CHECKOUT.microSaas} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Comprar <span className="arr">→</span></a>
                </div>
              </div>
            </Reveal>

            {/* Boilerplate */}
            <Reveal delay={80} className="pcard span6">
              <div className="ptop"><span className="pchip live"><span className="d" />ao vivo</span></div>
              <h3>DevBase Boilerplate</h3>
              <p className="pdesc">Kit Next.js completo pra lançar SaaS no Brasil. A parte chata já resolvida — você foca no produto.</p>
              <ul className="plist">
                <li><span className="b">+</span>Next.js 14 + TypeScript + Tailwind</li>
                <li><span className="b">+</span>auth completo com Supabase</li>
                <li><span className="b">+</span>Pagar.me: PIX, boleto e cartão</li>
                <li><span className="b">+</span>dashboard com métricas e admin</li>
                <li><span className="b">+</span>e-mail transacional com Resend</li>
                <li><span className="b">+</span>documentação 100% em PT-BR</li>
              </ul>
              <div className="pfoot">
                <div className="price"><span className="old">R$ 297</span><span className="now green">R$ 147</span><span className="s">vitalício</span></div>
                <div className="pbtns">
                  <a href="/produto/boilerplate" className="btn btn-line btn-sm">Detalhes</a>
                  <a href={CHECKOUT.boilerplate} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Comprar <span className="arr">→</span></a>
                </div>
              </div>
            </Reveal>

            {/* Components */}
            <Reveal delay={0} className="pcard span6 glow-violet">
              <div className="ptop"><span className="pchip live"><span className="d" />ao vivo</span></div>
              <h3>DevBase Components</h3>
              <p className="pdesc">8 componentes React pro mercado BR. Com validação, máscara e TypeScript — copia, cola, funciona.</p>
              <ul className="plist">
                <li><span className="b">+</span>CPF/CNPJ com validação automática</li>
                <li><span className="b">+</span>CEP com busca via ViaCEP</li>
                <li><span className="b">+</span>telefone com máscara BR</li>
                <li><span className="b">+</span>seletor de banco (20 bancos)</li>
                <li><span className="b">+</span>PIX Button com QR Code</li>
                <li><span className="b">+</span>cartão com validação Luhn</li>
              </ul>
              <div className="pfoot">
                <div className="price"><span className="now indigo">R$ 67</span><span className="s">vitalício</span></div>
                <div className="pbtns">
                  <a href="/produto/components" className="btn btn-line btn-sm">Detalhes</a>
                  <a href={CHECKOUT.components} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Comprar <span className="arr">→</span></a>
                </div>
              </div>
            </Reveal>

            {/* Combo */}
            <Reveal delay={80} className="pcard span6">
              <div className="ptop"><span className="pchip"><span className="d" style={{ background: 'var(--violet)' }} />✦ combo</span></div>
              <h3>Boilerplate + Components</h3>
              <p className="pdesc">Os dois produtos juntos, com desconto. Do login ao checkout, tudo pra lançar um SaaS brasileiro do zero.</p>
              <ul className="plist">
                <li><span className="b">+</span>tudo do DevBase Boilerplate</li>
                <li><span className="b">+</span>tudo do DevBase Components</li>
                <li><span className="b">+</span>auth, pagamentos e dashboard</li>
                <li><span className="b">+</span>CPF, CNPJ, CEP, PIX e cartão</li>
              </ul>
              <div className="pfoot">
                <div className="price"><span className="old">R$ 214</span><span className="now green">R$ 197</span><span className="s">economia de R$ 17</span></div>
                <div className="pbtns">
                  <a href="/produto/combo" className="btn btn-line btn-sm">Detalhes</a>
                  <a href={CHECKOUT.combo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Comprar <span className="arr">→</span></a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="catalog-note">pagamento único via PIX, boleto ou cartão · garantia incondicional · acesso imediato</div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .p-produtos .pbtns { display: flex; gap: 10px; flex-wrap: wrap; }
        .p-produtos .pfoot { align-items: center; }
      `}</style>
    </div>
  )
}
