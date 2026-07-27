'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { motion } from 'framer-motion'

export type ScrollExpandMediaProps = {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  posterSrc?: string
  /** opcional: sem ela o fundo é o gradiente escuro da marca (.seh-bg) */
  bgImageSrc?: string
  title?: string
  date?: string
  scrollToExpand?: string
  /** mix-blend-difference no título; falso quando o fundo já é colorido */
  textBlend?: boolean
  /** as três batidas reveladas ao longo do curso. Cada filho direto vira
      um beat: o 1º entra cedo, o 3º fica na tela junto com os CTAs. São
      conteúdo da página, não do componente — por isso vêm de fora. */
  beats?: ReactNode
  children?: ReactNode
}

/* ── calibragem ──────────────────────────────────────────────────── */
/* ganho da roda, por PIXEL de rolagem — não por unidade de deltaY.
   deltaY só vem em pixels quando deltaMode é 0; o Firefox manda linhas
   (deltaMode 1, ~3 por clique) e alguns modos de página mandam telas
   (deltaMode 2). Sem normalizar, o mesmo gesto rendia 100 aqui e 3 lá,
   e no Firefox o hero pedia ~370 cliques de roda pra abrir. */
const WHEEL_GAIN = 0.0006
/* teto do passo de UM evento, em px. Trackpad com inércia despeja
   centenas de pixels num evento só; sem teto isso vira um salto. Como
   o trackpad compensa em frequência (dezenas de eventos por gesto), o
   curso total continua o mesmo — só deixa de ser dado em degraus. */
const WHEEL_MAX_STEP = 150
/* passo por tecla (ArrowDown/PageDown/Space). 0.12 dá 8,3 toques no
   curso inteiro: o teclado não precisa acompanhar os 17 cliques da
   roda, mas cada beat ainda ganha ~2 toques pra ser lido. */
const KEY_STEP = 0.12
/* constante de tempo da perseguição alvo→pintado, em segundos: quanto
   o valor pintado leva pra cobrir ~63% da distância que falta.

   0.11 na roda porque um clique dela dura ~330ms de movimento visível
   contra 50–100ms de intervalo entre cliques — folga de sobra pra um
   degrau emendar no outro sem vão. Subir mais suaviza pouco e custa
   caro: num gesto rápido o atraso é τ × velocidade, e em 0.14 a cena
   já ficava um quarto do curso atrás do dedo.

   O dedo pede metade disso: a rolagem nativa já vem suave, aqui a
   suavização só tira a granulação do evento de scroll, e atraso demais
   sob o dedo lê como elástico. */
const TAU = { wheel: 0.11, touch: 0.07 }
/* abaixo disto encosta no alvo e o laço se desliga: perseguição
   exponencial nunca chega no destino sozinha, e sem o encaixe o
   `v >= 1` que libera a página jamais dispararia. */
const SETTLE = 0.0004
/* trilho do toque: fração de viewport que o dedo percorre até a
   expansão fechar. O .seh-track ganha essa altura a mais e o palco fica
   sticky dentro dele — é isso que segura a mídia na tela SEM precisar
   de preventDefault.

   2.0 porque agora há três beats pra LER. Num aparelho de 844px isso
   dá 1688px de curso; a faixa de um beat (0.26) vira 439px, que num
   ritmo de leitura de 500-700 px/s são 0.6-0.9s por batida. Com os
   0.85 antigos cada beat tinha 187px — menos de um impulso de polegar
   pros três. Abaixo de 1.5 as batidas viram subliminares. */
const TOUCH_TRACK = 2.0
/* histerese do children: liga em 0.88, desliga abaixo de 0.78.

   Antes só ligava em v = 1 e o último quarto do curso não entregava
   nada; agora os CTAs entram (fade de 0.7s do framer) enquanto a
   última batida ainda está sendo lida, e pousam junto com o fim do
   curso. Quem libera a página continua sendo `expanded`, em v >= 1. */
