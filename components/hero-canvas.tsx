'use client'

import { useEffect, useRef } from 'react'

export type HeroVariant = 'silk' | 'aurora' | 'flow'

const PURP: [number, number, number][] = [
  [99, 102, 241],
  [139, 92, 246],
  [167, 139, 250],
  [79, 70, 229],
  [125, 211, 252],
]

type Blob = {
  c: [number, number, number]
  r: number; ax: number; ay: number; ex: number; ey: number
  sx: number; sy: number; px: number; py: number
}

type Particle = {
  x: number; y: number; life: number; max: number
  c: [number, number, number]; w: number
}

function makeEngine(canvas: HTMLCanvasElement, initialVariant: HeroVariant) {
  const ctx = canvas.getContext('2d')!
  let W = 0, H = 0
  const dpr = Math.min(devicePixelRatio || 1, 2)
  let mainRaf = 0, easeRaf = 0, resizeTimer: ReturnType<typeof setTimeout> | null = null
  let variant = initialVariant
  let paused = false
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
  let blobs: Blob[] = []
  let parts: Particle[] = []

  function buildAurora() {
    blobs = []
    const n = Math.max(5, Math.round(W * H / 240000))
    for (let i = 0; i < n; i++) {
      blobs.push({
        c: PURP[i % PURP.length],
        r: 220 + Math.random() * 320,
        ax: Math.random() * W, ay: Math.random() * H,
        ex: 120 + Math.random() * 220, ey: 120 + Math.random() * 220,
        sx: 0.18 + Math.random() * 0.22, sy: 0.16 + Math.random() * 0.2,
        px: Math.random() * 6.28, py: Math.random() * 6.28,
      })
    }
  }

  function drawAurora(now: number) {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#0a0913'; ctx.fillRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'lighter'
    const tt = now / 1000, mx = mouse.x - 0.5, my = mouse.y - 0.5
    for (const b of blobs) {
      const x = b.ax + Math.sin(tt * b.sx + b.px) * b.ex + mx * 60
      const y = b.ay + Math.cos(tt * b.sy + b.py) * b.ey + my * 60
      const g = ctx.createRadialGradient(x, y, 0, x, y, b.r)
      const [r, gr, bl] = b.c
      g.addColorStop(0, `rgba(${r},${gr},${bl},0.42)`)
      g.addColorStop(0.4, `rgba(${r},${gr},${bl},0.16)`)
      g.addColorStop(1, `rgba(${r},${gr},${bl},0)`)
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, b.r, 0, 6.2832); ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
    const v = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, Math.max(W, H) * 0.75)
    v.addColorStop(0, 'rgba(10,9,19,0)'); v.addColorStop(1, 'rgba(10,9,19,0.55)')
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H)
  }

  function resetP(p: Particle) {
    p.x = Math.random() * W; p.y = Math.random() * H
    p.life = 0; p.max = 60 + Math.random() * 120
    p.c = PURP[(Math.random() * PURP.length) | 0]
    p.w = 0.6 + Math.random() * 1.2
    return p
  }

  function buildFlow() {
    parts = []
    const n = Math.max(140, Math.round(W * H / 5200))
    for (let i = 0; i < n; i++) parts.push(resetP({ x: 0, y: 0, life: 0, max: 0, c: PURP[0], w: 1 }))
  }

  function drawFlow(now: number) {
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(10,9,19,0.08)'; ctx.fillRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'lighter'
    const t = now / 2600, mx = (mouse.x - 0.5) * 40, my = (mouse.y - 0.5) * 40
    const s = 0.0016
    for (const p of parts) {
      const a = Math.sin(p.x * s + Math.cos(p.y * s * 1.3 + t)) * 1.6
              + Math.cos(p.y * s - Math.sin(p.x * s * 0.8 - t)) * 1.6
      const nx = p.x + Math.cos(a) * 1.6, ny = p.y + Math.sin(a) * 1.6
      const [r, g, b] = p.c
      const al = 0.5 * Math.sin((p.life / p.max) * Math.PI)
      ctx.strokeStyle = `rgba(${r},${g},${b},${al})`; ctx.lineWidth = p.w
      ctx.beginPath(); ctx.moveTo(p.x + mx * 0.02, p.y + my * 0.02)
      ctx.lineTo(nx + mx * 0.02, ny + my * 0.02); ctx.stroke()
      p.x = nx; p.y = ny; p.life++
      if (p.life > p.max || p.x < 0 || p.x > W || p.y < 0 || p.y > H) resetP(p)
    }
    ctx.globalCompositeOperation = 'source-over'
  }

  function drawSilk(now: number) {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#0a0913'; ctx.fillRect(0, 0, W, H)
    const t = now / 1000, mx = (mouse.x - 0.5) * 40
    ctx.globalCompositeOperation = 'lighter'
    for (let L = 0; L < 6; L++) {
      const [r, gg, b] = PURP[L % PURP.length]
      const yBase = H * (0.35 + L * 0.085)
      const amp = 40 + L * 16, k = 0.004 + L * 0.0006, sp = 0.5 + L * 0.18
      ctx.beginPath(); ctx.moveTo(0, H)
      for (let x = 0; x <= W; x += 14) {
        const y = yBase + Math.sin(x * k + t * sp + L) * amp
                       + Math.cos(x * k * 0.6 - t * 0.4) * amp * 0.4 + mx * 0.1
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W, H); ctx.closePath()
      const g = ctx.createLinearGradient(0, yBase - amp, 0, H)
      g.addColorStop(0, `rgba(${r},${gg},${b},0.16)`)
      g.addColorStop(1, `rgba(${r},${gg},${b},0)`)
      ctx.fillStyle = g; ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
    const v = ctx.createLinearGradient(0, 0, 0, H)
    v.addColorStop(0, 'rgba(10,9,19,0.4)'); v.addColorStop(0.5, 'rgba(10,9,19,0)')
    v.addColorStop(1, 'rgba(10,9,19,0.6)')
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H)
  }

  function build() {
    if (variant === 'aurora') buildAurora()
    else if (variant === 'flow') { buildFlow(); ctx.fillStyle = '#0a0913'; ctx.fillRect(0, 0, W, H) }
  }

  function loop(now: number) {
    if (variant === 'aurora') drawAurora(now)
    else if (variant === 'flow') drawFlow(now)
    else drawSilk(now)
    mainRaf = requestAnimationFrame(loop)
  }

  function resize() {
    const rect = canvas.getBoundingClientRect()
    W = Math.max(1, Math.round(rect.width))
    H = Math.max(1, Math.round(rect.height))
    canvas.width = W * dpr; canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    build()
  }

  const onMouseMove = (e: MouseEvent) => {
    mouse.tx = e.clientX / innerWidth
    mouse.ty = e.clientY / innerHeight
  }

  function easeLoop() {
    mouse.x += (mouse.tx - mouse.x) * 0.06
    mouse.y += (mouse.ty - mouse.y) * 0.06
    easeRaf = requestAnimationFrame(easeLoop)
  }

  const onResize = () => {
    resize()
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(resize, 250)
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
  resize()
  easeLoop()

  if (reduced) {
    if (variant === 'aurora') drawAurora(1200)
    else if (variant === 'flow') { for (let i = 0; i < 60; i++) drawFlow(i * 16) }
    else drawSilk(800)
  } else {
    mainRaf = requestAnimationFrame(loop)
  }

  return {
    pause() {
      if (paused || reduced) return
      paused = true
      cancelAnimationFrame(mainRaf)
    },
    resume() {
      if (!paused || reduced) return
      paused = false
      mainRaf = requestAnimationFrame(loop)
    },
    setVariant(v: HeroVariant) {
      cancelAnimationFrame(mainRaf)
      variant = v
      build()
      if (!reduced) mainRaf = requestAnimationFrame(loop)
      else loop(performance.now())
    },
    destroy() {
      cancelAnimationFrame(mainRaf)
      cancelAnimationFrame(easeRaf)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    },
  }
}

export default function HeroCanvas({
  variant = 'silk',
  className = '',
}: {
  variant?: HeroVariant
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const engine = makeEngine(canvas, variant)
    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? engine.resume() : engine.pause() },
      { threshold: 0 }
    )
    io.observe(canvas)
    return () => { engine.destroy(); io.disconnect() }
  }, [variant])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
