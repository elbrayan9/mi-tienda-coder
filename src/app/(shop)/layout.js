// src/app/(shop)/layout.js
// Puedes añadir elementos específicos aquí, o simplemente devolver children
// si el RootLayout ya es suficiente. Por ahora, lo dejamos simple.
export default function ShopLayout({ children }) {
  return (
    <>
      {/* Aquí podrías poner un banner o menú lateral solo para la tienda */}
      {children}
    </>
  );
}