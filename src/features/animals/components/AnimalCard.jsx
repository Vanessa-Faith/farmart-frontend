import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../cart/cartSlice';

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
    <div className="bg-farm-bg rounded-xl overflow-hidden transition-all duration-200 cursor-pointer border border-farm-green hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(46,125,50,0.3)]">
      <div className="h-56 bg-farm-dark overflow-hidden relative">
        <img src={imageUrl || 'https://via.placeholder.com/300x220'} alt={animal.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white flex-1">{animal.title}</h3>
          <span className="text-2xl font-bold text-farm-green-light whitespace-nowrap ml-3">${price}</span>
        </div>
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="px-2.5 py-1 bg-farm-green/20 text-farm-green-lighter rounded-xl text-xs font-medium capitalize">{type}</span>
          <span className="px-2.5 py-1 bg-farm-green/20 text-farm-green-lighter rounded-xl text-xs font-medium">{animal.breed}</span>
        </div>
        <p className="text-sm text-green-300 mb-4">Age: {age} months</p>
        <div className="flex gap-2.5">
          <button onClick={handleAddToCart} className="flex-1 py-3 bg-farm-green text-white rounded-lg text-sm font-semibold hover:bg-farm-green-dark transition hover:-translate-y-0.5">Add to Cart</button>
          <button onClick={() => navigate(`/animals/${animal.id}`)} className="flex-1 py-3 bg-transparent text-farm-green-lighter border border-farm-green rounded-lg text-sm font-semibold hover:bg-farm-green/10 hover:border-farm-green-light transition">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
