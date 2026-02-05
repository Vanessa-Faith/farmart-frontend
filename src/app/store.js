import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from '../features/animals/animalsSlice';
import authReducer from '../features/auth/authSlice';
import cartRanielReducer from '../features/cart/cartSliceRaniel';

const store = configureStore({
  reducer: {
    animals: animalsReducer,
    auth: authReducer,
    cartRaniel: cartRanielReducer,
  },
});

export default store;
