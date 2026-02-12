import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || error.response?.data?.message || error.message || 'Login failed');
  }
});

export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const response = await api.post('/auth/register', payload);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || error.response?.data?.message || error.message || 'Registration failed');
  }
});

const initialState = {
  user: null,
  token: localStorage.getItem('access_token') || null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('access_token');
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      if (action.payload.access_token) {
        localStorage.setItem('access_token', action.payload.access_token);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
