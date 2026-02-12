import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimalById, clearCurrentAnimal } from '../features/animals/animalsSlice';
import { addToCart } from '../features/cart/cartSlice';
import './AnimalDetail.css';

const mockAnimals = [
  { id: 1, title: 'Bessie', breed: 'Holstein', type: 'cattle', age_months: 24, price_per_unit: 2500, weight_lbs: 1400, quantity_available: 1, health_status: 'Vaccinated, Excellent health', images: ['https://picsum.photos/seed/cow1/400/300'] },
  { id: 2, title: 'Billy', breed: 'Boer', type: 'goat', age_months: 18, price_per_unit: 450, weight_lbs: 180, quantity_available: 2, health_status: 'Healthy, De-wormed', images: ['https://picsum.photos/seed/goat1/400/300'] },
  { id: 3, title: 'Woolly', breed: 'Merino', type: 'sheep', age_months: 12, price_per_unit: 350, weight_lbs: 150, quantity_available: 3, health_status: 'Recently sheared, vaccinated', images: ['https://picsum.photos/seed/sheep1/400/300'] },
  { id: 4, title: 'Daisy', breed: 'Jersey', type: 'cattle', age_months: 36, price_per_unit: 3200, weight_lbs: 1200, quantity_available: 1, health_status: 'Excellent milk producer', images: ['https://picsum.photos/seed/cow2/400/300'] },
  { id: 5, title: 'Clucky', breed: 'Rhode Island Red', type: 'chicken', age_months: 8, price_per_unit: 25, weight_lbs: 6, quantity_available: 10, health_status: 'Laying hens, vaccinated', images: ['https://picsum.photos/seed/chicken1/400/300'] },
  { id: 6, title: 'Porky', breed: 'Yorkshire', type: 'pig', age_months: 6, price_per_unit: 280, weight_lbs: 220, quantity_available: 3, health_status: 'Healthy, ready for market', images: ['https://picsum.photos/seed/pig1/400/300'] },
  { id: 7, title: 'Nanny', breed: 'Saanen', type: 'goat', age_months: 24, price_per_unit: 550, weight_lbs: 150, quantity_available: 1, health_status: 'Excellent milk goat', images: ['https://picsum.photos/seed/goat2/400/300'] },
  { id: 8, title: 'Angus', breed: 'Black Angus', type: 'cattle', age_months: 18, price_per_unit: 2800, weight_lbs: 1600, quantity_available: 2, health_status: 'Prime beef cattle', images: ['https://picsum.photos/seed/cow3/400/300'] },
  { id: 9, title: 'Fluffy', breed: 'Suffolk', type: 'sheep', age_months: 15, price_per_unit: 400, weight_lbs: 180, quantity_available: 4, health_status: 'Good wool quality', images: ['https://picsum.photos/seed/sheep2/400/300'] },
  { id: 10, title: 'Henny', breed: 'Leghorn', type: 'chicken', age_months: 10, price_per_unit: 30, weight_lbs: 5, quantity_available: 15, health_status: 'High egg production', images: ['https://picsum.photos/seed/chicken2/400/300'] },
  { id: 11, title: 'Hamlet', breed: 'Duroc', type: 'pig', age_months: 8, price_per_unit: 320, weight_lbs: 250, quantity_available: 2, health_status: 'Fast growing, healthy', images: ['https://picsum.photos/seed/pig2/400/300'] },
  { id: 12, title: 'Rambo', breed: 'Dorper', type: 'sheep', age_months: 20, price_per_unit: 450, weight_lbs: 200, quantity_available: 1, health_status: 'Breeding ram, excellent genetics', images: ['https://picsum.photos/seed/sheep3/400/300'] }
];

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current, loading } = useSelector(state => state.animals);
  const { token } = useSelector(state => state.auth);
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const mockAnimal = mockAnimals.find(a => a.id === parseInt(id));
    if (mockAnimal) {
      setAnimal(mockAnimal);
    }
    dispatch(fetchAnimalById(id)).then((result) => {
      if (result.payload) setAnimal(result.payload);
    }).catch(() => {});
    return () => dispatch(clearCurrentAnimal());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login', { state: { from: `/animals/${id}` } });
      return;
    }
    dispatch(addToCart(animal));
  };

  if (!animal) return <div className="loading">Loading...</div>;

  const imageUrl = animal.images?.[0] || animal.image_url;
  const price = animal.price_per_unit || animal.price;
  const type = animal.type || animal.animal_type;
  const age = animal.age_months || animal.age;
  const weight = animal.weight_lbs || animal.weight;
  const quantity = animal.quantity_available || animal.quantity;

  return (
    <div className="animal-detail-page">
      <button onClick={() => navigate('/animals')} className="btn-back">Back to Animals</button>

      <div className="detail-content">
        <div className="animal-image-large">
          <img src={imageUrl || 'https://via.placeholder.com/400x300'} alt={animal.title} />
        </div>

        <div className="animal-info-section">
          <h1>{animal.title}</h1>
          <p className="animal-price">${price}</p>
          
          <div className="animal-specs">
            <div className="spec-item">
              <span className="spec-label">Breed:</span>
              <span className="spec-value">{animal.breed}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Type:</span>
              <span className="spec-value">{type}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Age:</span>
              <span className="spec-value">{age} months</span>
            </div>
            {weight && (
            <div className="spec-item">
              <span className="spec-label">Weight:</span>
              <span className="spec-value">{weight} lbs</span>
            </div>
            )}
            {quantity && (
            <div className="spec-item">
              <span className="spec-label">Available:</span>
              <span className="spec-value">{quantity}</span>
            </div>
            )}
            {animal.health_status && (
            <div className="spec-item">
              <span className="spec-label">Health:</span>
              <span className="spec-value">{animal.health_status}</span>
            </div>
            )}
          </div>

          <button onClick={handleAddToCart} className="btn-add-cart-large">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
