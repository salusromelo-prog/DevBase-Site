import type { Metadata } from 'next'
import Reveal from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Sites para empresas · DevBase',
  description:
    'Criação de sites profissionais para clínicas, escritórios e negócios locais. Feito em Goiânia, para o Brasil. Fale com a gente no WhatsApp.',
  openGraph: {
    title: 'Sites para empresas · DevBase',
    description:
      'Criação de sites profissionais para clínicas, escritórios e negócios locais. Feito em Goiânia, para o Brasil. Fale com a gente no WhatsApp.',
    images: [{ url: '/og.png' }],
  },
}

const STEPS = [
  'Conversa — você conta o que precisa. Sem compromisso.',
  'Proposta — escopo e valor claros, sem surpresa no meio do caminho.',
  'Site no ar — você acompanha tudo até a publicação.',
]

export default function Empresas() {
  return (
    <div className="biz-page">
      <div className="biz-col">
        <Reveal>
          <span className="biz-label">// para empresas</span>
          <h1 className="biz-h1">
            Seu cliente já procurou você no Google hoje.{' '}
            O que ele encontrou?
          </h1>
        </Reveal>

        <Reveal>
          <p className="biz-p">
            Se a resposta é &quot;nada&quot; — ou pior, o concorrente — você está perdendo
            cliente sem nem ficar sabendo. Cartão de visita fica na gaveta.
            Instagram sozinho não convence quem vai gastar dinheiro de verdade.
          </p>
          <p className="biz-p">
            Um site profissional trabalha por você o dia inteiro: aparece quando
            procuram pelo seu serviço, responde as perguntas de sempre e passa
            confiança antes mesmo da primeira conversa. Inclusive às onze da noite
            de um domingo.
          </p>
          <p className="biz-p">
            A DevBase constrói sites com a mesma engenharia dos produtos que
            programadores pagam para usar. Rápido de abrir, seguro, e desenhado
            para o seu negócio — não um modelo pronto com o seu logo em cima.
          </p>
        </Reveal>

        <Reveal>
          <h2 className="biz-h2">Como funciona</h2>
          <ol className="biz-steps">
            {STEPS.map((step, i) => (
              <li key={i}>
                <span className="n">{i + 1} ·</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <h2 className="biz-h2">Para quem é</h2>
          <p className="biz-p">
            Clínicas, escritórios, academias, prestadores de serviço — negócios que
            vivem de confiança e precisam ser encontrados. Se o seu cliente pesquisa
            no Google antes de fechar, essa página é pra você.
          </p>
        </Reveal>

        <Reveal>
          <div className="biz-cta">
            <a
              href="https://wa.me/5562999071814?text=Ol%C3%A1!%20Quero%20um%20site%20para%20minha%20empresa."
              target="_blank"
              rel="noopener"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
