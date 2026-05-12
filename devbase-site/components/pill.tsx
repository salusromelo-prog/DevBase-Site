export default function Pill({ children, withDot = true }: { children: React.ReactNode; withDot?: boolean }) {
  return (
    <span className="pill">
      {withDot && <span className="dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
