# DevBase — Handoff para Claude Code

> **Objetivo:** transformar este protótipo (HTML/CSS/JS estático em `/web`) num site institucional real em **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, pronto pra deploy na Vercel.
>
> **Referência visual = fonte da verdade:** abra os arquivos em `/web` no navegador. O design aprovado é exatamente esse. Replicar 1:1.

---

## 0 · O que é o site

Site institucional **multi-página** da DevBase — uma empresa de 3 devs de Goiânia que faz ferramentas para desenvolvedores brasileiros. Estética **premium, clara e arejada** (referência: antigravity.google / Linear / Vercel), com **hero escuro cinematográfico** e corpo claro. O hero tem uma **animação em loop em canvas** (estilo "ondas") e há micro-animações de scroll no site todo.

**Páginas (4):**
| Rota | Arquivo protótipo | Conteúdo |
|---|---|---|
| `/` | `web/index.html` | Hero animado, por que existimos, destaque do boilerplate, catálogo, números, manifesto, CTA |
| `/produtos` | `web/produtos.html` | Catálogo completo (5 produtos) + FAQ |
| `/empresa` | `web/empresa.html` | História, timeline, valores, manifesto, time, "sua dor" + newsletter |
| `/jobs` | `web/jobs.html` | Página do DevBase Jobs (produto externo) |

---

## 1 · Stack obrigatória

- **Next.js 14** (App Router) · **TypeScript** (strict) · **Tailwind CSS**
- Fontes via `next/font`: **Satoshi** (display+corpo) e **JetBrains Mono** (detalhes/labels). Satoshi vem do Fontshare — pode usar `next/font/local` com os arquivos, ou manter o `<link>` do Fontshare.
- **Sem bibliotecas de UI** (sem shadcn/Radix). Componentes próprios, leves.
- **Sem framer-motion**: as animações de scroll são um motor próprio em `requestAnimationFrame` (`scroll-fx.js`, dirigido por posição). A animação do hero é canvas-2D puro (portar `web/hero.js` como componente client). Ver seção 4.
- Deploy: **Vercel**.

---

## 2 · Identidade visual (tokens — manter idênticos)

```css
/* superfícies claras */
--bg: #ffffff;  --bg-soft: #f5f5f7;  --bg-soft-2: #efeff3;
--ink: #0d0d12; --ink-2: #2c2c36; --body: #56565f; --muted: #8a8a95;
--line: rgba(13,13,18,0.09);  --line-2: rgba(13,13,18,0.14);
/* marca (roxo é a cor principal) */
--primary: #6366f1;  --primary-2: #4f46e5;  --violet: #8b5cf6;  --violet-2: #a78bfa;
/* superfícies escuras (hero/footer) */
--d-bg: #0a0913;  --d-ink: #f4f3fb;  --d-body: rgba(244,243,251,0.62);
--signal: #16a34a; /* verde de preço / live */
```

- **Logo:** ícone isométrico (cubo índigo) em SVG + wordmark `dev/base` com a barra `/` em `--primary`. Markup exato em `web/site.js` (constante `LOGO`). **Não** usar versão "DB" antiga.
- Cantos: cards 16px, botões pill (999px). Sombras suaves. Bordas sutis.
- **Tipografia:** títulos grandes e confiantes, `letter-spacing` negativo (-0.03 a -0.045em). `eyebrow` = label em mono, uppercase, cor `--primary`.

---

## 3 · O hero animado (importante)

`web/hero.js` é um motor canvas-2D com **3 animações em loop** selecionáveis:
- **`silk` (ondas)** — fitas de onda em camadas. **← este é o padrão escolhido. Use como default.**
- `aurora` — luz/gradiente roxo fluindo.
- `flow` — campo de partículas em correntes.

Como portar:
- Crie um componente client `<HeroCanvas variant="silk" />` que monta um `<canvas>` e roda o loop (copie a lógica de `hero.js`). Respeitar `prefers-reduced-motion` (desenhar 1 frame estático).
- A **home** tem um seletor (3 pills no rodapé do hero) que troca a variante ao vivo e persiste em `localStorage('db-hero')`. Manter.
- Os **headers internos** (`.phead`) e as **faixas de CTA** (`.ctaband`) usam a variante fixa `silk`.
- O `<canvas>` precisa de `width:100%; height:100%` no CSS (senão renderiza no tamanho padrão 300×150).

