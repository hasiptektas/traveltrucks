import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  form: '',
  AC: false,
  kitchen: false,
  // Diğer filtreler...
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer; 