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
            <p>Ferramentas para desenvolvedores brasileiros. Feito em Goiânia, pro Brasil inteiro.</p>
            <div className="foot-soc">
              <a href="#" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
              <a href="#" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Produtos</h4>
            <Link href="/produtos">100 Micro SaaS</Link>
            <Link href="/produtos">Boilerplate</Link>
            <Link href="/produtos">Components</Link>
            <Link href="/jobs">Jobs</Link>
          </div>
          <div className="foot-col">
            <h4>Empresa</h4>
            <Link href="/empresa">Quem somos</Link>
            <Link href="/empresa#manifesto">Manifesto</Link>
            <Link href="/empresa#time">O time</Link>
          </div>
          <div className="foot-col">
            <h4>Recursos</h4>
            <a href="#">Documentação</a>
            <a href="#">Contato</a>
            <a href="#">Garantia</a>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2025 dev/base · Goiânia, GO</span>
          <span>Feito por devs BR, pra devs BR 🇧🇷</span>
        </div>
      </div>
    </footer>
  )
}
