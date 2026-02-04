import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Animals from '../pages/Animals'
import Farmers from '../pages/Farmers'
import Auth from '../pages/Auth'

import CartRaniel from '../pages/CartRaniel'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/animals" element={<Animals/>} />
      <Route path="/farmers" element={<Farmers/>} />
      <Route path="/auth" element={<Auth/>} />

      <Route path="/cart-raniel" element={<CartRaniel/>} />
    </Routes>
  )
}
