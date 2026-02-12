import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals } from '../features/animals/animalsSlice.js';
import AnimalCard from '../features/animals/components/AnimalCard.jsx';

const mockAnimals = [
  { id: 1, title: 'Hen', breed: 'Rhode Island Red', type: 'chicken', age_months: 8, price_per_unit: 25, weight_lbs: 6, quantity_available: 10, health_status: 'Laying hens, vaccinated', images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'] },
  { id: 2, title: 'Cock', breed: 'Leghorn', type: 'chicken', age_months: 12, price_per_unit: 30, weight_lbs: 7, quantity_available: 5, health_status: 'Healthy, active', images: ['https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400'] },
  { id: 3, title: 'Goat', breed: 'Boer', type: 'goat', age_months: 18, price_per_unit: 450, weight_lbs: 180, quantity_available: 2, health_status: 'Healthy, de-wormed', images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400'] },
  { id: 4, title: 'Sheep (Female)', breed: 'Merino', type: 'sheep', age_months: 14, price_per_unit: 350, weight_lbs: 120, quantity_available: 3, health_status: 'Recently sheared, vaccinated', images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400'] },
  { id: 5, title: 'Sheep (Male)', breed: 'Dorper', type: 'sheep', age_months: 20, price_per_unit: 400, weight_lbs: 200, quantity_available: 2, health_status: 'Breeding ram, excellent genetics', images: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'] },
  { id: 6, title: 'Goose (Female)', breed: 'Embden', type: 'goose', age_months: 16, price_per_unit: 60, weight_lbs: 12, quantity_available: 4, health_status: 'Healthy, laying eggs', images: ['https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400'] },
  { id: 7, title: 'Goose (Male)', breed: 'Toulouse', type: 'goose', age_months: 18, price_per_unit: 65, weight_lbs: 14, quantity_available: 3, health_status: 'Strong, healthy', images: ['https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400'] },
  { id: 8, title: 'Goose (Couple)', breed: 'Chinese', type: 'goose', age_months: 20, price_per_unit: 120, weight_lbs: 26, quantity_available: 2, health_status: 'Bonded pair, healthy', images: ['https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400'] },
  { id: 9, title: 'Duck (Female)', breed: 'Pekin', type: 'duck', age_months: 10, price_per_unit: 35, weight_lbs: 8, quantity_available: 6, health_status: 'Laying eggs, healthy', images: ['https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400'] },
  { id: 10, title: 'Duck (Male)', breed: 'Mallard', type: 'duck', age_months: 12, price_per_unit: 38, weight_lbs: 9, quantity_available: 4, health_status: 'Strong, healthy', images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400'] },
  { id: 11, title: 'Duck (Couple)', breed: 'Rouen', type: 'duck', age_months: 14, price_per_unit: 70, weight_lbs: 17, quantity_available: 2, health_status: 'Bonded pair, healthy', images: ['https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400'] },
  { id: 12, title: 'Dairy Cow', breed: 'Holstein', type: 'cattle', age_months: 36, price_per_unit: 3200, weight_lbs: 1200, quantity_available: 1, health_status: 'Excellent milk producer', images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'] },
  { id: 13, title: 'Bull', breed: 'Angus', type: 'cattle', age_months: 48, price_per_unit: 3500, weight_lbs: 1800, quantity_available: 1, health_status: 'Prime beef bull, vaccinated', images: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'] },
  { id: 14, title: 'Horse (Female)', breed: 'Arabian', type: 'horse', age_months: 60, price_per_unit: 5000, weight_lbs: 900, quantity_available: 1, health_status: 'Healthy, trained', images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400'] },
  { id: 15, title: 'Horse (Male)', breed: 'Thoroughbred', type: 'horse', age_months: 72, price_per_unit: 5200, weight_lbs: 1100, quantity_available: 1, health_status: 'Strong, race trained', images: ['https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400'] },
  { id: 16, title: 'Horse (Couple)', breed: 'Quarter Horse', type: 'horse', age_months: 66, price_per_unit: 9500, weight_lbs: 2000, quantity_available: 2, health_status: 'Bonded pair, healthy', images: ['https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400'] },
  { id: 17, title: 'Pony', breed: 'Shetland', type: 'pony', age_months: 40, price_per_unit: 1200, weight_lbs: 400, quantity_available: 1, health_status: 'Gentle, good for kids', images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400'] },
  { id: 18, title: 'Pig', breed: 'Yorkshire', type: 'pig', age_months: 8, price_per_unit: 320, weight_lbs: 250, quantity_available: 2, health_status: 'Fast growing, healthy', images: ['https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400'] },
  { id: 19, title: 'Rabbit', breed: 'New Zealand', type: 'rabbit', age_months: 6, price_per_unit: 40, weight_lbs: 8, quantity_available: 8, health_status: 'Healthy, ready for breeding', images: ['https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=400'] },
  { id: 20, title: 'Turkey', breed: 'Broad Breasted White', type: 'turkey', age_months: 16, price_per_unit: 60, weight_lbs: 20, quantity_available: 3, health_status: 'Healthy, ready for market', images: ['https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400'] }
];

const AnimalsList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.animals);
  const [filters, setFilters] = useState({ type: '', breed: '', minAge: '', maxAge: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAnimals({}));
  }, [dispatch]);

  const displayList = list.length > 0 ? list : mockAnimals;
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
