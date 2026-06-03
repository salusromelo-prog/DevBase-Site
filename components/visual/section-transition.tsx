export default function SectionTransition({ chevron = true }: { chevron?: boolean }) {
  return (
    <div className="sec-trans" aria-hidden="true">
      <span className="sec-trans__glow reveal" />
      {chevron && <span className="sec-trans__chevron" />}
    </div>
  )
}
