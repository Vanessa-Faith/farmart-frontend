import React, { useState } from 'react';

// Mock cart items (you can keep or change images/animals as needed)
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

  const total = items.reduce((sum, item) => sum + item.price_per_unit * item.quantity, 0);

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
      setItems([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with cart count and clear button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Your Shopping Cart {items.length > 0 && `(${items.length})`}
          </h1>

          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="mt-4 sm:mt-0 text-red-600 hover:text-red-800 font-medium text-lg"
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
              onClick={() => window.location.href = '/animals'}
              className="bg-green-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="space-y-6 mb-12">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200"
                >
                  {/* Image + Details */}
                  <div className="flex items-center flex-1 mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mr-4 sm:mr-6 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                        {item.title} ({item.breed})
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Age: {item.age_months} months
                      </p>
                      <p className="font-bold text-green-700 mt-2 text-lg">
                        KES {item.price_per_unit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Subtotal + Remove */}
                  <div className="w-full sm:w-auto text-right">
                    <div className="flex items-center justify-end mb-4">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-4 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300 disabled:opacity-50 transition"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-6 py-2 bg-gray-100 border-t border-b font-medium min-w-[60px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-4 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold text-lg mb-3">
                      Subtotal: KES {(item.price_per_unit * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-base underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary & Checkout */}
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
                onClick={() => alert('Going to checkout... (next step coming soon)')}
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

export default CartRaniel;