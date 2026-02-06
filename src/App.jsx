import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import Cart from './components/Cart'

function App() {
  return (
    <div className="app">
      <Navbar />
      <AppRoutes />
      <Cart />
    </div>
  )
}

export default App
