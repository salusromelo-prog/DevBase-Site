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
    q: 'Já tenho Instagram. Preciso de site?',
    a: 'O Instagram é ótimo pra relacionamento, mas ele não aparece quando alguém pesquisa seu serviço no Google — e é ali que o cliente novo procura. Um não substitui o outro: o site traz quem ainda não te conhece, o Instagram cuida de quem já te segue.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Não. Domínio, hospedagem, segurança, atualização — tudo isso é problema nosso. Você cuida do seu negócio.',
  },
  {
    q: 'E se eu quiser mudar algo depois que o site estiver no ar?',
    a: 'Você fala com a gente e a gente altera. Na proposta, você escolhe como prefere: alterações combinadas quando precisar, ou um plano de acompanhamento mensal com suporte contínuo.',
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
