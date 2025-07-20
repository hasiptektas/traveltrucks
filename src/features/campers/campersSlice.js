import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '../../api/campersApi';

export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async () => {
    const response = await fetchCampers(); // parametre yok!
    return response.data.items;
  }
);

export const getCamperDetail = createAsyncThunk(
  'campers/getCamperDetail',
  async (id) => {
    const response = await fetchCamperById(id);
    return response.data;
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    list: [],
    detail: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampers.pending, (state) => { state.status = 'loading'; })
      .addCase(getCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(getCampers.rejected, (state) => { state.status = 'failed'; })
      .addCase(getCamperDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
      });
  },
});

export default campersSlice.reducer; 