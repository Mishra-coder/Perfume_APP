import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import MainNavigator from './src/navigation/MainNavigator';
import { lightTheme, darkTheme, NavLightTheme, NavDarkTheme } from './src/theme/theme';

const Root = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        html, body, #root {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        #root {
          flex: 1;
          overflow-y: auto;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const paper = isDarkMode ? darkTheme : lightTheme;
  const nav = isDarkMode ? NavDarkTheme : NavLightTheme;

  return (
    <PaperProvider theme={paper}>
      <NavigationContainer theme={nav}><MainNavigator /></NavigationContainer>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider><CartProvider><Root /></CartProvider></UserProvider>
    </ThemeProvider>
  );
}
