import type { CSSProperties, ReactNode } from 'react'
import SectionDots from './section-dots'
import AccentBleed from './accent-bleed'

interface Props {
  children: ReactNode
  tone?: 'light' | 'dark'
  soft?: boolean
  dots?: boolean
  bleed?: 'tl' | 'tr' | 'bl' | 'br' | 'center' | false
  rail?: string
  id?: string
  tight?: boolean
  className?: string
  style?: CSSProperties
}

export default function SectionShell({
  children,
  tone = 'light',
  soft = false,
  dots = true,
  bleed = false,
  rail,
  id,
  tight = false,
  className = '',
  style,
}: Props) {
  const cls = ['sec', tight && 'tight', soft && 'soft', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={cls} data-rail={rail} id={id} style={style}>
      {dots && <SectionDots tone={tone} />}
      {bleed && <AccentBleed corner={bleed} />}
      <div className="sec-shell-inner">{children}</div>
    </section>
  )
}
