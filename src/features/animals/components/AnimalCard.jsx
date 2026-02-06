import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimalCard.css';

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();

  return (
    <div className="animal-card">
      <div className="animal-image">
        {animal.images && animal.images.length > 0 ? (
          <img src={animal.images[0]} alt={animal.title} />
        ) : (
          <div className="no-image">PHOTO HERE</div>
        )}
      </div>
      <div className="animal-info">
        <h3>{animal.title}</h3>
        <p className="animal-breed">Breed: {animal.breed}</p>
        <p className="animal-age">Age: {animal.age_months} Months</p>
        <p className="animal-price">Price: ${animal.price_per_unit}</p>
        <div className="animal-actions">
          <button className="btn-add-cart">Add to Cart</button>
          <button onClick={() => navigate(`/animals/${animal.id}`)} className="btn-view">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
