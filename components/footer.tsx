'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './logo'

const HIDDEN_ROUTES = ['/microsaas', '/acesso']

export default function Footer() {
  const pathname = usePathname()

  if (HIDDEN_ROUTES.some(r => pathname.startsWith(r))) return null

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-left">
          <Logo size="sm" />
          <span>· feito no Brasil 🇧🇷</span>
        </div>
        <div className="footer-center">
          <Link href="/produtos">Produtos</Link>
          <a href="https://devbase.jobs" target="_blank" rel="noopener noreferrer">Jobs</a>
          <Link href="/sobre">Sobre</Link>
        </div>
        <div className="legal">© 2025 DevBase</div>
      </div>
    </footer>
  )
}
