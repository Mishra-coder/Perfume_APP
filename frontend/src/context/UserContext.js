import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../utils/api';

const UserContext = createContext();
const KEY = 'aroma_luxe_user';
const TOKEN = 'aroma_luxe_token';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', email: '', isLoggedIn: false, orders: [], wishlist: [] });

    useEffect(() => {
        const load = async () => {
            const [data, token] = await Promise.all([AsyncStorage.getItem(KEY), AsyncStorage.getItem(TOKEN)]);
            if (data && token) setUser({ ...JSON.parse(data), isLoggedIn: true });
        };
        load();
    }, []);

    const save = async (data, token = null) => {
        setUser(data);
        await AsyncStorage.setItem(KEY, JSON.stringify(data));
        if (token) await AsyncStorage.setItem(TOKEN, token);
    };

    const login = async (email, password) => {
        const res = await api.login(email, password);
        await save({ ...user, ...res.user, isLoggedIn: true }, res.token);
    };

    const signup = async (n, e, p) => { await api.signup(n, e, p); await login(e, p); };

    const logout = async () => {
        setUser({ name: '', email: '', isLoggedIn: false, orders: [], wishlist: [] });
        await AsyncStorage.multiRemove([KEY, TOKEN]);
    };

    const toggleWishlist = (p) => {
        const list = user.wishlist || [];
        const exists = list.some(i => i.id === p.id);
        const updated = exists ? list.filter(i => i.id !== p.id) : [...list, p];
        save({ ...user, wishlist: updated });
    };

    return (
        <UserContext.Provider value={{ user, login, signup, logout, saveOrder: (o) => save({ ...user, orders: [o, ...user.orders] }), toggleWishlist, isInWishlist: (id) => (user.wishlist || []).some(i => i.id === id) }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
