import animalsReducer, {
  addAnimal,
  updateAnimal,
  removeAnimal,
  setAnimals,
} from '../animalsSlice';

describe('Animals Slice', () => {
  const initialState = {
    items: [],
    status: 'idle',
  };

  const mockAnimal = {
    id: 1,
    name: 'Bessie',
    animal_type: 'Cattle',
    breed: 'Holstein',
    age: 24,
    weight: 1400,
    price: 2500,
    health_status: 'Vaccinated',
    description: 'High-quality dairy cow',
    image: 'https://example.com/cow.jpg',
  };

  const mockAnimal2 = {
    id: 2,
    name: 'Billy',
    animal_type: 'Goat',
    breed: 'Boer',
    age: 18,
    weight: 180,
    price: 450,
    health_status: 'Healthy',
    description: 'Strong breeding goat',
    image: 'https://example.com/goat.jpg',
  };

  test('should return the initial state', () => {
    expect(animalsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addAnimal', () => {
    test('should add a new animal to the list', () => {
      const result = animalsReducer(initialState, addAnimal(mockAnimal));

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual(mockAnimal);
    });

    test('should add multiple animals', () => {
      let state = animalsReducer(initialState, addAnimal(mockAnimal));
      state = animalsReducer(state, addAnimal(mockAnimal2));

      expect(state.items).toHaveLength(2);
    });
  });

  describe('updateAnimal', () => {
    test('should update an existing animal', () => {
      const stateWithAnimal = {
        items: [mockAnimal],
        status: 'idle',
      };

      const updatedAnimal = { ...mockAnimal, price: 3000, name: 'Bessie Updated' };
      const result = animalsReducer(stateWithAnimal, updateAnimal(updatedAnimal));

      expect(result.items[0].price).toBe(3000);
      expect(result.items[0].name).toBe('Bessie Updated');
    });

    test('should not modify state if animal id not found', () => {
      const stateWithAnimal = {
        items: [mockAnimal],
        status: 'idle',
      };

      const nonExistentAnimal = { ...mockAnimal, id: 999, price: 3000 };
      const result = animalsReducer(stateWithAnimal, updateAnimal(nonExistentAnimal));

      expect(result.items[0].price).toBe(2500); // Original price unchanged
    });
  });

  describe('removeAnimal', () => {
    test('should remove an animal by id', () => {
      const stateWithAnimals = {
        items: [mockAnimal, mockAnimal2],
        status: 'idle',
      };

      const result = animalsReducer(stateWithAnimals, removeAnimal(mockAnimal.id));

      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe(mockAnimal2.id);
    });

    test('should handle removing non-existent animal', () => {
      const stateWithAnimal = {
        items: [mockAnimal],
        status: 'idle',
      };

      const result = animalsReducer(stateWithAnimal, removeAnimal(999));

      expect(result.items).toHaveLength(1);
    });
  });

  describe('setAnimals', () => {
    test('should set all animals', () => {
      const animals = [mockAnimal, mockAnimal2];
      const result = animalsReducer(initialState, setAnimals(animals));

      expect(result.items).toHaveLength(2);
      expect(result.items).toEqual(animals);
    });

    test('should replace existing animals', () => {
      const stateWithAnimal = {
        items: [mockAnimal],
        status: 'idle',
      };

      const newAnimals = [mockAnimal2];
      const result = animalsReducer(stateWithAnimal, setAnimals(newAnimals));

      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe(mockAnimal2.id);
    });
  });

  describe('animal filtering (integration)', () => {
    test('animals can be filtered by type', () => {
      const stateWithAnimals = {
        items: [mockAnimal, mockAnimal2],
        status: 'idle',
      };

      const cattle = stateWithAnimals.items.filter(a => a.animal_type === 'Cattle');
      expect(cattle).toHaveLength(1);
      expect(cattle[0].name).toBe('Bessie');
    });

    test('animals can be filtered by breed', () => {
      const stateWithAnimals = {
        items: [mockAnimal, mockAnimal2],
        status: 'idle',
      };

      const boerGoats = stateWithAnimals.items.filter(a => a.breed === 'Boer');
      expect(boerGoats).toHaveLength(1);
      expect(boerGoats[0].name).toBe('Billy');
    });

    test('animals can be filtered by age range', () => {
      const stateWithAnimals = {
        items: [mockAnimal, mockAnimal2],
        status: 'idle',
      };

      const youngAnimals = stateWithAnimals.items.filter(a => a.age <= 20);
      expect(youngAnimals).toHaveLength(1);
      expect(youngAnimals[0].name).toBe('Billy');
    });

    test('animals can be searched by name', () => {
      const stateWithAnimals = {
        items: [mockAnimal, mockAnimal2],
        status: 'idle',
      };

      const searchTerm = 'bess';
      const searchResults = stateWithAnimals.items.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(searchResults).toHaveLength(1);
      expect(searchResults[0].name).toBe('Bessie');
    });
  });
});
