'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Mail, Code2, Rocket } from 'lucide-react'
import HeroSection from '@/components/hero-section'

gsap.registerPlugin(ScrollTrigger)

const PAIN_ITEMS = [
  'Configurar auth do zero... again',
  'Integrar PIX, boleto e cartão',
  'Montar dashboard com métricas',
  'Criar painel admin',
  'Configurar email transacional',
  'Deploy e variáveis de ambiente',
]

const PRODUCTS = [
  { num: '#01', name: '100 Micro SaaS + 25 Automações', desc: '100 ideias validadas para lançar seu próximo produto', price: 'R$29,90', badge: 'live', href: 'https://pay.kiwify.com.br/5cyFrhr' },
  { num: '#02', name: 'DevBase Boilerplate',             desc: 'Kit Next.js completo para SaaS brasileiro',          price: 'R$147',  badge: 'live', href: 'https://pay.kiwify.com.br/bSBfROo' },
  { num: '#03', name: 'DevBase Components',             desc: '8 componentes React prontos para o BR',              price: 'R$67',   badge: 'live', href: 'https://pay.kiwify.com.br/d4yYNFy' },
  { num: '#04', name: 'Boilerplate + Components',       desc: 'Os dois juntos com desconto',                        price: 'R$197',  badge: 'combo',href: 'https://pay.kiwify.com.br/kfM8iVv' },
  { num: '#05', name: 'DevBase Jobs',                   desc: 'Job board para devs BR com salário obrigatório',     price: 'Grátis', badge: 'beta', href: 'https://dev-base-jobs.vercel.app' },
]

const HOW_STEPS = [
  { num: '01', Icon: ShoppingCart, title: 'Compra',  desc: 'Pagamento único via PIX, boleto ou cartão. Sem assinatura.' },
  { num: '02', Icon: Mail,         title: 'Acessa',  desc: 'Email automático com link de acesso imediato após a compra.' },
  { num: '03', Icon: Code2,        title: 'Integra', desc: 'Copia o código e usa no seu projeto. Documentação em PT-BR.' },
  { num: '04', Icon: Rocket,       title: 'Lança',   desc: 'Deploy na Vercel com 1 clique. Do zero ao ar em horas.' },
] as const

