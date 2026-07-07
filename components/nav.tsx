'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from './logo'

const HIDDEN_ROUTES = ['/microsaas', '/acesso']

/* rotas claras do topo ao fim — tema inicial antes da 1ª medição no cliente */
const LIGHT_ROUTES = ['/empresas', '/obrigado']

/* blocos de registro dark — a navbar sonda o que está sob ela a cada scroll */
const DARK_BLOCKS = '.hero, .phead, .sec-dark, .who, .page-dark, .biz-band, .footer'

const LINKS = [
  { label: 'Produtos', href: '/produtos', key: 'produtos' },
  { label: 'Para empresas', href: '/empresas', key: 'empresas' },
  { label: 'Sobre', href: '/sobre', key: 'sobre' },
]

export default function Nav() {
  const pathname = usePathname()
  const lightRoute = LIGHT_ROUTES.some(r => pathname.startsWith(r))
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(lightRoute ? 'light' : 'dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>(DARK_BLOCKS))
    let raf = 0

    function measure() {
      raf = 0
      const probe = 36 // meio da navbar
      let dark = false
      for (const b of blocks) {
        const r = b.getBoundingClientRect()
        if (r.height > 0 && r.top <= probe && r.bottom >= probe) { dark = true; break }
      }
      setTheme(dark ? 'dark' : 'light')
      setScrolled((window.scrollY || document.documentElement.scrollTop) > 8)
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    measure()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (HIDDEN_ROUTES.some(r => pathname.startsWith(r))) return null

  return (
    <>
      <nav className={`nav ${theme}${scrolled ? ' scrolled' : ''}`}>
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
