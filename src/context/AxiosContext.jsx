// src/context/AxiosContext.jsx
import React, { createContext } from 'react';
import axios from 'axios';

export const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_MARKETPLACE_SERVER || 'http://localhost:3001/api',
  });

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};
