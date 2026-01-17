import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';

import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';
import MainNavigator from './src/navigation/MainNavigator';

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavDefaultTheme,
});

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1a1a1a',
    secondary: '#333',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#1a1a1a',
    onSurface: '#1a1a1a',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <UserProvider>
        <CartProvider>
          <NavigationContainer theme={LightTheme}>
            <MainNavigator />
          </NavigationContainer>

          <StatusBar style="dark" />
        </CartProvider>
      </UserProvider>
    </PaperProvider>
  );
}
