import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  list: [],
  current: null,
  filters: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchAnimals = createAsyncThunk(
  'animals/fetchAll',
  async (filters = {}) => {
    const response = await api.get('/animals', { params: filters });
    return response.data;
  }
);

export const fetchAnimalById = createAsyncThunk(
  'animals/fetchById',
  async (id) => {
    const response = await api.get(`/animals/${id}`);
    return response.data;
  }
);

export const createAnimal = createAsyncThunk(
  'animals/create',
  async (animalData) => {
    const response = await api.post('/animals', animalData);
    return response.data;
  }
);

export const updateAnimal = createAsyncThunk(
  'animals/update',
  async ({ id, data }) => {
    const response = await api.put(`/animals/${id}`, data);
    return response.data;
  }
);

export const deleteAnimal = createAsyncThunk(
  'animals/delete',
  async (id) => {
    await api.delete(`/animals/${id}`);
    return id;
  }
);

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = {};
    },
    clearCurrentAnimal(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all animals
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
      // Fetch single animal
      .addCase(fetchAnimalById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      // Create animal
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Update animal
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.list.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      // Delete animal
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.list = state.list.filter(a => a.id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters, clearCurrentAnimal } = animalsSlice.actions;

// Legacy exports for backward compatibility
export const addAnimal = createAnimal;
export const removeAnimal = deleteAnimal;
export const setAnimals = (animals) => ({ type: 'animals/setList', payload: animals });

export default animalsSlice.reducer;
