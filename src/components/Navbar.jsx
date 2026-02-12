import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Helper to scroll to section on Home page
  const handleScrollToSection = (sectionId) => (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      // Wait for navigation, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" aria-label="Farmart home">
           FarMart
        </Link>
      </div>

      <nav className="navbar__links" aria-label="Primary">
        <Link to="/">Home</Link>
        <Link to="/animals">Animals</Link>
        <Link to="/about">About</Link>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/services">Services</Link>
        {token && user?.role === 'farmer' && (
          <Link to="/farmer/dashboard">Farmer Dashboard</Link>
        )}
      </nav>

      <div className="navbar__actions">
        {/* Cart icon + badge (your feature) */}
        <div style={{ position: 'relative', marginRight: '16px' }}>
          <Link
            to="/cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#333',
              fontSize: '1.4rem',
            }}
          >
            🛒
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  border: '1px solid white',
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>

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
  );
}