import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals } from '../features/animals/animalsSlice.js';
import AnimalCard from '../features/animals/components/AnimalCard.jsx';
import './AnimalsList.css';

const mockAnimals = [
  {
    id: 1,
    title: 'Bessie',
    breed: 'Holstein',
    type: 'cattle',
    age_months: 24,
    price_per_unit: 2500,
    weight_lbs: 1400,
    quantity_available: 1,
    health_status: 'Vaccinated, Excellent health',
    images: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400']
  },
  {
    id: 2,
    title: 'Billy',
    breed: 'Boer',
    type: 'goat',
    age_months: 18,
    price_per_unit: 450,
    weight_lbs: 180,
    quantity_available: 2,
    health_status: 'Healthy, De-wormed',
    images: ['https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=400']
  },
  {
    id: 3,
    title: 'Woolly',
    breed: 'Merino',
    type: 'sheep',
    age_months: 12,
    price_per_unit: 350,
    weight_lbs: 150,
    quantity_available: 3,
    health_status: 'Recently sheared, vaccinated',
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400']
  },
  {
    id: 4,
    title: 'Daisy',
    breed: 'Jersey',
    type: 'cattle',
    age_months: 36,
    price_per_unit: 3200,
    weight_lbs: 1200,
    quantity_available: 1,
    health_status: 'Excellent milk producer',
    images: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400']
  },
  {
    id: 5,
    title: 'Clucky',
    breed: 'Rhode Island Red',
    type: 'chicken',
    age_months: 8,
    price_per_unit: 25,
    weight_lbs: 6,
    quantity_available: 10,
    health_status: 'Laying hens, vaccinated',
    images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400']
  },
  {
    id: 6,
    title: 'Porky',
    breed: 'Yorkshire',
    type: 'pig',
    age_months: 6,
    price_per_unit: 280,
    weight_lbs: 220,
    quantity_available: 3,
    health_status: 'Healthy, ready for market',
    images: ['https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400']
  },
  {
    id: 7,
    title: 'Nanny',
    breed: 'Saanen',
    type: 'goat',
    age_months: 24,
    price_per_unit: 550,
    weight_lbs: 150,
    quantity_available: 1,
    health_status: 'Excellent milk goat',
    images: ['https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=400']
  },
  {
    id: 8,
    title: 'Angus',
    breed: 'Black Angus',
    type: 'cattle',
    age_months: 18,
    price_per_unit: 2800,
    weight_lbs: 1600,
    quantity_available: 2,
    health_status: 'Prime beef cattle',
    images: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400']
  },
  {
    id: 9,
    title: 'Fluffy',
    breed: 'Suffolk',
    type: 'sheep',
    age_months: 15,
    price_per_unit: 400,
    weight_lbs: 180,
    quantity_available: 4,
    health_status: 'Good wool quality',
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400']
  },
  {
    id: 10,
    title: 'Henny',
    breed: 'Leghorn',
    type: 'chicken',
    age_months: 10,
    price_per_unit: 30,
    weight_lbs: 5,
    quantity_available: 15,
    health_status: 'High egg production',
    images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400']
  },
  {
    id: 11,
    title: 'Hamlet',
    breed: 'Duroc',
    type: 'pig',
    age_months: 8,
    price_per_unit: 320,
    weight_lbs: 250,
    quantity_available: 2,
    health_status: 'Fast growing, healthy',
    images: ['https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400']
  },
  {
    id: 12,
    title: 'Rambo',
    breed: 'Dorper',
    type: 'sheep',
    age_months: 20,
    price_per_unit: 450,
    weight_lbs: 200,
    quantity_available: 1,
    health_status: 'Breeding ram, excellent genetics',
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400']
  }
];

const AnimalsList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.animals);
  const [filters, setFilters] = useState({ type: '', breed: '', minAge: '', maxAge: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [useMockData, setUseMockData] = useState(false);

  const loadAnimals = useCallback(() => {
    dispatch(fetchAnimals({})).catch(() => setUseMockData(true));
  }, [dispatch]);

  useEffect(() => {
    loadAnimals();
  }, [loadAnimals]);

  const displayList = list.length > 0 ? list : (useMockData ? mockAnimals : []);
  
  const animalTypes = useMemo(() => 
    [...new Set(displayList.map(a => a.type).filter(Boolean))],
    [displayList]
  );

  const breeds = useMemo(() => {
    const filtered = filters.type ? displayList.filter(a => a.type === filters.type) : displayList;
    return [...new Set(filtered.map(a => a.breed).filter(Boolean))];
  }, [displayList, filters.type]);

  const filteredList = useMemo(() => {
    return displayList.filter(animal => {
      const matchesSearch = !searchTerm || 
        animal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !filters.type || animal.type === filters.type;
      const matchesBreed = !filters.breed || animal.breed === filters.breed;
      const matchesMinAge = !filters.minAge || animal.age_months >= parseInt(filters.minAge);
      const matchesMaxAge = !filters.maxAge || animal.age_months <= parseInt(filters.maxAge);
      
      return matchesSearch && matchesType && matchesBreed && matchesMinAge && matchesMaxAge;
    });
  }, [displayList, searchTerm, filters]);

  return (
    <div className="animals-page">
      <section className="hero-section">
        <h1>Quality Livestock, Straight from the Farm</h1>
        <p>Browse our curated selection of healthy farm animals. Connect directly with farmers and support local agriculture.</p>
      </section>

      <div className="content-wrapper">
        <aside className="filters-sidebar">
          <div className="filter-header">
            Filters
          </div>
          
          <div className="filter-group">
            <label>ANIMAL TYPE</label>
            <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value, breed: ''})}>
              <option value="">All Types</option>
              {animalTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>BREED</label>
            <select value={filters.breed} onChange={(e) => setFilters({...filters, breed: e.target.value})}>
              <option value="">All Breeds</option>
              {breeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>AGE RANGE (MONTHS)</label>
            <div className="age-inputs">
              <input 
                type="number" 
                placeholder="0" 
                value={filters.minAge} 
                onChange={(e) => setFilters({...filters, minAge: e.target.value})} 
              />
              <span>-</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={filters.maxAge} 
                onChange={(e) => setFilters({...filters, maxAge: e.target.value})} 
              />
            </div>
          </div>

          <button 
            className="clear-filters" 
            onClick={() => setFilters({ type: '', breed: '', minAge: '', maxAge: '' })}
          >
            Clear Filters
          </button>
        </aside>

        <main className="animals-content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name, type, or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="results-count">{filteredList.length} animals found</div>

          {loading && !useMockData ? (
            <div className="loading">Loading animals...</div>
          ) : (
            <div className="animals-grid">
              {filteredList.length === 0 ? (
                <div className="no-animals">No animals found</div>
              ) : (
                filteredList.map(animal => <AnimalCard key={animal.id} animal={animal} />)
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AnimalsList;
