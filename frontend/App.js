import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import MainNavigator from './src/navigation/MainNavigator';
import { lightTheme, darkTheme, NavLightTheme, NavDarkTheme } from './src/theme/theme';

SplashScreen.preventAutoHideAsync();

const PhoneSimulator = ({ children, isDark }) => {
  if (Platform.OS !== 'web') return <View style={{ flex: 1 }}>{children}</View>;

  return (
    <View style={styles.webWrapper}>
      <View style={[styles.shell, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
        <View style={styles.speaker} />
        <View style={styles.screen}>
          {children}
        </View>
        <View style={styles.homeBar} />
      </View>
    </View>
  );
};

const Root = () => {
  const { isDarkMode } = useTheme();

  const [fontsLoaded, fontError] = useFonts({
    ...MaterialCommunityIcons.font,
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        html, body, #root { 
          height: 100vh !important; 
          width: 100vw !important; 
          margin: 0 !important; 
          padding: 0 !important; 
          overflow: hidden !important; 
          background-color: ${isDarkMode ? '#0d0d0d' : '#f5f5f7'} !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url('https://cdnjs.cloudflare.com/ajax/libs/react-native-vector-icons/10.0.0/Fonts/MaterialCommunityIcons.ttf') format('truetype');
        }
      `;
      document.head.appendChild(style);
    }
  }, [isDarkMode]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      if (fontError) console.warn('Font loading error:', fontError);
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  const paper = isDarkMode ? darkTheme : lightTheme;
  const nav = isDarkMode ? NavDarkTheme : NavLightTheme;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider theme={paper}>
        <PhoneSimulator isDark={isDarkMode}>
          <NavigationContainer theme={nav}><MainNavigator /></NavigationContainer>
        </PhoneSimulator>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </PaperProvider>
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider><CartProvider><Root /></CartProvider></UserProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shell: {
    width: 390,
    height: 780,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#333',
    overflow: 'hidden',
    position: 'relative',
    // Premium Web Shadow
    ...Platform.select({
      web: { boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }
    })
  },
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  speaker: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -75,
    width: 150,
    height: 28,
    backgroundColor: '#333',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    zIndex: 999,
  },
  homeBar: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -60,
    width: 120,
    height: 5,
    backgroundColor: '#999',
    borderRadius: 10,
    zIndex: 999,
  }
});
