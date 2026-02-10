import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals } from '../features/animals/animalsSlice';
import AnimalCard from '../features/animals/components/AnimalCard';
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
    images: ['https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400']
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
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400']
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
    images: ['https://images.unsplash.com/photo-1558507652-2d9626c4e67a?w=400']
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

  const displayList = useMockData ? mockAnimals : list;
  const filteredList = displayList.filter(animal => 
    animal.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filters.type || animal.type === filters.type)
  );

  return (
    <div className="animals-page">
      <section className="hero-section">
        <h1>Quality Livestock, Straight from the Farm</h1>
        <p>Browse our curated selection of healthy farm animals. Connect directly with farmers and support local agriculture.</p>
      </section>

      <div className="content-wrapper">
        <aside className="filters-sidebar">
          <div className="filter-header">
            <span>🔽</span> Filters
          </div>
          
          <div className="filter-group">
            <label>ANIMAL TYPE</label>
            <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
              <option value="">All Types</option>
              <option value="cattle">Cattle</option>
              <option value="goat">Goat</option>
              <option value="sheep">Sheep</option>
              <option value="chicken">Chicken</option>
              <option value="pig">Pig</option>
            </select>
          </div>

          <div className="filter-group">
            <label>BREED</label>
            <select value={filters.breed} onChange={(e) => setFilters({...filters, breed: e.target.value})}>
              <option value="">All Breeds</option>
            </select>
          </div>

          <div className="filter-group">
            <label>AGE RANGE (MONTHS)</label>
            <div className="age-inputs">
              <input type="number" placeholder="0" value={filters.minAge} onChange={(e) => setFilters({...filters, minAge: e.target.value})} />
              <span>-</span>
              <input type="number" placeholder="Max" value={filters.maxAge} onChange={(e) => setFilters({...filters, maxAge: e.target.value})} />
            </div>
          </div>

          <button className="clear-filters" onClick={() => setFilters({ type: '', breed: '', minAge: '', maxAge: '' })}>Clear Filters</button>
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