---

## 4 · Animações de scroll (camada premium — `scroll-fx.css` + `scroll-fx.js`)

> Esta é a parte mais importante do "feeling" do site. **NÃO** simplificar pra um fade comum.

O motor (`scroll-fx.js`) é **dirigido por posição num único loop `requestAnimationFrame`** (não depende de IntersectionObserver) e adiciona a classe `js` no `<html>`. **Importante:** os estados "escondidos" (`.depth`, `.sw > span`, `.reveal`) só valem sob `.js` — assim o conteúdo **nunca fica preso invisível** se o JS falhar. Porte mantendo essa garantia (ex.: classe `js` no root, ou reveal por padrão visível + animação como progressive enhancement).

Efeitos a reproduzir:
- **Hero dissolve:** ao rolar, `.hero-inner` sobe (`translateY`) + escala + some (`opacity`), enquanto `.hero-canvas` escala levemente — sensação cinematográfica de profundidade. O seletor de animação e o "scroll cue" também fazem fade-out.
- **Reveal palavra-por-palavra** (`[data-split]`): o script quebra o heading em palavras (preservando spans internos tipo `.grad`/`.ac`/`.on`), cada palavra num wrapper `.sw` (overflow hidden) que sobe `translateY(110%) → 0` com delay incremental (`--wd`).
- **Depth reveal** (`.depth`): elementos sobem com leve `perspective + rotateX + scale + blur` que se resolve. Grupos `[data-depth-stagger]` aplicam delay incremental (`--d`) nos filhos.
- **Reveal simples** (`.reveal`, variante `.blur`): fade-up; usado em headings de seção.
- **Skew por velocidade** (`[data-skew-item]`): inclina sutilmente conforme a velocidade do scroll (cap ±3°).
- **Parallax** (`[data-parallax="0.08"]`): elemento se move em ritmo diferente (valor = intensidade).
- **Barra de progresso** (`.sx-progress`): fixa no topo, `scaleX` conforme o scroll, com glow.
- **Rail de seções** (`.sx-rail`): pontos à direita (some <1100px) gerados a partir de `[data-rail="rótulo"]`; destacam a seção atual e levam até ela ao clicar.
- **Cortina** (`.sx-curtain`): a primeira seção clara "sobe" sobre o hero escuro com cantos arredondados.
- **Contadores** (`[data-count]`, opcional `data-suffix`): animam de 0 ao alvo ao entrar na viewport.
- Tudo respeita `prefers-reduced-motion` (revela tudo, sem transforms).

Sugestão React (sem framer-motion):
- Um provider/loop único `useScrollFX()` num `requestAnimationFrame` que: smootha o scroll (lerp), aplica dissolve no hero, parallax/skew, atualiza barra e rail, e revela elementos por posição (`getBoundingClientRect`).
- Componentes: `<Split>` (quebra heading em palavras), `<Reveal variant="depth|fade|blur">`, `<CountUp>`. Marque os "alvos" com `data-*` e deixe o loop varrer — é o que o protótipo faz.
- Mantenha a classe `js` no `<html>` (ou equivalente) pra garantir fallback visível.

### `.reveal`/`site.js` (legado)
`site.js` ainda injeta nav/footer e tem um reveal/counter via IntersectionObserver como redundância. No Next, isso vira componentes/hook; o `scroll-fx.js` é a fonte canônica das animações de scroll.

---

## 5 · Conteúdo real (já correto no protótipo — não inventar)

**Produtos (5):**
| Produto | Preço | Badge | Link de compra |
|---|---|---|---|
| 100 Micro SaaS + 25 Automações | **R$ 29,90** | ao vivo · novo | `https://pay.kiwify.com.br/5cyFrhr` |
| DevBase Boilerplate | **R$ 147** (de R$ 297) | ao vivo | `https://saas-kit-br-salusromelo-progs-projects.vercel.app` |
| DevBase Components | **R$ 67** | ao vivo | `https://pay.kiwify.com.br/7OQNJ1C` |
| Combo (Boilerplate + Components) | **R$ 197** (de R$ 214) | combo | `https://pay.kiwify.com.br/Y6jViIR` |
| DevBase Jobs | **Grátis** (beta) | beta gratuito | `https://dev-base-jobs.vercel.app` |

> As listas de features de cada produto estão exatas no protótipo (`produtos.html`). Copie de lá.

