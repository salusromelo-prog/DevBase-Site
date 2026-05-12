import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import TeamMember from '@/components/team-member'
import ValueCard from '@/components/value-card'

export const metadata: Metadata = { title: 'Sobre · DevBase' }

export default function Sobre() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Reveal>
            <SectionLabel>// sobre a DevBase</SectionLabel>
          </Reveal>
          <Reveal>
            <h1>Três devs de Goiânia. Construindo do zero.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">Sem investidor, sem escritório, sem frescura.</p>
          </Reveal>
        </div>
      </header>

      {/* Nossa história */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="two-col">
            <div>
              <Reveal>
                <SectionLabel>// nossa história</SectionLabel>
              </Reveal>
            </div>
            <div className="text">
              <Reveal>
                <p>
                  Nascemos da frustração de quem vive o mercado tech brasileiro. Boilerplate genérico que assume Stripe. Vagas com &quot;salário a combinar&quot;. Ferramentas em inglês com docs que ninguém traduz. Suporte que demora 3 dias pra responder uma issue.
                </p>
                <p>
                  Decidimos construir o que gostaríamos de ter. Produto por produto. Do zero. Em português. Cada lançamento é uma resposta a uma dor real que a gente também sentiu como dev.
                </p>
                <p>
                  Começamos em 2025 com dois produtos no ar: um boilerplate SaaS feito pra mercado brasileiro e um job board onde salário é obrigatório. Mais chegando — sem promessa, sem data, só quando estiver pronto.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* O time */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
              <SectionLabel>// o time</SectionLabel>
              <h2>Quem está construindo.</h2>
            </div>
          </Reveal>
          <div className="team-grid">
            <Reveal><TeamMember initials="SL" name="Samuel Lustosa Rodrigues Melo" role="founder · dev" /></Reveal>
            <Reveal><TeamMember initials="IL" name="Isaque Lustosa Rodrigues Melo" role="co-founder" /></Reveal>
            <Reveal><TeamMember initials="DO" name="Daniel de Oliveira Pimenta Melo" role="co-founder" /></Reveal>
          </div>
        </div>
      </section>

      {/* Nossos valores */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>// nossos valores</SectionLabel>
              <h2>Três regras. Nenhuma negociável.</h2>
            </div>
          </Reveal>
          <div className="values-grid">
            <Reveal>
              <ValueCard
                num="01"
                title="Transparência acima de tudo"
                desc="Preço visível, stack real, salário obrigatório. Nenhum produto nosso esconde o que importa."
              />
            </Reveal>
            <Reveal>
              <ValueCard
                num="02"
                title="Português primeiro"
                desc="Documentação, suporte e produto em PT-BR. O dev BR não precisa traduzir pra usar ferramenta boa."
              />
            </Reveal>
            <Reveal>
              <ValueCard
                num="03"
                title="Real antes de escala"
                desc='Não lançamos promessa. Lançamos produto. Sem "em breve" sem data.'
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