const CONTENT_ON = 0.88
const CONTENT_OFF = 0.78
/* geometria da mídia, do componente original */
const W0 = 300, H0 = 400
const WGROW = { narrow: 650, wide: 1250 }
const HGROW = { narrow: 200, wide: 400 }
/* teto da mídia contra a viewport. Os mesmos números do max-width /
   max-height do CSS, mas aplicados aqui — o clamp precisa entrar no
   CÁLCULO do quadro, não depois dele: deixado só pro CSS, o card batia
   no teto no meio do curso e ficava congelado até o fim. Numa tela de
   800px de altura o teto chegava em v≈0.7, ou seja, o último terço do
   scroll não movia mais nada. */
const VW_CAP = 0.95, VH_CAP = 0.85
const SHIFT = { narrow: 180, wide: 150 } /* afastamento do título, em vw */

/* ── o cubo da marca ─────────────────────────────────────────────
   A coreografia vem do splash desconectado (components/intro-signature
   .tsx): lá ela já era função pura de um escalar t, sem estado interno,
   o que é exatamente o que um scrub por scroll precisa. Aqui o eixo de
   4.5 unidades vira o v de 0 a 1, e as escritas saem de render do React
   pra refs — o componente não pode reconciliar por quadro.

   Termina cedo, em 0.24: o cubo é a ABERTURA da cena, não a cena. Ele
   se monta grande no meio, estaciona no slot de fluxo e sai da frente
   pros beats. Passado CUBE_END o paint() para de escrever nele. */
const CUBE_END = 0.24
/* idem pros beats: depois de 0.80 os três estão parados */
const BEATS_END = 0.80
/* onde a primeira batida começa a entrar e onde a última acaba de
   entrar; as do meio saem daí, divididas pelo número de batidas.

   0.12 é escolhido contra o título: com easeCopy(v*3.2) as metades
   limpam o centro perto de v=0.09, e a primeira batida precisa pegar
   esse bastão antes que o vão vire tela vazia. Sobra uma respirada
   curta em que só o cubo, já montado, ocupa o quadro — que é o efeito
   pretendido, não um buraco.

   0.66 deixa a última inteira em 0.74, com folga pros CTAs (0.88)
   pousarem enquanto ela ainda está sendo lida. */
const BEAT_IN0 = 0.12, BEAT_LAST_IN = 0.66
/* altura do cubo grande como fração da viewport, e o teto de escala —
   assim o tamanho na tela é fração da tela, não número fixo */
const CUBE_VH = 0.34, CUBE_SCALE_MAX = 3.0
/* de quanto ele sobe do slot de fluxo rumo ao centro do palco */
const CUBE_LIFT = 0.11
/* ────────────────────────────────────────────────────────────────── */

/* Como a expansão é dirigida:
   · 'wheel'  — desktop de ponteiro fino. A roda é interceptada e a
                página fica presa no topo até a mídia abrir. É o
                comportamento original do componente.
   · 'touch'  — dedo. NADA é interceptado: o progresso sai da posição de
                scroll nativa e o palco sticky segura a mídia. A rolagem
                continua sendo a do sistema, sem travamento.
   · 'static' — prefers-reduced-motion. Mídia já aberta, children já
                visível, nenhum listener.
   'idle' é só o primeiro render, antes de medir o ambiente, pra que
   servidor e cliente pintem o mesmo frame. */
type Mode = 'idle' | 'wheel' | 'touch' | 'static'

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/* ── curvas ──────────────────────────────────────────────────────────
   O progresso é um só, mas cada camada o lê por uma curva diferente. É
   daí que vem a profundidade: se tudo andasse no mesmo ritmo linear, a
   cena leria como um bloco só sendo escalado. */

/* Smoothstep amaciado: 30% linear + 70% smoothstep.

   Aqui quem conduz é a mão do usuário, não um relógio, e isso muda o
   que serve de curva. Smoothstep puro tem derivada ZERO em v=0: o
   primeiro clique de roda não moveria quase nada e leria como travado.
   Um ease-out faz o contrário — derivada alta no começo, o card dá um
   tranco no primeiro clique. A fatia linear garante a resposta
   imediata que scroll pede; a fatia smoothstep tira o canto vivo das
   duas pontas. E é simétrica, então voltar pra cima tem exatamente o
   mesmo tato de descer. */
const soft = (v: number) => 0.3 * v + 0.7 * (v * v * (3 - 2 * v))

