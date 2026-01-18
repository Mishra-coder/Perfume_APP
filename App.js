import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

import MainNavigator from './src/navigation/MainNavigator';

import { lightTheme, darkTheme, NavLightTheme, NavDarkTheme } from './src/theme/theme';

const AppContent = () => {
  const { isDarkMode } = useTheme();

  const paperTheme = isDarkMode ? darkTheme : lightTheme;
  const navigationTheme = isDarkMode ? NavDarkTheme : NavLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <MainNavigator />
      </NavigationContainer>

      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
