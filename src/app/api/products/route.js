// Archivo: src/app/api/products/route.js
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);

    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("ERROR en /api/products/route.js:", error);
    return NextResponse.json(
        { message: "Falló la consulta para obtener todos los productos.", error_details: { name: error.name, message: error.message, code: error.code }}, 
        { status: 500 }
    );
  }
}