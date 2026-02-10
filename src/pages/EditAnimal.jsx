import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimalById, updateAnimal, deleteAnimal } from '../features/animals/animalsSlice';
import ImageUploader from '../components/ImageUploader';
import './AnimalForm.css';

const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAnimal, loading: fetchLoading } = useSelector(state => state.animals);
  
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

  useEffect(() => {
    dispatch(fetchAnimalById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentAnimal) {
      setFormData({
        title: currentAnimal.title || '',
        type: currentAnimal.type || '',
        breed: currentAnimal.breed || '',
        age_months: currentAnimal.age_months || '',
        price_per_unit: currentAnimal.price_per_unit || '',
        quantity_available: currentAnimal.quantity_available || '',
        county: currentAnimal.county || '',
        status: currentAnimal.status || 'available'
      });
      setImages(currentAnimal.images || []);
    }
  }, [currentAnimal]);

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

      await dispatch(updateAnimal({ id, data: animalData })).unwrap();
      navigate(`/animals/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update animal');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this animal?')) {
      try {
        await dispatch(deleteAnimal(id)).unwrap();
        navigate('/animals');
      } catch (err) {
        setError(err.message || 'Failed to delete animal');
      }
    }
  };

  if (fetchLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="animal-form-page">
      <header className="form-header">
        <button onClick={() => navigate(-1)} className="btn-back">Back</button>
        <h1>Orders</h1>
        <button className="btn-cart">Cart</button>
      </header>

      <div className="form-content">
        <button onClick={() => navigate(-1)} className="btn-back-text">Back</button>

        <div className="order-detail-card">
          <h3>Order #1024</h3>
          <p>Buyer: John Doe</p>
          <p>Animal: Cow</p>
          <p>Qty: 2</p>
          <p className="order-total">Total: $6600</p>
          
          <div className="order-actions">
            <button className="btn-confirm">Confirm</button>
            <button className="btn-reject">Reject</button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Order #1024</label>
            <select>
              <option>Cow ×1</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="breed"
              placeholder="Friesian"
              value={formData.breed}
              onChange={handleChange}
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
            />
          </div>

          <div className="form-group">
            <button type="button" className="btn-replace-photo">
              Replace Photo
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Updating...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAnimal;
