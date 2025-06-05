// Archivo: src/app/api/products/[slug]/route.js
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export async function GET(request, { params }) {
  if (!params || !params.slug) {
    return NextResponse.json({ message: "Parámetro slug no encontrado en la URL" }, { status: 400 });
  }
  const { slug } = params;

  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    const productDoc = querySnapshot.docs[0];
    const product = {
      id: productDoc.id,
      ...productDoc.data(),
    };

    return NextResponse.json(product);
  } catch (error) {
    console.error(`Error al buscar producto con slug ${slug}:`, error);
    return NextResponse.json({ message: "Error al buscar el producto", error: error.message }, { status: 500 });
  }
}