/* texto: MUITO adiantado. O título deixou de ser o ator do curso — o
   trabalho dele agora é liberar o centro do palco pro cubo e pros três
   beats, e liberar rápido. Com o 1.14 de antes o miolo só ficava livre
   perto de v=0.30 e o primeiro beat (0.14) nasceria por cima de letra
   ainda em trânsito. Com 3.2 o centro está livre em v≈0.09 e as
   metades estacionam em 0.3125. */
const easeCopy = (v: number) => soft(clamp01(v * 3.2))
/* halo e fundo: atrasados, um fio atrás da mídia — a luz parece reagir
   ao card em vez de ser parte dele, e o fundo não escurece antes de a
   mídia justificar o escuro */
const easeDepth = (v: number) => soft(v) ** 1.25

/* ── faixas ──────────────────────────────────────────────────────────
   O mesmo par ramp/seg do intro-signature (linhas 53-55 de lá), que é
   como aquela coreografia recortava o eixo do tempo em trechos. Aqui o
   eixo é o progresso. */
const ramp = (v: number, a: number, d: number) => clamp01((v - a) / d)
const outCubic = (t: number) => { const u = t - 1; return u * u * u + 1 }
const outBack = (t: number) => {
  const c1 = 1.70158, c3 = c1 + 1
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
}
const seg = (v: number, a: number, d: number, e = outCubic) => e(ramp(v, a, d))

/* Uma face do cubo entrando: desliza da própria direção e acende. Os
   deslocamentos (0,-78) / (-70,+40) / (+70,+40) são os do splash.
   Fora do componente de propósito — closure nova por render seria lixo
   alocado num caminho que roda a cada quadro. */
function paintFace(r: RefObject<SVGPathElement | null>, p: number, tx: number, ty: number) {
  const el = r.current
  if (!el) return
  el.style.opacity = String(p)
  el.style.transform = `translate(${((1 - p) * tx).toFixed(1)}px, ${((1 - p) * ty).toFixed(1)}px)`
}

/* A troca de uma frase pela outra.

   As duas ocupam exatamente o MESMO lugar, e é isso que torna a troca
   difícil: cross-fade no mesmo ponto não lê como troca, lê como uma
   frase vista ATRAVÉS da outra. Duas coisas resolvem, e só juntas.

   1. Quem sai LIDERA. Antes a saída começava depois da entrada, então
      as duas se cruzavam no auge: medido, chegavam a 0.535 de
      opacidade simultânea — duas frases sólidas empilhadas. Agora a
      saída larga BEAT_LEAD antes, e o pico simultâneo cai pra 0.195,
      dois fantasmas fracos. O preço é uma janela de ~1/3 de clique em
      que nenhuma das duas está forte; adiantar mais fecharia a papa de
      vez, mas aí a janela vira buraco visível.

   2. Profundidade. Quem chega vem desfocado de baixo e ganha foco;
      quem sai perde foco subindo. Com o desfoque, o que sobra de
      sobreposição lê como fundo contra frente em vez de sujeira.

   Opacidade e movimento correm em spans DIFERENTES de propósito: a
   opacidade precisa ser decidida (0.05) pra não competir, o movimento
   precisa ser longo (0.085) pra não parecer um piscar. As duas andam
   pra cima, nunca em direções opostas — é um painel de embarque
   virando, não duas coisas se cruzando. */
const BEAT_LEAD = 0.025
const BEAT_OP = 0.05, BEAT_MOVE = 0.085

