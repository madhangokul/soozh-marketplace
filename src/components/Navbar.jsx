import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, useTheme, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // Assuming you have a ThemeContext

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, transition: 'all 0.3s ease' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        {!isMobile && (
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Marketplace
          </Typography>
        )}
        <div>
          {/* <Typography component="div" sx={{ marginRight: 2 }}>
            Dark Mode
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} /> */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
