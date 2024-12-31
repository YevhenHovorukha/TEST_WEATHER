import axios from 'axios';

import axiosInstance from './axios';

export interface WeatherData {
  id: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  wind: WindData;
  name: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WindData {
  speed: number;
  deg: number;
}

const errorHandler = (error: unknown) => {
  let errorMessage = 'Uknown error';
  let errorCode = 'UNKNOWN_ERROR';

  if (axios.isAxiosError(error)) {
    if (error.response) {
      errorMessage = error.response.statusText;
      errorCode = error.response.status.toString();
    } else if (error.request) {
      errorMessage = 'No server response';
      errorCode = 'NETWORK_ERROR';
    } else {
      errorMessage = error.message;
    }
  }

  throw { message: errorMessage, code: errorCode };
};

export const getWeatherCityData = async (
  city: string
): Promise<WeatherData> => {
  try {
    const response = await axiosInstance.get('/weather', {
      params: {
        q: city,
        units: 'metric'
      }
    });

    return response.data;
  } catch (error: unknown) {
    errorHandler(error);
    throw error;
  }
};

interface City {
  name: string;
}

interface WeatherApiResponse {
  list: City[];
}

export const getCitySuggestions = async (query: string): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<WeatherApiResponse>('find', {
      params: {
        q: query,
        type: 'like',
        sort: 'population',
        cnt: 10
      }
    });

    const data = response.data;

    if (!data.list || data.list.length === 0) {
      return [];
    }
    const cities = data.list.map((city) => city.name);
    return cities;
  } catch (error: unknown) {
    errorHandler(error);
    throw error;
  }
};

export interface ForecastData {
  time: string;
  date: string;
  temp: number;
}

interface ForecastEntry {
  dt: number;
  main: {
    temp: number;
  };
}

interface ForecastResponse {
  list: ForecastEntry[];
}

export const getForecastData = async (
  city: string
): Promise<ForecastData[]> => {
  try {
    const response = await axiosInstance.get<ForecastResponse>('/forecast', {
      params: {
        q: city,
        units: 'metric',
        cnt: 8
      }
    });

    return response.data.list.map((entry) => {
      const date = new Date(entry.dt * 1000);
      return {
        time: date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        date: date.toLocaleDateString(), // Добавляем дату
        temp: entry.main.temp
      };
    });
  } catch (error: unknown) {
    errorHandler(error);
    throw error;
  }
};
