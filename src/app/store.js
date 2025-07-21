import { configureStore } from '@reduxjs/toolkit';
import campersReducer from '../features/campers/campersSlice';
import filtersReducer from '../features/filters/filtersSlice';
import favoritesReducer, { subscribeFavoritesToLocalStorage } from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

// Favoriler değişince localStorage'a kaydet
subscribeFavoritesToLocalStorage(store); 