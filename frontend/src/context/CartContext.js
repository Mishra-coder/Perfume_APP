import React, { createContext, useState, useContext, useMemo } from 'react';

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

    const removeFromCart = (id) => setCartItems(prev => prev.filter(i => i.id !== id));

    const updateQuantity = (id, val) => {
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + val) } : i));
    };

    const clearCart = () => setCartItems([]);

    const totals = useMemo(() => {
        const subtotal = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        const tax = Math.round(subtotal * 0.12);
        const shipping = cartItems.length > 0 ? 30 : 0;

        const count = cartItems.reduce((acc, i) => acc + i.quantity, 0);
        const finalTotal = subtotal + tax + shipping;

        return {
            subtotal,
            taxAmount: tax,
            shipping,
            finalTotal,
            totalItemsCount: count,
            count,
            getTotalItems: () => count,
            getGrandTotal: () => finalTotal
        };
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            ...totals
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
