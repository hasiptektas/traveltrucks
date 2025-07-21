import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('favorites')) || [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.includes(id)) {
        return state.filter(favId => favId !== id);
      } else {
        return [...state, id];
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// Favoriler değişince localStorage'a kaydet
export const subscribeFavoritesToLocalStorage = (store) => {
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  });
}; 