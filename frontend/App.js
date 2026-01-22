import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import MainNavigator from './src/navigation/MainNavigator';
import { lightTheme, darkTheme, NavLightTheme, NavDarkTheme } from './src/theme/theme';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

const Root = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (__DEV__) return;
    (async () => {
      const u = await Updates.checkForUpdateAsync();
      if (u.isAvailable) {
        Alert.alert('Update', 'New version ready.', [{ text: 'Wait' }, { text: 'Update', onPress: async () => { await Updates.fetchUpdateAsync(); await Updates.reloadAsync(); } }]);
      }
    })();
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
