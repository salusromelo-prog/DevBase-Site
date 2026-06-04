const POS: Record<string, string> = {
  tl: 'top left',
  tr: 'top right',
  bl: 'bottom left',
  br: 'bottom right',
  center: 'center',
}

export default function AccentBleed({
  corner = 'tr',
  size = 60,
  intensity = 0.16,
}: {
  corner?: 'tl' | 'tr' | 'bl' | 'br' | 'center'
  size?: number
  intensity?: number
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `radial-gradient(ellipse ${size}% ${size}% at ${POS[corner]}, var(--accent), transparent)`,
        opacity: intensity,
      }}
    />
  )
}
