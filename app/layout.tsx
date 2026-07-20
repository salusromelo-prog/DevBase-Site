import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Fraunces } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ScrollFx from '@/components/scroll-fx'
import CursorFx from '@/components/cursor-fx'

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
    <html lang="pt-BR" className={`${jetbrainsMono.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        {/* Entrada assinatura: decide ANTES do primeiro paint se a home anima.
            Só marca; quem anima é o CSS. Qualquer falha aqui (JS bloqueado,
            sessionStorage negado) cai no site já montado — nunca no invisível.
            O timeout é a rede de segurança: passado o tempo da coreografia a
            marca sai, e nada mais pode segurar conteúdo escondido. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname!=="/")return;if(sessionStorage.getItem("db_entered"))return;sessionStorage.setItem("db_entered","1");var d=document.documentElement;d.classList.add("db-entering");setTimeout(function(){d.classList.remove("db-entering")},2600)}catch(e){}})()`,
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
