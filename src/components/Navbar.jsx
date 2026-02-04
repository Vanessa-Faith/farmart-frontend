import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav style={{padding:10, borderBottom:'1px solid #eee', display:'flex', gap:12}}>
      <Link to="/">Home</Link>
      <Link to="/animals">Animals</Link>
      <Link to="/farmers">Farmers</Link>
      <Link to="/auth">Login</Link>
    </nav>
  )
}
