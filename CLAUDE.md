# Regras de Animação — DevBase Site

## Stack
- Scroll suave: Lenis
- Animações: GSAP + ScrollTrigger
- Sem framer-motion, sem CSS transitions para entradas

## Regras obrigatórias
- Toda animação de entrada tem duração mínima de 0.6s
- Ease padrão: power3.out ou expo.out
- Delay entre elementos em sequência: 0.15s a 0.2s
- Lenis e ScrollTrigger sempre integrados via ScrollTrigger.scrollerProxy
- Mobile: desativa pin scroll, mantém fade in simples
- Nunca usar transform sem will-change quando animando
- Tipografia grande cria tensão antes de aparecer (começa invisible, sem layout shift)

## Referências visuais
- Linear, Vercel, Apple, Banco Inter, Antigravity
- Dark, minimalista, intencional, cinematográfico
