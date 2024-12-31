import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StyledEngineProvider } from '@mui/material';

import { store, persistor } from './utils/store/store.ts';
import App from './App.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </PersistGate>
  </Provider>
);
