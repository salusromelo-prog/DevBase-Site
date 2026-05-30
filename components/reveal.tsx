'use client'

import { useEffect, useRef } from 'react'

export default function Reveal({
  children,
  className = '',
  delay,
  id,
  style,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  id?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.classList.add('in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      id={id}
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { '--d': `${delay}ms`, ...style } as React.CSSProperties : style}
    >
      {children}
    </div>
  )
}
