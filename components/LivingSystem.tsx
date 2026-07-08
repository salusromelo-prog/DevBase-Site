'use client'

import { useEffect, useRef } from 'react'

/* ================================================================
   O SISTEMA VIVO — fundo canvas assinatura da DevBase
   Uma malha de circuito que representa software sendo construído
   e entrando no ar continuamente. Um motor; cada página é um
   "humor" do mesmo organismo (mode/accent/fragments/density).

   Camadas:
   1. MALHA  — traços índigo percorrem caminhos ortogonais entre os
      pontos do grid, acendendo os pontos por onde passam (decay lento).
   2. DEPLOYS — a cada 8–15s um pulso radial nasce num ponto aleatório
      com um fragmento mono minúsculo que vive ~2s.
   3. TOQUE  — perto do cursor a malha acende e os traços aceleram;
      no touch, o toque dispara um pulso local.
   ================================================================ */

type Mode = 'home' | 'sobre' | 'produto'

interface Props {
  mode: Mode
  accent?: string
  fragments?: string[]
  density?: number
}

/* ---------------- calibragem (budgets — ajustar aqui PRIMEIRO se o
   perfil de performance cair; nunca otimizar outra coisa antes) ---- */
const MAX_TRACOS = 30            // traços simultâneos (desktop, density 1)
const MAX_TRACOS_MOBILE = 15     // pointer: coarse
const MAX_PULSOS = 2             // pulsos de deploy simultâneos
const VELOCIDADE_TRACO = 60      // px/s — lento, hipnótico
const DECAY_PONTO = 3000         // ms até um ponto aceso apagar
const INTERVALO_PULSO_MIN = 8000 // ms entre deploys
const INTERVALO_PULSO_MAX = 15000
const OPACIDADE_TRACO = 0.35     // opacidade máxima do traço
const PONTO_ACESO = 0.5          // opacidade máxima de ponto aceso
const FRAG_FONT_PX = 10          // fragmentos: 10px JetBrains Mono
const FRAG_ALPHA = 0.4           // opacidade máxima do fragmento
const ESPACO_BASE = 28           // px entre pontos da malha (density 1)
const VIDA_PULSO = 2200          // ms de vida de um pulso
const RAIO_CURSOR = 150          // raio de reação da malha ao cursor
const DPR_MAX = 1.5

/* humores por página — o que cada rota não passar por prop cai aqui */
const HUMOR: Record<
  Mode,
  { accent: string; density: number; speed: number; fragments: string[]; watch: string }
> = {
  home: {
    accent: '#6366f1',
    density: 1,
    speed: VELOCIDADE_TRACO,
    watch: '.sec-dark, .who',
    fragments: ['build ok', 'deploy → produção', '217ms', 'no ar ✓', 'push origin master', 'tests passed'],
  },
  sobre: {
    accent: '#6366f1',
    density: 0.7,
    speed: 40, // modo memória — mais lento
    watch: '.page-dark',
    fragments: [],
  },
  produto: {
    accent: '#6366f1',
    density: 0.5, // o fundo não compete com o checkout
    speed: VELOCIDADE_TRACO,
    watch: '.phead',
    fragments: [],
  },
}

const TAU = Math.PI * 2

function hexRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

type Traco = {
  col: number; row: number             // nó alvo no grid
  x: number; y: number                 // posição da cabeça (px)
  dx: number; dy: number               // direção ortogonal atual
  segs: number                         // segmentos restantes de vida
  fade: number                         // rampa de entrada/saída (<0 = espera)
  dying: boolean
  corners: { x: number; y: number }[]  // nós já percorridos (cauda)
}

type Pulso = { x: number; y: number; age: number; txt: string }

