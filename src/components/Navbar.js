// src/components/Navbar.js
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brand}>MiTienda</Link>
      <ul className={styles.navList}>
        <li><Link href="/catalog" className={styles.navLink}>Catálogo</Link></li>
        <li><Link href="/cart" className={styles.navLink}>Carrito</Link></li>
        <li><Link href="/admin" className={styles.navLink}>Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;