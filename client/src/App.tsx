import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { AppProvider } from './hooks';
import Routes from './routes';
import history from './services/history';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <Router history={history}>
    <BrowserRouter>
      <GlobalStyles />
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  </Router>
);

export default App;
