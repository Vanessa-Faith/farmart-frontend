import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeItem,
  updateQuantity,
  clearCart,
} from '../features/cart/cartSlice';
import CartItem from '../components/CartItem';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.Cart.items);

  const total = items.reduce((sum, item) => sum + item.price_per_unit * item.quantity, 0);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-0">
            Your Shopping Cart {items.length > 0 && `(${items.length} items)`}
          </h1>

          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800 font-medium text-lg underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-200">
            <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">
              Your cart is empty
            </p>
            <p className="text-lg text-gray-500 mb-8">
              Looks like you haven't added any farm animals yet.
            </p>
            <button
              onClick={() => navigate('/animals')}
              className="bg-green-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-12">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>

            <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  Cart Total
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-green-700 mt-2 sm:mt-0">
                  KES {total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-green-600 text-white py-4 px-10 rounded-xl font-semibold text-lg hover:bg-green-700 transition shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;