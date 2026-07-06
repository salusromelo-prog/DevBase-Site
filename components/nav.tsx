'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from './logo'

const HIDDEN_ROUTES = ['/microsaas', '/acesso']

/* rotas de registro claro — o wordmark precisa escurecer sobre elas */
const LIGHT_ROUTES = ['/empresas']

const LINKS = [
  { label: 'Produtos', href: '/produtos', key: 'produtos' },
  { label: 'Para empresas', href: '/empresas', key: 'empresas' },
  { label: 'Sobre', href: '/sobre', key: 'sobre' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop
      setScrolled(isHome ? y > window.innerHeight - 120 : y > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (HIDDEN_ROUTES.some(r => pathname.startsWith(r))) return null

  const light = LIGHT_ROUTES.some(r => pathname.startsWith(r))
  const dark = !light && !scrolled

  return (
    <>
      <nav className={`nav${dark ? ' dark' : ''}${light ? ' light' : ''}${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap wrap-wide">
          <Link href="/" aria-label="dev/base">
            <Logo size="md" />
          </Link>
          <div className="nav-mid">
            {LINKS.map(l => (
              <Link
                key={l.key}
                href={l.href}
                className={`nav-link${pathname === l.href ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="nav-cta">
            <Link href="/produtos" className="btn btn-primary btn-sm">
              Ver produtos <span className="arr">→</span>
            </Link>
            <button
              className="nav-toggle"
              aria-label="menu"
              onClick={() => setMenuOpen(o => !o)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {LINKS.map(l => (
          <Link key={l.key} href={l.href}>{l.label}</Link>
        ))}
        <Link href="/produtos" className="btn btn-primary">
          Ver produtos →
        </Link>
      </div>
    </>
  )
}
