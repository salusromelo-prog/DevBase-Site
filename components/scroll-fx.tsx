'use client'
import { useEffect } from 'react'

export default function ScrollFx() {
  useEffect(() => {
    'use strict'
    const $  = (s: string, r: Document | Element = document) => r.querySelector(s) as HTMLElement | null
    const $$ = (s: string, r: Document | Element = document) => [...r.querySelectorAll(s)] as HTMLElement[]
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.add('js')
    const lerp  = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

    /* ---------- progress bar ---------- */
    const bar = document.createElement('div'); bar.className = 'sx-progress'; document.body.appendChild(bar)

    /* ---------- split big headings into words ---------- */
    /* o guard do .sw: em desenvolvimento o StrictMode monta o efeito duas
       vezes, e sem ele a segunda passada re-fatiaria títulos já fatiados —
       um .sw dentro do outro, com o texto encaixotado duas vezes */
    $$('[data-split]').forEach(h => {
      if (h.querySelector('.sw')) return
      const frag = document.createElement('div'); frag.innerHTML = h.innerHTML
      const words: Array<{ space?: true; w?: string; cls?: string }> = [];
      (function walk(node: Node, cls: string) {
        node.childNodes.forEach(n => {
          if (n.nodeType === 3) {
            (n.textContent || '').split(/(\s+)/).forEach(tok => {
              if (tok.trim() === '') { if (tok.length) words.push({ space: true }) }
              else words.push({ w: tok, cls })
            })
          } else if (n.nodeType === 1) {
            walk(n, (((n as Element).className || '') + ' ' + cls).trim())
          }
        })
      })(frag, '')
      h.innerHTML = ''
      let i = 0
      words.forEach(o => {
        if (o.space) { h.appendChild(document.createTextNode(' ')); return }
        const wrap = document.createElement('span'); wrap.className = 'sw'
        const inner = document.createElement('span'); inner.textContent = o.w || ''
        if (o.cls) inner.className = o.cls
        inner.style.setProperty('--wd', (i * 55) + 'ms')
        wrap.appendChild(inner); h.appendChild(wrap); i++
      });
      (h as HTMLElement & { _sws?: HTMLElement[] })._sws = $$('.sw', h)
    })

    /* ---------- depth-stagger delays ---------- */
    $$('[data-depth-stagger]').forEach(g => [...g.children].forEach((c, i) => { if (c.classList.contains('depth')) (c as HTMLElement).style.setProperty('--d', (i * 90) + 'ms') }))

    /* ---------- reveal targets ----------------------------------------
       Antes isto era varredura por posição: a cada quadro (e a cada evento
       de scroll) o código chamava getBoundingClientRect() em TODO elemento
       ainda não revelado. Ler geometria logo depois de o quadro anterior
       ter escrito estilo obriga o navegador a refazer o layout ali mesmo,
       de forma síncrona — e na home isso acontecia intercalado com as
       escritas do hero de scroll-expansion, que redimensiona o card a cada
       quadro. Era essa alternância leitura↔escrita que travava o hero no
       celular.

       O IntersectionObserver faz a mesma conta fora da thread principal e
       só avisa quando o estado muda. As margens negativas reproduzem os
       limiares antigos: revelar quando o topo passa de 88% da viewport
       (daí -12%) e acender as palavras do título em 94% (daí -6%). */
    const observers: IntersectionObserver[] = []

    if ($$('.reveal, .depth').length) {
      const io = new IntersectionObserver(entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      }, { rootMargin: '0px 0px -12% 0px' })
      $$('.reveal, .depth').forEach(el => io.observe(el))
      observers.push(io)
    }

    const splitEls = $$('[data-split]')
    if (splitEls.length) {
      const io = new IntersectionObserver(entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const h = e.target as HTMLElement & { _sws?: HTMLElement[] }
          ;(h._sws || []).forEach(sw => sw.classList.add('lit'))
          io.unobserve(h)
        }
      }, { rootMargin: '0px 0px -6% 0px' })
      splitEls.forEach(el => io.observe(el))
      observers.push(io)
    }

    /* ---------- section rail ---------- */
    const secs = $$('[data-rail]')
    let rail: HTMLDivElement | null = null, railBtns: HTMLElement[] = []
    if (secs.length > 2) {
      rail = document.createElement('div'); rail.className = 'sx-rail'
      secs.forEach((s, i) => {
        const b = document.createElement('button')
        b.dataset.label = s.dataset.rail || ('0' + (i + 1))
        b.addEventListener('click', () => s.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        rail!.appendChild(b)
      })
      document.body.appendChild(rail)
      railBtns = [...rail.children] as HTMLElement[]
    }

    /* ---------- elements ---------- */
    const hero = $('.hero'), heroInner = $('.hero-inner'), heroCanvas = $('.hero-canvas')
    const heroSwitch = $('.hero-switch'), scrollcue = $('.scrollcue')
    const skews = $$('[data-skew-item]'), paras = $$('[data-parallax]')

    /* altura rolável em cache. Lê-la no laço custava um layout síncrono por
       quadro pelo mesmo motivo dos reveals — e ela só muda quando o
       documento muda de tamanho, que é exatamente o que o observador
       abaixo detecta. */
    let docH = document.documentElement.scrollHeight - innerHeight
    const measure = () => { docH = document.documentElement.scrollHeight - innerHeight }

    let current = scrollY
    let raf = 0

    function tick() {
      raf = 0
      const top = scrollY
      current = lerp(current, top, 0.14)
      /* alcançou o scroll: este é o último quadro, o laço não se reagenda */
      const settled = Math.abs(top - current) < 0.06
      if (settled) current = top
      const vel = top - current

      bar.style.setProperty('--sx', (docH > 0 ? clamp(top / docH, 0, 1) : 0).toFixed(4))

      if (!reduced) {
        if (hero && heroInner && current < innerHeight * 1.15) {
          const p = clamp(current / innerHeight, 0, 1)
          heroInner.style.transform = `translateY(${current * 0.4}px) scale(${1 - p * 0.06})`
          heroInner.style.opacity   = String(clamp(1 - p * 1.15, 0, 1))
          if (heroCanvas) heroCanvas.style.transform = `scale(${1 + p * 0.16}) translateY(${current * 0.1}px)`
          if (heroSwitch) heroSwitch.style.opacity   = String(clamp(1 - p * 1.8, 0, 1))
          if (scrollcue)  scrollcue.style.opacity    = String(clamp(1 - p * 2.4, 0, 1))
        }
        const sk = clamp(vel * 0.05, -3, 3)
        for (const el of skews) el.style.transform = `skewY(${sk * (parseFloat(el.dataset.skewItem || '1'))}deg)`
        /* leituras primeiro, escritas depois: intercalar as duas faria uma
           re-layout por elemento em vez de uma para o grupo todo */
        if (paras.length) {
          const ys = paras.map(el => {
            const r = el.getBoundingClientRect()
            return -(r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.parallax || '0.15')
          })
          paras.forEach((el, i) => { el.style.transform = `translate3d(0, ${ys[i].toFixed(2)}px, 0)` })
        }
        /* o trilho é display:none abaixo de 1100px (regra em globals.css),
           então no celular medir as seções seria trabalho para ninguém ver */
        if (railBtns.length && innerWidth >= 1100) {
          const tops = secs.map(s => s.getBoundingClientRect().top)
          let active = 0
          tops.forEach((t, i) => { if (t <= innerHeight * 0.42) active = i })
          railBtns.forEach((b, i) => b.classList.toggle('on', i === active))
          rail!.classList.toggle('on-dark', !!(secs[active] && (secs[active].classList.contains('hero') || secs[active].classList.contains('phead'))))
        }
      }

      if (!settled) raf = requestAnimationFrame(tick)
    }

    /* quem acorda o laço. Página parada = zero quadros: antes o rAF se
       reagendava para sempre, queimando bateria e concorrendo com o rAF do
       hero mesmo com o dedo longe da tela. */
    const wake = () => { if (!raf) raf = requestAnimationFrame(tick) }
    const onResize = () => { measure(); wake() }

    addEventListener('scroll', wake, { passive: true })
    addEventListener('resize', onResize)
    const ro = new ResizeObserver(() => { measure(); wake() })
    ro.observe(document.documentElement)
    wake()

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', wake)
      removeEventListener('resize', onResize)
      ro.disconnect()
      observers.forEach(io => io.disconnect())
      bar.remove()
      rail?.remove()
    }
  }, [])
  return null
}
