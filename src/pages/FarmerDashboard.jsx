import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiPlus, FiPackage, FiDollarSign, FiTrendingUp, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { fetchAnimals, createAnimal, deleteAnimal, updateAnimal as updateAnimalThunk } from '../features/animals/animalsSlice'
import './FarmerDashboard.css'

// Mock data for farmer's animals
const mockFarmerAnimals = [
  {
    id: 101,
    name: 'Daisy',
    animal_type: 'Cattle',
    breed: 'Jersey',
    age: 36,
    weight: 1200,
    price: 2800,
    health_status: 'Vaccinated, Healthy',
    description: 'Excellent dairy cow with high milk yield',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop',
    status: 'available',
  },
  {
    id: 102,
    name: 'Thunder',
    animal_type: 'Horse',
    breed: 'Arabian',
    age: 48,
    weight: 900,
    price: 5500,
    health_status: 'Excellent condition',
    description: 'Well-trained riding horse',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop',
    status: 'available',
  },
  {
    id: 103,
    name: 'Pepper',
    animal_type: 'Goat',
    breed: 'Nubian',
    age: 14,
    weight: 150,
    price: 380,
    health_status: 'De-wormed, Vaccinated',
    description: 'Great for milk production',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=400&h=300&fit=crop',
    status: 'sold',
  },
]

export default function FarmerDashboard() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const animals = useSelector((state) => state.animals.list || [])
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    animal_type: '',
    breed: '',
    age: '',
    weight: '',
    price: '',
    health_status: '',
    description: '',
    image: '',
  })

  // Load farmer's animals on mount
  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch])

  // Stats calculations
  const totalAnimals = animals.length
  const availableAnimals = animals.filter(a => a.status !== 'sold').length
  const soldAnimals = animals.filter(a => a.status === 'sold').length
  const totalValue = animals.filter(a => a.status !== 'sold').reduce((sum, a) => sum + a.price, 0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddAnimal = async (e) => {
    e.preventDefault()
    const animalData = {
      title: formData.name,
      animal_type: formData.animal_type,
      breed: formData.breed,
      age: parseInt(formData.age),
      price: parseInt(formData.price),
      description: formData.description,
      image_url: formData.image,
    }
    await dispatch(createAnimal(animalData))
    await dispatch(fetchAnimals())
    setShowAddModal(false)
    resetForm()
  }

  const handleEditAnimal = async (e) => {
    e.preventDefault()
    const animalData = {
      title: formData.name,
      animal_type: formData.animal_type,
      breed: formData.breed,
      age: parseInt(formData.age),
      price: parseInt(formData.price),
      description: formData.description,
      image_url: formData.image,
    }
    await dispatch(updateAnimalThunk({ id: editingAnimal.id, data: animalData }))
    setEditingAnimal(null)
    resetForm()
  }

  const handleDeleteAnimal = async (id) => {
    if (window.confirm('Are you sure you want to delete this animal listing?')) {
      await dispatch(deleteAnimal(id))
    }
  }

  const openEditModal = (animal) => {
    setEditingAnimal(animal)
    setFormData({
      name: animal.name,
      animal_type: animal.animal_type,
      breed: animal.breed,
      age: animal.age.toString(),
      weight: animal.weight.toString(),
      price: animal.price.toString(),
      health_status: animal.health_status,
      description: animal.description,
      image: animal.image_url || animal.image || '',
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      animal_type: '',
      breed: '',
      age: '',
      weight: '',
      price: '',
      health_status: '',
      description: '',
      image: '',
    })
  }

  return (
    <main className="farmer-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header__content">
          <h1>Welcome back, {user?.name || 'Farmer'}!</h1>
          <p>Manage your livestock listings and track your sales</p>
        </div>
        <button className="btn btn--add-animal" onClick={() => setShowAddModal(true)}>
          <FiPlus size={20} />
          <span>Add Animal</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--blue">
            <FiPackage size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{totalAnimals}</span>
            <span className="stat-card__label">Total Listings</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--green">
            <FiTrendingUp size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{availableAnimals}</span>
            <span className="stat-card__label">Available</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--orange">
            <FiDollarSign size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{soldAnimals}</span>
            <span className="stat-card__label">Sold</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--purple">
            <FiDollarSign size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">${totalValue.toLocaleString()}</span>
            <span className="stat-card__label">Total Value</span>
          </div>
        </div>
      </div>

      {/* Animals Table */}
      <div className="dashboard-section">
        <h2>Your Listings</h2>
        <div className="animals-table-container">
          <table className="animals-table">
            <thead>
              <tr>
                <th>Animal</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => {
                const imageUrl = animal.image_url || animal.image;
                const name = animal.title || animal.name;
                return (
                <tr key={animal.id}>
                  <td>
                    <div className="animal-cell">
                      <img src={imageUrl} alt={name} className="animal-cell__image" />
                      <span className="animal-cell__name">{name}</span>
                    </div>
                  </td>
                  <td>{animal.animal_type}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.age} mo</td>
                  <td className="price-cell">${animal.price.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-badge--${animal.status}`}>
                      {animal.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn action-btn--edit"
                        onClick={() => openEditModal(animal)}
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        className="action-btn action-btn--delete"
                        onClick={() => handleDeleteAnimal(animal.id)}
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
          {animals.length === 0 && (
            <div className="empty-table">
              <p>No animals listed yet. Click "Add Animal" to create your first listing!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingAnimal) && (
        <>
          <div className="modal-overlay" onClick={() => { setShowAddModal(false); setEditingAnimal(null); resetForm(); }}></div>
          <div className="modal">
            <h2>{editingAnimal ? 'Edit Animal' : 'Add New Animal'}</h2>
            <form onSubmit={editingAnimal ? handleEditAnimal : handleAddAnimal} className="animal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="animal_type">Animal Type</label>
                  <select
                    id="animal_type"
                    name="animal_type"
                    value={formData.animal_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Cattle">Cattle</option>
                    <option value="Goat">Goat</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Pig">Pig</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Horse">Horse</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="breed">Breed</label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age (months)</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="weight">Weight (lbs)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="health_status">Health Status</label>
                <input
                  type="text"
                  id="health_status"
                  name="health_status"
                  value={formData.health_status}
                  onChange={handleInputChange}
                  placeholder="e.g., Vaccinated, De-wormed"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn--cancel"
                  onClick={() => { setShowAddModal(false); setEditingAnimal(null); resetForm(); }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn--submit">
                  {editingAnimal ? 'Save Changes' : 'Add Animal'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  )
}
