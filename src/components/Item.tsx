export function Item({
  text,
  deleteItems
}: {
  text: string
  deleteItems: () => void
}) {
  return (
    <li>
      <h3>{text}</h3>
      <button onClick={deleteItems}>Effacer</button>
    </li>
  )
}
