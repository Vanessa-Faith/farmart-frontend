import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import Animals from '../pages/Animals'
import Farmers from '../pages/Farmers'
import Auth from '../pages/Auth'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'
import FarmerDashboard from '../pages/FarmerDashboard'
import FarmerOrders from '../pages/FarmerOrders'
import OrderHistory from '../pages/OrderHistory'

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useSelector((state) => state.auth)
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }
  
  return children
}

export default function AppRoutes() {
  const { token, user } = useSelector((state) => state.auth)
  
  // Redirect logged-in users to their appropriate dashboard
  const getHomeRedirect = () => {
    if (token && user?.role === 'farmer') {
      return <Navigate to="/farmer/dashboard" replace />
    }
    if (token && user?.role === 'buyer') {
      return <Navigate to="/animals" replace />
    }
    return <Home />
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={getHomeRedirect()} />
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to="/" replace /> : <Register />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Buyer Routes */}
      <Route 
        path="/animals" 
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <Animals />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <OrderHistory />
          </ProtectedRoute>
        } 
      />
      
      {/* Farmer Routes */}
      <Route 
        path="/farmer/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['farmer']}>
            <FarmerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/orders" 
        element={
          <ProtectedRoute allowedRoles={['farmer']}>
            <FarmerOrders />
          </ProtectedRoute>
        } 
      />
      <Route path="/farmers" element={<Farmers />} />
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
