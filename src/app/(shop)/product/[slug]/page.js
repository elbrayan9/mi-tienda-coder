// src/app/(shop)/product/[slug]/page.js
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';


export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = await getProductBySlug(slug); // Reutilizamos la función que ya tenías

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: `MiTienda - ${product.name}`,
    description: product.description,
  };
}

async function getProductBySlug(slug) {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where("slug", "==", slug), limit(1));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) { return null; }
    const productDoc = querySnapshot.docs[0];
    return { id: productDoc.id, ...productDoc.data() };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

async function getAllProducts() {
    try {
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsRef);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching all products for static params:", error);
        return [];
    }
}

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((product) => ({ slug: product.slug, }));
  } catch (error) {
    console.error("Error en generateStaticParams:", error);
    return [];
  }
}

// LA LÍNEA CLAVE QUE SOLUCIONA EL ERROR ES ESTA:
export default async function ProductDetailPage({ params: { slug } }) {
  if (!slug) {
    notFound();
  }
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  return <ProductDetailClient product={product} />;
}