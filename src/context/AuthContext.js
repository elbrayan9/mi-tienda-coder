// src/context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState } from 'react';
// 1. YA NO IMPORTAMOS getAuth DESDE FIREBASE
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
// 2. IMPORTAMOS 'auth' DIRECTAMENTE DESDE NUESTRA CONFIG
import { auth } from '@/firebase/config'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged ya usa la instancia 'auth' que importamos
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // El array de dependencias ahora puede estar vacío, ya que 'auth' no cambiará

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return firebaseSignOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};