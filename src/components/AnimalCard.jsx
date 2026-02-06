import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { FiCheck } from 'react-icons/fi'

export default function AnimalCard({ animal }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(animal))
  }

  return (
    <article className="animal-card">
      <div className="animal-card__image-container">
        <img
          src={animal.image || 'https://via.placeholder.com/300x200?text=Animal'}
          alt={animal.name}
          className="animal-card__image"
        />
      </div>
      <div className="animal-card__content">
        <div className="animal-card__header">
          <h3 className="animal-card__name">{animal.name}</h3>
          <span className="animal-card__price">${animal.price?.toLocaleString()}</span>
        </div>
        <p className="animal-card__type">
          {animal.animal_type} • {animal.breed}
        </p>
        <div className="animal-card__details">
          <p>Age: {animal.age} months</p>
          <p>Weight: {animal.weight} lbs</p>
        </div>
        {animal.health_status && (
          <div className="animal-card__health">
            <FiCheck className="health-icon" />
            <span>{animal.health_status}</span>
          </div>
        )}
        {animal.description && (
          <p className="animal-card__description">{animal.description}</p>
        )}
        <button className="btn btn--add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  )
}
