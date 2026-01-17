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
        setCartItems((currentItems) => {
            const itemIndex = currentItems.findIndex(item => item.id === product.id);

            if (itemIndex > -1) {
                return currentItems.map((item, index) =>
                    index === itemIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...currentItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => setCartItems([]);

    const totals = useMemo(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const taxes = Math.round(subtotal * TAX_RATE);
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        const grandTotal = subtotal + taxes + (cartItems.length > 0 ? SHIPPING_FEE : 0);

        return { subtotal, taxes, totalItems, grandTotal };
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal: () => totals.subtotal,
        getGrandTotal: () => totals.grandTotal,
        getTotalItems: () => totals.totalItems,
        taxes: totals.taxes,
        SHIPPING_FEE
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
