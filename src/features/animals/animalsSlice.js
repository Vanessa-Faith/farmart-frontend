import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.js';

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
    const formData = new FormData();
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
    setList(state, action) {
      state.list = action.payload;
    },
    addItem(state, action) {
      state.list.push(action.payload);
    },
    removeItem(state, action) {
      state.list = state.list.filter(a => a.id !== action.payload);
    },
    updateItem(state, action) {
      const index = state.list.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
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

export const { setFilters, clearFilters, clearCurrentAnimal, setList, addItem, removeItem, updateItem } = animalsSlice.actions;

// Legacy exports for backward compatibility
export const setAnimals = setList;
export const addAnimal = addItem;

export default animalsSlice.reducer;
