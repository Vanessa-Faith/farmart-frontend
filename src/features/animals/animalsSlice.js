import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  status: 'idle',
}

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addAnimal(state, action) {
      state.items.push(action.payload)
    },
    updateAnimal(state, action) {
      const idx = state.items.findIndex(a => a.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    },
    removeAnimal(state, action) {
      state.items = state.items.filter(a => a.id !== action.payload)
    },
    setAnimals(state, action) {
      state.items = action.payload
    },
  },
})

export const { addAnimal, updateAnimal, removeAnimal, setAnimals } = animalsSlice.actions
export default animalsSlice.reducer
