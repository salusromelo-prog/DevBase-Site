import type { CSSProperties } from 'react'
import { PRODUTOS } from '@/data/produtos'

/* A prateleira: o catálogo lido de lombada.
   Quatro painéis do mesmo tamanho; o que está sob o cursor abre e conta
   o que é, os outros encolhem. É índice e ilustração ao mesmo tempo —
   clicar leva à ficha correspondente mais abaixo na página.

   Sem estado de React de propósito: abertura é :hover/:focus-within puro,
   então funciona antes da hidratação e é navegável por teclado. No mobile
   a prateleira vira uma lista compacta (regra em globals.css). */

export default function CatalogShelf() {
  return (
    <div className="cshelf" role="list">
      {PRODUTOS.map((p, i) => (
        <div
          key={p.id}
          role="listitem"
          className="cshelf-slot"
          style={{ '--ac': p.accent, '--i': i } as CSSProperties}
        >
          <a href={`#${p.id}`} className="spine">
            <span className="spine__glow" aria-hidden="true" />
            <span className="spine__n" aria-hidden="true">{p.n}</span>

            {/* estado fechado: nome de lombada + preço */}
            <span className="spine__rail">
              <span className="spine__nome">{p.curto}</span>
              <span className="spine__preco">{p.preco.por}</span>
            </span>

            {/* estado aberto: o pitch */}
            <span className="spine__body" aria-hidden="true">
              <span className="spine__kicker">{p.linha}</span>
              <span className="spine__titulo">{p.nome}</span>
              <span className="spine__desc">{p.desc}</span>
              <span className="spine__go">
                ver a ficha <span className="arr">↓</span>
              </span>
            </span>
          </a>
        </div>
      ))}
    </div>
  )
}
