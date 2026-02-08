import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from '../features/animals/animalsSlice';
import authReducer from '../features/auth/authSlice';
import CartReducer from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    animals: animalsReducer,
    auth: authReducer,
    Cart: CartReducer,
  },
});

export default store;
