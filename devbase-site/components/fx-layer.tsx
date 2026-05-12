'use client'

import { useEffect, useRef } from 'react'

export default function FxLayer() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scroll progress bar
    const bar = barRef.current
    function updateProgress() {
      if (!bar) return
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      bar.style.setProperty('--sp', p.toFixed(4))
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    updateProgress()

    // Hero cursor spotlight
    function onMouseMove(e: MouseEvent) {
      const hero = document.querySelector<HTMLElement>('.hero')
      if (!hero) return
      const r = hero.getBoundingClientRect()
      const mx = ((e.clientX - r.left) / r.width) * 100
      const my = ((e.clientY - r.top) / r.height) * 100
      hero.style.setProperty('--mx', mx + '%')
      hero.style.setProperty('--my', my + '%')
    }
    document.addEventListener('mousemove', onMouseMove)

    // Magnetic buttons
    let cleanups: (() => void)[] = []
    if (!reduced) {
      function attachMagnetic() {
        document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
          function onMove(e: MouseEvent) {
            const r = btn.getBoundingClientRect()
            const x = e.clientX - r.left - r.width / 2
            const y = e.clientY - r.top - r.height / 2
            btn.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`
          }
          function onLeave() {
            btn.style.transform = ''
          }
          btn.addEventListener('mousemove', onMove)
          btn.addEventListener('mouseleave', onLeave)
          cleanups.push(() => {
            btn.removeEventListener('mousemove', onMove)
            btn.removeEventListener('mouseleave', onLeave)
          })
        })
      }
      attachMagnetic()

      // 3D tilt on product cards
      document.querySelectorAll<HTMLElement>('.product').forEach((card) => {
        let raf = 0
        function onMove(e: MouseEvent) {
          const r = card.getBoundingClientRect()
          const mx = e.clientX - r.left
          const my = e.clientY - r.top
          const dx = mx / r.width - 0.5
          const dy = my / r.height - 0.5
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(() => {
            card.classList.add('tilt')
            card.style.setProperty('--rx', (dx * 8).toFixed(2) + 'deg')
            card.style.setProperty('--ry', (dy * -6).toFixed(2) + 'deg')
            card.style.setProperty('--mx', ((mx / r.width) * 100).toFixed(1) + '%')
            card.style.setProperty('--my', ((my / r.height) * 100).toFixed(1) + '%')
          })
        }
        function onLeave() {
          card.classList.remove('tilt')
          card.style.removeProperty('--rx')
          card.style.removeProperty('--ry')
        }
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove)
          card.removeEventListener('mouseleave', onLeave)
        })
      })
    }

    // Stagger indexing
    document.querySelectorAll('.stagger').forEach((g) => {
      ;[...g.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)))
    })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      document.removeEventListener('mousemove', onMouseMove)
      cleanups.forEach((fn) => fn())
    }
  }, [])

  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      {!reduced && (
        <>
          <div className="aurora" aria-hidden="true" />
          <div className="aurora aurora-b" aria-hidden="true" />
        </>
      )}
    </>
  )
}
