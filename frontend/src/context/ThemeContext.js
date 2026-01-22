import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            const preference = await AsyncStorage.getItem('aroma_theme');
            if (preference) setIsDarkMode(preference === 'dark');
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newState = !isDarkMode;
        setIsDarkMode(newState);
        await AsyncStorage.setItem('aroma_theme', newState ? 'dark' : 'light');
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
