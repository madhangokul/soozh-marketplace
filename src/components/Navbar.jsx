import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Function to dynamically render the center text and the button on the right
  const renderNavbarContent = () => {
    if (location.pathname === '/') {
      // Home Page
      return {
        centerText: 'SOOZH',
        button: (
          <Button
            variant="outlined"
            sx={{ color: theme.palette.common.white, borderColor: theme.palette.common.white }}
            onClick={() => navigate('/marketplace')}
            startIcon={<StoreIcon />}
          >
            Go to Marketplace
          </Button>
        ),
      };
    } else if (location.pathname === '/marketplace') {
      // Marketplace Page
      return {
        centerText: 'Marketplace',
        button: (
          <Button
            variant="outlined"
            sx={{ color: theme.palette.common.white, borderColor: theme.palette.common.white }}
            onClick={() => navigate('/')}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
        ),
      };
    }
  };

  const { centerText, button } = renderNavbarContent();

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {/* Center the text relative to the viewport */}
          <Typography variant="h6">{centerText}</Typography>
        </Box>

        {/* Outlined button on the far right */}
        <Box sx={{ ml: 'auto' }}>
          {button}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
