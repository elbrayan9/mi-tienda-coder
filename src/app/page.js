// src/app/page.js
import Link from 'next/link';
import styles from './Home.module.css'; // Usaremos un nuevo archivo de estilos

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Bienvenido a <span className={styles.appName}>MiTienda</span>
        </h1>
        <p className={styles.subtitle}>
          Tu lugar para encontrar los mejores productos de tecnología y gadgets.
        </p>
      </header>
      
      <main className={styles.main}>
        <p className={styles.description}>
          Hemos trabajado para traerte una selección de los artículos más increíbles y útiles. ¿Estás listo para explorarlos?
        </p>
        <Link href="/catalog" className={styles.ctaButton}>
          Ver Catálogo de Productos
        </Link>
      </main>
    </div>
  );
}