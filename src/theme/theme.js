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
        error: '#B00020',
        success: '#4CAF50',
        elevation: {
            level0: 'transparent',
            level1: '#f5f5f5',
            level2: '#eeeeee',
            level3: '#e0e0e0',
            level4: '#d5d5d5',
            level5: '#cccccc',
        },
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
        error: '#CF6679',
        success: '#81C784',
        elevation: {
            level0: 'transparent',
            level1: '#1e1e1e',
            level2: '#222222',
            level3: '#252525',
            level4: '#2a2a2a',
            level5: '#303030',
        },
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
