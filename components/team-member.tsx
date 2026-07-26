export default function TeamMember({
  initials,
  name,
  role,
  sig,
}: {
  initials: string
  name: string
  role: string
  sig?: string
}) {
  return (
    <div className="member">
      <div className="av">{initials}</div>
      <div className="nm">{name}</div>
      <div className="rl">{role}</div>
      {sig && <div className="sig">{sig}</div>}
    </div>
  )
}