const BADGE_LABELS: Record<string, string> = {
  live: '● ao vivo', combo: '◈ combo', beta: '◉ beta',
}

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 03 — CONSTRUA parallax horizontal
      gsap.fromTo('.txt-construa',
        { x: 0 },
        {
          x: -200, ease: 'none',
          scrollTrigger: { trigger: '.section-construa', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        }
      )

      // 07 — LANCE parallax horizontal (oposto)
      gsap.fromTo('.txt-lance',
        { x: -100 },
        {
          x: 100, ease: 'none',
          scrollTrigger: { trigger: '.section-lance', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        }
      )

      // 03 — coluna esquerda
      gsap.fromTo('.problem-col-left',
        { opacity: 0, x: -40, willChange: 'transform, opacity' },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: '.problem-col-left', start: 'top 85%' },
        }
      )

      // 03 — dores stagger
      gsap.fromTo('.pain-item',
        { opacity: 0, y: 20, willChange: 'transform, opacity' },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: '.pain-list', start: 'top 85%' },
        }
      )

      // 03 — resolução
      gsap.fromTo('.problem-resolution',
        { opacity: 0, y: 20, willChange: 'transform, opacity' },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: '.pain-list', start: 'top 85%' },
        }
      )

      // 04 — mockup scale in
      gsap.fromTo('.mockup-outer',
        { opacity: 0, scale: 0.95, willChange: 'transform, opacity' },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: '.mockup-outer', start: 'top 85%' },
        }
      )

      // 05 — linhas de produto da esquerda
      gsap.fromTo('.product-row',
        { opacity: 0, x: -30, willChange: 'transform, opacity' },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: '.products-list', start: 'top 85%' },
        }
      )

      // 06 — cards how stagger
      gsap.fromTo('.how-card',
        { opacity: 0, y: 40, willChange: 'transform, opacity' },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: 'willChange',
          scrollTrigger: { trigger: '.how-grid', start: 'top 85%' },
        }
      )

      // fade genérico para headers e seções restantes
      gsap.utils.toArray<HTMLElement>('.section-fade').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40, willChange: 'transform, opacity' },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'willChange',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        /* ==============================
           UTILITÁRIOS
           ============================== */
        .section-fade   { opacity: 0; }
        .problem-col-left { opacity: 0; }
        .pain-item      { opacity: 0; }
        .problem-resolution { opacity: 0; }
        .mockup-outer   { opacity: 0; }
        .product-row    { opacity: 0; }
        .how-card       { opacity: 0; }

        /* ==============================
           02 — MARQUEE
           ============================== */
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-section {
          overflow: hidden;
          border-top: 1px solid #1e1e1e;
          border-bottom: 1px solid #1e1e1e;
          padding: 16px 0;
          background: #0a0a0a;
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 20s linear infinite;
        }
        .marquee-content {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #4b5563;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0;
        }
        .marquee-item { padding: 0 8px; }
        .marquee-sep  { color: #6366f1; padding: 0 8px; }

        /* ==============================
           03 — CONSTRUA + PROBLEMA
           ============================== */
        .section-construa {
          padding: 160px 0;
          overflow: hidden;
        }
        .txt-construa {
          font-family: var(--font-inter);
          font-size: 160px;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.08);
          white-space: nowrap;
          margin: 0 0 80px;
          line-height: 1;
          will-change: transform;
        }
        .construa-grid {
          display: grid;
          grid-template-columns: 480px 1fr;
          gap: 80px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
          align-items: start;
        }
        .problem-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #6366f1;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
        }
        .problem-title {
          font-family: var(--font-inter);
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -1px;
          line-height: 1.15;
          margin: 16px 0 0;
        }
        .pain-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pain-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-inter);
          font-size: 15px;
          color: #4b5563;
          text-decoration: line-through;
        }
        .pain-icon {
          color: #ef4444;
          text-decoration: none;
          flex-shrink: 0;
        }
        .problem-sep {
          border: none;
          border-top: 1px solid #1e1e1e;
          margin: 24px 0;
        }
        .problem-resolution {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #22c55e;
          font-family: var(--font-inter);
          font-size: 15px;
          font-weight: 500;
          margin: 0;
        }

        /* ==============================
           04 — MOCKUP
           ============================== */
        .section-mockup {
          padding: 120px 48px;
          border-top: 1px solid #1e1e1e;
        }
        .mockup-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .mockup-header { margin-bottom: 48px; }
        .section-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #6366f1;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
        }
        .section-title {
          font-family: var(--font-inter);
          font-size: 40px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin: 16px 0 0;
        }
        .section-subtitle {
          font-family: var(--font-inter);
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
          margin: 16px 0 0;
        }
        .mockup-outer {
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
        }
        .mockup-chrome {
          background: #111;
          height: 36px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 6px;
        }
        .chrome-dots { display: flex; gap: 6px; }
        .chrome-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .chrome-url {
          flex: 1;
          background: #1a1a1a;
          border-radius: 4px;
          margin: 0 16px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #4b5563;
        }
        .mockup-body {
          display: flex;
          background: #0f0f0f;
          min-height: 280px;
        }
        .mockup-sidebar {
          width: 200px;
          background: #0d0d0d;
          border-right: 1px solid #1e1e1e;
          padding: 20px 16px;
          flex-shrink: 0;
        }
        .sidebar-brand {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #6366f1;
          margin: 0 0 24px;
        }
        .sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
        .nav-item {
          font-family: var(--font-inter);
          font-size: 13px;
          color: #6b7280;
          padding: 8px 12px;
          border-radius: 6px;
          border-left: 2px solid transparent;
        }
        .nav-item--active {
          background: #12122a;
          border-left-color: #6366f1;
          color: #fff;
        }
        .mockup-main { flex: 1; padding: 24px; }
        .mockup-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #6366f1;
          margin: 0 0 12px;
        }
        .mockup-title {
          font-family: var(--font-inter);
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 20px;
        }
        .mockup-code {
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .mockup-code code {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #e5e7eb;
        }
        .mockup-access {
          font-family: var(--font-inter);
          font-size: 13px;
          color: #22c55e;
          background: rgba(34,197,94,0.08);
          padding: 10px 14px;
          border-radius: 6px;
        }

        /* ==============================
           05 — PRODUTOS (lista editorial)
           ============================== */
        .section-products {
          padding: 120px 48px;
          border-top: 1px solid #1e1e1e;
        }
        .products-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .products-list { margin-top: 48px; }
        .product-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 20px 16px;
          border-top: 1px solid #1e1e1e;
          text-decoration: none;
          border-left: 2px solid transparent;
          transition: background 0.2s, border-color 0.15s;
          position: relative;
        }
        .product-row:last-child { border-bottom: 1px solid #1e1e1e; }
        .product-row:hover {
          background: #0f0f0f;
          border-left-color: #6366f1;
        }
        .prod-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #6366f1;
          letter-spacing: 1px;
          flex-shrink: 0;
          width: 32px;
        }
        .prod-name {
          font-family: var(--font-inter);
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
          min-width: 260px;
        }
        .prod-desc {
          font-family: var(--font-inter);
          font-size: 14px;
          color: #6b7280;
          flex: 1;
        }
        .prod-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          flex-shrink: 0;
        }
        .prod-badge--live  { background: rgba(34,197,94,0.12);  color: #22c55e; }
        .prod-badge--combo { background: rgba(234,179,8,0.12);  color: #eab308; }
        .prod-badge--beta  { background: rgba(107,114,128,0.15);color: #9ca3af; }
        .prod-price {
          font-family: var(--font-inter);
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          min-width: 72px;
          text-align: right;
        }
        .prod-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 16px;
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .product-row:hover .prod-arrow {
          background: #6366f1;
          color: #fff;
          border-color: #6366f1;
        }

        /* ==============================
           06 — COMO FUNCIONA
           ============================== */
        .section-how {
          padding: 120px 48px;
          border-top: 1px solid #1e1e1e;
          background: #0a0a0a;
        }
        .how-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .how-card {
          background: #0f0f0f;
          border: 1px solid #1e1e1e;
          border-radius: 12px;
          padding: 28px;
        }
        .how-card-num {
          font-family: var(--font-mono);
          font-size: 48px;
          font-weight: 900;
          color: rgba(99,102,241,0.15);
          line-height: 1;
          margin: 0;
        }
        .how-card-icon {
          color: #6366f1;
          margin-top: 16px;
        }
        .how-card-title {
          font-family: var(--font-inter);
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin: 16px 0 0;
        }
        .how-card-desc {
          font-family: var(--font-inter);
          font-size: 13px;
          color: #6b7280;
          line-height: 1.6;
          margin: 8px 0 0;
        }

        /* ==============================
           07 — LANCE
           ============================== */
        .section-lance {
          padding: 80px 0;
          overflow: hidden;
          border-top: 1px solid #1e1e1e;
        }
        .txt-lance {
          font-family: var(--font-inter);
          font-size: 200px;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.05);
          white-space: nowrap;
          margin: 0;
          line-height: 1;
          will-change: transform;
        }

        /* ==============================
           08 — SOBRE
           ============================== */
        .section-about {
          padding: 120px 48px;
          border-top: 1px solid #1e1e1e;
        }
        .about-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .about-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #6366f1;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
        }
        .about-title {
          font-family: var(--font-inter);
          font-size: 40px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin: 16px 0 0;
        }
        .about-text {
          font-family: var(--font-inter);
          font-size: 16px;
          color: #6b7280;
          line-height: 1.8;
          margin: 24px 0 0;
        }
        .about-values {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 48px;
        }
        .value-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #6366f1;
          margin: 0 0 8px;
        }
        .value-title {
          font-family: var(--font-inter);
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 6px;
        }
        .value-text {
          font-family: var(--font-inter);
          font-size: 13px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        /* ==============================
           09 — CTA
           ============================== */
        .section-cta {
          padding: 120px 48px;
          background: #0f0f0f;
          border-top: 1px solid #1e1e1e;
          text-align: center;
        }
        .cta-container { max-width: 600px; margin: 0 auto; }
        .cta-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #6366f1;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
        }
        .cta-title {
          font-family: var(--font-inter);
          font-size: 48px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -2px;
          line-height: 1;
          margin: 16px 0 0;
        }
        .cta-subtitle {
          font-family: var(--font-inter);
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
          margin: 16px auto 0;
          max-width: 480px;
        }
        .cta-btn {
          display: inline-block;
          background: #6366f1;
          color: #fff;
          border-radius: 8px;
          padding: 18px 48px;
          font-family: var(--font-inter);
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          margin-top: 32px;
          transition: background 0.2s;
        }
        .cta-btn:hover { background: #4f46e5; }
        .cta-note {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #4b5563;
          margin: 16px 0 0;
        }

        /* ==============================
           FOOTER
           ============================== */
        .new-footer {
          border-top: 1px solid #1e1e1e;
          padding: 32px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0a0a0a;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 13px;
          color: #fff;
          gap: 6px;
        }
        .footer-origin { font-family: var(--font-mono); font-size: 12px; color: #4b5563; }
        .footer-nav { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; }
        .footer-nav a {
          font-family: var(--font-inter);
          font-size: 13px;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav a:hover { color: #fff; }
        .footer-copy { font-family: var(--font-mono); font-size: 12px; color: #4b5563; }

        /* ==============================
           RESPONSIVE
           ============================== */
        @media (max-width: 768px) {
          .txt-construa { font-size: 72px; }
          .txt-lance    { font-size: 96px; }
          .construa-grid { grid-template-columns: 1fr; gap: 40px; padding: 0 24px; }
          .section-construa { padding: 80px 0; }
          .section-mockup,
          .section-products,
          .section-how,
          .section-about,
          .section-cta  { padding: 80px 24px; }
          .mockup-sidebar { display: none; }
          .how-grid { grid-template-columns: 1fr 1fr; }
          .about-values { grid-template-columns: 1fr; gap: 24px; }
          .cta-title { font-size: 36px; }
          .prod-desc { display: none; }
          .prod-name { min-width: unset; }
          .new-footer { flex-direction: column; align-items: flex-start; padding: 32px 24px; }
          .footer-nav { gap: 16px; }
        }
        @media (max-width: 480px) {
          .how-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <HeroSection />

      {/* ===== 02 — MARQUEE ===== */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <span key={rep} className="marquee-content">
              {['DevBase Boilerplate', 'R$147', 'DevBase Components', 'R$67',
                '100 Micro SaaS', 'R$29,90', 'Boilerplate + Components', 'R$197',
                'DevBase Jobs', 'Grátis'].map((item, i) => (
                <span key={i}>
                  <span className="marquee-item">{item}</span>
                  <span className="marquee-sep">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ===== 03 — CONSTRUA + PROBLEMA ===== */}
      <section className="section-construa">
        <p className="txt-construa" aria-hidden="true">CONSTRUA</p>
        <div className="construa-grid">
          <div className="problem-col-left">
            <p className="problem-tag">// o problema</p>
            <h2 className="problem-title">
              Você não deveria gastar uma semana configurando o que já foi resolvido.
            </h2>
          </div>
          <div>
            <ul className="pain-list">
              {PAIN_ITEMS.map((item) => (
                <li key={item} className="pain-item">
                  <span className="pain-icon" aria-hidden="true">×</span>
                  {item}
                </li>
              ))}
            </ul>
            <hr className="problem-sep" />
            <p className="problem-resolution">
              <span aria-hidden="true">✓</span>
              Com a DevBase, você pula tudo isso.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 04 — MOCKUP ===== */}
      <section className="section-mockup">
        <div className="mockup-container">
          <div className="mockup-header section-fade">
            <p className="section-tag">// plataforma de acesso</p>
            <h2 className="section-title">Você compra. Você acessa. Na hora.</h2>
            <p className="section-subtitle">
              Sem email manual, sem link de Google Drive. Compra aprovada → email automático → acesso imediato.
            </p>
          </div>

          <div className="mockup-outer">
            <div className="mockup-chrome">
              <div className="chrome-dots">
                <span className="chrome-dot" style={{ background: '#ff5f57' }} />
                <span className="chrome-dot" style={{ background: '#febc2e' }} />
                <span className="chrome-dot" style={{ background: '#28c840' }} />
              </div>
              <div className="chrome-url">devbase.tools/acesso</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar">
                <p className="sidebar-brand">dev/base</p>
                <div className="sidebar-nav">
                  <div className="nav-item nav-item--active">● Setup</div>
                  <div className="nav-item">Auth</div>
                  <div className="nav-item">Dashboard</div>
                  <div className="nav-item">Pagamentos</div>
                </div>
              </div>
              <div className="mockup-main">
                <p className="mockup-tag">// boilerplate · módulo 1 de 6</p>
                <h3 className="mockup-title">Setup &amp; Instalação</h3>
                <div className="mockup-code">
                  <code>npm install</code>
                </div>
                <div className="mockup-access">✓ Acesso liberado automaticamente após a compra</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05 — PRODUTOS ===== */}
      <section className="section-products">
        <div className="products-container">
          <div className="section-fade">
            <p className="section-tag">// produtos</p>
            <h2 className="section-title">O que construímos.</h2>
            <p className="section-subtitle">Cada produto resolve um problema específico. Sem assinatura, sem lock-in.</p>
          </div>

          <div className="products-list">
            {PRODUCTS.map(({ num, name, desc, price, badge, href }) => (
              <a
                key={num}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="product-row"
              >
                <span className="prod-num">{num}</span>
                <span className="prod-name">{name}</span>
                <span className="prod-desc">{desc}</span>
                <span className={`prod-badge prod-badge--${badge}`}>{BADGE_LABELS[badge]}</span>
                <span className="prod-price">{price}</span>
                <span className="prod-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 06 — COMO FUNCIONA ===== */}
      <section className="section-how">
        <div className="how-container">
          <div className="section-fade">
            <p className="section-tag">// como funciona</p>
            <h2 className="section-title">Do zero ao ar em horas, não semanas.</h2>
            <p className="section-subtitle">Simples por design.</p>
          </div>

          <div className="how-grid">
            {HOW_STEPS.map(({ num, Icon, title, desc }) => (
              <div key={num} className="how-card">
                <p className="how-card-num">{num}</p>
                <div className="how-card-icon"><Icon size={20} /></div>
                <p className="how-card-title">{title}</p>
                <p className="how-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 07 — LANCE ===== */}
      <section className="section-lance" aria-hidden="true">
        <p className="txt-lance">LANCE</p>
      </section>

      {/* ===== 08 — SOBRE ===== */}
      <section className="section-about">
        <div className="about-container section-fade">
          <p className="about-tag">// quem somos</p>
          <h2 className="about-title">Feito por devs, para devs brasileiros.</h2>
          <p className="about-text">
            A DevBase nasceu da frustração de reconstruir as mesmas coisas em todo projeto novo. Auth, pagamentos, dashboard — toda vez do zero, toda vez igual.
          </p>
          <p className="about-text" style={{ marginTop: 20 }}>
            Somos uma empresa brasileira que constrói ferramentas para quem constrói. Sem venture capital, sem hype — só produto.
          </p>
          <div className="about-values">
            {[
              { n: '01', t: 'Sem assinatura', d: 'Pagamento único. Acesso vitalício. Sem surpresas no cartão.' },
              { n: '02', t: 'Código real',    d: 'Sem abstração excessiva. Você controla tudo, do banco ao deploy.' },
              { n: '03', t: 'Feito no Brasil',d: 'Para o mercado brasileiro. Em português. Com PIX e Pagar.me.' },
            ].map(({ n, t, d }) => (
              <div key={n}>
                <p className="value-num">{n}</p>
                <p className="value-title">{t}</p>
                <p className="value-text">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 09 — CTA ===== */}
      <section className="section-cta">
        <div className="cta-container section-fade">
          <p className="cta-tag">// comece agora</p>
          <h2 className="cta-title">Pronto para parar de reinventar a roda?</h2>
          <p className="cta-subtitle">
            Comece pelo 100 Micro SaaS. R$29,90 e você já tem 100 ideias para escolher.
          </p>
          <a
            href="https://pay.kiwify.com.br/5cyFrhr"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Ver 100 ideias →
          </a>
          <p className="cta-note">pagamento único · acesso vitalício · sem assinatura</p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="new-footer">
        <div className="footer-logo">
          <span>dev/base</span>
          <span className="footer-origin">· feito no Brasil 🇧🇷</span>
        </div>
        <nav className="footer-nav">
          <Link href="/produtos">Produtos</Link>
          <a href="https://dev-base-jobs.vercel.app" target="_blank" rel="noopener noreferrer">Jobs</a>
          <a href="#sobre">Sobre</a>
          <a href="mailto:devbasebr@gmail.com">devbasebr@gmail.com</a>
        </nav>
        <span className="footer-copy">© 2025 DevBase</span>
      </footer>
    </>
  )
}
