// src/app/(admin)/layout.js
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

// Estilos para el overlay de carga
const loadingOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    zIndex: 9999,
};

// Estilos para el mensaje de acceso denegado
const accessDeniedStyles = {
    textAlign: 'center',
    padding: '50px'
};

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si no está cargando y no hay usuario, redirigir al login.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // 1. Mientras se verifica la autenticación, muestra un mensaje de carga.
  if (loading) {
    return <div style={loadingOverlayStyles}>Verificando acceso...</div>;
  }
  
  // 2. Si hay un usuario, muestra el contenido del panel de admin.
  if (user) {
    return <>{children}</>;
  }
  
  // 3. Si no hay usuario (y ya no está cargando), podría mostrar un mensaje o simplemente nada,
  // ya que el useEffect ya lo estará redirigiendo. Un mensaje puede ser útil.
  return (
    <div style={accessDeniedStyles}>
        <h2>Acceso Denegado</h2>
        <p>Debes iniciar sesión para ver esta página.</p>
        <Link href="/login">Ir a Iniciar Sesión</Link>
    </div>
  );
}