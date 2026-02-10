import { useSelector, useDispatch } from 'react-redux'
import { FiX, FiMinus, FiPlus } from 'react-icons/fi'
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  closeCart,
  updateQuantity,
  removeFromCart,
} from '../features/cart/cartSlice'

export default function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const isOpen = useSelector(selectIsCartOpen)

  const handleClose = () => {
    dispatch(closeCart())
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    alert('Proceeding to checkout...')
  }

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={handleClose}></div>
      <aside className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close" onClick={handleClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="cart-empty">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image || 'https://via.placeholder.com/80x80?text=Animal'}
                  alt={item.name}
                  className="cart-item__image"
                />
                <div className="cart-item__details">
                  <h4 className="cart-item__name">{item.name}</h4>
                  <p className="cart-item__type">
                    {item.animal_type} • {item.breed}
                  </p>
                  <p className="cart-item__price">${item.price} each</p>
                  <div className="cart-item__quantity">
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
                <div className="cart-item__total">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span className="cart-total__amount">${cartTotal.toLocaleString()}</span>
          </div>
          <button
            className="btn btn--checkout"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </>
  )
}
