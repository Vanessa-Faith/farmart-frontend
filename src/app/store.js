 Tarus_b
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from '../features/animals/animalsSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    animals: animalsReducer,
    auth: authReducer,
  },
});

export default store;
 dev
