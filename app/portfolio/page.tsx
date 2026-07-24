import type { Metadata } from 'next'
import Image from 'next/image'
import BizReveal from '@/components/biz-reveal'

const WHATSAPP_FECHO =
  'https://wa.me/5562999071814?text=Ol%C3%A1!%20Vi%20o%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto.'

const MARZINI_URL = 'https://www.marzinilocacoes.com.br'

export const metadata: Metadata = {
  title: 'Portfólio · DevBase',
  description:
    'Sites que construímos e estão no ar. Projetos reais e demonstrações por ramo. Feito no Brasil, para o Brasil.',
  openGraph: {
    title: 'Portfólio · DevBase',
    description:
      'Sites que construímos e estão no ar. Projetos reais e demonstrações por ramo. Feito no Brasil, para o Brasil.',
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

/* Moldura de navegador com print real do site, clicável.
   Mesmo espírito da ilustração .biz-art da /empresas, mas com imagem. */
function Frame({
  href,
  src,
  alt,
  demo = false,
}: {
  href: string
  src: string
  alt: string
  demo?: boolean
}) {
  return (
    <a href={href} target="_blank" rel="noopener" className="pf-frame">
      <span className="pf-frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="pf-frame__shot">
        {demo && <span className="pf-badge-demo">Demonstração</span>}
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={704}
          sizes="(max-width: 920px) 90vw, 600px"
        />
      </span>
    </a>
  )
}

const DEMOS = [
  {
    src: '/portfolio/mentorize.jpg',
    href: 'https://mentorize-contabilidade.vercel.app/',
    title: 'Mentorize',
    ramo: 'Contabilidade consultiva',
    text: 'Escritório de contabilidade que precisa passar seriedade antes da primeira conversa e explicar serviços sem jargão.',
  },
  {
    src: '/portfolio/coluna.jpg',
    href: 'https://coluna-em-movimento-demo.vercel.app/',
    title: 'Coluna em Movimento',
    ramo: 'Clínica de quiropraxia',
    text: 'Clínica com mais de uma unidade, que precisa transformar quem pesquisa por dor nas costas em avaliação agendada.',
  },
]

export default function Portfolio() {
  return (
    <div className="biz-page pf-page">
      {/* ===== HERO ===== */}
      <section className="biz-hero">
        <div className="wrap">
          <BizReveal>
            <span className="biz-label">// portfólio</span>
            <h1 className="biz-h1">Projetos no ar.</h1>
            <p className="biz-p" style={{ maxWidth: '58ch', marginBottom: 0 }}>
              Não é apresentação em PDF. São sites publicados, funcionando, que
              você pode abrir e navegar agora — inclusive este que você está
              lendo.
            </p>
          </BizReveal>
        </div>
      </section>

      {/* ===== CLIENTE — destaque principal ===== */}
      <section className="biz-sec biz-sec--gray">
        <div className="wrap">
          <BizReveal>
            <span className="biz-label">// cliente</span>
            <h2 className="biz-h2" style={{ marginBottom: 40 }}>
              Marzini Locações e Eventos
            </h2>
          </BizReveal>
          <div className="biz-grid2">
            {/* ESQUERDA — imagem (empilha primeiro no mobile) */}
            <BizReveal>
              <Frame
                href={MARZINI_URL}
                src="/portfolio/marzini.jpg"
                alt="Site da Marzini Locações e Eventos"
              />
            </BizReveal>

            {/* DIREITA — texto */}
            <BizReveal delay={150}>
              <span className="pf-live">
                <i />
                No ar
              </span>
              <p className="pf-ramo">Locação para eventos · Goiânia e região</p>
              <p className="biz-p">
                A Marzini aluga mesas, cadeiras, louças e toalhas para
                casamentos, aniversários e eventos corporativos. Todo orçamento
                passava pelo WhatsApp, item por item, o que tomava tempo dos dois
                lados.
              </p>
              <p className="biz-p">
                O site resolveu isso: o cliente monta a própria lista escolhendo
                os itens e as quantidades, informa data e local, e envia tudo
                pronto pelo WhatsApp com um toque. A Marzini recebe o pedido
                organizado e só precisa responder com o valor.
              </p>
              <ul className="pf-list">
                {MARZINI_PONTOS.map(p => (
                  <li key={p}>
                    <span className="ck">{CHECK}</span>
                    {p}
                  </li>
                ))}
              </ul>

              {/* Reservado para depoimento do cliente — preencher só com
                  citação e nome reais fornecidos pela Marzini. Não inventar.
              <blockquote className="pf-quote">
                <p>“…”</p>
                <cite>— Nome, Marzini Locações e Eventos</cite>
              </blockquote>
              */}

              <a
                href={MARZINI_URL}
                target="_blank"
                rel="noopener"
                className="pf-btn"
              >
                Visitar o site <span className="arr">→</span>
              </a>
            </BizReveal>
          </div>
        </div>
      </section>

      {/* ===== DEMONSTRAÇÕES ===== */}
      <section className="biz-sec">
        <div className="wrap">
          <BizReveal>
            <span className="biz-label">// demonstrações</span>
            <h2 className="biz-h2" style={{ marginBottom: 20 }}>
              Exemplos completos, por ramo
            </h2>
            <p className="biz-p" style={{ maxWidth: '64ch', marginBottom: 56 }}>
              Você não precisa contratar pra saber como ficaria. Estes são
              projetos demonstrativos — sites completos que construímos para
              mostrar o padrão de trabalho em ramos que atendemos com
              frequência.
            </p>
          </BizReveal>
          <div className="pf-demos">
            {DEMOS.map((d, i) => (
              <BizReveal key={d.title} delay={i * 120} className="pf-demo">
                <Frame href={d.href} src={d.src} alt={`Demonstração: ${d.title}`} demo />
                <h3 className="pf-demo__title">{d.title}</h3>
                <p className="pf-ramo">{d.ramo}</p>
                <p className="biz-p" style={{ marginBottom: 20 }}>
                  {d.text}
                </p>
                <a href={d.href} target="_blank" rel="noopener" className="pf-visit">
                  Ver demonstração <span className="arr">→</span>
                </a>
              </BizReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FECHO — o próprio site ===== */}
      <section className="biz-band">
        <div className="wrap">
          <BizReveal>
            <span className="biz-label pf-band-label">// e este aqui</span>
            <h2>Este site também é nosso.</h2>
            <p>
              Tudo que você viu até agora — o design, a velocidade, os detalhes —
              foi feito pela mesma equipe que vai construir o seu.
            </p>
            <a href={WHATSAPP_FECHO} target="_blank" rel="noopener" className="btn-wa">
              Chamar no WhatsApp <span className="arr">→</span>
            </a>
          </BizReveal>
        </div>
      </section>
    </div>
  )
}
