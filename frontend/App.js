import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import MainNavigator from './src/navigation/MainNavigator';
import { lightTheme, darkTheme, NavLightTheme, NavDarkTheme } from './src/theme/theme';
import * as Updates from 'expo-updates';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Root = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          Alert.alert('Update Available', 'The app will now restart to apply the latest fix.', [
            { text: 'Restart Now', onPress: () => Updates.reloadAsync() }
          ]);
        }
      } catch (error) {
        console.error(`Error fetching updates: ${error}`);
      }
    }

    if (!__DEV__) {
      onFetchUpdateAsync();
    }

    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        html, body, #root, [data-reactroot] {
          height: 100vh !important;
          width: 100vw !important;
          overflow: hidden !important;
          margin: 0;
          padding: 0;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const paper = isDarkMode ? darkTheme : lightTheme;
  const nav = isDarkMode ? NavDarkTheme : NavLightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paper}>
        <NavigationContainer theme={nav}><MainNavigator /></NavigationContainer>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider><CartProvider><Root /></CartProvider></UserProvider>
    </ThemeProvider>
  );
}
