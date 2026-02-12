import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { kenyanCounties } from '../utils/countiesRaniel'
import { createOrder, payOrder, clearCurrentOrder } from '../features/orders/ordersSlice'
import { clearCart } from '../features/cart/cartSlice'

function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const { loading, error } = useSelector((state) => state.orders)

  const [phone, setPhone] = useState('')
  const [county, setCounty] = useState('')
  const [success, setSuccess] = useState(false)
  const [localError, setLocalError] = useState(null)

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePay = async (e) => {
    e.preventDefault()
    setLocalError(null)

    if (!phone || !county) {
      setLocalError('Please fill in phone number and county')
      return
    }

    if (cartItems.length === 0) {
      setLocalError('Your cart is empty')
      return
    }

    try {
      // Step 1: Create order from cart
      const orderResult = await dispatch(createOrder()).unwrap()
      
      // Step 2: Pay for the order
      await dispatch(payOrder({
        orderId: orderResult.id,
        paymentDetails: { provider: 'mock', phone, county }
      })).unwrap()

      // Step 3: Clear cart on success
      dispatch(clearCart())
      setSuccess(true)
    } catch (err) {
      setLocalError(typeof err === 'string' ? err : err?.message || 'Payment failed. Please try again.')
    }
  }

  const handleBackToCart = () => {
    dispatch(clearCurrentOrder())
    navigate('/cart')
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <h1 className="text-4xl font-bold text-green-600 mb-6">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-700 mb-8">
            Thank you for your purchase. Your farm animals are on the way!
          </p>
          <p className="text-gray-600 mb-6">
            Delivery to: <strong>{county}</strong><br />
            Contact: <strong>{phone}</strong>
          </p>
          <button
            onClick={handleBackToCart}
            className="bg-green-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
          Checkout
        </h1>
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow border border-gray-200 mb-10">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center">
                    <img
                      src={item.image || 'https://via.placeholder.com/64x64?text=Animal'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-medium">{item.name} ({item.breed})</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-green-700">KES {total.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>

          <form onSubmit={handlePay} className="space-y-6">
            {(localError || error) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {localError || (typeof error === 'string' ? error : error?.message || 'An error occurred')}
              </div>
            )}

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +254712345678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-1">
                County *
              </label>
              <select
                id="county"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
                disabled={loading}
              >
                <option value="">Select your county</option>
                {kenyanCounties.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full bg-green-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-green-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay Now (KES ${total.toLocaleString()})`}
            </button>
          </form>

          <button
            onClick={handleBackToCart}
            disabled={loading}
            className="mt-6 w-full bg-gray-200 text-gray-800 py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-300 transition disabled:opacity-50"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout