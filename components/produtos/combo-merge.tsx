import type { CSSProperties } from 'react'

/* O combo desenhado: dois conjuntos que deixam de ser dois.
   Estático no servidor — a vida vem do CSS, disparada quando o
   .reveal que envolve o bloco entra (regra em globals.css). */

const ESQ = ['auth', 'pagamentos', 'dashboard']
const DIR = ['CPF/CNPJ', 'PIX', 'cartão']

/* y do topo de cada chip; o centro fica 22px abaixo */
const YS = [40, 116, 192]

/* pathLength=1 deixa o traço ser desenhado por dashoffset sem que o
   CSS precise saber o comprimento real de cada curva */
const LINHAS = [
  'M126,62 C152,62 152,140 176,140',
  'M126,138 L176,140',
  'M126,214 C152,214 152,140 176,140',
  'M334,62 C308,62 308,140 284,140',
  'M334,138 L284,140',
  'M334,214 C308,214 308,140 284,140',
]

export default function ComboMerge() {
  return (
    <svg className="cmerge" viewBox="0 0 460 280" role="img" aria-label="Boilerplate e Components convergindo em um projeto só">
      <defs>
        <linearGradient id="cmerge-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {LINHAS.map((d, i) => (
        <path key={d} className="cmerge-ln" style={{ '--i': i } as CSSProperties} d={d} pathLength={1} />
      ))}

      {ESQ.map((t, i) => (
        <g key={t} className="cmerge-chip cmerge-chip--esq" style={{ '--i': i } as CSSProperties}>
          <rect x={8} y={YS[i]} width={118} height={44} rx={11} />
          <text x={67} y={YS[i] + 27}>{t}</text>
        </g>
      ))}

      {DIR.map((t, i) => (
        <g key={t} className="cmerge-chip cmerge-chip--dir" style={{ '--i': i } as CSSProperties}>
          <rect x={334} y={YS[i]} width={118} height={44} rx={11} />
          <text x={393} y={YS[i] + 27}>{t}</text>
        </g>
      ))}

      <g className="cmerge-core">
        <rect x={176} y={110} width={108} height={60} rx={14} />
        <text className="cmerge-core__t" x={230} y={136}>1 projeto</text>
        <text className="cmerge-core__p" x={230} y={156}>R$ 197</text>
      </g>

      <text className="cmerge-lbl" x={67} y={26}>boilerplate</text>
      <text className="cmerge-lbl" x={393} y={26}>components</text>
    </svg>
  )
}
