import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const STORAGE_KEY = 'aroma_luxe_user_theme';

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved) setIsDarkMode(saved === 'dark');
            } catch (err) {
                console.error(err);
            }
        };
        load();
    }, []);

    const toggleTheme = async () => {
        const next = !isDarkMode;
        setIsDarkMode(next);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
