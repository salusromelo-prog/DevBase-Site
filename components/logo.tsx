type LogoSize = 'sm' | 'md'

export default function Logo({ size = 'md' }: { size?: LogoSize }) {
  return (
    <span className={`logo${size === 'sm' ? ' logo-sm' : ''}`} aria-label="dev/base">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none">
          <rect className="lm-plate" width="64" height="64" rx="12" fill="#6366f1" />
          <path className="lm-face lm-top" d="M32 12 L50 22 L32 32 L14 22 Z" fill="#fff" />
          <path className="lm-face lm-left" d="M14 22 L32 32 L32 50 L14 40 Z" fill="#fff" opacity=".85" />
          <path className="lm-face lm-right" d="M50 22 L32 32 L32 50 L50 40 Z" fill="#fff" opacity=".55" />
          <line className="lm-rule" x1="12" y1="55" x2="52" y2="55" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" />
        </svg>
      </span>
      <span className="logo-text">
        dev<span className="s">/</span>base
      </span>
    </span>
  )
}
