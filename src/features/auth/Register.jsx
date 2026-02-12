import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './authSlice';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [role, setRole] = useState('buyer');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ ...formData, role }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-farm-dark flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-farm-bg p-8 rounded-xl border border-farm-green">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mt-2">Farmart</h2>
          <p className="text-farm-green-lighter text-sm">Direct farm-to-buyer marketplace</p>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-6">Create Account</h1>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            className={`p-4 rounded-lg border-2 transition ${role === 'buyer' ? 'border-farm-green bg-farm-green/20' : 'border-farm-green/30 bg-transparent'}`}
            onClick={() => setRole('buyer')}
          >
            <span className="block text-white font-semibold text-sm">Buyer</span>
            <span className="block text-farm-green-lighter text-xs">Purchase animals</span>
          </button>
          <button
            type="button"
            className={`p-4 rounded-lg border-2 transition ${role === 'farmer' ? 'border-farm-green bg-farm-green/20' : 'border-farm-green/30 bg-transparent'}`}
            onClick={() => setRole('farmer')}
          >
            <span className="block text-white font-semibold text-sm">Farmer</span>
            <span className="block text-farm-green-lighter text-xs">Sell animals</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-farm-green-lighter text-sm font-semibold mb-2">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-farm-dark border border-farm-green rounded-lg text-white placeholder-farm-green-lighter/50 focus:outline-none focus:border-farm-green-light"
            />
          </div>
          <div>
            <label className="block text-farm-green-lighter text-sm font-semibold mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-farm-dark border border-farm-green rounded-lg text-white placeholder-farm-green-lighter/50 focus:outline-none focus:border-farm-green-light"
            />
          </div>
          <div>
            <label className="block text-farm-green-lighter text-sm font-semibold mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 bg-farm-dark border border-farm-green rounded-lg text-white placeholder-farm-green-lighter/50 focus:outline-none focus:border-farm-green-light"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-farm-green text-white rounded-lg font-semibold hover:bg-farm-green-dark transition disabled:opacity-50" disabled={status === 'loading'}>
            {status === 'loading' ? 'Creating...' : 'Register'}
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>

        <p className="text-center text-farm-green-lighter text-sm mt-6">
          Already have an account? <Link to="/login" className="text-farm-green-light font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
