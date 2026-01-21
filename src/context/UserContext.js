import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();
const USER_STORAGE_KEY = 'aroma_luxe_user_data';

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        isLoggedIn: false,
        favoriteOccasions: [],
        orders: [],
        wishlist: []
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem(USER_STORAGE_KEY);
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setUserData(currentData => ({
                        ...currentData,
                        ...parsedData,
                        wishlist: parsedData.wishlist || [],
                        orders: parsedData.orders || [],
                        favoriteOccasions: parsedData.favoriteOccasions || []
                    }));
                }
            } catch (error) {
                console.log('Failed to load user data:', error);
            }
        };
        loadUserData();
    }, []);

    const saveUserData = async (newData) => {
        setUserData(newData);
        try {
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newData));
        } catch (error) {
            console.log('Failed to save user data:', error);
        }
    };

    const loginUser = (userProfile) => {
        saveUserData({
            ...userData,
            ...userProfile,
            isLoggedIn: true
        });
    };

    const logoutUser = () => {
        saveUserData({
            name: '',
            email: '',
            isLoggedIn: false,
            favoriteOccasions: [],
            orders: userData.orders,
            wishlist: []
        });
    };

    const updateUserProfile = (name, favoriteOccasions = []) => {
        saveUserData({
            ...userData,
            name,
            favoriteOccasions
        });
    };

    const saveNewOrder = (order) => {
        saveUserData({
            ...userData,
            orders: [order, ...userData.orders]
        });
    };

    const toggleWishlistItem = (product) => {
        const currentWishlist = userData.wishlist || [];
        const isAlreadyInWishlist = currentWishlist.some(item => item.id === product.id);

        let updatedWishlist;
        if (isAlreadyInWishlist) {
            updatedWishlist = currentWishlist.filter(item => item.id !== product.id);
        } else {
            updatedWishlist = [...currentWishlist, product];
        }

        saveUserData({
            ...userData,
            wishlist: updatedWishlist
        });
    };

    const checkIsItemInWishlist = (productId) => {
        return (userData.wishlist || []).some(item => item.id === productId);
    };

    const contextValue = {
        user: userData,
        login: loginUser,
        logout: logoutUser,
        setUserProfile: updateUserProfile,
        saveOrder: saveNewOrder,
        toggleWishlist: toggleWishlistItem,
        isInWishlist: checkIsItemInWishlist
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
