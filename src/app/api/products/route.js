// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import { db, storage } from '@/firebase/config';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const category = request.nextUrl.searchParams.get('category');
    const productsCollection = collection(db, 'products');
    
    // MODIFICACIÓN: La consulta 'where' ahora siempre compara con el valor en minúsculas
    const q = category 
                ? query(productsCollection, where("category", "==", category.toLowerCase()))
                : query(productsCollection);

    const productsSnapshot = await getDocs(q);

    const products = productsSnapshot.docs.map(doc => {
      const productData = doc.data();
      // Aseguramos que el 'id' sea el ID de texto del documento
      productData.id = doc.id; 
      return productData;
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("ERROR en GET /api/products:", error);
    return NextResponse.json(
        { message: "Falló la consulta para obtener productos.", error: error.message }, 
        { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const productData = {};
    formData.forEach((value, key) => { productData[key] = value; });
    const imageFile = productData.image;

    const storageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
    const imageBuffer = await imageFile.arrayBuffer();
    await uploadBytes(storageRef, imageBuffer, { contentType: imageFile.type });
    
    const imageUrl = await getDownloadURL(storageRef);

    const productToSave = {
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      // MODIFICACIÓN: Guardamos la categoría siempre en minúsculas
      category: productData.category.toLowerCase(), 
      price: Number(productData.price),
      stock: Number(productData.stock),
      imageUrl: imageUrl,
    };

    const productsCollection = collection(db, 'products');
    const docRef = await addDoc(productsCollection, productToSave);

    return NextResponse.json({ message: "Producto creado con éxito", id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("ERROR en POST /api/products:", error);
    return NextResponse.json({ message: "Falló la creación del producto.", error: error.message }, { status: 500 });
  }
}