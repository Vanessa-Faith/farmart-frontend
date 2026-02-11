import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimalById, clearCurrentAnimal } from '../features/animals/animalsSlice';
import './AnimalDetail.css';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAnimal, loading, error } = useSelector(state => state.animals);
  const user = useSelector(state => state.auth?.user);

  useEffect(() => {
    dispatch(fetchAnimalById(id));
    return () => dispatch(clearCurrentAnimal());
  }, [dispatch, id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!currentAnimal) return null;

  const isFarmer = user?.role === 'farmer';
  const imageUrl = currentAnimal.images?.[0] || currentAnimal.image_url;
  const age = currentAnimal.age_months || currentAnimal.age;
  const price = currentAnimal.price_per_unit || currentAnimal.price;
  const type = currentAnimal.type || currentAnimal.animal_type;

  return (
    <div className="animal-detail-page">
      <header className="detail-header">
        <button onClick={() => navigate(-1)} className="btn-back">Back</button>
        <h1>Animal Details</h1>
        <button className="btn-cart">Cart</button>
      </header>

      <div className="detail-content">
        <button onClick={() => navigate(-1)} className="btn-back-arrow">Back</button>

        <div className="animal-image-large">
          {imageUrl ? (
            <img src={imageUrl} alt={currentAnimal.title} />
          ) : (
            <div className="no-image">PHOTO HERE</div>
          )}
        </div>

        <div className="animal-details">
          <h2>{currentAnimal.title}</h2>
          <p>Breed: {currentAnimal.breed}</p>
          <p>Age: {age} Months</p>
          <p>Price: ${price}</p>

          <div className="detail-actions">
            <button className="btn-add-cart">Add to Cart</button>
            <button className="btn-view-details">View Details</button>
          </div>

          <p className="animal-description">
            {currentAnimal.description || `Healthy, calm and productive ${currentAnimal.breed} ${type} available for sale. Vaccinated and well-cared for. Contact for more information.`}
          </p>

          {isFarmer ? (
            <button className="btn-contact">Edit Animal</button>
          ) : (
            <button className="btn-contact">Contact Farmer</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
