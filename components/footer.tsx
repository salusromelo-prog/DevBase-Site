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
      <div className="wrap wrap-wide">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" aria-label="dev/base">
              <Logo size="sm" />
            </Link>
            <p>Empresa brasileira de tecnologia. Produtos para devs e sites para empresas. Feito em Goiânia, pro Brasil inteiro.</p>
          </div>
          <div className="foot-col">
            <h4>Produtos</h4>
            <Link href="/produto/micro-saas">100 Micro SaaS</Link>
            <Link href="/produto/boilerplate">Boilerplate</Link>
            <Link href="/produto/components">Components</Link>
            <Link href="/produto/combo">Combo</Link>
          </div>
          <div className="foot-col">
            <h4>Empresa</h4>
            <Link href="/sobre">Quem somos</Link>
            <Link href="/empresas">Para empresas</Link>
            <a href="mailto:devbasebr@gmail.com">Contato</a>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2025 dev/base · Goiânia, GO</span>
          <span>Feito em Goiânia, para o Brasil 🇧🇷</span>
        </div>
      </div>
    </footer>
  )
}
