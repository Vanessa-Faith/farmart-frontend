import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from './features/animals/animalsSlice.js';

export const store = configureStore({
  reducer: {
    animals: animalsReducer,
  },
});

export default store;
