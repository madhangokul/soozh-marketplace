import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme(); // Get the theme from the ThemeProvider
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if in mobile view

  const renderNavbarContent = () => {
    if (location.pathname === '/') {
      return {
        centerText: 'SOOZH',
        button: (
          <Button
            variant="outlined"
            sx={{ color: theme.palette.common.white, borderColor: theme.palette.common.white }}
            onClick={() => navigate('/marketplace')}
            startIcon={<StoreIcon />}
          >
            MARKETPLACE
          </Button>
        ),
      };
    } else if (location.pathname === '/marketplace') {
      return {
        centerText: 'MARKETPLACE',
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
        <Box 
          sx={{
            position: 'absolute', left: isMobile? '5%':'50%', transform:isMobile? '':'translateX(-50%)'
          }}
        >
          <Typography variant="h6">{centerText}</Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          {button}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
