import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

const TAX_RATE = 0.12;
const SHIPPING_COST = 30;

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, change) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const totals = useMemo(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const tax = Math.round(subtotal * TAX_RATE);
        const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        const shipping = cartItems.length > 0 ? SHIPPING_COST : 0;

        return {
            subtotal,
            taxAmount: tax,
            shipping,
            finalTotal: subtotal + tax + shipping,
            totalItemsCount: count
        };
    }, [cartItems]);

    const storeValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems: () => totals.totalItemsCount,
        getGrandTotal: () => totals.finalTotal,
        getSubtotal: () => totals.subtotal,
        ...totals
    };

    return (
        <CartContext.Provider value={storeValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart error');
    return context;
};
