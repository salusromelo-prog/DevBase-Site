/* O cubo isométrico — fonte única, usada pelo logo da navbar e pelo
   splash. As faces são paths separados de propósito: as duas variantes
   de entrada animam cada uma por conta própria (.lm-top/.lm-left/
   .lm-right), com a mesma mecânica em escalas diferentes. */
export default function CubeMark() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <rect className="lm-plate" width="64" height="64" rx="12" fill="#6366f1" />
      <path className="lm-face lm-top" d="M32 12 L50 22 L32 32 L14 22 Z" fill="#fff" />
      <path className="lm-face lm-left" d="M14 22 L32 32 L32 50 L14 40 Z" fill="#fff" opacity=".85" />
      <path className="lm-face lm-right" d="M50 22 L32 32 L32 50 L50 40 Z" fill="#fff" opacity=".55" />
      <line className="lm-rule" x1="12" y1="55" x2="52" y2="55" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" />
    </svg>
  )
}
