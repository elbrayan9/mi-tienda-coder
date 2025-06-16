// src/app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext'; // <-- 1. IMPORTAR

export const metadata = {
  title: 'Mi Tienda Coder',
  description: 'Proyecto de Maquetación Coderhouse',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider> {/* <--- 2. ENVOLVER CON AUTHPROVIDER */}
          <CartProvider>
            <Navbar />
            <main> {/* Quité el padding y minHeight de aquí para que se maneje en globals.css */}
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider> {/* <--- 3. CERRAR EL AUTHPROVIDER */}
      </body>
    </html>
  );
}