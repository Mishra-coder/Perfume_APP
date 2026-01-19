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

const STORAGE_KEY = 'aroma_luxe_user_session';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        favoriteOccasions: [],
        orders: [],
        wishlist: [],
        isLoggedIn: false
    });

    useEffect(() => {
        const loadSession = async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setUser(prev => ({
                        ...prev,
                        ...parsed,
                        wishlist: parsed.wishlist || [],
                        orders: parsed.orders || [],
                        favoriteOccasions: parsed.favoriteOccasions || []
                    }));
                }
            } catch (error) {
                console.error('Error loading session:', error);
            }
        };
        loadSession();
    }, []);

    const saveSession = async (updatedUser) => {
        setUser(updatedUser);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Error saving session:', error);
        }
    };

    const login = (profile) => {
        saveSession({
            ...user,
            ...profile,
            isLoggedIn: true
        });
    };

    const logout = () => {
        saveSession({
            name: '',
            email: '',
            favoriteOccasions: [],
            orders: user.orders,
            wishlist: [],
            isLoggedIn: false
        });
    };

    const updateProfile = (name, favoriteOccasions = []) => {
        saveSession({
            ...user,
            name,
            favoriteOccasions
        });
    };

    const addOrder = (order) => {
        saveSession({
            ...user,
            orders: [order, ...user.orders]
        });
    };

    const toggleWishlist = (product) => {
        const currentWishlist = user.wishlist || [];
        const exists = currentWishlist.find(item => item.id === product.id);
        const updatedWishlist = exists
            ? currentWishlist.filter(item => item.id !== product.id)
            : [...currentWishlist, product];

        saveSession({
            ...user,
            wishlist: updatedWishlist
        });
    };

    const value = {
        user,
        login,
        logout,
        setUserProfile: updateProfile,
        saveOrder: addOrder,
        toggleWishlist,
        isInWishlist: (productId) => (user.wishlist || []).some(item => item.id === productId)
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

