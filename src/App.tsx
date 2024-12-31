import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@pages/HomePage/HomePage';
import CityPage from '@pages/CityPage/CityPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:cityName" element={<CityPage />} />
      </Routes>
    </Router>
  );
};

export default App;
