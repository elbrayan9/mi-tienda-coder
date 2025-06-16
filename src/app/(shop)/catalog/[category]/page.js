// src/app/(shop)/catalog/[category]/page.js
import ProductCard from '@/components/ProductCard';
import styles from '../Catalog.module.css';
import CategoriesMenu from '@/components/CategoriesMenu';

async function getProductsByCategory(category) {
  const decodedCategory = decodeURIComponent(category);
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products?category=${decodedCategory}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export default async function CategoryPage({ params: { category } }) {
  const products = await getProductsByCategory(category);
  const decodedCategory = decodeURIComponent(category);

  return (
    <div>
      <CategoriesMenu />
      <h1>Catálogo de {decodedCategory}</h1>
      <div className={styles.catalogGrid}>
        {products.length > 0
            ? products.map(product => <ProductCard key={product.id} product={product} />)
            : <p>No hay productos en esta categoría.</p>
        }
      </div>
    </div>
  );
}