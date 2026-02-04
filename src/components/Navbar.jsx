import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" aria-label="Farmart home">
          FarMart
        </Link>
      </div>
      <nav className="navbar__links" aria-label="Primary">
        <a href="#home">Home</a>
        <a href="#about">About us</a>
        <a href="#contact">Contact us</a>
        <a href="#services">Services</a>
      </nav>
      <div className="navbar__actions">
        <Link className="btn btn--ghost" to="/auth">Login</Link>
      </div>
    </header>
  )
}
