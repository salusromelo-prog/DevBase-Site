import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import TeamMember from '@/components/team-member'
import Aurora from '@/components/Aurora'
import { GITLOG } from '@/data/gitlog'

export const metadata: Metadata = {
  title: 'Sobre · DevBase',
  description: 'A DevBase é uma empresa de tecnologia de Goiânia que constrói produtos para desenvolvedores e sites para empresas.',
}

// história em data/gitlog.ts — fonte única da timeline
const LOG = GITLOG

export default function Sobre() {
  return (
    <div className="page-dark">
      {/* modo memória: mais lenta e mais fria que a home (ordem invertida) */}
      <Aurora intensity={0.6} speed={0.6} colors={['#6366f1', '#1e40af', '#8b5cf6']} />
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

      {/* git log — a história */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>// git log — a história</SectionLabel>
              <h2>Um repositório vivo.</h2>
            </div>
          </Reveal>
          <div className="gitlog">
            {LOG.map((entry, i) => (
              <Reveal key={entry.hash} delay={i * 90}>
                <div className="glog-entry">
                  <div className="glog-meta">
                    <span className="glog-hash">{entry.hash}</span>
                    <span className="glog-date">{entry.date}</span>
                  </div>
                  <div className="glog-msg">
                    <span className="glog-type">{entry.type}</span>
                    {entry.msg && <> {entry.msg}</>}
                  </div>
                  <p className="glog-desc">{entry.desc}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={LOG.length * 90}>
              <div className="glog-entry glog-wip">
                <div className="glog-meta">
                  <span className="glog-hash">-------</span>
                </div>
                <div className="glog-msg">
                  <span className="glog-wip-txt">// próximo commit em andamento</span>
                  <span className="cc-caret" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
              <SectionLabel>// contributors</SectionLabel>
              <h2>Quem está construindo.</h2>
            </div>
          </Reveal>
          <div className="team-grid">
            <Reveal><TeamMember initials="S" name="Samuel" role="founder · produto e dev" sig="Samuel <produto·dev>" /></Reveal>
            <Reveal><TeamMember initials="I" name="Isaque" role="co-founder · marketing" sig="Isaque <marketing>" /></Reveal>
            <Reveal><TeamMember initials="D" name="Daniel" role="co-founder · marketing" sig="Daniel <marketing>" /></Reveal>
          </div>
        </div>
      </section>

      {/* Valores como config */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <SectionLabel>// nossos valores</SectionLabel>
              <h2>Três regras. Nenhuma negociável.</h2>
            </div>
          </Reveal>
          <Reveal className="blur">
            <div className="codecard cfg-card">
              <div className="browser-bar">
                <i /><i /><i />
                <span className="url">devbase.config</span>
              </div>
              <div className="cc-body">
                <div><span className="cm">{'// três regras. nenhuma negociável.'}</span></div>
                <div><span className="ky">transparencia</span> <span className="eq">=</span> <span className="st">{'"acima de tudo"'}</span></div>
                <div className="cfg-ind"><span className="cm">{'// preço visível, escopo claro. nenhum projeto esconde o que importa.'}</span></div>
                <div><span className="ky">idioma</span> <span className="eq">=</span> <span className="st">{'"português primeiro"'}</span></div>
                <div className="cfg-ind"><span className="cm">{'// docs, suporte e produto em PT-BR. sem tradução pela metade.'}</span></div>
                <div><span className="ky">regra</span> <span className="eq">=</span> <span className="st">{'"real antes de escala"'}</span></div>
                <div className="cfg-ind"><span className="cm">{'// não lançamos promessa. lançamos produto. sem "em breve", sem data.'}</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fecho em duas vozes */}
      <section className="sobre-split">
        <a href="/produtos" className="split-half split-dev">
          <span className="split-q">Constrói produtos?</span>
          <span className="split-link">Ver o catálogo <span className="split-arr">→</span></span>
        </a>
        <a href="/empresas" className="split-half split-biz">
          <span className="split-q">Tem uma empresa?</span>
          <span className="split-link">Conhecer as soluções <span className="split-arr">→</span></span>
        </a>
      </section>
    </div>
  )
}
