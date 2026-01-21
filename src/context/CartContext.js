import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

const TAX_RATE = 0.12;
const SHIPPING_COST = 30;

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === product.id);

            if (existingItem) {
                return currentItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...currentItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(currentItems =>
            currentItems.filter(item => item.id !== productId)
        );
    };

    const updateQuantity = (productId, change) => {
        setCartItems(currentItems =>
            currentItems.map(item => {
                if (item.id === productId) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => setCartItems([]);

    const cartTotals = useMemo(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const taxAmount = Math.round(subtotal * TAX_RATE);
        const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const shipping = cartItems.length > 0 ? SHIPPING_COST : 0;
        const finalTotal = subtotal + taxAmount + shipping;

        return {
            subtotal,
            taxAmount,
            shipping,
            finalTotal,
            totalItemsCount
        };
    }, [cartItems]);

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    const getGrandTotal = () => {
        return cartTotals.finalTotal;
    };

    const getSubtotal = () => {
        return cartTotals.subtotal;
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getGrandTotal,
        getSubtotal,
        ...cartTotals
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
