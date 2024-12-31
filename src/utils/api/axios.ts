import axios from 'axios';

const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    appid: API_KEY
  }
});

export default axiosInstance;
