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
      <div className="avatar">{initials}</div>
      <div className="name">{name}</div>
      <div className="role">{role}</div>
    </div>
  )
}
