'use client'

import { useEffect } from 'react'

/* A luz que seguia o ponteiro saiu de cena.
   Era uma camada fixa por cima da página inteira — um radial índigo e um
   recorte de dots que acendiam — presa ao cursor em todas as rotas
   escuras. O brilho grudado no ponteiro puxava o olho para onde o mouse
   estava parado em vez de para o que estava escrito ali, e a camada
   cobria a tela toda só para desenhar um círculo.

   O que sobrou é o rastreamento LOCAL dos cards do catálogo: a borda viva
   do .pcard, que só existe sob o cursor, morre com ele e não tem camada
   nenhuma pairando sobre o resto da página. */
export default function CursorFx() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let card: HTMLElement | null = null
    /* a caixa do card em cache: getBoundingClientRect() a cada mousemove
       força layout síncrono, e a caixa só muda quando o card muda, a
       página rola ou a janela é redimensionada */
    let rect: DOMRect | null = null
    let x = 0, y = 0, raf = 0

    function flush() {
      raf = 0
      if (!card) return
      card.style.setProperty('--px', x.toFixed(1) + 'px')
      card.style.setProperty('--py', y.toFixed(1) + 'px')
    }

    function onMove(e: MouseEvent) {
      const t = e.target as Element | null
      const c = t && 'closest' in t ? t.closest<HTMLElement>('.pcard') : null
      if (!c) { card = null; rect = null; return }
      if (c !== card || !rect) { card = c; rect = c.getBoundingClientRect() }
      x = e.clientX - rect.left
      y = e.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(flush)
    }

    const invalidate = () => { rect = null }

    addEventListener('mousemove', onMove, { passive: true })
    addEventListener('scroll', invalidate, { passive: true })
    addEventListener('resize', invalidate)
    return () => {
      removeEventListener('mousemove', onMove)
      removeEventListener('scroll', invalidate)
      removeEventListener('resize', invalidate)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
