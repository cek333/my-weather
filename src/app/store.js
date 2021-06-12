import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/API';

const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes as milliseconds

const initialState = {
  weather: {
    city: '',
    icon: 'empty',
    temperature: '',
    description: '',
    windSpeed: ''
  },
  timestamp: Date.now(),
  status: 'idle',
  error: ''
};

export const refreshData = createAsyncThunk(
  'weather/refresh',
  async (newCity) => {
    const response = await API.refreshWeatherData(newCity);
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
  {
    condition: (newCity, { getState }) => {
      const { weather: { city }, timestamp } = getState();
      if (city === newCity) {
        // Check if 10min has elaspse
        if ((Date.now() - timestamp) < TEN_MINUTES) {
          console.log('Refresh Aborted! Less than 10min have passed!');
          return false;
        }
      }
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: { },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(refreshData.pending, (state) => {
        state.status = 'loading';
        // Clear any previous error
        state.error = '';
      })
      .addCase(refreshData.fulfilled, (state, action) => {
        // console.log('refreshData.fulfilled data=', action.payload);
        if (action.payload) {
          const {
            name,
            weather: {
              summary: {
                description,
                icon
              },
              temperature: {
                actual
              },
              wind: {
                speed
              }
            }
          } = action.payload;
          state.weather.city = name;
          state.weather.icon = icon;
          state.weather.temperature = actual;
          state.weather.description = description;
          state.weather.windSpeed = speed;
          state.timestamp = Date.now();
        } else {
          // City specified was invalid
          state.error = 'Unable to get data for city specified.'
        }
        state.status = 'idle';
      })
      .addCase(refreshData.rejected, (state, action) => {
        state.status = 'idle';
        state.error = 'Error fetching weather data. Please try again later.'
        // console.log('refreshData.rejected data=', action.payload);
      });
  },
});

// export const { } = weatherSlice.actions;

export default configureStore({
  reducer: weatherSlice.reducer
});
