import type { Metadata } from 'next'
import Reveal from '@/components/reveal'

export const metadata: Metadata = { title: 'Produtos · DevBase' }

export default function Produtos() {
  return (
    <>
      {/* ─── HEADER ─── */}
      <div style={{ padding: '80px 0 0' }}>
        <div className="wrap" style={{ marginBottom: 56 }}>
          <Reveal>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#6366f1', marginBottom: 14, letterSpacing: '0.4px' }}>
              // produtos
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.06, margin: '0 0 14px', color: '#fff' }}>
              Tudo que a DevBase construiu.
            </h1>
            <p style={{ fontSize: 15, color: '#6b7280', margin: 0, maxWidth: 560 }}>
              Ferramentas para devs que querem construir, lançar e crescer no Brasil.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 96 }}>

        {/* ─── LABEL: entrada perfeita ─── */}
        <div className="pd-sec-label">
          <span className="pd-sec-label-text">// entrada perfeita</span>
          <div className="pd-sec-label-line" />
        </div>

        {/* ─── HERO: 100 Micro SaaS ─── */}
        <Reveal id="microsaas">
          <div className="pd-hero">
            <div className="pd-hero-inner">

              <div className="pd-hero-left">
                <div className="pd-hero-badges">
                  <span className="pd-badge pd-badge-live">• ao vivo</span>
                  <span className="pd-badge pd-badge-novo">novo</span>
                </div>
                <h2 className="pd-hero-title">100 Micro SaaS + 25 Automações</h2>
                <p className="pd-hero-desc">
                  O ponto de partida para qualquer dev que quer lançar um produto. 100 ideias validadas com problema, público, monetização, stack e MVP — tudo pronto para executar.
                </p>
                <ul className="pd-hero-feats">
                  <li className="pd-feat"><span className="pd-dot" />100 ideias com problema e MVP</li>
                  <li className="pd-feat"><span className="pd-dot" />25 automações para monetizar</li>
                  <li className="pd-feat"><span className="pd-dot" />BR e global — qualquer mercado</li>
                  <li className="pd-feat"><span className="pd-dot" />Dashboard exclusivo de acesso</li>
                  <li className="pd-feat"><span className="pd-dot" />Acesso vitalício com atualizações</li>
                  <li className="pd-feat"><span className="pd-dot" />Pagamento único · sem assinatura</li>
                </ul>
              </div>

              <div className="pd-price-box">
                <div className="pd-price-tag">pagamento único</div>
                <div className="pd-price-big">R$ 29,90</div>
                <div className="pd-price-sub">acesso vitalício · dashboard exclusivo</div>
                <a
                  href="https://pay.kiwify.com.br/5cyFrhr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Comprar agora <span className="arrow">→</span>
                </a>
                <div className="pd-price-note">pagamento único · sem assinatura</div>
              </div>

            </div>
          </div>
        </Reveal>

        {/* ─── LABEL: kits de desenvolvimento ─── */}
        <div className="pd-sec-label">
          <span className="pd-sec-label-text">// kits de desenvolvimento</span>
          <div className="pd-sec-label-line" />
        </div>

        {/* ─── GRID 2 COLS: Boilerplate + Components ─── */}
        <div className="pd-grid-2">

          <Reveal id="boilerplate">
            <div className="pd-card">
              <span className="pd-badge pd-badge-live" style={{ alignSelf: 'flex-start' }}>• ao vivo</span>
              <h3 className="pd-card-title">DevBase Boilerplate</h3>
              <p className="pd-card-desc">Kit Next.js completo para lançar SaaS no mercado brasileiro. Auth, pagamentos, dashboard e deploy — tudo configurado.</p>
              <ul className="pd-card-feats">
                <li className="pd-feat"><span className="pd-dot" />Next.js 14 + TypeScript + Tailwind</li>
                <li className="pd-feat"><span className="pd-dot" />Auth completo com Supabase</li>
                <li className="pd-feat"><span className="pd-dot" />Pagar.me: PIX, boleto e cartão</li>
                <li className="pd-feat"><span className="pd-dot" />Dashboard com métricas e admin</li>
                <li className="pd-feat"><span className="pd-dot" />Email transacional com Resend</li>
                <li className="pd-feat"><span className="pd-dot" />Documentação 100% em PT-BR</li>
              </ul>
              <div className="pd-card-ft">
                <div className="pd-card-prices">
                  <span className="pd-price-old">R$ 297</span>
                  <span className="pd-price-main" style={{ color: '#22c55e' }}>R$ 147</span>
                  <span className="pd-price-lbl">lançamento · acesso vitalício</span>
                </div>
                <a href="https://saas-kit-br-salusromelo-progs-projects.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Comprar agora <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal id="components">
            <div className="pd-card">
              <span className="pd-badge pd-badge-live" style={{ alignSelf: 'flex-start' }}>• ao vivo</span>
              <h3 className="pd-card-title">DevBase Components</h3>
              <p className="pd-card-desc">8 componentes React prontos para o mercado brasileiro. CPF, CNPJ, CEP, PIX, parcelamento e cartão — sem dependências pesadas.</p>
              <ul className="pd-card-feats">
                <li className="pd-feat"><span className="pd-dot" />CPF/CNPJ com validação automática</li>
                <li className="pd-feat"><span className="pd-dot" />CEP com busca via ViaCEP</li>
                <li className="pd-feat"><span className="pd-dot" />Telefone com máscara BR</li>
                <li className="pd-feat"><span className="pd-dot" />Seletor de Banco (20 bancos BR)</li>
                <li className="pd-feat"><span className="pd-dot" />PIX Button com QR Code</li>
                <li className="pd-feat"><span className="pd-dot" />Cartão com validação Luhn</li>
              </ul>
              <div className="pd-card-ft">
                <div className="pd-card-prices">
                  <span className="pd-price-main" style={{ color: '#22c55e' }}>R$ 67</span>
                  <span className="pd-price-lbl">acesso vitalício · TypeScript + Tailwind</span>
                </div>
                <a href="https://pay.kiwify.com.br/7OQNJ1C" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Comprar agora <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </Reveal>

        </div>

        {/* ─── COMBO ─── */}
        <Reveal>
          <div className="pd-combo" id="combo" style={{ marginTop: 18 }}>
            <div className="pd-combo-left">
              <span className="pd-badge pd-badge-combo" style={{ alignSelf: 'flex-start' }}>✦ combo</span>
              <h3 className="pd-combo-title">Boilerplate + Components</h3>
              <p className="pd-combo-desc">Os dois produtos juntos com desconto. Tudo que você precisa para lançar um SaaS brasileiro do zero.</p>
              <ul className="pd-combo-feats">
                <li className="pd-feat"><span className="pd-dot" />Tudo do DevBase Boilerplate</li>
                <li className="pd-feat"><span className="pd-dot" />Tudo do DevBase Components</li>
                <li className="pd-feat"><span className="pd-dot" />Auth, pagamentos e dashboard</li>
                <li className="pd-feat"><span className="pd-dot" />CPF, CNPJ, CEP, PIX e Cartão</li>
                <li className="pd-feat"><span className="pd-dot" />Documentação 100% PT-BR</li>
                <li className="pd-feat"><span className="pd-dot" />Acesso vitalício a ambos</li>
              </ul>
            </div>
            <div className="pd-combo-right">
              <span className="pd-combo-old">R$ 214</span>
              <span className="pd-combo-price">R$ 197</span>
              <span className="pd-combo-econ">economia de R$ 17</span>
              <a href="https://pay.kiwify.com.br/Y6jViIR" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Comprar combo <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* ─── LABEL: gratuito ─── */}
        <div className="pd-sec-label">
          <span className="pd-sec-label-text">// gratuito</span>
          <div className="pd-sec-label-line" />
        </div>

        {/* ─── JOBS ─── */}
        <Reveal>
          <div className="pd-jobs" id="jobs">
            <div className="pd-jobs-left">
              <span className="pd-badge pd-badge-beta" style={{ alignSelf: 'flex-start' }}>● beta gratuito</span>
              <h3 className="pd-jobs-title">DevBase Jobs</h3>
              <p className="pd-jobs-desc">Job board para devs brasileiros. Sem vaga fake, sem &apos;salário a combinar&apos;, sem stack inflada. Transparência por padrão.</p>
              <div className="pd-jobs-tags">
                <span className="pd-jobs-tag">Salário obrigatório</span>
                <span className="pd-jobs-tag">Stack real</span>
                <span className="pd-jobs-tag">Remoto verificado</span>
                <span className="pd-jobs-tag">Alertas por e-mail</span>
              </div>
            </div>
            <div className="pd-jobs-right">
              <div className="pd-jobs-free">Grátis</div>
              <div className="pd-jobs-sub">em beta · sempre gratuito pra devs</div>
              <a href="https://dev-base-jobs.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Acessar <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </>
  )
}
