import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

// --- Theme Context ---
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const load = async () => {
            const pref = await AsyncStorage.getItem('aroma_theme');
            if (pref) setIsDarkMode(pref === 'dark');
        };
        load();
    }, []);
    const toggleTheme = async () => {
        const newState = !isDarkMode;
        setIsDarkMode(newState);
        await AsyncStorage.setItem('aroma_theme', newState ? 'dark' : 'light');
    };
    return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);

// --- User Context ---
const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', email: '', isLoggedIn: false, orders: [], wishlist: [] });
    useEffect(() => {
        const load = async () => {
            const data = await AsyncStorage.getItem('aroma_luxe_user');
            const token = await AsyncStorage.getItem('aroma_luxe_token');
            if (data && token) setUser({ ...JSON.parse(data), isLoggedIn: true });
        };
        load();
    }, []);
    const save = async (data, token = null) => {
        setUser(data);
        await AsyncStorage.setItem('aroma_luxe_user', JSON.stringify(data));
        if (token) await AsyncStorage.setItem('aroma_luxe_token', token);
    };
    const login = async (e, p) => {
        const res = await api.login(e, p);
        await save({ ...user, ...res.user, isLoggedIn: true }, res.token);
    };
    const signup = async (n, e, p) => { await api.signup(n, e, p); await login(e, p); };
    const logout = async () => {
        setUser({ name: '', email: '', isLoggedIn: false, orders: [], wishlist: [] });
        await AsyncStorage.multiRemove(['aroma_luxe_user', 'aroma_luxe_token']);
    };
    return (
        <UserContext.Provider value={{
            user, login, signup, logout,
            setUserProfile: (name) => save({ ...user, name }),
            saveOrder: (o) => save({ ...user, orders: [o, ...user.orders] }),
            toggleWishlist: (p) => {
                const list = user.wishlist || [];
                const exists = list.some(i => i.id === p.id);
                const updated = exists ? list.filter(i => i.id !== p.id) : [...list, p];
                save({ ...user, wishlist: updated });
            },
            isInWishlist: (id) => (user.wishlist || []).some(i => i.id === id)
        }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);

// --- Cart Context ---
const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const exists = prev.find(i => i.id === product.id);
            if (exists) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
            return [...prev, { ...product, quantity }];
        });
    };
    const totals = useMemo(() => {
        const subtotal = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        const count = cartItems.reduce((acc, i) => acc + i.quantity, 0);
        return { subtotal, count };
    }, [cartItems]);
    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart: (id) => setCartItems(p => p.filter(i => i.id !== id)),
            updateQuantity: (id, val) => setCartItems(p => p.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + val) } : i)),
            clearCart: () => setCartItems([]), ...totals
        }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => useContext(CartContext);
