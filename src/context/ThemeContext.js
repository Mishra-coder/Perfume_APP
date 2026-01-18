import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'aroma_luxe_user_theme';

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        loadSavedTheme();
    }, []);

    const loadSavedTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme !== null) {
                setIsDarkMode(savedTheme === 'dark');
            }
        } catch (error) {
            console.error('ThemeContext: Failed to load stored theme preference', error);
        }
    };

    const toggleTheme = async () => {
        const nextThemeState = !isDarkMode;
        setIsDarkMode(nextThemeState);

        try {
            const themeLabel = nextThemeState ? 'dark' : 'light';
            await AsyncStorage.setItem(THEME_STORAGE_KEY, themeLabel);
        } catch (error) {
            console.error('ThemeContext: Failed to persist theme change', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
