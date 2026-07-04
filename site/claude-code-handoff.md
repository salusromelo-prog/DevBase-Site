# DevBase — Handoff para Claude Code

> **Objetivo:** transformar o protótipo HTML/CSS/JS em `site/` num site real em **Next.js 14 (App Router) + TypeScript + Tailwind CSS** pronto para deploy na Vercel.
>
> **Referência visual:** abrir `site/index.html` no navegador — esse é o design final aprovado. Replicar 1:1 em React.
>
> **Camada de efeitos:** `site/fx.css` + `site/fx.js` adicionam scroll progress, aurora orbs animados, spotlight no cursor, botões magnéticos, 3D tilt nos cards de produto, marquee de stack, shimmer no headline, counters animados nas stats e stagger nos grids. Portar como hooks/componentes React (`useScrollProgress`, `useMagnetic`, `useTilt`, `<Marquee>`, `<CountUp>`) ou via Framer Motion. **Tudo deve respeitar `prefers-reduced-motion`.**

---

## 0 · Stack obrigatória

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript (strict)
- **Estilo:** Tailwind CSS + CSS variables (manter as variáveis em `:root` do design)
- **Fontes:** `next/font` para Inter e JetBrains Mono
- **Deploy:** Vercel
- **Sem libs de UI** (sem shadcn, sem Radix) — componentes nativos, leves

---

## 1 · Identidade visual

Manter os tokens **idênticos** ao protótipo:

```css
:root {
  --bg:            #0a0a0a;   /* fundo da página */
  --card:          #0f0f0f;   /* fundo de cards */
  --card-2:        #0f0f1a;   /* card "newsletter" — variação fria */
  --border:        #1e1e1e;   /* borda padrão */
  --border-hover:  #333333;   /* borda hover */
  --accent:        #6366f1;   /* índigo principal */
  --accent-light:  #818cf8;
  --accent-deep:   #4338ca;
  --green:         #22c55e;   /* preço / live badge */
  --text:          #ffffff;
  --text-2:        #777777;
  --text-3:        #555555;
  --text-4:        #444444;
}
```

**Tipografia:**
- Headings + corpo → **Inter** (400/500/600/700)
- Labels, código, badges, logo → **JetBrains Mono** (400/500/600/700)
- Labels de seção sempre prefixadas com `//` em índigo, mono 11px

**Logo (oficial — manter idêntico ao protótipo):**
- Componente `<Logo />` reutilizável (props: `size?: 'sm' | 'md'`)
- **Ícone isométrico** em SVG: cubo/base 3D em índigo (`#6366f1`) com face superior `#818cf8`, face direita `#4338ca`, e linhas de grid finas (`rgba(255,255,255,0.15)`). Ver markup exato em `site/index.html` (procure por `class="logo-mark"`).
- **Wordmark** ao lado: `dev/base` em **JetBrains Mono 600**, branco, com a barra `/` em índigo (`#6366f1`).
- Tamanhos: `sm` = ícone 24px + texto 14px (footer); `md` = ícone 32px + texto 18px (navbar).
- **Sem sufixo nenhum** (.tools, .jobs, etc) — só `dev/base`.
- **Não** usar a versão antiga do quadrado "DB" — foi substituída.

**Estilo:**
- Dark minimalista, referência Vercel/Linear
- Bordas `0.5px` (use `border-[0.5px]` no Tailwind ou `1px` se a renderização ficar inconsistente)
- Sem gradientes excessivos, sem sombras decorativas
- Border-radius: cards 10–12px · botões 7–8px

---

## 2 · Estrutura de rotas

App Router com 3 páginas:

```
app/
├── layout.tsx          # navbar + footer + fonts
├── page.tsx            # Home (/)
├── produtos/page.tsx   # /produtos
└── sobre/page.tsx      # /sobre
```

