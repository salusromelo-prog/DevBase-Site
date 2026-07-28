'use client'

import { useState } from 'react'

const ITEMS = [
  {
    q: 'Quanto custa?',
    a: 'Depende do que o seu negócio precisa — um site simples e um sistema sob medida são projetos muito diferentes. Por isso a primeira conversa é de graça e sem compromisso: você conta o que precisa e recebe uma proposta com valor fechado, antes de decidir qualquer coisa.',
  },
  {
    q: 'Quanto tempo demora?',
    a: 'O prazo é definido na proposta, junto com o escopo — e cumprido. Sem "em breve", sem data que não chega.',
  },
  {
    q: 'Meu negócio é pequeno. Já preciso de um sistema?',
    a: 'Sistema não é coisa de empresa grande — é coisa de quem faz a mesma tarefa toda semana na mão. Se hoje já existe uma planilha, um caderno ou um grupo de WhatsApp fazendo o papel de ferramenta, dá pra transformar isso em algo que trabalha sozinho. E começa pequeno: a gente resolve primeiro o que mais atrapalha, não tudo de uma vez.',
  },
  {
    q: 'Dá pra integrar com o que eu já uso?',
    a: 'Na maioria dos casos, sim — WhatsApp, meios de pagamento, emissão de nota, planilhas e sistemas que a equipe já domina. A ideia nunca é jogar fora o que funciona: é fazer as peças conversarem, pra ninguém digitar a mesma informação três vezes.',
  },
  {
    q: 'O sistema é meu ou fico preso a vocês?',
    a: 'É seu. O código, os dados e os acessos são do seu negócio, e você leva com você se um dia quiser. A gente quer continuar cuidando por competência, não por dependência.',
  },
  {
    q: 'Já tenho Instagram. Preciso de site?',
    a: 'O Instagram é ótimo pra relacionamento, mas ele não aparece quando alguém pesquisa seu serviço no Google — e é ali que o cliente novo procura. Um não substitui o outro: o site traz quem ainda não te conhece, o Instagram cuida de quem já te segue.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Não. Domínio, hospedagem, servidor, segurança, backup, atualização — tudo isso é problema nosso. Você cuida do seu negócio, e o que chega até você é uma tela que qualquer pessoa da equipe consegue usar.',
  },
  {
    q: 'E se eu quiser mudar algo depois que estiver no ar?',
    a: 'Você fala com a gente e a gente altera. Sistema bom muda junto com o negócio — é esperado. Na proposta, você escolhe como prefere: alterações combinadas quando precisar, ou um plano de acompanhamento mensal com suporte contínuo.',
  },
  {
    q: 'Vocês atendem só Goiânia?',
    a: 'A DevBase é de Goiânia, mas o trabalho é todo online — atendemos qualquer lugar do Brasil.',
  },
]

export default function BizFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="biz-faq stg">
      {ITEMS.map((item, i) => (
        <div key={i} className={`biz-faq__item${open === i ? ' open' : ''}`}>
          <button
            className="biz-faq__q"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.q}
            <span className="pl" aria-hidden="true">+</span>
          </button>
          <div className="biz-faq__ans">
            <div>
              <p>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
