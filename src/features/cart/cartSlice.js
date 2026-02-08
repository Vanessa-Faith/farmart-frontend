import { createSlice } from '@reduxjs/toolkit';

<<<<<<< feature/cart-and-orders
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

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    removeItem: (state, action) => {
=======
const initialState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
>>>>>>> dev
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
<<<<<<< feature/cart-and-orders
      if (item && quantity >= 1) {
        item.quantity = quantity;
=======
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        } else {
          item.quantity = quantity;
        }
>>>>>>> dev
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
<<<<<<< feature/cart-and-orders
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
=======
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectIsCartOpen = (state) => state.cart.isOpen;

export default cartSlice.reducer;
>>>>>>> dev