**Navbar (em `layout.tsx`):**
- Sticky no topo
- Background `rgba(10,10,10,0.78)` + `backdrop-blur`
- Borda inferior `0.5px solid #1e1e1e`
- Esquerda: `<Logo />`
- Centro: links "Produtos" e "Sobre" (com underline animado no hover/active — `scaleX(0) → scaleX(1)` em `.25s`)
- Direita: botão ghost `DevBase Jobs` (link externo `https://devbase.jobs`) + botão primário índigo `Ver produtos →`

**Footer (em `layout.tsx`):**
- Esquerda: logo pequeno + "DevBase · feito no Brasil 🇧🇷"
- Centro: links Produtos · Jobs · Sobre
- Direita: © 2025 DevBase
- Borda superior `0.5px solid #1a1a1a`

---

## 3 · Componentes a extrair

Criar em `components/`:

| Componente | Props | Notas |
|---|---|---|
| `<Logo size?>` | `'sm' \| 'md'` | reutilizado em navbar e footer |
| `<Button variant size?>` | `'primary' \| 'ghost'` | ícone arrow opcional com animação `translateX(3px)` no hover |
| `<SectionLabel>` | children | `// label` em mono índigo 11px |
| `<Pill>` | children, withDot? | pill arredondada com ponto verde animado (keyframe `pulse`) |
| `<Badge>` | `'live' \| 'beta'` | tag `● ao vivo` (verde) ou `◉ beta` (índigo claro) |
| `<ProductCard>` | title, desc, features[], price, priceLabel, ctaLabel, ctaHref, badge | card de produto reusado em Home e /produtos |
| `<StatCard>` | label, value, meta | usado na seção "quem somos" |
| `<ValueCard>` | num, title, desc | usado em /sobre |
| `<TeamMember>` | initials, name, role | avatar circular com iniciais |
| `<PainChips>` | options[] | client component — toggleável, controlado por estado local |
| `<Reveal>` | children | wrapper que adiciona fade-up via IntersectionObserver |

---

## 4 · Conteúdo (textos exatos)

### Home

**Hero**
- Pill: `devbase — v1 · 2025` (com ponto verde pulsando)
- H1: `Ferramentas para` <br/> `devs brasileiros.` *(segunda linha em índigo)*
- Sub: `Construímos o que o dev BR precisa — sem documentação em inglês, sem preço em dólar, sem suporte que ignora.`
- CTAs: `Conhecer produtos →` (primary) · `DevBase Jobs` (ghost, externo)
- Stats: `2 produtos / ativos` · `BR / feito por devs BR` · `PT / 100% em português`

**// por que existimos**
- H2: `O dev brasileiro merece ferramentas feitas pra ele.`
- Sub: `Não adaptações mal traduzidas. Produtos que entendem nossa realidade.`
- 3 cards (ícones lucide-react ou SVG inline):
  1. **Preço em real** — `Sem conversão de dólar, sem IOF, sem surpresa no cartão. Pagamento único em PIX, boleto ou cartão.`
  2. **Docs em português** — `Tutoriais, exemplos e suporte 100% em PT-BR. Você não precisa traduzir nada pra começar.`
  3. **Feito pra nossa stack** — `Pagar.me, Asaas, Mercado Pago, Next.js e Supabase já integrados. Nada de gambiarra pra fazer funcionar no Brasil.`

**// nossos produtos**
- H2: `O que construímos até agora.`
- Sub: `Dois produtos no ar. Mais chegando.`
- Card 1 — Boilerplate (`● ao vivo`): título `DevBase Boilerplate`, preço **R$ 297** (verde), CTA `Comprar →` → `/produtos`
- Card 2 — Jobs (`◉ beta`): título `DevBase Jobs`, preço **Grátis** (índigo claro), CTA `Acessar →` → `https://devbase.jobs`

**// quem somos**
- H2: `Três devs de Goiânia. Construindo do zero.`
- Sub: `Sem investidor, sem escritório, sem frescura.`
- Layout 2 colunas — texto à esquerda + 3 stat-cards à direita:
  - `FUNDADA EM / 2025 / Goiânia · GO`
  - `TIME / 3 fundadores / Samuel · Isaque · Daniel`
  - `FOCO / Devs BR / Ferramentas para o mercado brasileiro`

