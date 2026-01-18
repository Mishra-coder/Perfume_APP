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

const USER_SESSION_KEY = 'aroma_luxe_user_session';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        favoriteOccasions: [],
        orders: [],
        isLoggedIn: false
    });

    useEffect(() => {
        loadStoredSession();
    }, []);

    const loadStoredSession = async () => {
        try {
            const storedSession = await AsyncStorage.getItem(USER_SESSION_KEY);
            if (storedSession) {
                setUser(JSON.parse(storedSession));
            }
        } catch (error) {
            console.error('UserContext: Error recovering stored session', error);
        }
    };

    const syncUser = async (updatedData) => {
        setUser(updatedData);
        try {
            await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(updatedData));
        } catch (error) {
            console.error('UserContext: Error persisting user data', error);
        }
    };

    const login = (profile) => {
        syncUser({
            ...user,
            ...profile,
            isLoggedIn: true
        });
    };

    const logout = () => {
        syncUser({
            name: '',
            email: '',
            favoriteOccasions: [],
            orders: user.orders,
            isLoggedIn: false
        });
    };

    const updateProfile = (name, favoriteOccasions = []) => {
        syncUser({
            ...user,
            name,
            favoriteOccasions
        });
    };

    const addOrder = (newOrder) => {
        syncUser({
            ...user,
            orders: [newOrder, ...user.orders]
        });
    };

    const userValue = {
        user,
        login,
        logout,
        setUserProfile: updateProfile,
        saveOrder: addOrder
    };

    return (
        <UserContext.Provider value={userValue}>
            {children}
        </UserContext.Provider>
    );
};
