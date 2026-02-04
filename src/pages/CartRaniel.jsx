// src/pages/CartRaniel.jsx
import React, { useState } from 'react';

// Mock cart items (later from Redux + backend)
const mockCartItems = [
  {
    id: 1,
    title: 'Holstein Cow',
    breed: 'Dairy',
    age_months: 30,
    price_per_unit: 165000,
    quantity: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY8Tq28l1gLj0Dxrv1VYsL6CyXTK-_3yEXYA&s',
  },
  {
    id: 2,
    title: 'Boer Goat',
    breed: 'Meat',
    age_months: 14,
    price_per_unit: 48000,
    quantity: 2,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZIAZvhLN5SjwMTD3uJqXsPSKTBXSpEfly7g&s',
  },
  {
    id: 3,
    title: 'Dorper Sheep',
    breed: 'Meat',
    age_months: 10,
    price_per_unit: 35000,
    quantity: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSub2VSmsZcC9nH93kRFOTZHYSZqgjmqipTw&s',
  },
];

function CartRaniel() {
  const [items, setItems] = useState(mockCartItems);

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const total = items.reduce((sum, item) => sum + item.price_per_unit * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-gray-600 mb-4">Your cart is empty</p>
            <p className="text-lg text-gray-500">
              Browse farm animals and add some to your cart!
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-6">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200"
                >
                  {/* Image + Details */}
                  <div className="flex items-center flex-1 mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mr-4 sm:mr-6"
                    />
                    <div>
                      <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                        {item.title} ({item.breed})
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Age: {item.age_months} months
                      </p>
                      <p className="font-bold text-green-700 mt-2">
                        KES {item.price_per_unit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Controls + Subtotal */}
                  <div className="w-full sm:w-auto text-right">
                    <div className="flex items-center justify-end mb-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-4 py-2 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-6 py-2 bg-gray-100 border-t border-b font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold text-lg">
                      Subtotal: KES {(item.price_per_unit * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Checkout */}
            <div className="mt-10 p-6 bg-white rounded-xl shadow border border-gray-200">
              <div className="flex justify-between items-center text-xl sm:text-2xl font-bold">
                <span>Cart Total</span>
                <span className="text-green-700">KES {total.toLocaleString()}</span>
              </div>
              <button className="mt-6 w-full bg-green-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartRaniel;