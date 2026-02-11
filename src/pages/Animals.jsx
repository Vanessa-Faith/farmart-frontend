import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiFilter, FiSearch } from 'react-icons/fi'
import AnimalCard from '../components/AnimalCard'
import { setAnimals } from '../features/animals/animalsSlice'

// Mock data for development
const mockAnimals = [
  {
    id: 1,
    name: 'Bessie',
    animal_type: 'Cattle',
    breed: 'Holstein',
    age: 24,
    weight: 1400,
    price: 2500,
    health_status: 'Vaccinated, Excellent health',
    description: 'High-quality dairy cow, excellent milk production',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400',
  },
  {
    id: 2,
    name: 'Billy',
    animal_type: 'Goat',
    breed: 'Boer',
    age: 18,
    weight: 180,
    price: 450,
    health_status: 'Healthy, De-wormed',
    description: 'Strong and healthy breeding goat',
    image: 'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=400',
  },
  {
    id: 3,
    name: 'Woolly',
    animal_type: 'Sheep',
    breed: 'Merino',
    age: 12,
    weight: 150,
    price: 350,
    health_status: 'Recently sheared, vaccinated',
    description: 'Premium wool quality sheep',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
  },
  {
    id: 4,
    name: 'Clucky',
    animal_type: 'Poultry',
    breed: 'Rhode Island Red',
    age: 8,
    weight: 7,
    price: 25,
    health_status: 'Healthy, Laying',
    description: 'Excellent egg layer, friendly temperament',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    name: 'Porky',
    animal_type: 'Pig',
    breed: 'Yorkshire',
    age: 10,
    weight: 250,
    price: 600,
    health_status: 'Vaccinated, Healthy',
    description: 'Well-fed farm pig, great for breeding',
    image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400',
  },
]

export default function Animals() {
  const dispatch = useDispatch()
  const animals = useSelector((state) => state.animals.items)

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [animalType, setAnimalType] = useState('')
  const [breed, setBreed] = useState('')
  const [minAge, setMinAge] = useState('')
  const [maxAge, setMaxAge] = useState('')

  // Load mock data on mount
  useEffect(() => {
    if (animals.length === 0) {
      dispatch(setAnimals(mockAnimals))
    }
  }, [dispatch, animals.length])

  // Get unique animal types and breeds for filters
  const animalTypes = useMemo(() => {
    return [...new Set(animals.map((a) => a.animal_type))]
  }, [animals])

  const breeds = useMemo(() => {
    if (animalType) {
      return [...new Set(animals.filter((a) => a.animal_type === animalType).map((a) => a.breed))]
    }
    return [...new Set(animals.map((a) => a.breed))]
  }, [animals, animalType])

  // Filter animals
  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        animal.name.toLowerCase().includes(searchLower) ||
        animal.animal_type.toLowerCase().includes(searchLower) ||
        animal.breed.toLowerCase().includes(searchLower)

      // Type filter
      const matchesType = !animalType || animal.animal_type === animalType

      // Breed filter
      const matchesBreed = !breed || animal.breed === breed

      // Age filter
      const matchesMinAge = !minAge || animal.age >= parseInt(minAge)
      const matchesMaxAge = !maxAge || animal.age <= parseInt(maxAge)

      return matchesSearch && matchesType && matchesBreed && matchesMinAge && matchesMaxAge
    })
  }, [animals, searchQuery, animalType, breed, minAge, maxAge])

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('')
    setAnimalType('')
    setBreed('')
    setMinAge('')
    setMaxAge('')
  }

  return (
    <main className="animals-page">
      {/* Hero Banner */}
      <section className="animals-hero">
        <div className="animals-hero__content">
          <h1>Quality Livestock, Straight from the Farm</h1>
          <p>
            Browse our curated selection of healthy farm animals. Connect directly with
            farmers and support local agriculture.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="animals-main">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <FiFilter size={20} />
            <h2>Filters</h2>
          </div>

          <div className="filter-group">
            <label htmlFor="animalType">Animal Type</label>
            <select
              id="animalType"
              value={animalType}
              onChange={(e) => {
                setAnimalType(e.target.value)
                setBreed('')
              }}
            >
              <option value="">All Types</option>
              {animalTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="breed">Breed</label>
            <select id="breed" value={breed} onChange={(e) => setBreed(e.target.value)}>
              <option value="">All Breeds</option>
              {breeds.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Age Range (months)</label>
            <div className="age-range-inputs">
              <input
                type="number"
                placeholder="0"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                min="0"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <button className="btn btn--clear-filters" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </aside>

        {/* Animals Grid */}
        <section className="animals-content">
          {/* Search Bar */}
          <div className="search-bar">
            <FiSearch size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, type, or breed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Results count */}
          <p className="results-count">{filteredAnimals.length} animals found</p>

          {/* Animals Grid */}
          <div className="animals-grid">
            {filteredAnimals.length === 0 ? (
              <p className="no-results">No animals match your filters.</p>
            ) : (
              filteredAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