**// sua dor como dev**
- H2: `Qual é o seu maior problema como dev brasileiro?`
- Sub: `Sua resposta vira o nosso próximo produto.`
- 6 chips em grid 2×3 (toggleáveis):
  - Perco horas em setup/boilerplate
  - Vagas sem salário visível
  - Ferramentas só em inglês
  - Pagamentos BR complicados
  - Documentação ruim ou em inglês
  - Suporte que não responde
- Textarea: `Ou descreve com suas palavras...`
- Input e-mail opcional + botão `Enviar sugestão →`
- **Backend:** criar `app/api/sugestao/route.ts` que recebe `{ chips: string[], texto: string, email?: string }` e salva (sugestão: Supabase ou e-mail via Resend pra `contato@devbase.com.br`). Por ora pode ser apenas console.log + retornar 200.

**// fique por dentro**
- Caixa centralizada com fundo `#0f0f1a` e borda `#2a2a3a`
- H2: `Novos produtos em breve.`
- Sub: `Deixa seu e-mail e avisamos quando lançarmos algo novo. Sem spam.`
- Input inline + botão `Me avisar →`
- **Backend:** `app/api/newsletter/route.ts` — receber e-mail, salvar (Supabase / Resend audience). Por ora console.log + 200.

### /produtos

- H1: `O que construímos.`
- Sub: `Produtos avulsos. Pagamento único ou gratuito. Sem assinatura.`
- 2 cards expandidos (lista completa de features — ver `site/index.html`):
  - **DevBase Boilerplate** · `● ao vivo` · R$ 297 → link `https://saas-kit-br-salusromelo-progs-projects.vercel.app`
  - **DevBase Jobs** · `◉ beta gratuito` · Grátis → link `https://devbase.jobs`

### /sobre

- H1: `Três devs de Goiânia. Construindo do zero.`
- Sub: `Sem investidor, sem escritório, sem frescura.`
- **// nossa história** — 3 parágrafos (copiar exato do `index.html`)
- **// o time** — 3 cards:
  - **Samuel** — `founder · dev` — avatar `S`
  - **Isaque** — `co-founder` — avatar `I`
  - **Daniel** — `co-founder` — avatar `D`
- **// nossos valores** — 3 cards:
  - **01 · Transparência acima de tudo** — `Preço visível, stack real, salário obrigatório. Nenhum produto nosso esconde o que importa.`
  - **02 · Português primeiro** — `Documentação, suporte e produto em PT-BR. O dev BR não precisa traduzir pra usar ferramenta boa.`
  - **03 · Real antes de escala** — `Não lançamos promessa. Lançamos produto. Sem "em breve" sem data.`

---

## 5 · Animações & efeitos visuais

Replicar exatamente o que está em `styles.css` + `app.js`:

1. **Background ambient** — fixar no `<body>`:
   - Dot grid: `radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)` com `background-size: 24px 24px`
   - Glow índigo nos cantos: dois `radial-gradient` em 10%/-10% e 90%/110%
2. **Pulse no ponto da pill** — keyframe `pulse` (2.2s loop) com `box-shadow` expandindo
3. **Underline animado nos nav-links** — `::after` com `transform: scaleX(0)` → `scaleX(1)` no hover/active
4. **Botões** — `arrow` translada 3px no hover; `active` translada 1px no Y
5. **Reveal on scroll** — IntersectionObserver: elementos `.reveal` ganham classe `.in` ao entrar; CSS `opacity 0 → 1` + `translateY(14px) → 0` em `.6s`
6. **Product cards** — borda muda para `#333` no hover, mais um overlay diagonal de gradiente índigo (`linear-gradient(135deg, rgba(99,102,241,0.18), transparent 40%)`) fade-in em `.25s`
7. **Page transition** — ao mudar de rota, fade-up curto (`.4s`) no `<main>`
8. **Newsletter card** — glow índigo central (radial-gradient blur)
9. **Inputs** — borda muda para índigo no `:focus-within`
10. **Pain chips** — toggle controlado: borda índigo + background `rgba(99,102,241,0.07)` + check branco aparece no tick