export default function LivingSystem({ mode, accent, fragments, density }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fragRef = useRef(fragments)
  fragRef.current = fragments

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas: HTMLCanvasElement = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const humor = HUMOR[mode]
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const temCursor = !coarse && window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const dens = (density ?? humor.density) * (coarse ? 0.5 : 1) // mobile: metade
    const speed = humor.speed
    const frags = (fragRef.current && fragRef.current.length ? fragRef.current : humor.fragments) ?? []
    const [ar, ag, ab] = hexRgb(accent ?? humor.accent)
    // versão clara do accent (cabeças de traço / pontos perto do cursor)
    const lr = Math.round(ar + (255 - ar) * 0.45)
    const lg = Math.round(ag + (255 - ag) * 0.45)
    const lb = Math.round(ab + (255 - ab) * 0.45)
    const acc = (a: number) => `rgba(${ar},${ag},${ab},${a.toFixed(3)})`
    const accClaro = (a: number) => `rgba(${lr},${lg},${lb},${a.toFixed(3)})`

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX)
    const sp = Math.round(ESPACO_BASE / Math.sqrt(Math.min(1, dens))) // density < 1 = malha mais esparsa
    const nTracos = Math.max(4, Math.round((coarse ? MAX_TRACOS_MOBILE : MAX_TRACOS) * (density ?? humor.density)))

    let W = 0, H = 0, cols = 0, rows = 0
    let base: HTMLCanvasElement | null = null
    let fragFont = `${FRAG_FONT_PX}px ui-monospace, monospace`
    {
      const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim()
      if (mono) fragFont = `${FRAG_FONT_PX}px ${mono}, ui-monospace, monospace`
    }

    /* estado vivo */
    const tracos: Traco[] = []
    const pulsos: Pulso[] = []
    const acesos = new Map<number, number>() // idx do nó -> calor 1..0
    const mouse = { x: -9999, y: -9999, in: false }
    let fragIdx = (Math.random() * Math.max(1, frags.length)) | 0
    let pulsoTimer = 4000 + Math.random() * 4000 // primeiro deploy chega mais cedo
    let raf = 0
    let lastT = 0
    let pageVisible = !document.hidden
    const secsVisiveis = new Set<Element>()

    /* ---------------- malha base (offscreen, redesenhada só no resize) */
    function buildBase() {
      base = document.createElement('canvas')
      base.width = Math.max(1, Math.round(W * dpr))
      base.height = Math.max(1, Math.round(H * dpr))
      const b = base.getContext('2d')!
      b.setTransform(dpr, 0, 0, dpr, 0, 0)
      b.fillStyle = '#0a0a0a'
      b.fillRect(0, 0, W, H)
      b.fillStyle = 'rgba(244,243,251,0.07)'
      b.beginPath()
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * sp, y = r * sp
          b.moveTo(x + 1.1, y)
          b.arc(x, y, 1.1, 0, TAU)
        }
      }
      b.fill()
    }

    function spawnTraco(t: Traco, primeira = false) {
      const col = 1 + ((Math.random() * Math.max(1, cols - 2)) | 0)
      const row = 1 + ((Math.random() * Math.max(1, rows - 2)) | 0)
      const dirs: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]]
      const [dx, dy] = dirs[(Math.random() * 4) | 0]
      t.x = col * sp; t.y = row * sp
      t.dx = dx; t.dy = dy
      t.col = Math.min(cols - 1, Math.max(0, col + dx))
      t.row = Math.min(rows - 1, Math.max(0, row + dy))
      t.segs = 5 + ((Math.random() * 10) | 0)
      t.fade = primeira ? -Math.random() * 2 : -0.2 - Math.random() * 1.2 // espera antes de renascer
      t.dying = false
      t.corners = [{ x: t.x, y: t.y }]
      return t
    }

    /* na chegada a um nó: segue reto (60%) ou vira; nunca dá ré */
    function proximaDirecao(t: Traco): boolean {
      const reto: [number, number] = [t.dx, t.dy]
      const viradas: [number, number][] = t.dx !== 0 ? [[0, 1], [0, -1]] : [[1, 0], [-1, 0]]
      if (Math.random() < 0.5) viradas.reverse()
      const ordem = Math.random() < 0.6 ? [reto, ...viradas] : [...viradas, reto]
      for (const [dx, dy] of ordem) {
        const nc = t.col + dx, nr = t.row + dy
        if (nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
          t.dx = dx; t.dy = dy; t.col = nc; t.row = nr
          return true
        }
      }
      return false
    }

    function acende(col: number, row: number) {
      acesos.set(row * cols + col, 1)
    }

    function updateTraco(t: Traco, dt: number) {
      if (t.dying) {
        t.fade -= dt / 450
        if (t.fade <= 0) spawnTraco(t)
        return
      }
      t.fade = Math.min(1, t.fade + dt / 700)
      if (t.fade < 0) return // ainda esperando a vez
      let boost = 1
      if (temCursor && mouse.in) {
        const d = Math.hypot(t.x - mouse.x, t.y - mouse.y)
        const R = RAIO_CURSOR * 1.6
        if (d < R) boost = 1 + 0.8 * (1 - d / R) // levemente acelerado perto do cursor
      }
      let passo = (speed * boost * dt) / 1000
      let guarda = 8 // nunca mais que 8 nós num frame
      while (passo > 0 && guarda-- > 0) {
        const tx = t.col * sp, ty = t.row * sp
        const dist = Math.abs(tx - t.x) + Math.abs(ty - t.y)
        if (passo < dist) {
          t.x += t.dx * passo
          t.y += t.dy * passo
          break
        }
        t.x = tx; t.y = ty
        passo -= dist
        acende(t.col, t.row)
        t.corners.push({ x: tx, y: ty })
        if (t.corners.length > 6) t.corners.shift()
        t.segs--
        if (t.segs <= 0 || !proximaDirecao(t)) {
          t.dying = true
          break
        }
      }
    }

    function spawnPulso(px?: number, py?: number) {
      if (pulsos.length >= MAX_PULSOS || frags.length === 0) return
      let x = px, y = py
      if (x == null || y == null) {
        // nasce dentro de uma seção dark visível — nunca atrás de seção clara
        const els = [...secsVisiveis]
        x = 60 + Math.random() * Math.max(1, W - 120)
        y = 80 + Math.random() * Math.max(1, H - 160)
        if (els.length) {
          const r = els[(Math.random() * els.length) | 0].getBoundingClientRect()
          const top = Math.max(80, r.top + 40)
          const bottom = Math.min(H - 60, r.bottom - 40)
          if (bottom > top) y = top + Math.random() * (bottom - top)
        }
      }
      // trava no nó mais próximo da malha
      x = Math.round(x / sp) * sp
      y = Math.round(y / sp) * sp
      pulsos.push({ x, y, age: 0, txt: frags[fragIdx++ % frags.length] })
    }

    /* ---------------- desenho ---------------- */
    function draw(dt: number) {
      if (!base) return
      ctx!.drawImage(base, 0, 0, W, H)

      /* pontos acesos pela passagem dos traços (decay lento) */
      for (const [idx, calor] of acesos) {
        const novo = calor - dt / DECAY_PONTO
        if (novo <= 0) { acesos.delete(idx); continue }
        acesos.set(idx, novo)
        const a = PONTO_ACESO * novo * novo // curva: apaga suave
        ctx!.fillStyle = acc(a)
        ctx!.beginPath()
        ctx!.arc((idx % cols) * sp, ((idx / cols) | 0) * sp, 1.6, 0, TAU)
        ctx!.fill()
      }

      /* reação ao cursor: glow (absorve o spotlight CSS) + pontos acesos */
      if (temCursor && mouse.in) {
        const g = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280)
        g.addColorStop(0, acc(0.07))
        g.addColorStop(0.45, acc(0.028))
        g.addColorStop(1, acc(0))
        ctx!.fillStyle = g
        ctx!.fillRect(mouse.x - 280, mouse.y - 280, 560, 560)

        const R = 140
        const c0 = Math.max(0, Math.ceil((mouse.x - R) / sp))
        const c1 = Math.min(cols - 1, ((mouse.x + R) / sp) | 0)
        const r0 = Math.max(0, Math.ceil((mouse.y - R) / sp))
        const r1 = Math.min(rows - 1, ((mouse.y + R) / sp) | 0)
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const x = c * sp, y = r * sp
            const d = Math.hypot(x - mouse.x, y - mouse.y)
            if (d >= R) continue
            const k = 1 - d / R
            ctx!.fillStyle = accClaro(0.3 * k * k)
            ctx!.beginPath()
            ctx!.arc(x, y, 1.3, 0, TAU)
            ctx!.fill()
          }
        }
      }

      /* traços — cauda ortogonal com fade */
      ctx!.lineWidth = 1.2
      ctx!.lineCap = 'round'
      const TAIL = 100
      for (const t of tracos) {
        const f = Math.max(0, Math.min(1, t.fade))
        if (f <= 0) continue
        let px = t.x, py = t.y
        let percorrido = 0
        for (let i = t.corners.length - 1; i >= 0 && percorrido < TAIL; i--) {
          const c = t.corners[i]
          let len = Math.abs(px - c.x) + Math.abs(py - c.y)
          if (len < 0.5) continue
          let ex = c.x, ey = c.y
          if (percorrido + len > TAIL) {
            const k = (TAIL - percorrido) / len
            ex = px + (c.x - px) * k
            ey = py + (c.y - py) * k
            len = TAIL - percorrido
          }
          const a = OPACIDADE_TRACO * f * (1 - (percorrido + len * 0.5) / TAIL)
          if (a > 0.01) {
            ctx!.strokeStyle = acc(a)
            ctx!.beginPath()
            ctx!.moveTo(px, py)
            ctx!.lineTo(ex, ey)
            ctx!.stroke()
          }
          px = c.x; py = c.y
          percorrido += len
        }
        ctx!.fillStyle = accClaro(0.55 * f)
        ctx!.beginPath()
        ctx!.arc(t.x, t.y, 1.7, 0, TAU)
        ctx!.fill()
      }

      /* deploys — pulso radial + fragmento mono */
      ctx!.font = fragFont
      ctx!.textBaseline = 'alphabetic'
      for (const p of pulsos) {
        const k = p.age / VIDA_PULSO
        const ease = 1 - Math.pow(1 - k, 3)
        ctx!.strokeStyle = acc(0.3 * (1 - k))
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 10 + ease * 110, 0, TAU)
        ctx!.stroke()
        ctx!.fillStyle = accClaro(0.55 * (1 - k))
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 2, 0, TAU)
        ctx!.fill()
        const aTxt = FRAG_ALPHA * Math.sin(Math.PI * Math.min(1, k * 1.05))
        if (aTxt > 0.01) {
          ctx!.fillStyle = `rgba(244,243,251,${aTxt.toFixed(3)})`
          ctx!.fillText(p.txt, Math.min(W - 130, p.x + 14), p.y - 10)
        }
      }
      ctx!.lineWidth = 1.2
    }

    /* frame estático para prefers-reduced-motion: malha com alguns
       pontos acesos fixos — sem traços, sem pulsos, sem loop */
    function drawStatic() {
      if (!base) return
      ctx!.drawImage(base, 0, 0, W, H)
      let seed = 42
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
      const n = Math.round(16 * Math.max(0.4, dens))
      for (let i = 0; i < n; i++) {
        const c = (rnd() * cols) | 0
        const r = (rnd() * rows) | 0
        ctx!.fillStyle = acc(0.15 + rnd() * (PONTO_ACESO - 0.15))
        ctx!.beginPath()
        ctx!.arc(c * sp, r * sp, 1.6, 0, TAU)
        ctx!.fill()
      }
    }

    /* ---------------- loop único (rAF) ---------------- */
    function frame(now: number) {
      raf = 0
      const dt = Math.min(50, now - lastT)
      lastT = now

      pulsoTimer -= dt
      if (pulsoTimer <= 0) {
        pulsoTimer = INTERVALO_PULSO_MIN + Math.random() * (INTERVALO_PULSO_MAX - INTERVALO_PULSO_MIN)
        spawnPulso()
      }
      for (let i = pulsos.length - 1; i >= 0; i--) {
        pulsos[i].age += dt
        if (pulsos[i].age >= VIDA_PULSO) pulsos.splice(i, 1)
      }
      for (const t of tracos) updateTraco(t, dt)

      draw(dt)
      if (rodando()) raf = requestAnimationFrame(frame)
    }

    /* PAUSAS OBRIGATÓRIAS: aba oculta OU nenhuma seção dark no viewport */
    function rodando() {
      return pageVisible && secsVisiveis.size > 0
    }

    function sync() {
      if (reduced) return
      if (rodando() && !raf) {
        lastT = performance.now()
        raf = requestAnimationFrame(frame)
      } else if (!rodando() && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(W / sp) + 1
      rows = Math.ceil(H / sp) + 1
      buildBase()
      acesos.clear()
      for (const t of tracos) spawnTraco(t, true)
      if (reduced) drawStatic()
      else draw(0)
    }

    /* ---------------- boot ---------------- */
    for (let i = 0; i < nTracos; i++) tracos.push(spawnTraco({} as Traco, true))
    resize()
    // seções dark ficam translúcidas pra malha aparecer (CSS em globals)
    document.body.classList.add('ls-on')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) secsVisiveis.add(e.target)
          else secsVisiveis.delete(e.target)
        }
        sync()
      },
      { threshold: 0 }
    )
    const alvos = document.querySelectorAll(humor.watch)
    alvos.forEach((el) => io.observe(el))

    const onVis = () => {
      pageVisible = !document.hidden
      sync()
    }
    document.addEventListener('visibilitychange', onVis)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.in = true
    }
    const onLeave = () => { mouse.in = false }
    const onTouch = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && rodando()) spawnPulso(e.clientX, e.clientY)
    }
    if (!reduced) {
      if (temCursor) {
        window.addEventListener('mousemove', onMove, { passive: true })
        document.documentElement.addEventListener('mouseleave', onLeave)
      }
      if (coarse) window.addEventListener('pointerdown', onTouch, { passive: true })
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('pointerdown', onTouch)
      document.body.classList.remove('ls-on')
    }
    // fragments entra via fragRef (identidade de array muda a cada render do server)
  }, [mode, accent, density])

  return <canvas ref={canvasRef} className="living-system" aria-hidden="true" />
}
