'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import useScrollReveal from '@/hooks/use-scroll-reveal'

/* Scroll reveal do registro empresa: opacity 0 + translateY(24px) → estado
   final em 600ms ease-out. `delay` (ms) para stagger entre irmãos; `still`
   quando o wrapper só serve de gatilho para filhos .stg. */
export default function BizReveal({
  children,
  className = '',
  delay = 0,
  still = false,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  still?: boolean
  as?: ElementType
}) {
  const ref = useScrollReveal<HTMLElement>()
  const Tag = as

  return (
    <Tag
      ref={ref}
      className={['brv', still ? 'brv-still' : '', className].filter(Boolean).join(' ')}
      style={delay ? ({ '--brd': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
