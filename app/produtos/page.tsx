import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import HeroCanvas from '@/components/hero-canvas'

export const metadata: Metadata = { title: 'Produtos · DevBase' }

export default function Produtos() {
  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <header className="phead">
        <HeroCanvas variant="silk" className="phead-canvas" />
        <div className="phead-veil" />
        <div className="wrap">
          <span className="eyebrow on-dark">Produtos</span>
          <h1>Construir, lançar e crescer no Brasil.</h1>
          <p>Produtos avulsos que resolvem problemas reais do dev brasileiro. Pagamento único ou gratuito — sem assinatura, sem enrolação.</p>
        </div>
      </header>

      {/* ===== CATALOG ===== */}
      <section className="sec">
        <div className="wrap wrap-wide">
          <div className="cards">

            {/* Featured */}
            <Reveal className="pcard feat">
              <div>
                <div className="ptop">
                  <span className="pchip onfeat"><span className="d" />ao vivo · novo</span>
                  <span className="eyebrow on-dark">entrada perfeita</span>
                </div>
                <h3>100 Micro SaaS + 25 Automações</h3>
                <p className="pdesc">O ponto de partida pra qualquer dev que quer lançar um produto. 100 ideias validadas — com problema, público, monetização, stack e MVP — prontas pra executar.</p>
                <ul className="plist">
                  <li><span className="b">+</span> 100 ideias com problema e MVP</li>
                  <li><span className="b">+</span> 25 automações pra monetizar</li>
                  <li><span className="b">+</span> BR e global, qualquer mercado</li>
                  <li><span className="b">+</span> dashboard exclusivo de acesso</li>
                  <li><span className="b">+</span> acesso vitalício + atualizações</li>
                  <li><span className="b">+</span> pagamento único, sem assinatura</li>
                </ul>
              </div>
              <div className="feat-panel">
                <div className="pl">// entrada · pagamento único</div>
                <div className="big">R$ 29,90</div>
                <div className="bs">acesso vitalício · dashboard exclusivo</div>
                <a
                  href="https://pay.kiwify.com.br/5cyFrhr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: 22, width: '100%', justifyContent: 'center' }}
                >
                  Comprar agora <span className="arr">→</span>
                </a>
              </div>
            </Reveal>

            {/* Boilerplate */}
            <Reveal delay={0} className="pcard span6">
              <div className="ptop">
                <span className="pchip live"><span className="d" />ao vivo</span>
                <div className="price" style={{ textAlign: 'right' }}>
                  <span className="old">R$ 297</span><span className="now green">R$ 147</span>
                </div>
              </div>
              <h3>DevBase Boilerplate</h3>
              <p className="pdesc">Kit Next.js completo pra lançar SaaS no mercado brasileiro. Auth, pagamentos, dashboard e deploy — tudo configurado.</p>
              <ul className="plist">
                <li><span className="b">+</span> Next.js 14 + TypeScript + Tailwind</li>
                <li><span className="b">+</span> auth completo com Supabase</li>
                <li><span className="b">+</span> Pagar.me: PIX, boleto e cartão</li>
                <li><span className="b">+</span> dashboard com métricas e admin</li>
                <li><span className="b">+</span> e-mail transacional com Resend</li>
                <li><span className="b">+</span> documentação 100% em PT-BR</li>
              </ul>
              <div className="pfoot">
                <div className="price"><span className="s">lançamento · acesso vitalício</span></div>
                <a
                  href="https://saas-kit-br-salusromelo-progs-projects.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-sm"
                >
                  Comprar <span className="arr">→</span>
                </a>
              </div>
            </Reveal>

            {/* Components */}
            <Reveal delay={80} className="pcard span6">
              <div className="ptop">
                <span className="pchip live"><span className="d" />ao vivo</span>
                <div className="price" style={{ textAlign: 'right' }}>
                  <span className="now indigo">R$ 67</span>
                </div>
              </div>
              <h3>DevBase Components</h3>
              <p className="pdesc">8 componentes React prontos pro mercado brasileiro. Sem dependências pesadas, com TypeScript e Tailwind.</p>
              <ul className="plist">
                <li><span className="b">+</span> CPF/CNPJ com validação automática</li>
                <li><span className="b">+</span> CEP com busca via ViaCEP</li>
                <li><span className="b">+</span> telefone com máscara BR</li>
                <li><span className="b">+</span> seletor de banco (20 bancos)</li>
                <li><span className="b">+</span> PIX Button com QR Code</li>
                <li><span className="b">+</span> cartão com validação Luhn</li>
              </ul>
              <div className="pfoot">
                <div className="price"><span className="s">acesso vitalício</span></div>
                <a
                  href="https://pay.kiwify.com.br/7OQNJ1C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-sm"
                >
                  Comprar <span className="arr">→</span>
                </a>
              </div>
            </Reveal>

            {/* Combo */}
            <Reveal delay={0} className="pcard span6">
              <div className="ptop">
                <span className="pchip"><span className="d" style={{ background: 'var(--violet)' }} />✦ combo</span>
                <div className="price" style={{ textAlign: 'right' }}>
                  <span className="old">R$ 214</span><span className="now green">R$ 197</span>
                </div>
              </div>
              <h3>Boilerplate + Components</h3>
              <p className="pdesc">Os dois produtos juntos, com desconto. Tudo que você precisa pra lançar um SaaS brasileiro do zero.</p>
              <ul className="plist">
                <li><span className="b">+</span> tudo do DevBase Boilerplate</li>
                <li><span className="b">+</span> tudo do DevBase Components</li>
                <li><span className="b">+</span> auth, pagamentos e dashboard</li>
                <li><span className="b">+</span> CPF, CNPJ, CEP, PIX e cartão</li>
              </ul>
              <div className="pfoot">
                <div className="price"><span className="s">economia de R$ 17 · vitalício</span></div>
                <a
                  href="https://pay.kiwify.com.br/Y6jViIR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-sm"
                >
                  Comprar combo <span className="arr">→</span>
                </a>
              </div>
            </Reveal>

            {/* Jobs */}
            <Reveal delay={80} className="pcard span6">
              <div className="ptop">
                <span className="pchip free"><span className="d" />beta gratuito</span>
                <div className="price" style={{ textAlign: 'right' }}>
                  <span className="now indigo">Grátis</span>
                </div>
              </div>
              <h3>DevBase Jobs</h3>
              <p className="pdesc">Job board pra dev brasileiro. Sem vaga fake, sem &quot;salário a combinar&quot;, sem stack inflada. Transparência por padrão.</p>
              <ul className="plist">
                <li><span className="b">+</span> salário obrigatório em toda vaga</li>
                <li><span className="b">+</span> stack real do dia a dia</li>
                <li><span className="b">+</span> remoto verificado</li>
                <li><span className="b">+</span> alertas por e-mail da sua stack</li>
              </ul>
              <div className="pfoot">
                <div className="price"><span className="s">sempre gratuito pra devs</span></div>
                <a
                  href="https://dev-base-jobs.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line btn-sm"
                >
                  Acessar <span className="arr">→</span>
                </a>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="sec tight soft">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2>Antes de comprar.</h2>
          </Reveal>
          <Reveal className="faq">
            <details open>
              <summary>É pagamento único mesmo? <span className="pl">+</span></summary>
              <div className="ans">Sim. Todos os produtos pagos da DevBase são pagamento único com acesso vitalício. Sem assinatura, sem cobrança recorrente.</div>
            </details>
            <details>
              <summary>Recebo atualizações? <span className="pl">+</span></summary>
              <div className="ans">Sim. As atualizações dos produtos são incluídas no acesso vitalício, sem custo adicional.</div>
            </details>
            <details>
              <summary>Quais formas de pagamento? <span className="pl">+</span></summary>
              <div className="ans">PIX, boleto e cartão de crédito — tudo em real, sem conversão de dólar nem IOF.</div>
            </details>
            <details>
              <summary>O DevBase Jobs é pago? <span className="pl">+</span></summary>
              <div className="ans">Não. O Jobs é gratuito pra devs e segue gratuito. Empresas também publicam vagas sem custo durante o beta.</div>
            </details>
            <details>
              <summary>Tem garantia? <span className="pl">+</span></summary>
              <div className="ans">Sim. Os produtos têm garantia incondicional — se não for pra você, devolvemos o valor.</div>
            </details>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="sec tight">
        <div className="wrap wrap-wide">
          <Reveal className="ctaband">
            <HeroCanvas variant="silk" className="ctaband-canvas" />
            <div className="ctaband-veil" />
            <div className="ctaband-in">
              <h2>Comece pelo que faz sentido pra você.</h2>
              <p>Da primeira ideia ao deploy do seu SaaS — a DevBase tem a ferramenta certa pra cada etapa.</p>
              <div className="hero-cta">
                <a
                  href="https://pay.kiwify.com.br/5cyFrhr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  Começar com R$ 29,90 <span className="arr">→</span>
                </a>
                <a href="/empresa" className="btn btn-glass btn-lg">Conhecer a empresa</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
