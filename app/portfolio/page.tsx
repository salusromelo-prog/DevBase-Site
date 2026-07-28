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
        sub="Todo projeto desta página tem endereço público. Você abre, navega e testa antes de falar com a gente. Se não está publicado, não entra aqui."
        ctaHref="#marzini"
        ctaLabel="Ver o projeto"
        altHref={WHATSAPP_FECHO}
        altLabel="Falar no WhatsApp"
      />

      {/* ===== O PROJETO — vitrine central ===== */}
      <section className="pf-sec" id="marzini">
        <PfShapes set="show" />
        <div className="wrap">
          <BizReveal>
            <div className="pf-head">
              <span className="pf-label">// cliente no ar</span>
              <h2 className="pf-h2">Marzini Locações e Eventos</h2>
              <div className="pf-meta">
                <span className="pf-live">
                  <i />
                  No ar
                </span>
                <span className="pf-ramo">Locação para eventos · Goiânia e região</span>
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

      {/* ===== FECHO — o próprio site ===== */}
      <section className="pf-sec pf-close">
        <PfShapes set="close" />
        <div className="wrap">
          <BizReveal>
            <span className="pf-label">// e este aqui</span>
            <h2 className="pf-h2 pf-close__h">Este site também é nosso.</h2>
            <p className="pf-lead">
              Tudo que você viu até agora — o design, a velocidade, os detalhes —
              foi feito pela mesma equipe que vai construir o seu.
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
