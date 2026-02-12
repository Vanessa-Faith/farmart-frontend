import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiPlus, FiPackage, FiDollarSign, FiTrendingUp, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { fetchAnimals, createAnimal, deleteAnimal, updateAnimal as updateAnimalThunk } from '../features/animals/animalsSlice'

export default function FarmerDashboard() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const animals = useSelector((state) => state.animals.list || [])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState(null)
  const [formData, setFormData] = useState({ name: '', animal_type: '', breed: '', age: '', weight: '', price: '', health_status: '', description: '', image: '' })

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch])

  const totalAnimals = animals.length
  const availableAnimals = animals.filter(a => a.status !== 'sold').length
  const soldAnimals = animals.filter(a => a.status === 'sold').length
  const totalValue = animals.filter(a => a.status !== 'sold').reduce((sum, a) => sum + (a.price || 0), 0)

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleAddAnimal = async (e) => {
    e.preventDefault()
    await dispatch(createAnimal({ title: formData.name, animal_type: formData.animal_type, breed: formData.breed, age: parseInt(formData.age), price: parseInt(formData.price), description: formData.description, image_url: formData.image }))
    await dispatch(fetchAnimals())
    setShowAddModal(false)
    resetForm()
  }

  const handleEditAnimal = async (e) => {
    e.preventDefault()
    await dispatch(updateAnimalThunk({ id: editingAnimal.id, data: { title: formData.name, animal_type: formData.animal_type, breed: formData.breed, age: parseInt(formData.age), price: parseInt(formData.price), description: formData.description, image_url: formData.image } }))
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
    setFormData({ name: animal.name || animal.title, animal_type: animal.animal_type, breed: animal.breed, age: animal.age?.toString() || '', weight: animal.weight?.toString() || '', price: animal.price?.toString() || '', health_status: animal.health_status || '', description: animal.description || '', image: animal.image_url || animal.image || '' })
  }

  const resetForm = () => setFormData({ name: '', animal_type: '', breed: '', age: '', weight: '', price: '', health_status: '', description: '', image: '' })

  return (
    <main className="min-h-screen bg-farm-dark py-10 px-5">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-white text-4xl font-bold mb-2">Welcome back, {user?.name || 'Farmer'}!</h1>
          <p className="text-farm-green-lighter">Manage your livestock listings and track your sales</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-farm-green-dark transition">
          <FiPlus size={20} />
          <span>Add Animal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-farm-bg p-6 rounded-xl flex items-center gap-4 border border-farm-green">
          <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white"><FiPackage size={24} /></div>
          <div><div className="text-white text-3xl font-bold">{totalAnimals}</div><div className="text-farm-green-lighter text-sm">Total Listings</div></div>
        </div>
        <div className="bg-farm-bg p-6 rounded-xl flex items-center gap-4 border border-farm-green">
          <div className="w-14 h-14 rounded-xl bg-farm-green flex items-center justify-center text-white"><FiTrendingUp size={24} /></div>
          <div><div className="text-white text-3xl font-bold">{availableAnimals}</div><div className="text-farm-green-lighter text-sm">Available</div></div>
        </div>
        <div className="bg-farm-bg p-6 rounded-xl flex items-center gap-4 border border-farm-green">
          <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center text-white"><FiDollarSign size={24} /></div>
          <div><div className="text-white text-3xl font-bold">{soldAnimals}</div><div className="text-farm-green-lighter text-sm">Sold</div></div>
        </div>
        <div className="bg-farm-bg p-6 rounded-xl flex items-center gap-4 border border-farm-green">
          <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center text-white"><FiDollarSign size={24} /></div>
          <div><div className="text-white text-3xl font-bold">${totalValue.toLocaleString()}</div><div className="text-farm-green-lighter text-sm">Total Value</div></div>
        </div>
      </div>

      <div className="bg-farm-bg p-6 rounded-xl border border-farm-green">
        <h2 className="text-white text-2xl font-bold mb-5">Your Listings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-farm-dark">
              <tr className="border-b-2 border-farm-green">
                <th className="p-3 text-left text-farm-green-lighter text-sm font-semibold">Animal</th>
                <th className="p-3 text-left text-farm-green-lighter text-sm font-semibold">Type</th>
                <th className="p-3 text-left text-farm-green-lighter text-sm font-semibold">Breed</th>
                <th className="p-3 text-left text-farm-green-lighter text-sm font-semibold">Age</th>
                <th className="p-3 text-left text-farm-green-lighter text-sm font-semibold">Price</th>
                <th className="p-3 text-left text-farm-green-lighter text-sm font-semibold">Status</th>
                <th className="p-3 text-left text-farm-green-lighter text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id} className="border-b border-farm-green">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={animal.image_url || animal.image || 'https://via.placeholder.com/48'} alt={animal.title || animal.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="text-white">{animal.title || animal.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{animal.animal_type}</td>
                  <td className="p-4 text-white">{animal.breed}</td>
                  <td className="p-4 text-white">{animal.age} mo</td>
                  <td className="p-4 text-farm-green-light font-semibold">${animal.price?.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${animal.status === 'available' ? 'bg-farm-green/20 text-farm-green-light' : 'bg-orange-500/20 text-orange-400'}`}>
                      {animal.status || 'available'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(animal)} className="p-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition"><FiEdit2 size={16} /></button>
                      <button onClick={() => handleDeleteAnimal(animal.id)} className="p-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition"><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {animals.length === 0 && (
            <div className="text-center py-16 text-farm-green-lighter">No animals listed yet. Click "Add Animal" to create your first listing!</div>
          )}
        </div>
      </div>

      {(showAddModal || editingAnimal) && (
        <>
          <div className="fixed inset-0 bg-black/70 z-40" onClick={() => { setShowAddModal(false); setEditingAnimal(null); resetForm(); }}></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-farm-bg p-8 rounded-xl max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto z-50 border border-farm-green">
            <h2 className="text-white text-2xl font-bold mb-6">{editingAnimal ? 'Edit Animal' : 'Add New Animal'}</h2>
            <form onSubmit={editingAnimal ? handleEditAnimal : handleAddAnimal} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" /></div>
                <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Animal Type</label><select name="animal_type" value={formData.animal_type} onChange={handleInputChange} required className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light"><option value="">Select type</option><option value="Cattle">Cattle</option><option value="Goat">Goat</option><option value="Sheep">Sheep</option><option value="Pig">Pig</option><option value="Poultry">Poultry</option><option value="Horse">Horse</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Breed</label><input type="text" name="breed" value={formData.breed} onChange={handleInputChange} required className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" /></div>
                <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Age (months)</label><input type="number" name="age" value={formData.age} onChange={handleInputChange} required min="1" className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Weight (lbs)</label><input type="number" name="weight" value={formData.weight} onChange={handleInputChange} min="1" className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" /></div>
                <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Price ($)</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="1" className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" /></div>
              </div>
              <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Health Status</label><input type="text" name="health_status" value={formData.health_status} onChange={handleInputChange} placeholder="e.g., Vaccinated, De-wormed" className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" /></div>
              <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Image URL</label><input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light" /></div>
              <div><label className="block text-farm-green-lighter text-sm font-semibold mb-2">Description</label><textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full p-2.5 bg-farm-dark border border-farm-green rounded-md text-white text-sm focus:outline-none focus:border-farm-green-light"></textarea></div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => { setShowAddModal(false); setEditingAnimal(null); resetForm(); }} className="flex-1 py-3 bg-transparent border border-farm-green text-farm-green-lighter rounded-lg font-semibold hover:bg-farm-green/10 transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-farm-green text-white rounded-lg font-semibold hover:bg-farm-green-dark transition">{editingAnimal ? 'Save Changes' : 'Add Animal'}</button>
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  )
}
