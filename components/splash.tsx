'use client'

import { useEffect, useState } from 'react'
import CubeMark from './cube-mark'

/* Variante A da entrada. O overlay vai no HTML do servidor e só APARECE
   se o script inline do <head> tiver marcado <html class="db-splash">
   antes do primeiro paint — sem a marca ele nasce display:none, então
   quem já viu a entrada nesta sessão não vê nem um frame dele.

   O que tira o overlay da frente é a ANIMAÇÃO CSS, não este componente:
   o keyframe termina em opacity 0 + visibility hidden com fill forwards.
   Se a hidratação falhar, se este arquivo nem carregar, o fade acontece
   do mesmo jeito e a página fica livre. Este componente só faz a
   faxina: desmonta o nó e limpa as classes depois que o fade passou. */
export default function Splash() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    /* sem a marca do head: reload, rota interna, reduced-motion.
       Nada a animar — tira o nó do caminho e sai. */
    if (!root.classList.contains('db-splash')) {
      setDone(true)
      return
    }
    const end = () => {
      root.classList.remove('db-splash', 'db-skip')
      setDone(true)
    }
    const fim = setTimeout(end, 1250)   // logo depois do fade (1.15s)
    const killSwitch = setTimeout(end, 2000) // rede de segurança
    return () => {
      clearTimeout(fim)
      clearTimeout(killSwitch)
    }
  }, [])

  if (done) return null

  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-cube">
        <CubeMark />
      </div>
      <div className="splash-word">
        dev<span className="s">/</span>base
      </div>
    </div>
  )
}
