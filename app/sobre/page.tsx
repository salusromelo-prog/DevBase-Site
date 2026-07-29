import type { Metadata } from 'next'
import Reveal from '@/components/reveal'
import SectionLabel from '@/components/section-label'
import BackgroundPaths from '@/components/background-paths'
import SobreHero from '@/components/sobre-hero'
import { GITLOG } from '@/data/gitlog'

export const metadata: Metadata = {
  title: 'Sobre · DevBase',
  description: 'Empresa de tecnologia de Goiânia. Produtos para devs, sites e sistemas para empresas. Fundada em 2025.',
}

// história em data/gitlog.ts — fonte única da timeline
const LOG = GITLOG

// os três valores — antes eram linhas de um devbase.config; agora cada um
// ganha o próprio cartão, com a chave preservada como assinatura mono
const VALORES = [
  {
    key: 'transparencia',
    title: 'Transparência acima de tudo.',
    desc: 'Preço visível, escopo claro. Nenhum projeto esconde o que importa.',
  },
  {
    key: 'idioma',
    title: 'Português primeiro.',
    desc: 'Docs, suporte e produto em PT-BR. Sem tradução pela metade.',
  },
  {
    key: 'regra',
    title: 'Real antes de escala.',
    desc: 'Não lançamos promessa. Lançamos produto. Sem “em breve”, sem data.',
  },
]

const TIME = [
  { initials: 'S', name: 'Samuel', role: 'founder · produto e dev', sig: 'Samuel <produto·dev>' },
  { initials: 'I', name: 'Isaque', role: 'co-founder · marketing e vendas', sig: 'Isaque <marketing·vendas>' },
  { initials: 'D', name: 'Daniel', role: 'co-founder · marketing', sig: 'Daniel <marketing>' },
]

