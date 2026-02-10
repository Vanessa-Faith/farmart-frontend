import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAnimal } from '../features/animals/animalsSlice';
import ImageUploader from '../components/ImageUploader';
import './AnimalForm.css';

const AddAnimal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showStats, setShowStats] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    breed: '',
    age_months: '',
    price_per_unit: '',
    quantity_available: '',
    county: '',
    status: 'available'
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const animalData = {
        ...formData,
        age_months: parseInt(formData.age_months),
        price_per_unit: parseFloat(formData.price_per_unit),
        quantity_available: parseInt(formData.quantity_available),
        images
      };

      await dispatch(createAnimal(animalData)).unwrap();
      navigate('/animals');
    } catch (err) {
      setError(err.message || 'Failed to create animal');
    } finally {
      setLoading(false);
    }
  };

  if (showStats) {
    return (
      <div className="animal-form-page">
        <header className="form-header">
          <h1>Farmart</h1>
          <button className="btn-user">User</button>
        </header>

        <div className="form-content">
          <h2 className="dashboard-title">Farmer Dashboard</h2>
          
          <button onClick={() => setShowStats(false)} className="btn-add-new">Add New Animal</button>

          <div className="stats-section">
            <h3>Stats</h3>
            <div className="stat-item">
              <span>Total Animals: 12</span>
              <span>View</span>
            </div>
            <div className="stat-item">
              <span>Pending Orders: 3</span>
              <span>View</span>
            </div>
            <div className="stat-item">
              <span>Total Sales: $4,500</span>
              <span>View</span>
            </div>
          </div>

          <div className="recent-orders">
            <h3>Recent Orders</h3>
            <div className="order-card">
              <div className="order-header">
                <span>Order #1024</span>
                <span className="status-pending">Pending</span>
              </div>
              <div className="order-detail">
                <span>Buyer: John Doe</span>
                <span>View</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animal-form-page">
      <header className="form-header">
        <button onClick={() => setShowStats(true)} className="btn-back">Back</button>
        <h1>Add Animal</h1>
        <div></div>
      </header>

      <div className="form-content">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Animal Name</label>
            <input
              type="text"
              name="title"
              placeholder="Daisy the Cow"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="cattle">Cow</option>
              <option value="goat">Goat</option>
              <option value="sheep">Sheep</option>
              <option value="chicken">Chicken</option>
              <option value="pig">Pig</option>
            </select>
          </div>

          <div className="form-group">
            <label>Breed</label>
            <input
              type="text"
              name="breed"
              placeholder="Friesian"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <div className="age-input">
              <input
                type="number"
                name="age_months"
                value={formData.age_months}
                onChange={handleChange}
                required
              />
              <span>Years</span>
            </div>
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price_per_unit"
              value={formData.price_per_unit}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <button type="button" className="btn-choose-image">Choose Image</button>
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Creating...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnimal;
