import CubeMark from './cube-mark'

type LogoSize = 'sm' | 'md'

export default function Logo({ size = 'md' }: { size?: LogoSize }) {
  return (
    <span className={`logo${size === 'sm' ? ' logo-sm' : ''}`} aria-label="dev/base">
      <span className="logo-mark" aria-hidden="true">
        <CubeMark />
      </span>
      <span className="logo-text">
        dev<span className="s">/</span>base
      </span>
    </span>
  )
}
