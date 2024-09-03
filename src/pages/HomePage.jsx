import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  const goToMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />  {/* Provides consistent baseline styles */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Soozh Marketplace
          </Typography>
          <Switch
            checked={darkMode}
            onChange={handleModeChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <button onClick={goToMarketplace} style={{ color: 'white', background: 'none', border: 'none' }}>
            Go to Marketplace
          </button>
        </Toolbar>
      </AppBar>
      <div>
        <h1>Welcome to Soozh Marketplace</h1>
        <p>Your gateway to an amazing shopping experience.</p>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