function paintBeat(el: HTMLElement, st: boolean, v: number, inA: number, outA: number) {
  /* em reduced-motion os três ficam acesos e o CSS os empilha em coluna */
  if (st) {
    el.style.opacity = '1'
    el.style.transform = 'none'
    el.style.filter = 'none'
    el.style.setProperty('--a', '1')
    return
  }

  const aOp = ramp(v, inA, BEAT_OP) ** 1.15
  const bOp = outA === Infinity ? 0 : ramp(v, outA, BEAT_OP)
  el.style.opacity = (aOp * (1 - bOp) ** 1.2).toFixed(3)

  const aMove = outCubic(ramp(v, inA, BEAT_MOVE))
  const bMove = outA === Infinity ? 0 : ramp(v, outA, BEAT_MOVE)
  /* escala mínima: 1.5% de aproximação dá o empurrão de profundidade
     sem virar zoom */
  const y = (1 - aMove) * 34 - bMove * 30
  const s = 0.985 + 0.015 * aMove - 0.012 * bMove
  el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${s.toFixed(4)})`

  const blur = (1 - aMove) * 10 + bMove * 9
  /* 'none' quando assentado: desfoque exige re-rasterizar o texto todo
     quadro, e fora das trocas não há nada a desfocar */
  el.style.filter = blur > 0.06 ? `blur(${blur.toFixed(2)}px)` : 'none'

  /* o rótulo em mono deriva daqui no CSS e desce de cima enquanto a
     frase sobe de baixo — o par se fecha em vez de deslizar em bloco.
     Segue a opacidade, não o movimento: senão ficaria aceso sozinho
     depois que a frase já apagou. */
  el.style.setProperty('--a', aOp.toFixed(3))
}

/* useLayoutEffect avisa no console quando roda no servidor */
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  beats,
  children,
}: ScrollExpandMediaProps) {
  const [mode, setMode] = useState<Mode>('idle')
  const [expanded, setExpanded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const bgRef = useRef<HTMLDivElement>(null)
  const bloomRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLSpanElement>(null)
  const tailRef = useRef<HTMLSpanElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const cueRef = useRef<HTMLParagraphElement>(null)

  /* o cubo e suas peças */
  const cubeRef = useRef<HTMLDivElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  const fTopRef = useRef<SVGPathElement>(null)
  const fLeftRef = useRef<SVGPathElement>(null)
  const fRightRef = useRef<SVGPathElement>(null)
  const barRef = useRef<SVGRectElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)

  /* os beats. Vêm de fora como ReactNode, então não dá pra pendurar um
     ref em cada um — guardamos o contêiner e cacheamos os filhos, que
     são renderizados uma vez e nunca mudam. */
  const beatsRef = useRef<HTMLDivElement>(null)
  const beatEls = useRef<HTMLElement[]>([])

  /* alvo (para onde o input mandou ir) e pintado (onde a cena está
     agora). Manter os dois separados é o que dá continuidade: o input
     chega em degraus, o pintado atravessa os degraus quadro a quadro. */
  const targetRef = useRef(0)
  const progressRef = useRef(0)
  const expandedRef = useRef(false)
  const contentRef = useRef(false)
  const narrowRef = useRef(false)
  const staticRef = useRef(false)
  const tauRef = useRef(TAU.wheel)
  /* tamanho final da mídia nesta viewport; medido fora do paint pra não
     ler layout a cada quadro */
  const sizeRef = useRef({ w: W0 + WGROW.wide, h: H0 + HGROW.wide })
  /* idem pro cubo: escala do estado grande e quanto ele sobe */
  const cubeGeo = useRef({ big: 2.2, lift: 90 })
  /* as duas fronteiras de escrita: passado CUBE_END / BEATS_END nada
     mais muda, então o paint escreve uma última vez e para */
  const cubeLive = useRef(true)
  const beatsLive = useRef(true)
  const raf = useRef(0)
  /* timestamp do quadro anterior; 0 significa "laço parado" */
  const lastT = useRef(0)

  /* O progresso é escrito direto no DOM, não no state: um render do
     React por evento de roda derrubava o FPS pela metade sob CPU 4x
     (a subárvore inteira, children incluído, reconciliava a cada
     frame). O state guarda só as duas transições discretas — abriu,
     mostrou o children — que acontecem uma vez cada. */
  /* onde a mídia termina nesta viewport. Nunca abaixo do tamanho
     inicial: numa janela muito baixa o teto ficaria menor que H0 e o
     card encolheria conforme o scroll avança. */
  const measure = useCallback(() => {
    const k = narrowRef.current ? 'narrow' : 'wide'
    const vh = window.innerHeight
    sizeRef.current = {
      w: Math.max(W0, Math.min(W0 + WGROW[k], window.innerWidth * VW_CAP)),
      h: Math.max(H0, Math.min(H0 + HGROW[k], vh * VH_CAP)),
    }

    /* o slot do cubo é definido no CSS (e encolhe no mobile por media
       query), então o tamanho base é LIDO, não duplicado aqui — dois
       números para a mesma coisa é como o bloco de reduced-motion já
       sai de sincronia. offsetWidth, não getBoundingClientRect: o
       segundo devolve a largura JÁ transformada, e no meio do curso o
       paint deixou um scale pendurado no elemento. */
    const base = cubeRef.current?.offsetWidth || 132
    cubeGeo.current = {
      big: Math.min(CUBE_SCALE_MAX, Math.max(1.4, (CUBE_VH * vh) / base)),
      lift: CUBE_LIFT * vh,
    }
  }, [])

  const paint = useCallback((v: number) => {
    const m = soft(v)
    const c = easeCopy(v)
    const d = easeDepth(v)

    const media = mediaRef.current
    if (media) {
      const { w, h } = sizeRef.current
      /* arredondado pra meio pixel: sem isso a largura muda em frações
         mínimas todo quadro e o navegador reflui o card à toa em
         movimentos que não rendem um pixel de diferença na tela */
      media.style.width = `${Math.round((W0 + m * (w - W0)) * 2) / 2}px`
      media.style.height = `${Math.round((H0 + m * (h - H0)) * 2) / 2}px`
    }
    if (bgRef.current) bgRef.current.style.opacity = String(1 - d)
    if (veilRef.current) veilRef.current.style.opacity = String(0.7 - m * 0.3)

    /* o halo que a mídia joga no escuro. Só transform e opacity — as
       duas propriedades que o compositor resolve sozinho — pra ele
       poder crescer todo frame sem custar layout. */
    if (bloomRef.current) {
      bloomRef.current.style.transform = `translate(-50%, -50%) scale(${0.62 + d * 1.05})`
      bloomRef.current.style.opacity = String(0.5 + d * 0.42)
    }

    /* em reduced-motion o progresso já nasce em 1: aplicar o
       afastamento jogaria o h1 pra fora da tela e a página ficaria
       sem título visível. */
    const shift = staticRef.current ? 0 : c * SHIFT[narrowRef.current ? 'narrow' : 'wide']
    if (headRef.current) headRef.current.style.transform = `translateX(${-shift}vw)`
    if (tailRef.current) tailRef.current.style.transform = `translateX(${shift}vw)`
    if (dateRef.current) dateRef.current.style.transform = `translateX(${-shift}vw)`
    if (cueRef.current) {
      cueRef.current.style.transform = `translateX(${shift}vw)`
      /* a dica some no primeiro terço: assim que o gesto começou ela já
         cumpriu o papel, e segurá-la até o fim só suja o quadro */
      cueRef.current.style.opacity = String(1 - clamp01(v * 3))
    }

    /* ── o cubo da marca ──────────────────────────────────────────
       Tudo acaba em CUBE_END. Continuar escrevendo o mesmo valor a
       cada quadro depois disso é desperdício, então escrevemos uma
       última vez ao cruzar a fronteira e paramos — a mesma ideia do
       laço que se desliga sozinho ao encostar no alvo. */
    const cubeOn = v < CUBE_END
    if (cubeOn || cubeLive.current) {
      cubeLive.current = cubeOn
      const g = cubeGeo.current
      /* assentamento: sai torto e pequeno, trava reto */
      const set = seg(v, 0.025, 0.085, outBack)
      /* estacionamento: do estado grande no meio do palco de volta pro
         slot de fluxo, onde ele vira assinatura e libera a tela */
      const park = soft(clamp01((v - 0.08) / 0.12))
      const s = (1 + (g.big - 1) * (1 - park)) * (0.92 + 0.08 * set)

      if (cubeRef.current) {
        cubeRef.current.style.transform =
          `translate3d(0, ${(g.lift * (1 - park)).toFixed(1)}px, 0)` +
          ` scale(${s.toFixed(3)}) rotate(${((1 - set) * -10).toFixed(2)}deg)`
      }
      if (plateRef.current) {
        plateRef.current.style.opacity = String(ramp(v, 0, 0.05))
        plateRef.current.style.transform = `scale(${(0.5 + 0.5 * seg(v, 0, 0.06, outBack)).toFixed(3)})`
      }
      /* as faces entram na ordem do splash: topo, esquerda, direita */
      paintFace(fTopRef, seg(v, 0.025, 0.05), 0, -78)
      paintFace(fLeftRef, seg(v, 0.04, 0.05), -70, 40)
      paintFace(fRightRef, seg(v, 0.055, 0.05), 70, 40)

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${seg(v, 0.10, 0.045, outBack).toFixed(3)})`
      }
      /* um pulso só. Dois viram tique. */
      if (ringRef.current) {
        const rp = ramp(v, 0.11, 0.09)
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${(0.3 + 2.4 * rp).toFixed(3)})`
        ringRef.current.style.opacity = String(rp > 0 && rp < 1 ? (1 - rp) * 0.45 : 0)
      }
    }

    /* ── os beats ─────────────────────────────────────────────── */
    const beatsOn = v < BEATS_END
    if (beatsOn || beatsLive.current) {
      beatsLive.current = beatsOn
      const els = beatEls.current
      const n = els.length
      /* as faixas saem do número de batidas: a última entra em 0.66 e
         está inteira em 0.74, sobrando curso pros CTAs pousarem com
         ela ainda na tela */
      const step = n > 1 ? (BEAT_LAST_IN - BEAT_IN0) / (n - 1) : 0
      for (let i = 0; i < n; i++) {
        const inA = BEAT_IN0 + i * step
        /* a saída larga antes de a próxima entrar — ver paintBeat */
        paintBeat(els[i], staticRef.current, v, inA, i === n - 1 ? Infinity : inA + step - BEAT_LEAD)
      }
    }
  }, [])

  /* as duas transições discretas da cena. Ficam fora do paint porque
     custam render do React e acontecem uma vez cada, não por quadro. */
  const sync = useCallback((v: number) => {
    const full = v >= 1
    if (full !== expandedRef.current) {
      expandedRef.current = full
      setExpanded(full)
    }
    const on = v >= CONTENT_ON ? true : v < CONTENT_OFF ? false : contentRef.current
    if (on !== contentRef.current) {
      contentRef.current = on
      setShowContent(on)
    }
  }, [])

  /* O laço. Roda enquanto o pintado não alcançou o alvo e se desliga
     sozinho quando alcança — nada de rAF eterno queimando bateria numa
     página parada.

     O passo é `1 - e^(-dt/τ)`, não um lerp de fator fixo: com fator
     fixo a suavização depende da taxa de quadros, e o mesmo gesto
     ficaria duas vezes mais rápido num monitor de 120Hz que num de 60.
     Assim a curva é a mesma em qualquer taxa, inclusive quando o
     navegador engasga e pula quadros. */
  const start = useCallback(() => {
    /* função nomeada, não useCallback: ela precisa agendar a si mesma, e
       um useCallback não pode se referenciar dentro do próprio corpo */
    const frame = (t: number) => {
      const dt = lastT.current ? Math.min((t - lastT.current) / 1000, 0.05) : 1 / 60
      lastT.current = t

      const target = targetRef.current
      const dist = target - progressRef.current
      let v: number

      if (Math.abs(dist) < SETTLE) {
        v = target
        raf.current = 0
        lastT.current = 0
      } else {
        v = progressRef.current + dist * (1 - Math.exp(-dt / tauRef.current))
        raf.current = requestAnimationFrame(frame)
      }

      progressRef.current = v
      paint(v)
      sync(v)
    }

    /* zerado pra que o primeiro quadro não calcule um dt gigante contra
       o timestamp de quando o laço parou */
    lastT.current = 0
    raf.current = requestAnimationFrame(frame)
  }, [paint, sync])

  /* input só mexe no alvo; quem desenha é o laço */
  const commit = useCallback(
    (raw: number) => {
      const next = clamp01(raw)
      if (next === targetRef.current) return
      targetRef.current = next
      if (!raf.current) start()
    },
    [start]
  )

  /* o React só pinta o quadro de v = 0 (o mesmo do servidor); qualquer
     render posterior desfaria o que o paint escreveu, então repintamos
     antes de o browser desenhar. Sem lista de dependências de
     propósito: vale pra TODO render, venha ele de onde vier. */
  useIsoLayoutEffect(() => {
    /* os beats são renderizados uma vez e nunca mudam, então cachear a
       lista aqui evita andar no DOM a cada quadro */
    const box = beatsRef.current
    if (box) beatEls.current = Array.from(box.children) as HTMLElement[]
    paint(staticRef.current ? 1 : progressRef.current)
  })

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  /* qual das três mecânicas usar.
     Desktop exige ponteiro fino E largura: um tablet tem largura de
     desktop mas não tem roda — cair no modo 'wheel' ali prenderia a
     página no topo pra sempre, já que nada faria o progresso andar. */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const wide = window.matchMedia('(min-width: 768px)')

    const pick = () => {
      const next: Mode = reduce.matches
        ? 'static'
        : fine.matches && wide.matches
          ? 'wheel'
          : 'touch'
      staticRef.current = next === 'static'
      narrowRef.current = !wide.matches
      tauRef.current = next === 'touch' ? TAU.touch : TAU.wheel
      measure()
      if (next === 'static') {
        targetRef.current = 1
        progressRef.current = 1
        expandedRef.current = true
        contentRef.current = true
        setExpanded(true)
        setShowContent(true)
      }
      paint(staticRef.current ? 1 : progressRef.current)
      setMode(next)
    }
    pick()

    /* o teto da mídia é medido contra a viewport, então redimensionar a
       janela (ou girar o aparelho, ou a barra do navegador móvel
       recolher) muda o tamanho final */
    const onResize = () => {
      measure()
      paint(staticRef.current ? 1 : progressRef.current)
    }

    const mqs = [reduce, fine, wide]
    mqs.forEach(m => m.addEventListener('change', pick))
    window.addEventListener('resize', onResize)
    return () => {
      mqs.forEach(m => m.removeEventListener('change', pick))
      window.removeEventListener('resize', onResize)
    }
  }, [paint, measure])

  /* ── desktop: roda intercepta, página travada até abrir ────────── */
  useEffect(() => {
    if (mode !== 'wheel') return

    /* deltaY em pixels, venha ele como pixel, linha ou página, e com
       teto pra que um único evento não vire um salto */
    const step = (e: WheelEvent) => {
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      const px = e.deltaY * unit
      const capped = px < -WHEEL_MAX_STEP ? -WHEEL_MAX_STEP
        : px > WHEEL_MAX_STEP ? WHEEL_MAX_STEP
          : px
      return capped * WHEEL_GAIN
    }

    const onWheel = (e: WheelEvent) => {
      if (expandedRef.current) {
        /* já aberto: só volta a recolher se o usuário insistir pra cima
           com a página no topo */
        if (e.deltaY < 0 && window.scrollY <= 5) {
          e.preventDefault()
          commit(targetRef.current + step(e))
        }
        return
      }
      e.preventDefault()
      /* soma no ALVO, não no pintado: somar no pintado faria cada evento
         partir de onde a animação ainda está, e o curso encolheria
         sozinho quanto mais rápido o gesto — o hero abriria em passos
         cada vez menores */
      commit(targetRef.current + step(e))
    }

    /* sem isto o lock abaixo prenderia quem navega por teclado: a roda
       é o único jeito de avançar, e PageDown não gera evento de wheel */
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' '
      const up = e.key === 'ArrowUp' || e.key === 'PageUp'
      if (!down && !up) return
      if (expandedRef.current && !(up && window.scrollY <= 5)) return
      e.preventDefault()
      commit(targetRef.current + (down ? KEY_STEP : -KEY_STEP))
    }

    /* o lock em si: barra de rolagem, âncoras e a restauração de scroll
       do browser também tentam sair do topo antes da hora */
    const onScroll = () => {
      if (!expandedRef.current && window.scrollY > 0) window.scrollTo(0, 0)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [mode, commit])

  /* ── toque: scroll nativo, listener passivo, zero preventDefault ── */
  useEffect(() => {
    if (mode !== 'touch') return
    const read = () => commit(window.scrollY / (window.innerHeight * TOUCH_TRACK))
    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [mode, commit])

  const words = title ? title.trim().split(/\s+/) : []
  const head = words[0] ?? ''
  const tail = words.slice(1).join(' ')

  return (
    <section className="seh" data-mode={mode} data-expanded={expanded ? '' : undefined}>
      <div
        className="seh-track"
        style={
          mode === 'touch'
            ? { height: `calc(100dvh + ${TOUCH_TRACK * 100}dvh)` }
            : undefined
        }
      >
        <div className="seh-stage">
          {/* o fundo, que some conforme a mídia toma a tela */}
          <div
            ref={bgRef}
            className="seh-bg"
            style={bgImageSrc ? { backgroundImage: `url(${bgImageSrc})` } : undefined}
            aria-hidden="true"
          />

          {/* o halo, atrás da mídia: é ele que faz o cartão parecer uma
              fonte de luz no escuro em vez de um retângulo parado */}
          <div ref={bloomRef} className="seh-bloom" aria-hidden="true">
            <span className="seh-bloom__i" />
          </div>

          {/* a mídia que cresce */}
          <div ref={mediaRef} className="seh-media" style={{ width: W0, height: H0 }}>
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                tabIndex={-1}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mediaSrc} alt={title ?? ''} />
            )}
            {/* véu: clareia junto com a mídia, pra ela ganhar presença */}
            <div ref={veilRef} className="seh-veil" style={{ opacity: 0.7 }} aria-hidden="true" />
          </div>

          {/* as duas metades do título abrem pros lados e dão passagem
              pra mídia que cresce entre elas */}
          <div className={`seh-copy${textBlend ? ' seh-copy--blend' : ''}`}>
            {/* O cubo da marca. z-index acima do título de propósito: a
                placa cresce do centro e cobre a costura onde o h1 se
                parte, o que faz a abertura parecer causada por ela.
                aria-hidden porque é o logo, já nomeado pela navbar. */}
            <div ref={cubeRef} className="seh-cube" aria-hidden="true">
              <div ref={plateRef} className="seh-cube__plate">
                <span className="seh-cube__shine" />
              </div>
              <svg className="seh-cube__svg" viewBox="-72 -80 144 176">
                {/* os três tons de branco (1 / .85 / .55) são a
                    linguagem de sombreamento da marca — vão no
                    fill-opacity pra que a entrada, que mexe no opacity,
                    não precise saber o tom de cada face */}
                <rect
                  ref={barRef}
                  className="seh-cube__bar"
                  x="-34" y="76" width="68" height="8" rx="4"
                  fill="#fff" fillOpacity=".6"
                />
                <path ref={fLeftRef} className="seh-cube__f" d="M-52,-30 L0,0 L0,64 L-52,34 Z" fill="#fff" fillOpacity=".55" />
                <path ref={fRightRef} className="seh-cube__f" d="M0,0 L52,-30 L52,34 L0,64 Z" fill="#fff" fillOpacity=".85" />
                <path ref={fTopRef} className="seh-cube__f" d="M0,-60 L52,-30 L0,0 L-52,-30 Z" fill="#fff" />
              </svg>
              <span ref={ringRef} className="seh-cube__ring" />
            </div>

            <div className="seh-headline">
              <h1 className="seh-title">
                <span ref={headRef} className="seh-title__a">{head}</span>
                {tail && <span ref={tailRef} className="seh-title__b">{tail}</span>}
              </h1>

              {/* Os beats herdam exatamente o centro que as metades do
                  título abandonam. Ficam SEMPRE no DOM, na ordem de
                  leitura: opacity 0 não tira o elemento da árvore de
                  acessibilidade (ao contrário de visibility/display),
                  então um leitor de tela ouve os três de uma vez — que
                  é o texto certo, já que juntos eles são o parágrafo
                  de posicionamento do site. */}
              {beats && (
                <div ref={beatsRef} className="seh-beats">
                  {beats}
                </div>
              )}
            </div>

            {date && <p ref={dateRef} className="seh-date">{date}</p>}
            {scrollToExpand && mode !== 'static' && (
              <p ref={cueRef} className="seh-cue">
                <span className="seh-cue__ln" aria-hidden="true" />
                {scrollToExpand}
              </p>
            )}
          </div>

          {/* Os CTAs entram no PALCO, não depois dele: assim a coluna
              inteira — cubo, texto, botões — é uma composição só e a
              faixa deles reserva altura desde v=0, sem refluir quando
              acende. Irmão de .seh-copy, não filho: se textBlend for
              ligado um dia, mix-blend-mode: difference pegaria o grupo
              todo e um filho não tem como se excluir. */}
          <motion.div
            className="seh-content"
            initial={false}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 14 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            /* inert, não só aria-hidden: aria-hidden num elemento
               focável é violação de conformance e prende o teclado nos
               dois links aqui dentro */
            inert={!showContent}
            aria-hidden={showContent ? undefined : true}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
