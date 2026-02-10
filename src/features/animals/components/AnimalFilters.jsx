import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters, fetchAnimals } from '../animalsSlice';
import './AnimalFilters.css';

const AnimalFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.animals.filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleApply = () => {
    dispatch(fetchAnimals(filters));
  };

  return (
    <div className="animal-filters">
      <div className="filter-header">
        <button className="btn-filter">Filter</button>
        <button className="btn-sort">Sort</button>
      </div>

      <div className="filter-group">
        <label>Type</label>
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">Select Type</option>
          <option value="cattle">Cattle</option>
          <option value="goat">Goat</option>
          <option value="sheep">Sheep</option>
          <option value="chicken">Chicken</option>
          <option value="pig">Pig</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Breed</label>
        <select name="breed" value={filters.breed} onChange={handleFilterChange}>
          <option value="">Select Breed</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Age</label>
        <div className="age-range">
          <input type="number" name="min_age" placeholder="Min" value={filters.min_age} onChange={handleFilterChange} />
          <span>Years / Months</span>
        </div>
      </div>

      <div className="filter-group">
        <label>Price</label>
        <input type="number" name="price" placeholder="$" />
      </div>

      <div className="filter-group">
        <label>Sort:</label>
        <select name="sort" value={filters.sort} onChange={handleFilterChange}>
          <option value="">Select</option>
          <option value="price_asc">Price Low-High</option>
          <option value="price_desc">Price High-Low</option>
        </select>
      </div>

      <button className="btn-show-results" onClick={handleApply}>Show Results</button>
    </div>
  );
};

export default AnimalFilters;
