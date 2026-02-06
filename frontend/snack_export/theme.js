import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

const paperLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#1a1a1a',
        background: '#ffffff',
        surface: '#ffffff',
        text: '#1a1a1a',
        secondary: '#666666',
        elevation: { level1: '#f5f5f5' },
    },
};

const paperDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#D4AF37',
        background: '#121212',
        surface: '#1e1e1e',
        text: '#ffffff',
        secondary: '#aaaaaa',
        elevation: { level1: '#1e1e1e' },
    },
};

const { LightTheme: NavigationLight, DarkTheme: NavigationDark } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
    materialLight: paperLightTheme,
    materialDark: paperDarkTheme,
});

export const lightTheme = paperLightTheme;
export const darkTheme = paperDarkTheme;
export const NavLightTheme = NavigationLight;
export const NavDarkTheme = NavigationDark;
