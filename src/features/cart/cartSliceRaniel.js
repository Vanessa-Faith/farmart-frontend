import { createSlice } from '@reduxjs/toolkit';

const initialCartItems = [
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

const initialState = {
  items: initialCartItems,
  status: 'idle', 
  error: null,
};

const cartSliceRaniel = createSlice({
  name: 'cartRaniel',
  initialState,
  reducers: {

    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSliceRaniel.actions;

export default cartSliceRaniel.reducer;