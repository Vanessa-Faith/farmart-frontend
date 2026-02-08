import React from 'react';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const subtotal = item.price_per_unit * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 sm:p-6 rounded-xl shadow border border-gray-200 mb-6">
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

      <div className="w-full sm:w-auto text-right">
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="px-4 py-2 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50 transition"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-6 py-2 bg-gray-100 border-t border-b font-medium min-w-[60px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>

        <p className="font-semibold text-lg mb-3">
          Subtotal: KES {subtotal.toLocaleString()}
        </p>

        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-800 font-medium text-base underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;