import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ThemeContext = createContext({
  darkMode: true, // Default to dark mode
  toggleDarkMode: () => {}
});

export const CustomThemeProvider = ({ children }) => {
  // Default darkMode to true for dark theme
  const [darkMode, setDarkMode] = useState(true);

  // Create theme with Apple system font and dark mode palette
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#90caf9' : '#1976d2',
          },
          background: {
            default: darkMode ? '#121212' : '#fff',
            paper: darkMode ? '#424242' : '#fff',
          },
        },
        typography: {
          fontFamily: [
            '-apple-system', // Apple devices
            'BlinkMacSystemFont', // Fallback for older macOS devices
            '"Segoe UI"', // Windows
            'Roboto', // Android
            '"Helvetica Neue"', // iOS/macOS fallback
            'Arial', // Default web-safe font
            'sans-serif', // Final fallback
          ].join(','),
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
