import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const items = useSelector((state) => state.Cart.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav
      style={{
        padding: 10,
        borderBottom: '1px solid #eee',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        backgroundColor: '#fff', 
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/animals">Animals</Link>
      <Link to="/farmers">Farmers</Link>
      <Link to="/auth">Login</Link>

      <div style={{ position: 'relative', marginLeft: 'auto' }}>
        <Link
          to="/cart-raniel"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#333',
            fontSize: '1.4rem',
            position: 'relative',
          }}
        >
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
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid white', 
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}