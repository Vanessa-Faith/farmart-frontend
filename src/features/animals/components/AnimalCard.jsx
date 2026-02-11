import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../cart/cartSlice';
import './AnimalCard.css';

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login', { state: { from: '/animals' } });
      return;
    }
    dispatch(addToCart(animal));
  };

  const imageUrl = animal.images?.[0] || animal.image_url || animal.image;
  const price = animal.price_per_unit || animal.price;
  const type = animal.type || animal.animal_type;
  const age = animal.age_months || animal.age;

  return (
    <div className="animal-card">
      <div className="animal-image">
        {imageUrl ? (
          <img src={imageUrl} alt={animal.title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      <div className="animal-info">
        <div className="animal-header">
          <h3>{animal.title}</h3>
          <span className="animal-price">${price}</span>
        </div>
        <div className="animal-meta">
          <span className="animal-type">{type}</span>
          <span className="animal-breed">{animal.breed}</span>
        </div>
        <p className="animal-age">Age: {age} months</p>
        <div className="animal-actions">
          <button onClick={handleAddToCart} className="btn-add-cart">Add to Cart</button>
          <button onClick={() => navigate(`/animals/${animal.id}`)} className="btn-view">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
