'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)
  const h1Ref = useRef<HTMLDivElement>(null)
  const h2Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const btns = ctaRef.current ? Array.from(ctaRef.current.children) : []

    // Apply initial states immediately to prevent flash of content
    if (!isMobile) {
      gsap.set([h1Ref.current, h2Ref.current], {
        clipPath: 'inset(100% 0 0 0)',
        willChange: 'clip-path',
      })
    } else {
      gsap.set([h1Ref.current, h2Ref.current], { opacity: 0 })
    }
    gsap.set([tagRef.current, subRef.current, ...btns], { willChange: 'transform, opacity' })

    // Intro timeline — total ~3.5s before all elements visible
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Tag line
    tl.fromTo(
      tagRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'willChange' },
      0
    )

    // 2 & 3. Headlines — clipPath reveal on desktop, fade on mobile
    if (!isMobile) {
      tl.to(
        h1Ref.current,
        { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'expo.out', clearProps: 'willChange,clipPath' },
        0.5
      )
      // 0.2s stagger after h1
      tl.to(
        h2Ref.current,
        { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'expo.out', clearProps: 'willChange,clipPath' },
        0.7
      )
    } else {
      tl.to(h1Ref.current, { opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.5)
      tl.to(h2Ref.current, { opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.7)
    }

    // 4. Subtitle — 0.4s after h2 ends (h2: 0.7 + 1.0 = 1.7s → 1.7 + 0.4 = 2.1s)
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'willChange' },
      2.1
    )

    // 5. CTAs
    if (btns.length > 0) {
      tl.fromTo(
        btns,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', clearProps: 'willChange' },
        2.5
      )
    }

    // 6. Scroll indicator fade in
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power3.out' },
      2.9
    )

    // Arrow bounce loop — starts after intro ends
    gsap.to(arrowRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut',
      delay: 3.8,
    })

    // Hide scroll indicator when scroll > 100px
    ScrollTrigger.create({
      start: '100px top',
      onEnter: () => gsap.to(scrollRef.current, { opacity: 0, duration: 0.3 }),
      onLeaveBack: () => gsap.to(scrollRef.current, { opacity: 1, duration: 0.3 }),
    })

    // Background parallax — desktop only
    if (!isMobile && parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    if (!canvas || !hero) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const SPACING = 60
    const INFLUENCE_RADIUS = 120

    type Dot = { x: number; y: number; phase: number }
    let dots: Dot[] = []

    const buildDots = () => {
      dots = []
      const cols = Math.ceil(canvas.width / SPACING) + 1
      const rows = Math.ceil(canvas.height / SPACING) + 1
      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          dots.push({ x: col * SPACING, y: row * SPACING, phase: Math.random() * Math.PI * 2 })
        }
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      buildDots()
    }

    let scrollY = 0
    let mouseX = -9999
    let mouseY = -9999
    let rafId = 0

    const onScroll = () => { scrollY = window.scrollY }
    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999 }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = time * 0.001
      const parallaxOffset = scrollY * 0.3

      for (const dot of dots) {
        const dy = dot.y - parallaxOffset
        if (dy < -SPACING || dy > canvas.height + SPACING) continue

        const pulse = (Math.sin(t * 0.8 + dot.phase) + 1) / 2
        const baseOpacity = 0.05 + pulse * 0.15

        const distX = dot.x - mouseX
        const distY = dy - mouseY
        const dist = Math.sqrt(distX * distX + distY * distY)
        const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS)

        const opacity = Math.min(baseOpacity + influence * 0.4, 0.6)
        const radius = 1 + influence * 1.5

        ctx.beginPath()
        ctx.arc(dot.x, dy, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${opacity.toFixed(3)})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    if (!isMobile) {
      hero.addEventListener('mousemove', onMouseMove)
      hero.addEventListener('mouseleave', onMouseLeave)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <>
      <style>{`
        .hero-new {
          height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          background-color: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          pointer-events: none;
          z-index: 0;
        }
        .hero-grid-col {
          border-right: 1px solid rgba(255,255,255,0.03);
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.03;
        }

        .hero-parallax-bg {
          position: absolute;
          inset: -30%;
          background: radial-gradient(ellipse 80% 50% at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          will-change: transform;
        }

        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 28px;
          padding: 0 24px;
          max-width: 960px;
          width: 100%;
        }

        .hero-tag {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #6366f1;
          letter-spacing: 2px;
          margin: 0;
          opacity: 0;
        }

        .hero-headlines {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hero-headline-line {
          overflow: hidden;
        }
        .hero-h1 {
          font-size: 96px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -4px;
          line-height: 0.9;
          margin: 0;
          font-family: var(--font-inter);
        }
        .hero-h2 {
          font-size: 96px;
          font-weight: 800;
          color: #6366f1;
          letter-spacing: -4px;
          line-height: 0.9;
          margin: 0;
          font-family: var(--font-inter);
        }

        .hero-sub {
          font-size: 18px;
          color: #6b7280;
          max-width: 520px;
          text-align: center;
          margin: 0;
          opacity: 0;
          line-height: 1.6;
          font-family: var(--font-inter);
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-btn-primary {
          display: inline-block;
          background: #6366f1;
          color: #fff;
          border-radius: 8px;
          padding: 14px 28px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          font-family: var(--font-inter);
          opacity: 0;
          transition: background 0.2s;
        }
        .hero-btn-primary:hover { background: #4f46e5; }
        .hero-btn-ghost {
          display: inline-block;
          background: transparent;
          border: 1px solid #2a2a2a;
          color: #9ca3af;
          border-radius: 8px;
          padding: 14px 28px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          font-family: var(--font-inter);
          opacity: 0;
          transition: border-color 0.2s, color 0.2s;
        }
        .hero-btn-ghost:hover { border-color: #444; color: #d1d5db; }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0;
          z-index: 1;
        }
        .hero-scroll-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #4b5563;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .hero-scroll-arrow {
          color: #4b5563;
          display: block;
          will-change: transform;
        }

        .hero-watermark {
          position: absolute;
          bottom: -20px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: var(--font-inter);
          font-size: 180px;
          font-weight: 900;
          color: rgba(255,255,255,0.03);
          letter-spacing: -8px;
          pointer-events: none;
          user-select: none;
          margin: 0;
          z-index: 0;
          white-space: nowrap;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .hero-h1, .hero-h2 {
            font-size: 56px;
            letter-spacing: -2px;
          }
          .hero-sub {
            font-size: 16px;
          }
          .hero-cta {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>

      <section ref={heroRef} className="hero-new" aria-label="Hero">
        {/* Vertical grid lines */}
        <div className="hero-grid" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="hero-grid-col" />
          ))}
        </div>

        {/* SVG noise grain */}
        <svg className="hero-noise" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <filter id="hero-noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise-filter)" />
        </svg>

        {/* Parallax glow bg */}
        <div ref={parallaxRef} className="hero-parallax-bg" aria-hidden="true" />

        {/* Dot grid canvas */}
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

        {/* Depth watermark */}
        <p className="hero-watermark" aria-hidden="true">DEVBASE</p>

        {/* Content */}
        <div className="hero-content">
          <p ref={tagRef} className="hero-tag">// ferramentas para devs brasileiros</p>

          <div className="hero-headlines">
            <div ref={h1Ref} className="hero-headline-line">
              <p className="hero-h1"><span>Construa.</span></p>
            </div>
            <div ref={h2Ref} className="hero-headline-line">
              <p className="hero-h2"><span>Lance.</span> <span>Cresça.</span></p>
            </div>
          </div>

          <p ref={subRef} className="hero-sub">
            Kits, componentes e ferramentas para devs que querem lançar produtos no Brasil — sem reinventar a roda.
          </p>

          <div ref={ctaRef} className="hero-cta">
            <Link href="/produtos" className="hero-btn-primary">
              Ver produtos →
            </Link>
            <a
              href="https://dev-base-jobs.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-ghost"
            >
              DevBase Jobs
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="hero-scroll-indicator" aria-hidden="true">
          <span className="hero-scroll-label">scroll</span>
          <span ref={arrowRef} className="hero-scroll-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 2v10M4 9l3 3 3-3"
                stroke="#4b5563"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </section>
    </>
  )
}
