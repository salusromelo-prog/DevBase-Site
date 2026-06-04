# DevBase — Site institucional (handoff)

Pacote pronto pra mandar pro Claude Code transformar em Next.js 14.

## Abra primeiro
- **HANDOFF.md** — especificação completa (stack, tokens, hero animado, **camada de scroll premium**, conteúdo, rotas, critérios de aceite).
- **index.html** — abra no navegador. É a referência visual 1:1. Navegue pra produtos.html, empresa.html, jobs.html. Role a home pra ver o hero se dissolvendo.

## Arquivos
- index.html · produtos.html · empresa.html · jobs.html — as 4 páginas
- app.css — design system + layout
- scroll-fx.css — estados das animações de scroll
- hero.js — motor da animação do hero (3 variantes; padrão "ondas/silk")
- scroll-fx.js — motor de scroll (dissolve do hero, reveal palavra-por-palavra, depth reveal, parallax, skew por velocidade, barra de progresso, rail de seções, contadores)
- site.js — injeta nav + footer

## Como usar no Claude Code
1. Suba este ZIP no projeto.
2. Cole no prompt:

> Implemente o site descrito em HANDOFF.md. A referência visual 1:1 são os arquivos .html — abra no navegador e role a home pra ver as animações. Stack: Next.js 14 (App Router) + TypeScript + Tailwind, sem libs de UI. Porte a animação do hero (hero.js) como componente client e a camada de scroll (scroll-fx.js + scroll-fx.css) como um motor em requestAnimationFrame, mantendo a garantia anti-falha da classe `js` (conteúdo nunca preso invisível) e respeitando prefers-reduced-motion. Mantenha a animação "ondas" como padrão.

3. Deploy na Vercel.
