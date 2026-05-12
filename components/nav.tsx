'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './logo'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link href="/" aria-label="dev/base">
          <Logo size="md" />
        </Link>
        <div className="nav-links">
          <Link
            href="/produtos"
            className={`nav-link${pathname === '/produtos' ? ' active' : ''}`}
          >
            Produtos
          </Link>
          <Link
            href="/sobre"
            className={`nav-link${pathname === '/sobre' ? ' active' : ''}`}
          >
            Sobre
          </Link>
        </div>
        <div className="nav-cta">
          <a
            href="https://devbase.jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            DevBase Jobs
          </a>
          <Link href="/produtos" className="btn btn-primary">
            Ver produtos <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
