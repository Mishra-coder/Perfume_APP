import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();
const STORAGE_KEY = 'aroma_luxe_theme_preference';

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const preference = await AsyncStorage.getItem(STORAGE_KEY);
                if (preference) setIsDarkMode(preference === 'dark');
            } catch (err) {
                console.error('Theme load error:', err);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newState = !isDarkMode;
        setIsDarkMode(newState);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, newState ? 'dark' : 'light');
        } catch (err) {
            console.error('Theme save error:', err);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme error');
    return context;
};
