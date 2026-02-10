<<<<<<< feature/cart-and-orders
import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from '../features/animals/animalsSlice';
import authReducer from '../features/auth/authSlice';
import CartReducer from '../features/cart/cartSlice';
=======
import { configureStore } from '@reduxjs/toolkit'
import animalsReducer from '../features/animals/animalsSlice'
import authReducer from '../features/auth/authSlice'
import ordersReducer from '../features/orders/ordersSlice'
>>>>>>> dev

const store = configureStore({
  reducer: {
    animals: animalsReducer,
    auth: authReducer,
<<<<<<< feature/cart-and-orders
    Cart: CartReducer,
=======
    orders: ordersReducer,
>>>>>>> dev
  },
})

export default store
