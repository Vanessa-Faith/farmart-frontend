import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Animals from '../pages/Animals'
import Farmers from '../pages/Farmers'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/animals" element={<Animals/>} />
      <Route path="/farmers" element={<Farmers/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/auth" element={<Login/>} />
    </Routes>
  )
}
