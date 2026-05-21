import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Nav from '@/components/nav'
import FxLayer from '@/components/fx-layer'
import SmoothScroll from '@/app/providers/SmoothScroll'

const inter = localFont({
  src: [
    { path: '../public/fonts/inter-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/inter-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/inter-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

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
    'DevBase constrói ferramentas para desenvolvedores brasileiros: boilerplate SaaS pronto e job board com salário obrigatório.',
  metadataBase: new URL('https://devbase.tools'),
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
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScroll>
          <FxLayer />
          <Nav />
          <main className="page-transition">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  )
}
