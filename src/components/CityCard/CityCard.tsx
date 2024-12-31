import { useMemo } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

import styles from './CityCard.module.scss';

import { WeatherData } from '@utils/api/weather';

interface CityCardProps {
  cityName: string;
  weather: WeatherData;
  onUpdateCity: (cityName: string, e: React.MouseEvent) => void;
  onRemoveCity: (cityName: string, e: React.MouseEvent) => void;
  onNavigate: (cityName: string) => void;
}

const CityCard: React.FC<CityCardProps> = ({
  cityName,
  weather,
  onUpdateCity,
  onRemoveCity,
  onNavigate
}) => {
  const roundedWeather = useMemo(() => {
    return {
      ...weather,
      main: {
        ...weather.main,
        temp: Math.round(weather.main.temp),
        feels_like: Math.round(weather.main.feels_like)
      }
    };
  }, [weather]);

  return (
    <Card className={styles.card}>
      <CardContent
        className={styles.cardContent}
        onClick={() => onNavigate(cityName)}
      >
        <Typography className={styles.title} variant="h6">
          {cityName}
        </Typography>
        <Typography className={styles.weatherInfo} variant="body2">
          Temperature: {roundedWeather.main.temp}°C
        </Typography>
        <Typography className={styles.weatherInfo} variant="body2">
          Feels Like: {roundedWeather.main.feels_like}°C
        </Typography>
        <Typography className={styles.weatherInfo} variant="body2">
          Weather: {roundedWeather.weather[0].description}
        </Typography>
        <Box className={styles.buttonContainer}>
          <Button
            className={styles.button}
            onClick={(e) => onUpdateCity(cityName, e)}
            variant="outlined"
            size="small"
          >
            Update
          </Button>
          <Button
            className={styles.button}
            onClick={(e) => onRemoveCity(cityName, e)}
            variant="contained"
            size="small"
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CityCard;
