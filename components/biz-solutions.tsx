'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

/* Grade escura de soluções da /empresas. O peso está nos sistemas — site
   entra como um item entre os outros, porque o /portfolio já é dele. */

const CARD: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 22 },
  },
}

const GRID: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

type Solution = {
  tag: string
  title: string
  text: string
  icon: ReactNode
  href?: string
  linkText?: string
}

const SOLUTIONS: Solution[] = [
  {
    tag: 'sistema',
    title: 'Agendamento e reservas',
    text: 'O cliente marca sozinho, pelo link, sem ficar trocando mensagem. Horário ocupado some da lista e o lembrete sai no dia, automático.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    tag: 'sistema',
    title: 'Controle de clientes',
    text: 'Contato, histórico e o que cada um já comprou num lugar só. Ninguém mais depende da memória de quem atendeu da última vez.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="9" cy="8" r="3.4" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M16 4.5a3.4 3.4 0 0 1 0 7M18 20c0-2.2-.8-4-2-5.2" />
      </svg>
    ),
  },
  {
    tag: 'gestão',
    title: 'Painel de gestão',
    text: 'Os números do mês na tela: quanto entrou, o que mais sai, quem não voltou. Sem fechar planilha na madrugada pra descobrir.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7.5 15.5v-3M12 15.5v-6M16.5 15.5v-4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tag: 'automação',
    title: 'Tarefas no automático',
    text: 'O que é repetitivo o sistema faz: a cobrança que vence hoje, a mensagem de retorno, o relatório que ninguém gosta de montar.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.4" />
      </svg>
    ),
  },
  {
    tag: 'integração',
    title: 'Suas ferramentas conversando',
    text: 'WhatsApp, pagamento, nota fiscal, a planilha que a equipe já usa. O dado é digitado uma vez e aparece onde precisa aparecer.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="6" cy="6" r="2.6" />
        <circle cx="18" cy="18" r="2.6" />
        <circle cx="18" cy="6" r="2.6" />
        <path d="M8.6 6H15.4M18 8.6v6.8M8 8.2c0 4.4 3 7.4 7.4 7.4" />
      </svg>
    ),
  },
  {
    tag: 'site',
    title: 'Site e páginas de venda',
    text: 'A porta de entrada: encontrado no Google, rápido no celular e desenhado pro seu negócio — não um modelo pronto com o seu logo em cima.',
    href: '/portfolio',
    linkText: 'Ver os que já estão no ar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4" width="18" height="15" rx="3" />
        <path d="M3 9h18" />
        <circle cx="6.6" cy="6.5" r=".9" fill="currentColor" stroke="none" />
        <circle cx="9.4" cy="6.5" r=".9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function BizSolutions() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="biz-sols"
      variants={GRID}
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {SOLUTIONS.map((s) => (
        <motion.article key={s.title} className="biz-sol" variants={CARD}>
          <span className="biz-sol__ic" aria-hidden="true">
            {s.icon}
          </span>
          <span className="biz-sol__tag">{s.tag}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {s.href && s.linkText && (
            <Link href={s.href} className="biz-sol__link">
              {s.linkText} <span className="arr">→</span>
            </Link>
          )}
        </motion.article>
      ))}
    </motion.div>
  )
}
