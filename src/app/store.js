import { configureStore } from '@reduxjs/toolkit'
import animalsReducer from '../features/animals/animalsSlice'
import authReducer from '../features/auth/authSlice'
import ordersReducer from '../features/orders/ordersSlice'

const store = configureStore({
  reducer: {
    animals: animalsReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
})

export default store
