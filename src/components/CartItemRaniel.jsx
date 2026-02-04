// src/components/CartItemRaniel.jsx
import React from 'react';

const CartItemRaniel = ({ item, onRemove, onQuantityChange }) => {
  const subtotal = item.price_per_unit * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200 mb-6">
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

      {/* Quantity Controls + Subtotal + Remove */}
      <div className="w-full sm:w-auto text-right">
        <div className="flex items-center justify-end mb-3">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="px-4 py-2 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-6 py-2 bg-gray-100 border-t border-b font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <p className="font-semibold text-lg">
          Subtotal: KES {subtotal.toLocaleString()}
        </p>

        <button
          onClick={() => onRemove(item.id)}
          className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemRaniel;