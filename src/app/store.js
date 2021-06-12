import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  weather: {
    city: '',
    icon: '',
    temperature: '',
    description: '',
    windSpeed: ''
  },
  timestamp: Date.now(),
  status: 'idle',
  error: ''
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: { }
});

// export const { } = weatherSlice.actions;

export const store = configureStore({
  reducer: weatherSlice.reducer
});
