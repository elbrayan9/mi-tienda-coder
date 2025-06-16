// src/app/api/orders/route.js
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
    try {
        // 1. Obtener los datos del cuerpo de la petición
        const { cartItems, totalPrice, buyer } = await request.json();

        // 2. Validar que el comprador esté presente
        if (!buyer || !buyer.id) {
            return NextResponse.json({ message: "Se requiere un comprador autenticado." }, { status: 400 });
        }
        
        // 3. Crear el objeto de la orden
        const orderToSave = {
            buyerId: buyer.id,
            buyerEmail: buyer.email,
            items: cartItems,
            total: totalPrice,
            createdAt: serverTimestamp(), // <-- Añade la fecha de creación desde el servidor
        };

        // 4. Guardar la orden en Firestore
        const ordersCollection = collection(db, 'orders');
        const docRef = await addDoc(ordersCollection, orderToSave);

        // 5. Devolver una respuesta exitosa con el ID de la nueva orden
        return NextResponse.json({ message: "Orden creada con éxito", orderId: docRef.id }, { status: 201 });

    } catch (error) {
        console.error("ERROR en POST /api/orders:", error);
        return NextResponse.json({ message: "Falló la creación de la orden.", error: error.message }, { status: 500 });
    }
}