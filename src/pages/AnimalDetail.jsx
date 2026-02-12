import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimalById, clearCurrentAnimal } from '../features/animals/animalsSlice';
import { addToCart } from '../features/cart/cartSlice';

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
  const { token } = useSelector(state => state.auth);
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    dispatch(fetchAnimalById(id)).then((result) => {
      if (result.payload) setAnimal(result.payload);
    });
    return () => dispatch(clearCurrentAnimal());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login', { state: { from: `/animals/${id}` } });
      return;
    }
    dispatch(addToCart(animal));
  };

  if (!animal) return <div className="flex items-center justify-center min-h-screen bg-farm-dark text-farm-green-lighter">Loading...</div>;

  const imageUrl = animal.images?.[0] || animal.image_url;
  const price = animal.price_per_unit || animal.price;
  const type = animal.type || animal.animal_type;
  const age = animal.age_months || animal.age;

  return (
    <div className="min-h-screen bg-farm-dark py-10 px-5">
      <button onClick={() => navigate('/animals')} className="mb-8 px-5 py-2.5 bg-transparent border border-farm-green text-farm-green-lighter rounded-md hover:bg-farm-green hover:text-white transition">
        Back to Animals
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-farm-bg p-10 rounded-xl">
        <div className="h-[500px] rounded-xl overflow-hidden bg-farm-dark">
          <img src={imageUrl || 'https://via.placeholder.com/400x300'} alt={animal.title} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-white text-4xl font-bold mb-2">{animal.title}</h1>
          <p className="text-farm-green-light text-3xl font-bold mb-8">${price}</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-3 border-b border-farm-green">
              <span className="text-farm-green-lighter font-semibold">Breed:</span>
              <span className="text-white">{animal.breed}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-farm-green">
              <span className="text-farm-green-lighter font-semibold">Type:</span>
              <span className="text-white capitalize">{type}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-farm-green">
              <span className="text-farm-green-lighter font-semibold">Age:</span>
              <span className="text-white">{age} months</span>
            </div>
            {animal.weight_lbs && (
            <div className="flex justify-between py-3 border-b border-farm-green">
              <span className="text-farm-green-lighter font-semibold">Weight:</span>
              <span className="text-white">{animal.weight_lbs} lbs</span>
            </div>
            )}
            {animal.quantity_available && (
            <div className="flex justify-between py-3 border-b border-farm-green">
              <span className="text-farm-green-lighter font-semibold">Available:</span>
              <span className="text-white">{animal.quantity_available}</span>
            </div>
            )}
            {animal.health_status && (
            <div className="flex justify-between py-3 border-b border-farm-green">
              <span className="text-farm-green-lighter font-semibold">Health:</span>
              <span className="text-white">{animal.health_status}</span>
            </div>
            )}
          </div>

          <button onClick={handleAddToCart} className="w-full py-4 bg-farm-green text-white rounded-lg text-lg font-semibold hover:bg-farm-green-dark transition hover:-translate-y-0.5">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
