// src/components/Navbar.js
"use client"; // Convertimos a Client Component para usar hooks

import Link from 'next/link';
import styles from './Navbar.module.css';
import { useAuth } from '@/context/AuthContext'; // Importamos el hook de autenticación

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtenemos el usuario y la función de logout

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brand}>MiTienda</Link>
      <ul className={styles.navList}>
        <li><Link href="/catalog" className={styles.navLink}>Catálogo</Link></li>
        <li><Link href="/cart" className={styles.navLink}>Carrito</Link></li>
        
        {/* Lógica condicional */}
        {user ? (
          <>
            <li><Link href="/admin" className={styles.navLink}>Admin</Link></li>
            <li>
              <button onClick={logout} className={`${styles.navLink} ${styles.buttonAsLink}`}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <li><Link href="/login" className={styles.navLink}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;