'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

/* ================================================================
   AURORA — a luz profunda assinatura das superfícies dark.
   Camadas de radial-gradient com blur pesado derivando devagar.

   Empilhamento: o componente vive DENTRO da seção host, acima do
   background dela e abaixo do conteúdo (nunca atrás do fundo sólido
   — foi exatamente isso que matou o protótipo). Hosts prontos:
   .hero e .phead (entre canvas e veil), .dark-zone (home pós-hero)
   e .page-dark (/sobre) — regras em globals.css.
   ================================================================ */

/* ---- calibragem ----
   A aurora deve ser claramente perceptível em ~3s de tela.
   Errar pro visível; reduzir depois é uma constante. */
const OPACIDADE_CAMADAS = [0.4, 0.32, 0.22] // camada 1 (índigo), 2 (violeta), 3 (azul profundo)
const BLUR_DESKTOP = 80 // px
const BLUR_MOBILE = 60 // px — aplicado via media query (pointer: coarse)
const DURACOES = [26, 38, 50] // s por camada; speed divide (0.6 = mais lenta)

const CORES_PADRAO = ['#6366f1', '#8b5cf6', '#1e40af'] // índigo, violeta, azul profundo

interface Props {
  /** multiplicador global de opacidade (default 1) */
  intensity?: number
  /** multiplicador de velocidade — <1 alonga a duração (mais lenta) */
  speed?: number
  /** uma cor por camada (default índigo/violeta/azul profundo) */
  colors?: string[]
  layers?: 2 | 3
  className?: string
}

export default function Aurora({
  intensity = 1,
  speed = 1,
  colors = CORES_PADRAO,
  layers = 3,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  /* aba em segundo plano = animação pausada */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onVis = () => el.classList.toggle('is-paused', document.hidden)
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <div
      ref={ref}
      className={`aurora-fx ${className}`}
      aria-hidden="true"
      style={{ '--ab': `${BLUR_DESKTOP}px`, '--ab-m': `${BLUR_MOBILE}px` } as CSSProperties}
    >
      {Array.from({ length: layers }, (_, i) => (
        <span
          key={i}
          className={`aurora-l aurora-l${i + 1}`}
          style={{
            background: `radial-gradient(closest-side, ${colors[i % colors.length]}, transparent 72%)`,
            opacity: OPACIDADE_CAMADAS[i] * intensity,
            animationDuration: `${(DURACOES[i] / Math.max(0.1, speed)).toFixed(1)}s`,
          }}
        />
      ))}
      <span className="aurora-noise" />
    </div>
  )
}
