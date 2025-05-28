// src/app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext'; // Ya lo tenías importado, ¡genial!

export const metadata = {
  title: 'Mi Tienda Coder',
  description: 'Proyecto de Maquetación Coderhouse',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* --- ENVOLVEMOS TODO CON CartProvider --- */}
        <CartProvider>
          <Navbar />
          <main style={{ padding: '20px', minHeight: '80vh' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
        {/* --- FIN DE CartProvider --- */}
      </body>
    </html>
  );
}