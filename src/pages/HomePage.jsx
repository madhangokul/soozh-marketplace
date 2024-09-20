import React, { useContext } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <>
      <CssBaseline />
      {/* Use Navbar and set page to "home" */}
      <Navbar page="home" />
      <Box sx={{ mt: 10, textAlign: 'center', backgroundColor:'black' }}>
        <h1>Welcome to Soozh Marketplace</h1>
        <p>Your gateway to an amazing shopping experience.</p>
      </Box>
    </>
  );
};

export default HomePage;
