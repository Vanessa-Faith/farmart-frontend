import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const fetchAnimals = createAsyncThunk(
  'animals/fetchAnimals',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.breed) params.append('breed', filters.breed);
      if (filters.min_age) params.append('min_age', filters.min_age);
      if (filters.max_age) params.append('max_age', filters.max_age);
      if (filters.county) params.append('county', filters.county);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      
      const response = await axios.get(`${API_URL}/animals?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch animals');
    }
  }
);

export const fetchAnimalById = createAsyncThunk(
  'animals/fetchAnimalById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/animals/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch animal');
    }
  }
);

export const createAnimal = createAsyncThunk(
  'animals/createAnimal',
  async (animalData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      const response = await axios.post(`${API_URL}/animals`, animalData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create animal');
    }
  }
);

export const updateAnimal = createAsyncThunk(
  'animals/updateAnimal',
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      const response = await axios.put(`${API_URL}/animals/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update animal');
    }
  }
);

export const deleteAnimal = createAsyncThunk(
  'animals/deleteAnimal',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      await axios.delete(`${API_URL}/animals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete animal');
    }
  }
);

export const uploadAnimalImage = createAsyncThunk(
  'animals/uploadImage',
  async ({ id, formData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      const response = await axios.post(`${API_URL}/animals/${id}/upload-image`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
    }
  }
);

const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    list: [],
    currentAnimal: null,
    filters: {
      type: '',
      breed: '',
      min_age: '',
      max_age: '',
      county: '',
      search: '',
      sort: ''
    },
    loading: false,
    error: null
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        type: '',
        breed: '',
        min_age: '',
        max_age: '',
        county: '',
        search: '',
        sort: ''
      };
    },
    clearCurrentAnimal: (state) => {
      state.currentAnimal = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchAnimalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimalById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAnimal = action.payload;
      })
      .addCase(fetchAnimalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.list.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
        state.currentAnimal = action.payload;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.list = state.list.filter(a => a.id !== action.payload);
      });
  }
});

export const { setFilters, clearFilters, clearCurrentAnimal } = animalsSlice.actions;
export default animalsSlice.reducer;
