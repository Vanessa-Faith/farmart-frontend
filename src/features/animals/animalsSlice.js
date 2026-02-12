// Redux Toolkit helpers for slice and async actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Axios instance for API calls
import api from '../../services/api.js';

// Initial state for animals slice
const initialState = {
  list: [], // All animals
  current: null, // Currently viewed animal
  filters: {}, // Active filters
  loading: false, // Loading state
  error: null, // Error message
};

// Async thunks for API calls
// Fetch all animals with optional filters
export const fetchAnimals = createAsyncThunk(
  'animals/fetchAll',
  async (filters = {}) => {
    const response = await api.get('/animals', { params: filters });
    return response.data;
  }
);

// Fetch a single animal by ID
export const fetchAnimalById = createAsyncThunk(
  'animals/fetchById',
  async (id) => {
    const response = await api.get(`/animals/${id}`);
    return response.data;
  }
);

// Create a new animal (with file upload support)
export const createAnimal = createAsyncThunk(
  'animals/create',
  async (animalData) => {
    const formData = new FormData();
    // Append all fields to FormData for multipart upload
    Object.keys(animalData).forEach(key => {
      if (animalData[key] !== null && animalData[key] !== undefined) {
        formData.append(key, animalData[key]);
      }
    });
    const response = await api.post('/animals', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
);

// Update an existing animal (with file upload support)
export const updateAnimal = createAsyncThunk(
  'animals/update',
  async ({ id, data }) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    const response = await api.put(`/animals/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
);

// Delete an animal by ID
export const deleteAnimal = createAsyncThunk(
  'animals/delete',
  async (id) => {
    await api.delete(`/animals/${id}`);
    return id;
  }
);

// Create the animals slice with reducers and extraReducers for async thunks
const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    // Set filters for animal list
    setFilters(state, action) {
      state.filters = action.payload;
    },
    // Clear all filters
    clearFilters(state) {
      state.filters = {};
    },
    // Clear the currently viewed animal
    clearCurrentAnimal(state) {
      state.current = null;
    },
    // Set the animal list
    setList(state, action) {
      state.list = action.payload;
    },
    // Add a new animal to the list
    addItem(state, action) {
      state.list.push(action.payload);
    },
    // Remove an animal from the list by ID
    removeItem(state, action) {
      state.list = state.list.filter(a => a.id !== action.payload);
    },
    // Update an animal in the list
    updateItem(state, action) {
      const index = state.list.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch all animals async states
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetch single animal async states
      .addCase(fetchAnimalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimalById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchAnimalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle create animal async state
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Handle update animal async state
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.list.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      // Handle delete animal async state
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.list = state.list.filter(a => a.id !== action.payload);
      });
  },
});

// Export actions for use in components
export const { setFilters, clearFilters, clearCurrentAnimal, setList, addItem, removeItem, updateItem } = animalsSlice.actions;

// Legacy exports for backward compatibility
export const setAnimals = setList;
export const addAnimal = addItem;

// Export the reducer as default
export default animalsSlice.reducer;
