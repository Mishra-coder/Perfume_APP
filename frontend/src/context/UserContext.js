import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();
const STORAGE_KEY = 'aroma_luxe_user_data';

const INITIAL_USER_STATE = {
    name: '',
    email: '',
    isLoggedIn: false,
    favoriteOccasions: [],
    orders: [],
    wishlist: []
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(INITIAL_USER_STATE);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await AsyncStorage.getItem(STORAGE_KEY);
                if (data) {
                    const parsed = JSON.parse(data);
                    setUser(prev => ({
                        ...prev,
                        ...parsed,
                        wishlist: parsed.wishlist || [],
                        orders: parsed.orders || [],
                        favoriteOccasions: parsed.favoriteOccasions || []
                    }));
                }
            } catch (err) {
                console.error('User load fail:', err);
            }
        };
        loadUser();
    }, []);

    const persistUser = async (newData) => {
        setUser(newData);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        } catch (err) {
            console.error('User save fail:', err);
        }
    };

    const login = (profile) => {
        persistUser({ ...user, ...profile, isLoggedIn: true });
    };

    const logout = () => {
        persistUser({ ...INITIAL_USER_STATE, orders: user.orders });
    };

    const updateProfile = (name, occasions = []) => {
        persistUser({ ...user, name, favoriteOccasions: occasions });
    };

    const saveOrder = (order) => {
        persistUser({ ...user, orders: [order, ...user.orders] });
    };

    const toggleWishlist = (product) => {
        const list = user.wishlist || [];
        const exists = list.some(item => item.id === product.id);
        const updated = exists
            ? list.filter(item => item.id !== product.id)
            : [...list, product];

        persistUser({ ...user, wishlist: updated });
    };

    const isInWishlist = (id) => (user.wishlist || []).some(item => item.id === id);

    const contextStore = {
        user,
        login,
        logout,
        setUserProfile: updateProfile,
        saveOrder,
        toggleWishlist,
        isInWishlist
    };

    return (
        <UserContext.Provider value={contextStore}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser error');
    return context;
};
