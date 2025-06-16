// src/app/(shop)/catalog/page.js
import ProductCard from '@/components/ProductCard';
import styles from './Catalog.module.css';
import CategoriesMenu from '@/components/CategoriesMenu'; // <-- ESTA ES LA LÍNEA NUEVA DE IMPORTACIÓN

// Esta función no cambia
async function getProductsFromApi() {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/products`;
  
  const response = await fetch(apiUrl, { 
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export default async function CatalogPage() {
  const products = await getProductsFromApi();

  return (
    <div>
      {/* AQUÍ ES DONDE AGREGAMOS EL MENÚ */}
      <CategoriesMenu />

      <h1>Bienvenido a MiTienda - Catálogo</h1>
      <div className={styles.catalogGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}