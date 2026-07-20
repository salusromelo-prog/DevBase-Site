import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Fraunces } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ScrollFx from '@/components/scroll-fx'
import CursorFx from '@/components/cursor-fx'
import { ENTRADA_VARIANTE } from '@/lib/config'

const jetbrainsMono = localFont({
  src: [
    { path: '../public/fonts/jb-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/jb-mono-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/jb-mono-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/jb-mono-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  title: 'DevBase — Construa. Lance. Cresça.',
  description:
    'Empresa brasileira de tecnologia. Produtos para desenvolvedores e sites profissionais para empresas. Feito em Goiânia, para o Brasil.',
  metadataBase: new URL('https://www.devbase.tools'),
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'DevBase — Construa. Lance. Cresça.',
    description: 'Empresa brasileira de tecnologia. Produtos para desenvolvedores e sites profissionais para empresas. Feito em Goiânia, para o Brasil.',
    locale: 'pt_BR',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: o script do <head> escreve a marca da entrada
       (db-splash / db-entering) no className do <html> antes do primeiro paint,
       então o servidor e o cliente divergem de propósito nesse atributo. React
       não desfaz a mudança — só reclamaria no console. */
    <html
      lang="pt-BR"
      className={`${jetbrainsMono.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        {/* Entrada assinatura: decide ANTES do primeiro paint se a home anima,
            e em qual variante. Só marca o <html> e escuta o skip; quem anima
            e quem remove o overlay é o CSS. Qualquer falha aqui (JS bloqueado,
            sessionStorage negado) cai no site já montado — nunca no invisível,
            nunca preso atrás do splash. Os timeouts são o kill switch. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname!=="/")return;if(sessionStorage.getItem("db_entered"))return;sessionStorage.setItem("db_entered","1");if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.documentElement;if(${JSON.stringify(ENTRADA_VARIANTE)}==="A"){d.classList.add("db-splash");var evs=["pointerdown","keydown","touchstart"],skip=function(){d.classList.add("db-skip");evs.forEach(function(e){document.removeEventListener(e,skip,true)})};evs.forEach(function(e){document.addEventListener(e,skip,{passive:true,capture:true})});setTimeout(function(){d.classList.remove("db-splash","db-skip")},2000)}else{d.classList.add("db-entering");setTimeout(function(){d.classList.remove("db-entering")},2600)}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <CursorFx />
        <ScrollFx />
      </body>
    </html>
  )
}
