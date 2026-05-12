export default function ValueCard({
  num,
  title,
  desc,
}: {
  num: string
  title: string
  desc: string
}) {
  return (
    <div className="value">
      <div className="num">{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}
