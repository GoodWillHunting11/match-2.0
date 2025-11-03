"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.name === item.name); // or use `id` if you have one
      if (existingIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      }
      return [...prev, { ...item, quantity }];
    });
  };
  
  const updateQuantity = (index, newQuantity) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQuantity;
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
