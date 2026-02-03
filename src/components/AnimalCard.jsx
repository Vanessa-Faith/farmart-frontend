export default function AnimalCard({animal}){
  return (
    <article style={{border:'1px solid #ddd', padding:10, margin:8}}>
      <h3>{animal.name}</h3>
      <p>Breed: {animal.breed}</p>
      <p>Age: {animal.age}</p>
    </article>
  )
}
