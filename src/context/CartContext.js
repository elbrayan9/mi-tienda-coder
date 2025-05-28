// src/context/CartContext.js
"use client"; // <--- Necesario para usar Hooks (useState, useContext)

import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear el "Hook" personalizado para usar el contexto fácilmente
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Crear el Proveedor del Contexto (el que manejará la lógica)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      // Revisa si el producto ya está en el carrito
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Si ya está, actualiza la cantidad
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no está, añádelo
        return [...prevItems, { ...product, quantity }];
      }
    });
    console.log("Producto añadido:", product.name, "Cantidad:", quantity);
    alert(`¡${product.name} añadido al carrito!`); // Feedback simple
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Puedes añadir más funciones (updateQuantity, clearCart, etc.)

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    // ...otras funciones
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};