export default function SectionDots({
  density = 28,
  tone = 'light',
  fade = true,
  soft = false,
}: {
  density?: number
  tone?: 'light' | 'dark'
  fade?: boolean
  soft?: boolean
}) {
  const dotColor =
    tone === 'dark'
      ? 'rgba(244,243,251,0.08)'
      : soft
        ? 'rgba(13,13,18,0.10)'
        : 'rgba(13,13,18,0.14)'
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${dotColor} 1.2px, transparent 1.2px)`,
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
