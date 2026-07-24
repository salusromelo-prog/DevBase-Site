import type { Metadata } from 'next'
import Link from 'next/link'
import BizReveal from '@/components/biz-reveal'
import BizTilt from '@/components/biz-tilt'
import BizFaq from '@/components/biz-faq'
import BizArt from '@/components/biz-art'

const WHATSAPP =
  'https://wa.me/5562999071814?text=Ol%C3%A1!%20Quero%20conversar%20sobre%20um%20projeto%20para%20minha%20empresa.'

export const metadata: Metadata = {
  title: 'Sites para empresas · DevBase',
  description:
    'Sites profissionais e sistemas sob medida para o seu negócio. Proposta com escopo e valor fechados, sem surpresa. Feito em Goiânia, para o Brasil.',
  openGraph: {
    title: 'Sites para empresas · DevBase',
    description:
      'Sites profissionais e sistemas sob medida para o seu negócio. Proposta com escopo e valor fechados, sem surpresa. Feito em Goiânia, para o Brasil.',
    images: [{ url: '/og.png' }],
  },
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const POINTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    title: 'Encontrado no Google',
    text: 'Quem procura pelo seu serviço acha você, não o concorrente.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Confiança antes da conversa',
    text: 'O cliente chega já convencido de que você é profissional.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    title: 'Aberto o tempo todo',
    text: 'Responde as perguntas de sempre, inclusive às onze da noite de um domingo.',
  },
]

const STEPS = [
  { num: '01', title: 'Conversa', text: 'Você conta o que precisa. Sem compromisso.' },
  { num: '02', title: 'Proposta', text: 'Escopo e valor fechados antes de começar. Sem surpresa no meio do caminho.' },
  { num: '03', title: 'No ar', text: 'Você acompanha tudo até a publicação, e a parte técnica é problema nosso, não seu.' },
]

const INCLUDED = [
  'Endereço do site (domínio) registrado e configurado pela gente',
  'Site no ar, rápido e funcionando em celular e computador',
  'Toda a parte técnica — você nunca precisa mexer em nada',
  'Escopo e valor definidos por escrito antes de começar',
]

