import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimalsList from './pages/AnimalsList';
import AnimalDetail from './pages/AnimalDetail';
import AddAnimal from './pages/AddAnimal';
import EditAnimal from './pages/EditAnimal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalsList />} />
        <Route path="/animals" element={<AnimalsList />} />
        <Route path="/animals/new" element={<AddAnimal />} />
        <Route path="/animals/:id" element={<AnimalDetail />} />
        <Route path="/animals/:id/edit" element={<EditAnimal />} />
      </Routes>
    </Router>
  );
}

export default App;
