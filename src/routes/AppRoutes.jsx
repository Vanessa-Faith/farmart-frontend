import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import Animals from '../pages/Animals'
import Farmers from '../pages/Farmers'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'

function AppRoutes() {
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

export default AppRoutes
