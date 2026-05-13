import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// scale factor: 180 / 64 = 2.8125
const S = 2.8125

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 12 * S,
          background: '#6366f1',
          position: 'relative',
          display: 'flex',
        }}
      >
        {/* top face (diamond) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#ffffff',
            clipPath: `polygon(${32 * S}px ${12 * S}px, ${50 * S}px ${22 * S}px, ${32 * S}px ${32 * S}px, ${14 * S}px ${22 * S}px)`,
          }}
        />
        {/* left face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.85)',
            clipPath: `polygon(${14 * S}px ${22 * S}px, ${32 * S}px ${32 * S}px, ${32 * S}px ${50 * S}px, ${14 * S}px ${40 * S}px)`,
          }}
        />
        {/* right face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.55)',
            clipPath: `polygon(${50 * S}px ${22 * S}px, ${32 * S}px ${32 * S}px, ${32 * S}px ${50 * S}px, ${50 * S}px ${40 * S}px)`,
          }}
        />
        {/* bottom line */}
        <div
          style={{
            position: 'absolute',
            left: 12 * S,
            top: 55 * S - S,
            width: 40 * S,
            height: 2 * S,
            borderRadius: S,
            background: 'rgba(255,255,255,0.6)',
          }}
        />
      </div>
    ),
    { width: 180, height: 180 },
  )
}