**Empresa:** fundada em **2025**, **Goiânia · GO**. Pagamento único, sem assinatura.
**Fundadores:** Samuel Lustosa Rodrigues Melo (founder · dev) · Isaque Lustosa Rodrigues Melo (co-founder) · Daniel de Oliveira Pimenta Melo (co-founder).
**Valores:** Transparência acima de tudo · Português primeiro · Real antes de escala.
**Manifesto:** "A internet brasileira não precisa de mais tutoriais. Precisa de devs enviando produto. A DevBase é a base que você constrói em cima."

---

## 6 · Estrutura sugerida (Next.js)

```
app/
├── layout.tsx              # <Nav/> + <Footer/> + fonts + metadata
├── page.tsx                # Home
├── produtos/page.tsx
├── empresa/page.tsx
├── jobs/page.tsx
└── globals.css             # tokens + base (portar app.css)
components/
├── nav.tsx                 # injeta links + estado scrolled (client)
├── footer.tsx
├── hero-canvas.tsx         # client — motor de animação (silk/aurora/flow)
├── hero-switch.tsx         # client — seletor + localStorage
├── reveal.tsx              # client — IntersectionObserver
├── count-up.tsx            # client
├── product-card.tsx
├── value-card.tsx
├── faq.tsx
└── ui/button.tsx
lib/
└── products.ts             # dados dos 5 produtos (extrair do protótipo)
```

> O protótipo injeta nav/footer via JS (`site.js`) só pra evitar duplicação no estático. No Next, isso vira componentes em `layout.tsx`.

---

## 7 · Endpoints (formulários)

Há 2 forms em `/empresa` (atualmente fake-submit):
- **"Sua dor como dev"** — chips + textarea + e-mail → `POST /api/sugestao` `{ tags: string[], texto: string, email?: string }`
- **Newsletter** — e-mail → `POST /api/newsletter` `{ email: string }`

Por ora: validar, `console.log` e retornar `200`. Sugestão real: salvar no Supabase ou enviar via Resend.

---

## 8 · Metadata / SEO

```ts
export const metadata: Metadata = {
  title: 'DevBase — Ferramentas para devs brasileiros',
  description: 'A DevBase constrói ferramentas para desenvolvedores brasileiros: boilerplate SaaS, componentes React BR, 100 ideias de micro SaaS e um job board com salário obrigatório.',
  metadataBase: new URL('https://www.devbase.tools'),
  openGraph: { locale: 'pt_BR', type: 'website', images: ['/og.png'] },
  twitter: { card: 'summary_large_image' },
};
```
Cada página interna define seu próprio `title` (ex.: `Produtos · DevBase`).

---

## 9 · Critérios de aceite

- [ ] 4 páginas em `pt-BR`, navegação entre elas funcionando
- [ ] Hero com animação `silk` rodando em loop + seletor das 3 variantes na home
- [ ] Animações de scroll (reveal/contadores) funcionando e respeitando `prefers-reduced-motion`
- [ ] Hero escuro + corpo claro (tema misto) fiel ao protótipo
- [ ] Lighthouse mobile ≥ 95 (Perf/A11y/BP/SEO)
- [ ] Zero erros de console · TypeScript estrito (sem `any`)
- [ ] `next build` limpo · deploy Vercel out-of-the-box
- [ ] Preços e links de compra exatamente como na tabela acima

---

## 10 · O que NÃO fazer

- ❌ Não usar monospace no corpo/títulos (só em labels/detalhes)
- ❌ Não voltar pro fundo preto chapado (é tema misto: hero escuro, corpo claro)
- ❌ Não inventar produtos, preços, depoimentos ou métricas fora do protótipo
- ❌ Não adicionar sufixo no logo (.tools/.jobs) — só `dev/base`
- ❌ Não usar bibliotecas pesadas de animação

---

## 11 · Começar

```bash
# 1. Abrir a referência
open web/index.html   # navegue por todas as páginas e a animação do hero

# 2. Criar o projeto
npx create-next-app@latest devbase --typescript --tailwind --app --no-src-dir

# 3. Portar globals.css (tokens), fontes (next/font), e depois página por página,
#    comparando lado a lado com /web no navegador.
```

> Qualquer dúvida de espaçamento, cor ou comportamento: consulte `/web` antes de inventar. O protótipo é a verdade visual.
