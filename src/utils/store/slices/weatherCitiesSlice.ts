import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchWeatherData } from './asyncThunk';

import { WeatherData } from '@utils/api/weather';

export interface WeatherState {
  cities: { [key: string]: WeatherData };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WeatherState = {
  cities: {},
  status: 'idle'
};

const weatherCitiesSlice = createSlice({
  name: 'weatherCities',
  initialState,
  reducers: {
    removeCity: (state, action: PayloadAction<string>) => {
      delete state.cities[action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = 'idle';
        const { city, weatherData } = action.payload;
        state.cities[city] = weatherData;
      })
      .addCase(fetchWeatherData.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { removeCity } = weatherCitiesSlice.actions;
export default weatherCitiesSlice.reducer;
