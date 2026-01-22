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
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

const AppContent = () => {
  const { isDarkMode } = useTheme();

  React.useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          Alert.alert(
            'Update Available',
            'A new version of Aroma Luxe is ready. Would you like to update now?',
            [
              { text: 'Later', style: 'cancel' },
              {
                text: 'Update Now',
                onPress: async () => {
                  await Updates.fetchUpdateAsync();
                  await Updates.reloadAsync();
                },
              },
            ]
          );
        }
      } catch (error) {
        console.log('Error fetching latest updates:', error);
      }
    }

    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  const currentPaperTheme = isDarkMode ? darkTheme : lightTheme;
  const currentNavTheme = isDarkMode ? NavDarkTheme : NavLightTheme;

  return (
    <PaperProvider theme={currentPaperTheme}>
      <NavigationContainer theme={currentNavTheme}>
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
