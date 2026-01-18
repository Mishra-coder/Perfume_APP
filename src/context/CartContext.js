import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const TAX_RATE = 0.12;
const SHIPPING_FEE = 30;

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, change) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === productId
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
        ));
    };

    const clearCart = () => setCartItems([]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxes = Math.round(subtotal * TAX_RATE);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const grandTotal = subtotal + taxes + (cartItems.length > 0 ? SHIPPING_FEE : 0);

    const cartValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal: () => subtotal,
        getGrandTotal: () => grandTotal,
        getTotalItems: () => totalItems,
        taxes,
        SHIPPING_FEE
    };

    return (
        <CartContext.Provider value={cartValue}>
            {children}
        </CartContext.Provider>
    );
};
