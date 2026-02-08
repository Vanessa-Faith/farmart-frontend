import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Animals from '../pages/Animals';
import Farmers from '../pages/Farmers';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

export default function AppRoutes() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/farmers" element={<Farmers />} />

      {/* Auth routes from dev */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Your Feature 3 routes */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Optional: redirect old /auth to login */}
      <Route path="/auth" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}