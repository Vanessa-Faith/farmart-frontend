import { useSelector } from 'react-redux'

export default function Animals(){
  const animals = useSelector(state => state.animals.items)

  return (
    <main style={{padding:20}}>
      <h1>Animals</h1>
      <p>List of animals (placeholder).</p>
      <ul>
        {animals.length === 0 && <li>No animals yet</li>}
        {animals.map(a => (
          <li key={a.id}>{a.name} — {a.breed}</li>
        ))}
      </ul>
    </main>
  )
}
