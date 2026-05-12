import Link from 'next/link'
import Logo from './logo'

export default function Footer() {
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
