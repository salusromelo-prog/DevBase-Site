import type { Metadata } from 'next'
import Image from 'next/image'
import BizReveal from '@/components/biz-reveal'
import PfHero from '@/components/pf-hero'
import PfShapes from '@/components/pf-shapes'

const WHATSAPP_FECHO =
  'https://wa.me/5562999071814?text=Ol%C3%A1!%20Vi%20o%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto.'

const WHATSAPP_ORCAMENTO =
  'https://wa.me/5562999071814?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento%20para%20o%20site%20do%20meu%20neg%C3%B3cio.'

const MARZINI_URL = 'https://www.marzinilocacoes.com.br'

export const metadata: Metadata = {
  title: 'Portfólio · DevBase',
  description:
    'Projetos reais publicados e no ar. Veja como funciona o processo, do primeiro contato ao site entregue. Feito em Goiânia, para o Brasil.',
  openGraph: {
    title: 'Portfólio · DevBase',
    description:
      'Projetos reais publicados e no ar. Veja como funciona o processo, do primeiro contato ao site entregue.',
    images: [{ url: '/og.png' }],
  },
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

/* O primeiro exemplo do portfólio é a própria página que a pessoa já está
   lendo — e é ele que estabelece a régua antes de mostrar um projeto de
   escopo menor. Sem print: o exemplo está aberto na tela. */
const ESTE_SITE = [
  {
    t: 'Escrito do zero, linha por linha.',
    d: 'Nenhum tema comprado, nenhum construtor de arrastar bloco. Cada tela, cada animação e cada texto deste site foi decidido e programado por nós.',
  },
  {
    t: 'Rápido porque foi feito para ser.',
    d: 'Abre em segundos no celular, e isso conta no Google. Velocidade não sobra por sorte no fim do projeto — ela é escolhida no começo.',
  },
  {
    t: 'É o nosso teto, e ele é honesto.',
    d: 'Quando o escopo é livre, este é o nível que entregamos. Serve como referência do que somos capazes — e do que um projeto vira quando há espaço para ir até o fim.',
  },
]

const MARZINI_PONTOS = [
  'Catálogo completo com fotos',
  'Montador de orçamento que vira mensagem no WhatsApp',
  'Perguntas frequentes que respondem antes da conversa',
  'Encontrado no Google por quem busca locação em Goiânia',
]

/* Do primeiro contato à entrega. Cada passo responde a uma dúvida que
   trava a decisão de quem nunca contratou site antes. */
const PASSOS = [
  {
    n: '01',
    t: 'Conversa',
    d: 'Você conta o que o negócio precisa e o que hoje trava. Uma conversa no WhatsApp basta — sem formulário de vinte campos, sem reunião de uma hora para descobrir o óbvio.',
  },
  {
    n: '02',
    t: 'Orçamento fechado',
    d: 'Escopo e preço por escrito antes de qualquer linha de código. O valor que você aprova é o valor que você paga: não existe “apareceu um extra” no meio do caminho.',
  },
  {
    n: '03',
    t: 'Criação',
    d: 'Você acompanha o site nascendo com um link aberto, do primeiro rascunho à última tela. Ajuste durante a criação faz parte do combinado, não vira cobrança nova.',
  },
  {
    n: '04',
    t: 'No ar',
    d: 'Publicamos no seu domínio, com tudo testado. Você recebe os acessos no fim — o site é seu e não fica preso a nós para continuar existindo.',
  },
]

const ORCAMENTO = [
  {
    t: 'Preço fechado por projeto.',
    d: 'Você sabe o total antes de começar. Sem hora extra, sem escopo que cresce sozinho no meio do caminho.',
  },
  {
    t: 'Sem mensalidade obrigatória.',
    d: 'Domínio e hospedagem ficam no seu nome. Se quiser que a gente cuide da manutenção, é opcional e o valor aparece separado.',
  },
  {
    t: 'O orçamento define o tamanho, não o cuidado.',
    d: 'Todo projeto sai com o mesmo padrão de código, de velocidade e de acabamento. O que o valor decide é a extensão: quantas telas, quanto design sob medida, quanta animação, quanto sistema por trás. Na conversa a gente diz com clareza o que cabe no que você tem para investir.',
  },
  {
    t: 'Orçamento sem compromisso.',
    d: 'Você manda a ideia e recebe escopo e valor por escrito. Se não fizer sentido para o seu momento, não tem custo e não tem insistência.',
  },
]

export default function Portfolio() {
  return (
    <div className="pf-page">
      {/* ===== HERO ===== */}
      <PfHero
        title1="Não mostramos mockup."
        title2="Mostramos o site no ar."
        sub="Todo projeto desta página tem endereço público. Você abre, navega e testa antes de falar com a gente. Se não está publicado, não entra aqui. O primeiro exemplo é esta página."
        ctaHref="#este-site"
        ctaLabel="Começar pelo primeiro"
        altHref={WHATSAPP_FECHO}
        altLabel="Falar no WhatsApp"
      />

      {/* ===== ESTE SITE — o exemplo que vem antes de todos ===== */}
      <section className="pf-sec" id="este-site">
        <PfShapes set="close" />
        <div className="wrap">
          <BizReveal>
            <div className="pf-head">
              <span className="pf-label">// projeto 01 · devbase.tools</span>
              <h2 className="pf-h2">Você já está dentro de um projeto nosso.</h2>
              <p className="pf-lead">
                Este site é nosso — feito por nós, do design ao código. Antes de
                mostrar o trabalho que fizemos para outra pessoa, faz sentido
                mostrar o que fazemos quando o cliente somos nós mesmos.
              </p>
            </div>
          </BizReveal>

          <BizReveal delay={110}>
            <div className="gcard pf-orc">
              <div className="gcard-in">
                <ul className="pf-orc__list">
                  {ESTE_SITE.map(e => (
                    <li key={e.t}>
                      <span className="ck">{CHECK}</span>
                      <span>
                        <strong>{e.t}</strong>
                        {e.d}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="pf-note">
                  O projeto logo abaixo foi feito para um orçamento bem menor que
                  este — e a gente prefere explicar essa diferença a fingir que
                  ela não existe.
                </p>
              </div>
            </div>
          </BizReveal>
        </div>
      </section>

      {/* ===== O PROJETO — vitrine central ===== */}
      <section className="pf-sec pf-sec--line" id="marzini">
        <PfShapes set="show" />
        <div className="wrap">
          <BizReveal>
            <div className="pf-head">
              <span className="pf-label">// projeto 02 · cliente no ar</span>
              <h2 className="pf-h2">Marzini Locações e Eventos</h2>
              <div className="pf-meta">
                <span className="pf-live">
                  <i />
                  No ar
                </span>
                <span className="pf-ramo">Locação para eventos · Goiânia e região</span>
                <span className="pf-tag">orçamento enxuto</span>
              </div>
            </div>
          </BizReveal>

          {/* o print ganha o palco: moldura escura sobre um halo índigo */}
          <BizReveal delay={90}>
            <div className="pf-show">
              <span className="pf-show__glow" aria-hidden="true" />
              <a href={MARZINI_URL} target="_blank" rel="noopener" className="pf-frame">
                <span className="pf-frame__bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <em>marzinilocacoes.com.br</em>
                </span>
                <span className="pf-frame__shot">
                  <Image
                    src="/portfolio/marzini.jpg"
                    alt="Site da Marzini Locações e Eventos"
                    width={1200}
                    height={704}
                    sizes="(max-width: 980px) 92vw, 900px"
                  />
                </span>
              </a>
            </div>
          </BizReveal>

          <BizReveal delay={150}>
            <div className="pf-story">
              <p>
                A Marzini aluga mesas, cadeiras, louças e toalhas para casamentos,
                aniversários e eventos corporativos. Todo orçamento passava pelo
                WhatsApp, item por item, o que tomava tempo dos dois lados.
              </p>
              <p>
                O site resolveu isso: o cliente monta a própria lista escolhendo os
                itens e as quantidades, informa data e local, e envia tudo pronto
                pelo WhatsApp com um toque. A Marzini recebe o pedido organizado e
                só precisa responder com o valor.
              </p>
              <p>
                Vale dizer com franqueza: este foi um projeto de orçamento enxuto.
                O escopo foi desenhado para caber no que a Marzini podia investir
                naquele momento — resolver o problema do orçamento manual, ficar
                rápido no celular e aparecer no Google. Foi isso que entregamos, e
                é isso que está no ar funcionando.
              </p>
              <p>
                Comparar esta página com a que você está lendo é justo, e a
                explicação é simples: o orçamento não define o cuidado do código,
                define o tamanho do projeto. Quantas telas, quanto design sob
                medida, quanta animação, quanto sistema por trás. Com mais espaço,
                o resultado chega mais perto do nível deste site. Com menos, ele
                resolve o essencial — bem feito, no ar e seu.
              </p>
            </div>
          </BizReveal>

          <BizReveal delay={200}>
            <ul className="pf-points">
              {MARZINI_PONTOS.map(p => (
                <li key={p}>
                  <span className="ck">{CHECK}</span>
                  {p}
                </li>
              ))}
            </ul>
          </BizReveal>

          {/* Reservado para depoimento do cliente — preencher só com
              citação e nome reais fornecidos pela Marzini. Não inventar.
          <blockquote className="pf-quote">
            <p>“…”</p>
            <cite>— Nome, Marzini Locações e Eventos</cite>
          </blockquote>
          */}

          <BizReveal delay={240}>
            <div className="pf-cta-row">
              <a href={MARZINI_URL} target="_blank" rel="noopener" className="pf-btn">
                Visitar o site <span className="arr">→</span>
              </a>
            </div>
          </BizReveal>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section className="pf-sec pf-sec--line">
        <PfShapes set="steps" />
        <div className="wrap">
          <BizReveal>
            <div className="pf-head">
              <span className="pf-label">// como funciona</span>
              <h2 className="pf-h2">Do primeiro contato ao site no ar</h2>
              <p className="pf-lead">
                Contratar site costuma ser desconfortável porque ninguém explica o
                que vem depois do “vou fazer um orçamento”. Aqui está o caminho
                inteiro, na ordem em que acontece.
              </p>
            </div>
          </BizReveal>

          <div className="pf-steps">
            {PASSOS.map((p, i) => (
              <BizReveal key={p.n} delay={i * 110}>
                <article className="gcard">
                  <div className="gcard-in">
                    <span className="pf-step__n">{p.n}</span>
                    <h3 className="pf-step__t">{p.t}</h3>
                    <p className="pf-step__d">{p.d}</p>
                  </div>
                </article>
              </BizReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ORÇAMENTO ===== */}
      <section className="pf-sec pf-sec--line">
        <PfShapes set="orc" />
        <div className="wrap">
          <BizReveal>
            <div className="pf-head">
              <span className="pf-label">// orçamento</span>
              <h2 className="pf-h2">Quanto custa?</h2>
              <p className="pf-lead">
                Depende do que o seu negócio precisa — e ninguém sério cobra tabela
                fixa sem te ouvir primeiro. O que dá para garantir agora é como o
                preço se comporta.
              </p>
            </div>
          </BizReveal>

          <BizReveal delay={120}>
            <div className="gcard pf-orc">
              <div className="gcard-in">
                <ul className="pf-orc__list">
                  {ORCAMENTO.map(o => (
                    <li key={o.t}>
                      <span className="ck">{CHECK}</span>
                      <span>
                        <strong>{o.t}</strong>
                        {o.d}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pf-cta-row">
                  <a
                    href={WHATSAPP_ORCAMENTO}
                    target="_blank"
                    rel="noopener"
                    className="btn-wa"
                  >
                    Pedir orçamento <span className="arr">→</span>
                  </a>
                </div>
              </div>
            </div>
          </BizReveal>
        </div>
      </section>

      {/* ===== FECHO — o próximo projeto ===== */}
      <section className="pf-sec pf-close">
        <PfShapes set="close" />
        <div className="wrap">
          <BizReveal>
            <span className="pf-label">// projeto 03</span>
            <h2 className="pf-h2 pf-close__h">O próximo no ar pode ser o seu.</h2>
            <p className="pf-lead">
              Conte o que o seu negócio precisa e o quanto dá para investir. A
              gente responde com escopo e valor por escrito, e diz na cara o que
              cabe e o que não cabe — grande ou pequeno, a mesma equipe faz.
            </p>
            <div className="pf-cta-row">
              <a href={WHATSAPP_FECHO} target="_blank" rel="noopener" className="btn-wa">
                Chamar no WhatsApp <span className="arr">→</span>
              </a>
            </div>
          </BizReveal>
        </div>
      </section>
    </div>
  )
}
