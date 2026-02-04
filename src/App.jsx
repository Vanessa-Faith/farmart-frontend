 Tarus_b
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import OrderHistory from "./pages/OrderHistory";
import FarmerOrders from "./pages/FarmerOrders";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/farmer/orders" element={<FarmerOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'

function App(){
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App
 dev
