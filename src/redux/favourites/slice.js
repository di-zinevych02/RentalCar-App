import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const id = action.payload;
      if (!state.items.includes(id)) {
        state.items.push(id);
      }
    },
    removeFromFavorites(state, action) {
      const id = action.payload;
      state.items = state.items.filter((itemId) => itemId !== id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
// redux persist