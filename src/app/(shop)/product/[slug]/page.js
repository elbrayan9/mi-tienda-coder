// src/app/(shop)/product/[slug]/page.js
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

// La función generateStaticParams no cambia.
export async function generateStaticParams() {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/products`;
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' }); 
    if (!response.ok) {
      console.error("Fallo al buscar productos para generateStaticParams");
      return [];
    }
    const products = await response.json();
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error en generateStaticParams:", error);
    return [];
  }
}

// -- Componente de Página (Server Component) Refactorizado --
export default async function ProductDetailPage({ params }) {
  const { slug } = params;

  // Si por alguna razón el slug no está, redirigir a 404.
  if (!slug) {
    notFound();
  }

  // Hacemos el fetch directamente aquí.
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${slug}`;
  const response = await fetch(apiUrl, { 
    next: { revalidate: 3600 } // Revalida cada hora
  });

  // Si la respuesta de la API es 404, activamos la página not-found.
  if (response.status === 404) {
    notFound();
  }

  // Si hay otro tipo de error, Next.js mostrará la página error.js más cercana.
  if (!response.ok) {
    throw new Error(`Fallo al obtener datos del producto con slug: ${slug}`);
  }

  const product = await response.json();

  // Pasamos los datos obtenidos al componente de cliente.
  return <ProductDetailClient product={product} />;
}