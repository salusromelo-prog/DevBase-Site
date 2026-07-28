import type { Metadata } from 'next'
import BizReveal from '@/components/biz-reveal'
import BizFaq from '@/components/biz-faq'
import BizPains from '@/components/biz-pains'
import BizSolutions from '@/components/biz-solutions'
import { AnimatedMarqueeHero } from '@/components/ui/hero-3'

const WHATSAPP =
  'https://wa.me/5562999071814?text=Ol%C3%A1!%20Quero%20conversar%20sobre%20um%20projeto%20para%20minha%20empresa.'

/* Negócios reais de quem contrata site: barbearia, padaria, restaurante,
   consultório, oficina, salão, cafeteria, pet shop, loja. Retrato 3:4,
   já cortado e comprimido pela CDN do Unsplash. */
const HERO_IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=800&q=70`

const HERO_IMAGES = [
  HERO_IMG('photo-1759134198561-e2041049419c'), // barbearia
  HERO_IMG('photo-1610896011699-bf6f466b024e'), // confeitaria
  HERO_IMG('photo-1636405189493-181ecf851006'), // restaurante
  HERO_IMG('photo-1643916800611-1302e8d27c38'), // consultório odontológico
  HERO_IMG('photo-1615906655593-ad0386982a0f'), // oficina mecânica
  HERO_IMG('photo-1746723370709-70d89a7b7999'), // salão — atendimento
  HERO_IMG('photo-1724627557637-89ea8c1f0ac6'), // cafeteria
  HERO_IMG('photo-1727681200723-9513e4e3c394'), // pet shop
  HERO_IMG('photo-1526069631228-723c945bea6b'), // restaurante
  HERO_IMG('photo-1598221860268-4c711f099b6d'), // loja de roupas
  HERO_IMG('photo-1662837625421-5fd8ed6131a0'), // dentista
  HERO_IMG('photo-1783323260497-0e779e3d517d'), // oficina
]

export const metadata: Metadata = {
  title: 'Sistemas e sites para empresas · DevBase',
  description:
    'Sistemas sob medida, automações e sites para o seu negócio: agendamento, controle de clientes, painel de gestão. Escopo e valor fechados, sem surpresa. Feito em Goiânia, para o Brasil.',
  openGraph: {
    title: 'Sistemas e sites para empresas · DevBase',
    description:
      'Sistemas sob medida, automações e sites para o seu negócio: agendamento, controle de clientes, painel de gestão. Escopo e valor fechados, sem surpresa. Feito em Goiânia, para o Brasil.',
    images: [{ url: '/og.png' }],
  },
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const STEPS = [
  {
    num: '01',
    title: 'Conversa',
    text: 'Você conta como o negócio funciona hoje e o que trava no meio do caminho. Sem compromisso.',
  },
  {
    num: '02',
    title: 'Proposta',
    text: 'Escopo, prazo e valor fechados antes de começar. Sem surpresa no meio do caminho.',
  },
  {
    num: '03',
    title: 'No ar',
    text: 'A gente constrói, você acompanha, e a parte técnica continua sendo problema nosso.',
  },
]

const INCLUDED = [
  'Domínio, servidor e hospedagem configurados e mantidos pela gente',
  'Tudo rápido e funcionando no celular, no computador e no tablet do balcão',
  'Backup e segurança dos dados do seu negócio, por padrão',
  'Escopo, prazo e valor definidos por escrito antes de começar',
]

export default function Empresas() {
  return (
    <div className="biz-page">
      {/* ===== HERO ===== */}
      <AnimatedMarqueeHero
        title={
          <>
            Seu cliente já procurou você no <em>Google</em> hoje
          </>
        }
        description="O que ele encontrou? Se a resposta é “nada” — ou pior, o concorrente — você está perdendo cliente sem nem ficar sabendo. A DevBase resolve isso, e também constrói os sistemas que fazem a empresa rodar depois que o cliente chega."
        ctaText="Chamar no WhatsApp"
        ctaHref={WHATSAPP}
        secondaryText="Ver projetos que já estão no ar"
        secondaryHref="/portfolio"
        images={HERO_IMAGES}
      />

      {/* ===== O QUE A GENTE CONSTRÓI — grade escura ===== */}
      <section className="biz-sec biz-sec--dark">
        <div className="biz-glow" aria-hidden="true" />
        <div className="wrap">
          <BizReveal>
            <span className="biz-label">// o que a gente constrói</span>
            <h2 className="biz-h2">
              Nem todo problema de empresa se resolve com um <em>site</em>
            </h2>
            <p className="biz-lead">
              Site é a porta de entrada — e a gente faz. Mas boa parte do que trava uma
              empresa acontece depois que o cliente entra: a agenda, o cadastro, a
              cobrança, o relatório do fim do mês. É aí que entra software sob medida.
            </p>
          </BizReveal>
          <BizSolutions />
        </div>
      </section>

      {/* ===== SINAIS ===== */}
      <section className="biz-sec biz-sec--gray">
        <div className="wrap">
          <div className="biz-grid2 biz-grid2--top">
            <BizReveal>
              <span className="biz-label">// sinais</span>
              <h2 className="biz-h2" style={{ marginBottom: 26 }}>
                Talvez já tenha passado da <em>hora</em>
              </h2>
              <p className="biz-p">
                Toda empresa tem aquela tarefa que rouba tempo e ninguém assume: a
                planilha que só uma pessoa entende, o agendamento que vive dando
                conflito, o controle de clientes espalhado em três lugares.
              </p>
              <p className="biz-p" style={{ marginBottom: 0 }}>
                Isso não é desorganização — é problema de software. E problema de
                software tem solução: a ferramenta certa, feita do jeito que o seu
                negócio já funciona.
              </p>
            </BizReveal>
            <BizPains />
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section className="biz-sec biz-sec--tint">
        <div className="wrap">
          <BizReveal>
            <span className="biz-label">// como funciona</span>
            <h2 className="biz-h2">Como funciona</h2>
          </BizReveal>
          <div className="biz-steps3">
            {STEPS.map((s, i) => (
              <BizReveal key={s.num} delay={i * 100} className="biz-step">
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </BizReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEMPRE POR NOSSA CONTA — card dark ===== */}
      <section className="biz-sec">
        <div className="wrap">
          <div className="biz-included">
            <BizReveal>
              <span className="biz-label">// o que está incluso</span>
              <h2 className="biz-h2">O que sempre está por nossa conta</h2>
            </BizReveal>
            <ul className="biz-checks">
              {INCLUDED.map((item, i) => (
                <BizReveal as="li" key={item} delay={i * 100}>
                  <div className="biz-check">
                    <span className="ck">{CHECK}</span>
                    {item}
                  </div>
                </BizReveal>
              ))}
            </ul>
            <BizReveal delay={200}>
              <p className="biz-p" style={{ maxWidth: '68ch', marginBottom: 0 }}>
                O que cada projeto inclui além disso — telas, funcionalidades,
                integrações, acompanhamento mensal — é definido junto com você na
                proposta. Transparência é regra aqui: você fecha sabendo exatamente
                o que vai receber e quanto custa.
              </p>
            </BizReveal>
          </div>
        </div>
      </section>

      {/* ===== PERGUNTAS FREQUENTES ===== */}
      <section className="biz-sec biz-sec--gray biz-sec--faq">
        <div className="wrap">
          <span className="biz-watermark" aria-hidden="true">&rdquo;</span>
          <BizReveal>
            <span className="biz-label">// perguntas frequentes</span>
            <h2 className="biz-h2">Perguntas frequentes</h2>
          </BizReveal>
          <BizReveal still>
            <BizFaq />
          </BizReveal>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="biz-band">
        <div className="wrap">
          <BizReveal>
            <h2>Vamos conversar sobre o seu <em>projeto</em>?</h2>
            <p>
              Primeira conversa de graça, sem compromisso. Você sai com clareza —
              mesmo que não feche com a gente.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-wa">
              Chamar no WhatsApp <span className="arr">→</span>
            </a>
          </BizReveal>
        </div>
      </section>
    </div>
  )
}