export default function Empresas() {
  return (
    <div className="biz-page">
      {/* ===== HERO ===== */}
      <section className="biz-hero">
        <div className="wrap">
          <div className="biz-grid2">
            <BizReveal>
              <span className="biz-label">// para empresas</span>
              <h1 className="biz-h1">
                Seu cliente já procurou você no <em>Google</em> hoje.{' '}
                O que ele encontrou?
              </h1>
              <p className="biz-p" style={{ marginBottom: 36 }}>
                Se a resposta é &quot;nada&quot; — ou pior, o concorrente — você está perdendo
                cliente sem nem ficar sabendo. Cartão de visita fica na gaveta.
                Instagram sozinho não convence quem vai gastar dinheiro de verdade.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-wa">
                Chamar no WhatsApp <span className="arr">→</span>
              </a>
              <Link href="/portfolio" className="biz-hero__portfolio">
                Ver projetos que já estão no ar <span className="arr">→</span>
              </Link>
            </BizReveal>
            <BizReveal delay={150}>
              <BizTilt>
                <BizArt />
              </BizTilt>
            </BizReveal>
          </div>
        </div>
      </section>

      {/* ===== O QUE UM SITE RESOLVE ===== */}
      <section className="biz-sec biz-sec--gray">
        <div className="wrap">
          <BizReveal>
            <span className="biz-label">// benefícios</span>
          </BizReveal>
          <div className="biz-grid2">
            <div className="biz-points">
              {POINTS.map((p, i) => (
                <BizReveal key={p.title} delay={i * 100}>
                  <div className="biz-point">
                    <span className="ic">{p.icon}</span>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </div>
                  </div>
                </BizReveal>
              ))}
            </div>
            <BizReveal delay={150}>
              <p className="biz-p">
                Um site profissional trabalha por você o dia inteiro: aparece quando
                procuram pelo seu serviço, responde as perguntas de sempre e passa
                confiança antes mesmo da primeira conversa. Inclusive às onze da noite
                de um domingo.
              </p>
              <p className="biz-p" style={{ marginBottom: 0 }}>
                A DevBase constrói sites com a mesma engenharia dos produtos que
                programadores pagam para usar. Rápido de abrir, seguro, e desenhado
                para o seu negócio — não um modelo pronto com o seu logo em cima.
              </p>
            </BizReveal>
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

      {/* ===== SOB MEDIDA ===== */}
      <section className="biz-sec">
        <div className="wrap">
          <div className="biz-grid2">
            <BizReveal>
              <span className="biz-label">// sob medida</span>
              <h2 className="biz-h2">E quando o problema <em>não é</em> o site</h2>
              <p className="biz-p">
                Toda empresa tem aquela tarefa que rouba tempo: a planilha que só uma
                pessoa entende, o agendamento pelo WhatsApp que vive dando conflito,
                o controle de clientes espalhado em três lugares. Isso também é problema
                de software — e a gente constrói a ferramenta certa pra ele.
              </p>
              <p className="biz-p" style={{ marginBottom: 0 }}>
                Sistemas de agendamento, controle de clientes e atendimentos, automação
                de tarefas repetitivas, ferramentas internas do jeito que o seu negócio
                funciona. Sob medida, sob demanda: você conta o problema, a gente desenha
                a solução junto e você só fecha sabendo exatamente o que vai receber.
              </p>
            </BizReveal>
            <BizReveal delay={150}>
              <div className="biz-art biz-art--flow" aria-hidden="true">
                <svg viewBox="0 0 320 240" fill="none">
                  <path d="M142 50 C 164 50, 158 84, 178 84" stroke="#c7c8d4" strokeWidth="1.5" strokeDasharray="4 5" />
                  <path d="M240 116 C 240 140, 160 136, 160 160" stroke="#c7c8d4" strokeWidth="1.5" strokeDasharray="4 5" />
                  <path d="M78 82 C 78 124, 160 122, 160 160" stroke="#c7c8d4" strokeWidth="1.5" strokeDasharray="4 5" />
                  <rect x="18" y="20" width="124" height="62" rx="12" fill="#fff" stroke="rgba(26,26,26,0.14)" strokeWidth="1.5" />
                  <rect x="34" y="38" width="70" height="7" rx="3.5" fill="rgba(26,26,26,0.14)" />
                  <rect x="34" y="55" width="48" height="7" rx="3.5" fill="rgba(26,26,26,0.09)" />
                  <rect x="178" y="54" width="124" height="62" rx="12" fill="#fff" stroke="rgba(26,26,26,0.14)" strokeWidth="1.5" />
                  <rect x="194" y="72" width="70" height="7" rx="3.5" fill="rgba(26,26,26,0.14)" />
                  <rect x="194" y="89" width="48" height="7" rx="3.5" fill="rgba(26,26,26,0.09)" />
                  <rect x="98" y="160" width="124" height="62" rx="12" fill="#fff" stroke="#6366f1" strokeWidth="1.5" />
                  <rect x="114" y="178" width="70" height="7" rx="3.5" fill="rgba(99,102,241,0.45)" />
                  <rect x="114" y="195" width="48" height="7" rx="3.5" fill="rgba(99,102,241,0.22)" />
                  <circle cx="142" cy="50" r="4" fill="#6366f1" />
                  <circle cx="240" cy="116" r="4" fill="#6366f1" />
                  <circle cx="78" cy="82" r="4" fill="#6366f1" />
                  <circle cx="160" cy="160" r="4" fill="#6366f1" />
                </svg>
              </div>
            </BizReveal>
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
                O que cada projeto inclui além disso — páginas, funcionalidades,
                acompanhamento mensal — é definido junto com você na proposta.
                Transparência é regra aqui: você fecha sabendo exatamente o que
                vai receber e quanto custa.
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
