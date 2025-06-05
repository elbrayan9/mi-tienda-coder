// src/context/CartContext.js
"use client"; 

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Cargar el carrito desde localStorage al inicio (solo en el cliente)
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  // Guardar en localStorage cada vez que cartItems cambie (solo en el cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product, quantityToAdd) => {
    if (!product || !product.id || typeof quantityToAdd !== 'number' || quantityToAdd <= 0) {
      console.error("addToCart: Producto o cantidad inválida", product, quantityToAdd);
      alert("No se pudo añadir el producto. Información inválida.");
      return;
    }

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantityToAdd;
        // Asegurar que no se exceda el stock si está disponible en el objeto product
        updatedItems[existingItemIndex].quantity = product.stock ? Math.min(newQuantity, product.stock) : newQuantity;
        if (product.stock && newQuantity > product.stock) {
            alert(`Solo puedes añadir hasta ${product.stock} unidades de ${product.name}.`);
        }
        return updatedItems;
      } else {
        // Asegurar que la cantidad inicial no exceda el stock
        const initialQuantity = product.stock ? Math.min(quantityToAdd, product.stock) : quantityToAdd;
         if (product.stock && quantityToAdd > product.stock) {
            alert(`Solo puedes añadir hasta ${product.stock} unidades de ${product.name}.`);
        }
        return [...prevItems, { ...product, quantity: initialQuantity }];
      }
    });
    console.log("Producto añadido:", product.name, "Cantidad:", quantityToAdd);
    alert(`¡${product.name} (x${quantityToAdd}) añadido al carrito!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    alert("Producto eliminado del carrito.");
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.stock ? Math.min(newQuantity, item.stock) : newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    alert("Carrito vaciado.");
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};