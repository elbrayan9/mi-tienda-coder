// src/app/page.js
import { getProducts } from '@/data/products'; // Ajusta la ruta si es necesario
import ProductCard from '@/components/ProductCard';
import styles from './Catalog.module.css'; // Puedes reusar o crear un css

export default function HomePage() {
  const products = getProducts();

  return (
    <div>
      <h1>Bienvenido a MiTienda - Catálogo</h1>
      <div className={styles.catalogGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}