import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals } from '../features/animals/animalsSlice.js';
import AnimalCard from '../features/animals/components/AnimalCard.jsx';

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

const AnimalsList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.animals);
  const [filters, setFilters] = useState({ type: '', breed: '', minAge: '', maxAge: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAnimals({}));
  }, [dispatch]);

  const displayList = useMemo(() => {
    if (list.length === 0) return mockAnimals;
    return list.map(animal => ({
      ...animal,
      images: animal.images || (animal.image_url ? [animal.image_url] : [animal.image]),
      type: animal.type || animal.animal_type,
      age_months: animal.age_months || animal.age,
      price_per_unit: animal.price_per_unit || animal.price
    }));
  }, [list]);
  const animalTypes = useMemo(() => [...new Set(displayList.map(a => a.type).filter(Boolean))], [displayList]);
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
    <div className="min-h-screen bg-farm-dark">
      <section className="bg-gradient-to-r from-black/60 to-black/60 bg-cover bg-center py-20 px-10 text-center text-white" style={{backgroundImage: "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200')"}}>
        <h1 className="text-5xl font-bold mb-4">Quality Livestock, Straight from the Farm</h1>
        <p className="text-base max-w-3xl mx-auto opacity-90">Browse our curated selection of healthy farm animals. Connect directly with farmers and support local agriculture.</p>
      </section>

      <div className="flex max-w-7xl mx-auto py-10 px-5 gap-8">
        <aside className="w-72 bg-farm-bg p-6 rounded-lg h-fit sticky top-5 border border-farm-green">
          <div className="text-lg font-semibold text-white mb-6">Filters</div>
          
          <div className="mb-6">
            <label className="block text-xs font-semibold text-farm-green-lighter mb-2 tracking-wide">ANIMAL TYPE</label>
            <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value, breed: ''})} className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light">
              <option value="">All Types</option>
              {animalTypes.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-farm-green-lighter mb-2 tracking-wide">BREED</label>
            <select value={filters.breed} onChange={(e) => setFilters({...filters, breed: e.target.value})} className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light">
              <option value="">All Breeds</option>
              {breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-farm-green-lighter mb-2 tracking-wide">AGE RANGE (MONTHS)</label>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="0" value={filters.minAge} onChange={(e) => setFilters({...filters, minAge: e.target.value})} className="w-20 p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" />
              <span className="text-farm-green-lighter">-</span>
              <input type="number" placeholder="Max" value={filters.maxAge} onChange={(e) => setFilters({...filters, maxAge: e.target.value})} className="w-20 p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" />
            </div>
          </div>

          <button onClick={() => setFilters({ type: '', breed: '', minAge: '', maxAge: '' })} className="w-full p-2.5 bg-transparent border border-farm-green rounded-md text-farm-green-lighter text-sm hover:bg-farm-green hover:text-white transition">
            Clear Filters
          </button>
        </aside>

        <main className="flex-1">
          <div className="mb-5">
            <input type="text" placeholder="Search by name, type, or breed..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3.5 bg-farm-bg border border-farm-green rounded-lg text-white text-base placeholder-farm-green-lighter focus:outline-none focus:border-farm-green-light" />
          </div>

          <div className="text-farm-green-lighter text-sm mb-6">{filteredList.length} animals found</div>

          {loading ? (
            <div className="text-center py-16 text-farm-green-lighter">Loading animals...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredList.length === 0 ? (
                <div className="col-span-full text-center py-16 text-farm-green-lighter">No animals found</div>
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
