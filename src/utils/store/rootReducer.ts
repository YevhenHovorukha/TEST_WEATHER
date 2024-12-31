import { combineReducers } from '@reduxjs/toolkit';

import weatherCitiesReducer from './slices/weatherCitiesSlice';

const rootReducer = combineReducers({
  weatherCities: weatherCitiesReducer
});

export default rootReducer;
