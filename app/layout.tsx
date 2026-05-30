import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

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

export const metadata: Metadata = {
  title: 'DevBase — Ferramentas para devs brasileiros',
  description:
    'A DevBase constrói ferramentas para desenvolvedores brasileiros: boilerplate SaaS, componentes React BR, 100 ideias de micro SaaS e um job board com salário obrigatório. Feito em Goiânia.',
  metadataBase: new URL('https://www.devbase.tools'),
  openGraph: {
    title: 'DevBase',
    description: 'Ferramentas para devs brasileiros.',
    locale: 'pt_BR',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={jetbrainsMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
