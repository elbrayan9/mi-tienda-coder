// src/app/(shop)/catalog/page.js
import ProductCard from '@/components/ProductCard';
import styles from './Catalog.module.css';
// Ya no importamos getProducts de src/data/products.js

// Función para obtener productos desde nuestro API Route Handler
async function getProductsFromApi() {
  // Construye la URL completa para el fetch del lado del servidor
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/products`;
  
  const response = await fetch(apiUrl, { 
    cache: 'no-store', // O 'force-cache', o revalidate
    // next: { revalidate: 3600 } // Revalidar cada hora, por ejemplo
  });

  if (!response.ok) {
    // Esto activará el Error Boundary más cercano, ej. error.js
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export default async function CatalogPage() { // Convertimos a async function
  const products = await getProductsFromApi();

  if (!products || products.length === 0) {
    return (
      <div>
        <h1>Catálogo de Productos</h1>
        <p>No hay productos disponibles en este momento.</p>
      </div>
    );
  }

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