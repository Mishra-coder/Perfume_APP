import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { DefaultTheme as NavDefaultTheme, DarkTheme as NavDarkThemeBase } from '@react-navigation/native';

const { LightTheme: NavLightTheme, DarkTheme: NavDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavDefaultTheme,
    reactNavigationDark: NavDarkThemeBase,
});

export const lightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#1a1a1a',
        background: '#ffffff',
        surface: '#ffffff',
        onSurface: '#1a1a1a',
        text: '#1a1a1a',
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#D4AF37',
        background: '#0a0a0a',
        surface: '#1a1a1a',
        onSurface: '#ffffff',
        text: '#ffffff',
    },
};

export { NavLightTheme, NavDarkTheme };
