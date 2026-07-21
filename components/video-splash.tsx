'use client'

import { useEffect, useRef, useState } from 'react'

/* ── calibragem ────────────────────────────────────────────────── */
const PLAYBACK_RATE = 1.35
const START_AT = 0.3        // pula o respiro morto inicial
const END_AT = 4.0          // corta o hold final; daqui dispara a saída
const READY_TIMEOUT = 600   // não ficou pronto até aqui → cancela a visita
/* ──────────────────────────────────────────────────────────────── */

/* A entrada do site: o vídeo de intro oficial. Só na home, só na
   primeira visita da sessão (a marca vem do script inline do <head>,
   escrita antes do primeiro paint).

   Este componente decide QUANDO sair; quem apaga o overlay é sempre o
   CSS. As quatro saídas — fim do vídeo, skip, cancelamento e failsafe —
   convergem numa animação, e o desmonte escuta o animationend dela. Se
   a hidratação falhar e nada disto rodar, o failsafe do CSS ainda
   derruba o overlay: a página nunca fica presa atrás de uma tela preta. */
export default function VideoSplash() {
  const [done, setDone] = useState(false)
  const overlay = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const saindo = useRef(false)

  useEffect(() => {
    const root = document.documentElement
    /* sem a marca do head: reload, rota interna, reduced-motion.
       Nada a tocar — tira o nó do caminho e sai. */
    if (!root.classList.contains('db-splash')) {
      setDone(true)
      return
    }

    const v = video.current
    const node = overlay.current
    let readyTimer = 0

    /* uma só porta de saída. 'out' = entrega completa (fade + a página
       assentando atrás); 'cancel' = o vídeo não veio, some rápido. */
    const sair = (modo: 'out' | 'cancel') => {
      if (saindo.current) return
      saindo.current = true
      clearTimeout(readyTimer)
      root.classList.add(modo === 'out' ? 'db-out' : 'db-cancel')
    }

    const limpar = () => {
      root.classList.remove('db-splash', 'db-skip', 'db-out', 'db-cancel')
      setDone(true)
    }

    /* o fim real é o fim da animação de saída, qualquer que tenha sido
       o caminho até ela — inclusive o failsafe puro do CSS. */
    const onAnimEnd = (e: AnimationEvent) => {
      if (e.animationName === 'vs-out' || e.animationName === 'vs-failsafe') limpar()
    }
    node?.addEventListener('animationend', onAnimEnd)

    /* o skip é marcado pelo script do <head> (que já escuta desde antes
       da hidratação); aqui só acompanhamos pra desmontar junto. */
    const onSkip = () => {
      if (saindo.current) return
      saindo.current = true
      clearTimeout(readyTimer)
    }
    const evs = ['pointerdown', 'keydown', 'touchstart'] as const
    evs.forEach(e => document.addEventListener(e, onSkip, { passive: true, capture: true }))

    if (!v) {
      sair('cancel')
      return
    }

    v.playbackRate = PLAYBACK_RATE
    v.muted = true // redundante com o atributo, mas é o que libera o autoplay
    try {
      v.currentTime = START_AT
    } catch {
      /* navegador recusou o seek antes dos metadados — segue do zero */
    }

    /* GATE DE PRONTIDÃO: nunca segurar o visitante numa tela preta.
       Se não der pra tocar de ponta a ponta em READY_TIMEOUT, esta
       visita perde a intro (a sessão já foi marcada pelo head). */
    const pronto = () => v.readyState >= 4 // HAVE_ENOUGH_DATA
    readyTimer = window.setTimeout(() => {
      if (!pronto()) sair('cancel')
    }, READY_TIMEOUT)

    const onCanPlayThrough = () => clearTimeout(readyTimer)
    /* END_AT pode ser >= duração real do arquivo; sem o 'ended' a saída
       nunca dispararia por timeupdate. Os dois cobrem o mesmo buraco. */
    const onTimeUpdate = () => {
      if (v.currentTime >= END_AT) sair('out')
    }
    const onEnded = () => sair('out')
    const onError = () => sair('cancel')

    v.addEventListener('canplaythrough', onCanPlayThrough)
    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('ended', onEnded)
    v.addEventListener('error', onError)

    /* autoplay recusado pela política do navegador: cancela na hora.
       Frame congelado esperando interação seria pior que não ter intro. */
    void v.play()?.catch(() => sair('cancel'))

    return () => {
      clearTimeout(readyTimer)
      node?.removeEventListener('animationend', onAnimEnd)
      evs.forEach(e => document.removeEventListener(e, onSkip, true))
      v.removeEventListener('canplaythrough', onCanPlayThrough)
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('ended', onEnded)
      v.removeEventListener('error', onError)
    }
  }, [])

  if (done) return null

  return (
    <div className="video-splash" ref={overlay} aria-hidden="true">
      <video
        ref={video}
        src="/intro/devbase-intro.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        tabIndex={-1}
      />
    </div>
  )
}
