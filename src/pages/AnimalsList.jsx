import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAnimals } from '../features/animals/animalsSlice';
import AnimalCard from '../features/animals/components/AnimalCard';
import AnimalFilters from '../features/animals/components/AnimalFilters';
import './AnimalsList.css';

const mockAnimals = [
  {
    id: 1,
    title: 'Daisy the Cow',
    breed: 'Friesian',
    type: 'cattle',
    age_months: 24,
    price_per_unit: 500,
    quantity_available: 1,
    county: 'Nairobi',
    images: []
  },
  {
    id: 2,
    title: 'Bella the Goat',
    breed: 'Boer',
    type: 'goat',
    age_months: 12,
    price_per_unit: 300,
    quantity_available: 2,
    county: 'Kiambu',
    images: []
  }
];

const AnimalsList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.animals);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [useMockData, setUseMockData] = useState(false);

  const loadAnimals = useCallback(() => {
    dispatch(fetchAnimals({})).catch(() => {
      setUseMockData(true);
    });
  }, [dispatch]);

  useEffect(() => {
    loadAnimals();
  }, [loadAnimals]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const displayList = useMockData ? mockAnimals : list;

  if (loading && !useMockData) return <div className="loading">Loading animals...</div>;

  return (
    <div className="animals-list-page">
      <header className="page-header">
        <h1>Browse Animals</h1>
        <button className="menu-btn">Menu</button>
      </header>

      <div className="search-bar">
        <span className="search-icon">Search</span>
        <input
          type="text"
          placeholder="Search animals..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="total-animals">Total Animals: {displayList.length}</div>

      {showFilters && <AnimalFilters />}

      <div className="animals-list">
        {displayList.length === 0 ? (
          <div className="no-animals">No animals found</div>
        ) : (
          displayList.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))
        )}
      </div>
    </div>
  );
};

export default AnimalsList;
