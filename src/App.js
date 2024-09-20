import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import { AxiosProvider } from './context/AxiosContext';
import { CustomThemeProvider } from './context/ThemeContext';  // Add the theme provider

function App() {
  return (
    <AxiosProvider>
      <CustomThemeProvider>  {/* Wrap with the CustomThemeProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
          </Routes>
        </Router>
      </CustomThemeProvider>
    </AxiosProvider>
  );
}

export default App;
