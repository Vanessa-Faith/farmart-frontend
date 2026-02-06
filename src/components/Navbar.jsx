import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { toggleCart, selectCartItemCount } from '../features/cart/cartSlice'
import { FiShoppingCart, FiHelpCircle, FiLogOut, FiHome, FiList, FiPackage } from 'react-icons/fi'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.auth)
  const cartItemCount = useSelector(selectCartItemCount)

  const isFarmer = user?.role === 'farmer'
  const isBuyer = user?.role === 'buyer'

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U'
    return name.charAt(0).toLowerCase()
  }

  return (
    <header className="navbar">
      <div className="navbar__left">
        {token && user && (
          <div className="navbar__user-avatar">
            <span className={`avatar ${isFarmer ? 'avatar--farmer' : ''}`}>
              {getInitials(user.name)}
            </span>
          </div>
        )}
        <div className="navbar__brand">
          <Link to="/" aria-label="Farmart home">
            <span className="brand-name">Farmart</span>
            {token && user && (
              <span className="brand-username">{user.name || user.email}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Navigation Links - Role Based */}
      {token && (
        <nav className="navbar__nav">
          {isFarmer ? (
            <>
              <Link to="/farmer/dashboard" className="nav-link">
                <FiHome size={18} />
                <span>Dashboard</span>
              </Link>
              <Link to="/farmer/orders" className="nav-link">
                <FiPackage size={18} />
                <span>Orders</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/animals" className="nav-link">
                <FiList size={18} />
                <span>Browse Animals</span>
              </Link>
              <Link to="/orders" className="nav-link">
                <FiPackage size={18} />
                <span>My Orders</span>
              </Link>
            </>
          )}
        </nav>
      )}

      <div className="navbar__actions">
        <button className="navbar__btn navbar__btn--help">
          <FiHelpCircle size={18} />
          <span>Help</span>
        </button>

        {token ? (
          <>
            {/* Only show cart for buyers */}
            {isBuyer && (
              <button className="navbar__btn navbar__btn--cart" onClick={handleCartClick}>
                <FiShoppingCart size={18} />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </button>
            )}
            <button className="navbar__btn navbar__btn--logout" onClick={handleLogout}>
              <FiLogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link className="navbar__btn" to="/login">Login</Link>
            <Link className="navbar__btn navbar__btn--primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