> Para reveal-on-scroll em Next.js, criar um componente `<Reveal>` client component com `useEffect` + `IntersectionObserver`.

---

## 6 · SEO + metadata

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: 'DevBase — Ferramentas para devs brasileiros',
  description: 'DevBase constrói ferramentas para desenvolvedores brasileiros: boilerplate SaaS pronto e job board com salário obrigatório.',
  metadataBase: new URL('https://devbase.com.br'),
  openGraph: {
    title: 'DevBase',
    description: 'Ferramentas para devs brasileiros.',
    locale: 'pt_BR',
    type: 'website',
    images: ['/og.png'], // 1200×630 — gerar a partir do banner do logo pack
  },
  twitter: { card: 'summary_large_image' },
};
```

Páginas internas: `export const metadata = { title: 'Produtos · DevBase' }` etc.

---

## 7 · Estrutura de arquivos sugerida

```
devbase/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Home
│   ├── produtos/page.tsx
│   ├── sobre/page.tsx
│   ├── globals.css           # CSS vars + base styles
│   └── api/
│       ├── sugestao/route.ts
│       └── newsletter/route.ts
├── components/
│   ├── logo.tsx
│   ├── button.tsx
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── reveal.tsx            # client component, IntersectionObserver
│   ├── pill.tsx
│   ├── badge.tsx
│   ├── section-label.tsx
│   ├── product-card.tsx
│   ├── stat-card.tsx
│   ├── value-card.tsx
│   ├── team-member.tsx
│   └── pain-chips.tsx        # client component, useState
├── lib/
│   └── content.ts            # textos extraídos (opcional)
├── public/
│   ├── favicon.ico
│   └── og.png
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 8 · Critérios de aceite

- [ ] 3 páginas renderizam corretamente em `pt-BR`
- [ ] Lighthouse mobile **≥ 95** em Performance, Accessibility, Best Practices, SEO
- [ ] **Zero erros no console** em produção
- [ ] Tipagem TypeScript estrita (sem `any`)
- [ ] Tailwind purga corretamente (bundle CSS < 30 KB)
- [ ] Fontes carregam via `next/font` (sem FOUT/FOIT)
- [ ] Animações respeitam `prefers-reduced-motion` — desabilitar reveal e pulse quando `(prefers-reduced-motion: reduce)` for verdadeiro
- [ ] Endpoints `/api/sugestao` e `/api/newsletter` aceitam POST e retornam JSON
- [ ] Build passa em `next build` sem warnings
- [ ] Deploy na Vercel funciona out-of-the-box

---

## 9 · O que NÃO incluir

- ❌ Aba "Serviços" — não existe
- ❌ Depoimentos (não temos clientes reais ainda)
- ❌ Seção de preços além dos 2 produtos
- ❌ "Em breve" para produtos sem data
- ❌ Sufixos no logo (DevBase.tools, DevBase.jobs, etc) — apenas "DevBase"
- ❌ Newsletter pop-up
- ❌ Cookies banner (ainda não há tracking)
- ❌ Bibliotecas de animação pesadas (sem framer-motion — usar CSS + IO)

---

## 10 · Como começar

```bash
# 1. Abrir o protótipo de referência
open site/index.html

# 2. Inicializar o projeto Next.js
npx create-next-app@latest devbase --typescript --tailwind --app --no-src-dir

# 3. Copiar tokens de cor para `tailwind.config.ts` em `theme.extend.colors`
# 4. Configurar fontes em `app/layout.tsx` via `next/font/google`
# 5. Reproduzir página por página, comparando com `site/index.html` no navegador
```

> **Importante:** o protótipo HTML é a fonte da verdade visual. Qualquer dúvida de espaçamento, cor ou comportamento — consultar `site/index.html` e `site/styles.css` antes de inventar.
