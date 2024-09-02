// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import { AxiosProvider } from './context/AxiosContext';

function App() {
  return (
    <AxiosProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
        </Routes>
      </Router>
    </AxiosProvider>
  );
}

export default App;
