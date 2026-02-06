import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './authSlice';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [role, setRole] = useState('buyer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

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
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🌿 Farmart</span>
          <p className="auth-tagline">Direct farm-to-buyer marketplace</p>
        </div>

        <h1 className="auth-title">Create Account</h1>

        <div className="role-picker">
          <button
            type="button"
            className={`role-card ${role === 'buyer' ? 'role-card--active' : ''}`}
            onClick={() => setRole('buyer')}
          >
            <span className="role-icon">🛒</span>
            <span className="role-label">Buyer</span>
            <span className="role-desc">Purchase animals</span>
          </button>
          <button
            type="button"
            className={`role-card ${role === 'farmer' ? 'role-card--active' : ''}`}
            onClick={() => setRole('farmer')}
          >
            <span className="role-icon">🌾</span>
            <span className="role-label">Farmer</span>
            <span className="role-desc">Sell animals</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-label">
            Full Name
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-label">
            Email
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-label">
            Password
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="btn btn--primary btn--full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Creating...' : 'Register'}
          </button>
          {error && <p className="auth-error">{error}</p>}
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
