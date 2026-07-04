import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import TeamMember from '@/components/team-member'
import ValueCard from '@/components/value-card'

export const metadata: Metadata = {
  title: 'Sobre · DevBase',
  description: 'A DevBase é uma empresa de tecnologia de Goiânia que constrói produtos para desenvolvedores e sites para empresas.',
}

export default function Sobre() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Reveal>
            <SectionLabel>// sobre a DevBase</SectionLabel>
          </Reveal>
          <Reveal>
            <h1>Uma empresa de tecnologia de Goiânia.</h1>
          </Reveal>
          <Reveal>
            <p className="sub">Construímos produtos para quem desenvolve e sites para quem empreende.</p>
          </Reveal>
        </div>
      </header>

      {/* Quem somos */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <SectionLabel>// quem somos</SectionLabel>
          </Reveal>
          <div className="text" style={{ marginTop: 24, maxWidth: 720 }}>
            <Reveal>
              <p>
                A DevBase nasceu em Goiânia em 2025. Somos três: Samuel, Isaque e Daniel.
                Começamos construindo ferramentas para desenvolvedores brasileiros — coisas que
                a gente mesmo precisava e não encontrava prontas, em português, com preço em real.
              </p>
              <p>
                Com o tempo, percebemos que a mesma engenharia que entrega qualidade para
                programadores pode entregar qualidade para empresas. Um site bem feito, rápido
                e seguro — não um template com o logo trocado.
              </p>
              <p>
                A internet brasileira não precisa de mais promessa. Precisa de coisa no ar.
                É assim que trabalhamos: sem &quot;em breve&quot; sem data, sem promessa vazia.
                Produto pronto, código funcionando, site no ar.
              </p>
            </Reveal>
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
            <Reveal><TeamMember initials="S" name="Samuel" role="founder · produto e dev" /></Reveal>
            <Reveal><TeamMember initials="I" name="Isaque" role="co-founder · marketing" /></Reveal>
            <Reveal><TeamMember initials="D" name="Daniel" role="co-founder · marketing" /></Reveal>
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
                desc="Preço visível, stack real, escopo claro. Nenhum produto e nenhum projeto nosso esconde o que importa."
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
