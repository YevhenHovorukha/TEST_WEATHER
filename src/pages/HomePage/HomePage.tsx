import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import styles from './HomePage.module.scss';

import {
  removeCity,
  WeatherState
} from '@utils/store/slices/weatherCitiesSlice';
import { AppDispatch } from '@utils/store/store';
import { fetchWeatherData } from '@utils/store/slices/asyncThunk';
import CitySelect from '@components/CitySelect/CitySelect';
import CityCard from '@components/CityCard/CityCard';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const cities = useSelector(
    (state: { weatherCities: WeatherState }) => state.weatherCities.cities
  );

  const handleRemoveCity = (cityName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeCity(cityName));
  };

  const handleUpdateCity = (cityName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(fetchWeatherData(cityName));
  };

  const handleNavigate = (cityName: string) => {
    navigate(`/${cityName}`);
  };

  useEffect(() => {
    if (Object.entries(cities).length > 0) {
      Object.keys(cities).forEach((item) => dispatch(fetchWeatherData(item)));
    }
  }, []);

  return (
    <Box>
      <CitySelect />

      <Box className={styles.container}>
        {Object.entries(cities).length === 0 ? (
          <Typography className={styles.noCitiesMessage}>
            No cities available
          </Typography>
        ) : (
          Object.entries(cities).map(([cityName, weather]) => (
            <CityCard
              key={weather.id}
              cityName={cityName}
              weather={weather}
              onUpdateCity={handleUpdateCity}
              onRemoveCity={handleRemoveCity}
              onNavigate={handleNavigate}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
