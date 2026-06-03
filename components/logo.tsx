type LogoSize = 'sm' | 'md'

export default function Logo({ size = 'md' }: { size?: LogoSize }) {
  return (
    <span className={`logo${size === 'sm' ? ' logo-sm' : ''}`} aria-label="dev/base">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="12" fill="#6366f1" />
          <path d="M32 12 L50 22 L32 32 L14 22 Z" fill="#fff" />
          <path d="M14 22 L32 32 L32 50 L14 40 Z" fill="#fff" opacity=".85" />
          <path d="M50 22 L32 32 L32 50 L50 40 Z" fill="#fff" opacity=".55" />
          <line x1="12" y1="55" x2="52" y2="55" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" />
        </svg>
      </span>
      <span className="logo-text">
        dev<span className="s">/</span>base
      </span>
    </span>
  )
}
