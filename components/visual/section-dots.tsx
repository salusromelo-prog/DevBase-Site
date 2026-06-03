export default function SectionDots({
  density = 28,
  tone = 'light',
  fade = true,
}: {
  density?: number
  tone?: 'light' | 'dark'
  fade?: boolean
}) {
  const dotColor =
    tone === 'dark' ? 'rgba(244,243,251,0.07)' : 'rgba(13,13,18,0.07)'
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: `${density}px ${density}px`,
        ...(fade
          ? {
              maskImage:
                'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            }
          : {}),
      }}
    />
  )
}
