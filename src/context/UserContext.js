import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

const STORAGE_KEY = 'aroma_luxe_user_data';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        favoriteOccasions: [],
        orders: [],
        isLoggedIn: false
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const savedData = await AsyncStorage.getItem(STORAGE_KEY);
                if (savedData) {
                    setUser(JSON.parse(savedData));
                }
            } catch (error) {
                console.error('UserContext: Error loading persisted data', error);
            }
        };

        loadUserData();
    }, []);

    const syncAndSetUser = async (updatedData) => {
        setUser(updatedData);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        } catch (error) {
            console.error('UserContext: Error saving data', error);
        }
    };

    const login = (profile) => {
        syncAndSetUser({
            ...user,
            ...profile,
            isLoggedIn: true
        });
    };

    const logout = () => {
        const anonymousState = {
            name: '',
            email: '',
            favoriteOccasions: [],
            orders: user.orders,
            isLoggedIn: false
        };
        syncAndSetUser(anonymousState);
    };

    const setUserProfile = (name, occasions = []) => {
        syncAndSetUser({
            ...user,
            name,
            favoriteOccasions: occasions
        });
    };

    const saveOrder = (newOrder) => {
        syncAndSetUser({
            ...user,
            orders: [newOrder, ...user.orders]
        });
    };

    const value = {
        user,
        login,
        logout,
        setUserProfile,
        saveOrder
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
