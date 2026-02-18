import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

// Spacing scale for consistent spacing throughout the app
export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

// Border radius scale for consistent rounded corners
export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    round: 50,
};

// Shadow presets for consistent elevation
export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
};

const paperLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#121212',
        primaryLight: '#333333',
        background: '#FFFFFF',
        backgroundSecondary: '#F8F8F8',
        surface: '#FFFFFF',
        surfaceVariant: '#FAFAFA',
        text: '#121212',
        textSecondary: '#626262',
        textTertiary: '#9E9E9E',
        secondary: '#626262',
        border: '#EEEEEE',
        borderLight: '#F5F5F5',
        error: '#B00020',
        success: '#2E7D32',
        warning: '#ED6C02',
        info: '#0288D1',
        elevation: {
            level0: 'transparent',
            level1: '#FFFFFF',
            level2: '#F9F9F9',
            level3: '#F5F5F5',
            level4: '#F0F0F0',
            level5: '#EBEBEB',
        },
    },
    spacing,
    borderRadius,
    shadows,
};

const paperDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#D4AF37', // Premium Gold
        primaryLight: '#F3E5AB', // Champagne
        background: '#050505', // Obsidian Black
        backgroundSecondary: '#0D0D0D',
        surface: '#121212',
        surfaceVariant: '#1A1A1A',
        text: '#FFFFFF',
        textSecondary: '#A0A0A0',
        textTertiary: '#666666',
        secondary: '#D4AF37',
        border: '#1F1F1F',
        borderLight: '#181818',
        error: '#CF6679',
        success: '#4CAF50',
        warning: '#FFB74D',
        info: '#64B5F6',
        elevation: {
            level0: 'transparent',
            level1: '#0D0D0D',
            level2: '#121212',
            level3: '#181818',
            level4: '#1F1F1F',
            level5: '#252525',
        },
    },
    spacing,
    borderRadius,
    shadows,
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
