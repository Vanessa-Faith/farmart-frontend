import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" aria-label="Farmart home">
          🌿 FarMart
        </Link>
      </div>
      <nav className="navbar__links" aria-label="Primary">
        <Link to="/">Home</Link>
        <Link to="/animals">Animals</Link>
        {token && user?.role === 'farmer' && (
          <Link to="/farmer/dashboard">Dashboard</Link>
        )}
      </nav>
      <div className="navbar__actions">
        {token ? (
          <>
            <span className="navbar__user">Hi, {user?.name || 'User'}</span>
            <button className="btn btn--ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn--ghost" to="/login">Login</Link>
            <Link className="btn btn--primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
