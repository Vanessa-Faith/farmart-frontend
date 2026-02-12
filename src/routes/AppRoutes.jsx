import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import AnimalsList from '../pages/AnimalsList';
import AnimalDetail from '../pages/AnimalDetail';
import AddAnimal from '../pages/AddAnimal';
import EditAnimal from '../pages/EditAnimal';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderHistory from '../pages/OrderHistory';
import FarmerDashboard from '../pages/FarmerDashboard';
import FarmerOrders from '../pages/FarmerOrders';
import PrivateRoute from '../components/PrivateRoute';
import About from '../pages/About';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/animals" element={<AnimalsList />} />
      <Route path="/animals/:id" element={<AnimalDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes - Buyers */}
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />

      {/* Protected routes - Farmers */}
      <Route path="/farmer/dashboard" element={<PrivateRoute><FarmerDashboard /></PrivateRoute>} />
      <Route path="/farmer/orders" element={<PrivateRoute><FarmerOrders /></PrivateRoute>} />
      <Route path="/animals/add" element={<PrivateRoute><AddAnimal /></PrivateRoute>} />
      <Route path="/animals/:id/edit" element={<PrivateRoute><EditAnimal /></PrivateRoute>} />

      {/* Redirects */}
      <Route path="/auth" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}