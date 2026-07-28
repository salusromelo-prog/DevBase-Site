'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

/* Sintoma → o que a gente constrói. O trilho da esquerda cresce conforme
   a lista passa pela viewport, então a leitura tem um progresso visível. */

const ROWS = [
  {
    sym: 'A planilha que só uma pessoa sabe mexer',
    fix: 'Um painel que a equipe inteira usa, com acesso separado por pessoa',
  },
  {
    sym: 'Agendamento pelo WhatsApp que vive dando conflito',
    fix: 'Agenda única, com bloqueio automático e lembrete pro cliente',
  },
  {
    sym: 'Cliente que sumiu e ninguém percebeu',
    fix: 'Cadastro com histórico e aviso de quem não volta há tempo demais',
  },
  {
    sym: 'Relatório montado na mão todo fim de mês',
    fix: 'Número que se atualiza sozinho e já está na tela quando você abre',
  },
  {
    sym: 'Três sistemas que não conversam entre si',
    fix: 'Integração: digitou uma vez, aparece em todos os lugares certos',
  },
]

export default function BizPains() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  })
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <div className="biz-pains" ref={ref}>
      <span className="biz-pains__rail" aria-hidden="true">
        <motion.span style={reduced ? { scaleY: 1 } : { scaleY: grow }} />
      </span>

      {ROWS.map((r, i) => (
        <motion.div
          key={r.sym}
          className="biz-pain"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: (i % 2) * 0.06 }}
        >
          <span className="biz-pain__dot" aria-hidden="true" />
          <p className="biz-pain__sym">{r.sym}</p>
          <span className="biz-pain__arr" aria-hidden="true">
            →
          </span>
          <p className="biz-pain__fix">{r.fix}</p>
        </motion.div>
      ))}
    </div>
  )
}
