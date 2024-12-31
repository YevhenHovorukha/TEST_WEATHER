import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

import styles from './CitySelect.module.scss';

import { getCitySuggestions } from '@utils/api/weather';
import { fetchWeatherData } from '@utils/store/slices/asyncThunk';
import { AppDispatch } from '@utils/store/store';

const CitySelect = () => {
  const dispatch: AppDispatch = useDispatch();

  const [selectedCity, setSelectedCity] = useState<string>('');
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);

  const fetchCitySuggestions = async (query: string) => {
    if (!query.trim()) {
      setCitySuggestions([]);
      return;
    }
    const suggestions = await getCitySuggestions(query);
    const suggestionsUnique = [...new Set(suggestions)];
    setCitySuggestions(suggestionsUnique);
  };

  const debouncedFetch = useCallback(
    debounce((query: string) => fetchCitySuggestions(query), 500),
    []
  );

  useEffect(() => {
    debouncedFetch(selectedCity);
    return debouncedFetch.cancel;
  }, [selectedCity, debouncedFetch]);

  const handleAddCity = () => {
    if (selectedCity) {
      dispatch(fetchWeatherData(selectedCity));
    }
  };

  const isAddDisabled =
    !selectedCity || !citySuggestions.includes(selectedCity);

  return (
    <Box className={styles.container}>
      <Autocomplete
        className={styles.textField}
        value={selectedCity}
        onInputChange={(_, newInputValue) => setSelectedCity(newInputValue)}
        onChange={(_, newValue) => setSelectedCity(newValue || '')}
        options={citySuggestions}
        renderInput={(params) => (
          <TextField {...params} label="Select a city" variant="outlined" />
        )}
        freeSolo
      />
      <Button
        className={styles.button}
        variant="contained"
        onClick={handleAddCity}
        disabled={isAddDisabled}
      >
        Add city
      </Button>
    </Box>
  );
};

export default CitySelect;
