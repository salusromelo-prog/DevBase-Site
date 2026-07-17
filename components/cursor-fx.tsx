'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/* páginas com spotlight ambiente: dark = índigo ~7% + dots que acendem;
   light = índigo ~4%, sem dots. Demais rotas: nada. */
const DARK_PAGES = ['/', '/sobre', '/produtos']
const LIGHT_PAGES = ['/empresas']

export default function CursorFx() {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  const mode: 'dark' | 'light' | null = DARK_PAGES.includes(pathname)
    ? 'dark'
    : LIGHT_PAGES.includes(pathname)
      ? 'light'
      : null

  useEffect(() => {
    if (!mode) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = ref.current
    if (!root) return

    /* um listener global; posição via rAF + CSS vars, com lerp (persegue o cursor) */
    let tx = -900, ty = -900, x = tx, y = ty
    let raf = 0
    let card: HTMLElement | null = null
    let cardX = 0, cardY = 0, cardDirty = false

    function frame() {
      raf = 0
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      const done = Math.abs(tx - x) < 0.3 && Math.abs(ty - y) < 0.3
      if (done) { x = tx; y = ty }
      root!.style.setProperty('--mx', x.toFixed(1))
      root!.style.setProperty('--my', y.toFixed(1))
      if (cardDirty && card) {
        card.style.setProperty('--px', cardX.toFixed(1) + 'px')
        card.style.setProperty('--py', cardY.toFixed(1) + 'px')
        cardDirty = false
      }
      if (!done) raf = requestAnimationFrame(frame)
    }

    function onMove(e: MouseEvent) {
      tx = e.clientX
      ty = e.clientY
      /* borda viva dos cards do catálogo — coordenadas locais por card, via delegação */
      const t = e.target as Element | null
      const c = t && 'closest' in t ? t.closest<HTMLElement>('.pcard') : null
      if (c) {
        const r = c.getBoundingClientRect()
        card = c
        cardX = e.clientX - r.left
        cardY = e.clientY - r.top
        cardDirty = true
      }
      if (!raf) raf = requestAnimationFrame(frame)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [mode, pathname])

  if (!mode) return null

  return (
    <div ref={ref} className={`cfx cfx--${mode}`} aria-hidden="true">
      <div className="cfx-glow" />
      {mode === 'dark' && (
        <div className="cfx-dots-win">
          <div className="cfx-dots" />
        </div>
      )}
    </div>
  )
}
