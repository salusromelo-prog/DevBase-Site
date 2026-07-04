export default function TeamMember({
  initials,
  name,
  role,
}: {
  initials: string
  name: string
  role: string
}) {
  return (
    <div className="member">
      <div className="av">{initials}</div>
      <div className="nm">{name}</div>
      <div className="rl">{role}</div>
    </div>
  )
}
