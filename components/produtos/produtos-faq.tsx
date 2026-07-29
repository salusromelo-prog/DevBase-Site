'use client'

import { useState } from 'react'

/* Mesma mecânica do FAQ de /empresas (grid-template-rows 0fr→1fr, sem
   medir altura), em registro dark e com as perguntas que chegam de quem
   compra produto avulso. */

const ITENS = [
  {
    q: 'É assinatura?',
    a: 'Não. Todos os produtos são pagamento único. Você paga uma vez e o acesso é vitalício — incluindo as atualizações que a gente publicar depois.',
  },
  {
    q: 'Como recebo o acesso?',
    a: 'Por e-mail, em até 15 minutos após a confirmação do pagamento. O 100 Micro SaaS abre num dashboard próprio; Boilerplate e Components chegam com o acesso ao repositório.',
  },
  {
    q: 'Posso pagar com PIX?',
    a: 'Pode. O checkout aceita PIX, boleto e cartão. Preço em real, sem IOF e sem conversão.',
  },
  {
    q: 'Por qual eu começo?',
    a: 'Se você ainda não sabe o que construir, comece pelo 100 Micro SaaS — é o mais barato e resolve a parte que trava mais gente. Se já sabe o quê e quer pular a fundação, o Boilerplate. Se já tem projeto rodando e só falta a parte brasileira, os Components.',
  },
  {
    q: 'Posso usar em mais de um projeto?',
    a: 'Sim. O código é seu para usar em quantos projetos quiser, inclusive em trabalho para clientes. O que não pode é revender o produto em si.',
  },
  {
    q: 'Preciso ser dev sênior?',
    a: 'Não. O Boilerplate e os Components partem do princípio de que você sabe React e TypeScript o suficiente para ler o código — a documentação é toda em português, justamente para não depender de traduzir tutorial gringo no meio do caminho.',
  },
  {
    q: 'E se não for pra mim?',
    a: 'A compra tem garantia. Se o produto não for o que você esperava, você pede reembolso pelo próprio checkout e devolvemos o valor.',
  },
]

export default function ProdutosFaq() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <div className="pfaq">
      {ITENS.map((item, i) => (
        <div key={item.q} className={`pfaq__item${aberta === i ? ' open' : ''}`}>
          <button
            className="pfaq__q"
            aria-expanded={aberta === i}
            onClick={() => setAberta(aberta === i ? null : i)}
          >
            <span>{item.q}</span>
            <span className="pfaq__pl" aria-hidden="true">+</span>
          </button>
          <div className="pfaq__a">
            <div>
              <p>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
