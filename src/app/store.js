import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from '../features/animals/animalsSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';

const store = configureStore({
  reducer: {
    animals: animalsReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export default store;