export default function Sobre() {
  return (
    <>
      {/* fundo de traços animados — fixo, atrás da página inteira.
          fica fora de .page-dark de propósito: é position:fixed e a regra
          ".page-dark > *" (empilhamento da aurora) sobrescreveria o seu. */}
      <BackgroundPaths />

      <div className="page-dark has-paths">
        <SobreHero
          badge="Goiânia · fundada em 2025"
          title="Uma empresa de tecnologia de Goiânia."
          sub="Construímos produtos para quem desenvolve e sites para quem empreende."
        />

        {/* manifesto — a régua que não muda */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="manifesto">
                <p>
                  Não vendemos <span className="on">promessa</span>.{' '}
                  Vendemos <span className="ac">produto</span> que já está no ar.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* quem somos, em prosa — datas e marcos ficam no git log abaixo.
            Aqui é o lugar do propósito: por que existimos e como pensamos. */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <SectionLabel>// quem somos</SectionLabel>
                <h2>Três pessoas que preferem construir a prometer.</h2>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="sobre-story">
                <p className="lead">
                  A DevBase é um estúdio pequeno de Goiânia. Somos três — e é com
                  os três que você fala. Quem responde a sua mensagem é quem vai
                  escrever o código, e isso muda tudo: <b>não existe camada entre
                  quem promete e quem entrega</b>.
                </p>
                <p>
                  A gente começou construindo para si mesmo. Todo produto do
                  catálogo existe porque um de nós travou naquele ponto: a página
                  em branco sem saber o que fazer, as duas semanas de configuração
                  antes da primeira tela, o formulário que quebra na hora de
                  validar um CPF. Em vez de reclamar, resolvemos — e depois
                  achamos justo entregar resolvido para quem viria atrás.
                </p>
                <p>
                  O propósito é esse: tirar do caminho a parte chata para que
                  alguém possa fazer a parte que importa. Vale para o dev que
                  quer lançar sem gastar um mês em fundação, e vale para o
                  comerciante de Goiânia que só precisa parar de perder cliente
                  por causa de um site que não existe. Em português, com preço em
                  real, sem termo que ninguém entende.
                </p>
                <p>
                  Também é o que a gente não é: não somos agência de proposta
                  bonita, não vendemos “em breve” e não usamos número inventado
                  para parecer maior.{' '}
                  <b>Só conta o que está no ar</b> — essa é a régua desde o
                  primeiro dia, e é por isso que o registro logo abaixo é um{' '}
                  <span className="ac">git log</span>, não um roadmap.
                </p>
                <p>
                  Somos um time pequeno construindo devagar e de propósito, uma
                  entrega por vez. Se um dia a DevBase for grande, vai ser porque
                  cada coisa aqui funcionou de verdade para alguém — não porque
                  contamos uma história melhor.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* git log — o registro datado, um cartão por commit */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <SectionLabel>// git log — o registro</SectionLabel>
                <h2>Um repositório vivo.</h2>
                <p className="sub">Cada linha aqui já aconteceu. Nada de roadmap.</p>
              </div>
            </Reveal>

            <div className="glog-stack">
              {LOG.map((entry, i) => (
                <Reveal key={entry.hash} delay={i * 80}>
                  <article className="gcard glog-card">
                    <div className="gcard-in">
                      <div className="glog-top">
                        <span className="glog-dot" />
                        <span className="glog-hash">{entry.hash}</span>
                        <span className="glog-date">{entry.date}</span>
                      </div>
                      <h3 className="glog-msg">
                        <span className="glog-type">{entry.type}</span>
                        {entry.msg && <> {entry.msg}</>}
                      </h3>
                      <p className="glog-desc">{entry.desc}</p>
                    </div>
                  </article>
                </Reveal>
              ))}

              <Reveal delay={LOG.length * 80}>
                <article className="gcard glog-card glog-wip">
                  <div className="gcard-in">
                    <div className="glog-top">
                      <span className="glog-dot" />
                      <span className="glog-hash">-------</span>
                    </div>
                    <h3 className="glog-msg">
                      <span className="glog-wip-txt">// próximo commit em andamento</span>
                      <span className="cc-caret" />
                    </h3>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* contributors */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <SectionLabel>// contributors</SectionLabel>
                <h2>Quem está construindo.</h2>
              </div>
            </Reveal>

            <div className="gtrio">
              {TIME.map((p, i) => (
                <Reveal key={p.name} delay={i * 90}>
                  <article className="gcard member-card">
                    <div className="gcard-in">
                      <span className="member-av">{p.initials}</span>
                      <h3 className="member-nm">{p.name}</h3>
                      <p className="member-rl">{p.role}</p>
                      <p className="member-sig">{p.sig}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* valores — três regras, três cartões */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <SectionLabel>// nossos valores</SectionLabel>
                <h2>Três regras. Nenhuma negociável.</h2>
              </div>
            </Reveal>

            <div className="gtrio">
              {VALORES.map((v, i) => (
                <Reveal key={v.key} delay={i * 90}>
                  <article className="gcard val-card">
                    <div className="gcard-in">
                      <span className="val-num">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="val-title">{v.title}</h3>
                      <p className="val-desc">{v.desc}</p>
                      <span className="val-key">{v.key}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* fecho em duas vozes — agora dois pills de vidro, centrados */}
        <section className="section sobre-close">
          <div className="wrap">
            <Reveal>
              <h2 className="close-h">De que lado você está?</h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="close-pills">
                <a href="/produtos" className="gpill">
                  <span className="gpill-in">
                    <span className="gpill-q">Constrói produtos?</span>
                    <span className="gpill-go">Ver o catálogo <span className="gpill-arr">→</span></span>
                  </span>
                </a>
                <a href="/empresas" className="gpill">
                  <span className="gpill-in">
                    <span className="gpill-q">Tem uma empresa?</span>
                    <span className="gpill-go">Conhecer as soluções <span className="gpill-arr">→</span></span>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  )
}
