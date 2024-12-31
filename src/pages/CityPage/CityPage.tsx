import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Alert, Paper } from '@mui/material';

import styles from './CityPage.module.scss';

import { WeatherState } from '@utils/store/slices/weatherCitiesSlice';
import TemperatureChart from '@components/TemperatureChart/TemperatureChart';
import { getForecastData } from '@utils/api/weather';

const CityPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [historicalData, setHistoricalData] = useState<
    { time: string; date: string; temp: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const weatherData = useSelector(
    (state: { weatherCities: WeatherState }) =>
      state.weatherCities.cities[cityName || '']
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!cityName) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getForecastData(cityName);
        setHistoricalData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);

  if (!weatherData) {
    return <Alert severity="error">Error 404: City not found</Alert>;
  }

  return (
    <Box className={styles.container}>
      <Paper className={styles.paper} elevation={3}>
        <Typography className={styles.title} variant="h4" gutterBottom>
          {cityName}
        </Typography>
        <Typography className={styles.weatherInfo} variant="body1">
          <span className="label">Temperature: </span>
          {Math.round(weatherData.main.temp)}°C
        </Typography>
        <Typography className={styles.weatherInfo} variant="body1">
          <span className="label">Feels Like: </span>
          {Math.round(weatherData.main.feels_like)}°C
        </Typography>
        <Typography className={styles.weatherInfo} variant="body1">
          <span className="label">Min Temperature: </span>
          {Math.round(weatherData.main.temp_min)}°C
        </Typography>
        <Typography className={styles.weatherInfo} variant="body1">
          <span className="label">Max Temperature: </span>
          {Math.round(weatherData.main.temp_max)}°C
        </Typography>
        <Typography className={styles.weatherInfo} variant="body1">
          <span className="label">Weather: </span>
          {weatherData.weather[0].description}
        </Typography>
        <Typography className={styles.weatherInfo} variant="body1">
          <span className="label">Wind Speed: </span>
          {weatherData.wind.speed} m/s
        </Typography>
        <Typography className={styles.weatherInfo} variant="body1">
          <span className="label">Humidity: </span>
          {weatherData.main.humidity}%
        </Typography>
        <Typography className={styles.weatherInfo} variant="body1">
          <span className="label">Pressure: </span>
          {weatherData.main.pressure} hPa
        </Typography>
      </Paper>

      <Box className={styles.chartContainer}>
        <TemperatureChart
          loading={loading}
          error={error}
          data={historicalData}
        />
      </Box>
    </Box>
  );
};

export default CityPage;
