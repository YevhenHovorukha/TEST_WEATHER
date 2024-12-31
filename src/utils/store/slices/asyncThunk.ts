import { createAsyncThunk } from '@reduxjs/toolkit';

import { getWeatherCityData } from '@utils/api/weather';

export const fetchWeatherData = createAsyncThunk(
  'weatherCities/fetchWeatherData',
  async (city: string) => {
    const weatherData = await getWeatherCityData(city);
    return { city, weatherData };
  }
);
