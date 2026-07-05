'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

/* Tilt 3D sutil seguindo o cursor — máx 4deg. Só age em dispositivos com
   hover real e respeita prefers-reduced-motion. */
export default function BizTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${(px * 8).toFixed(2)}deg) rotateX(${(py * -8).toFixed(2)}deg)`
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div ref={ref} className="biz-tilt" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  )
}
