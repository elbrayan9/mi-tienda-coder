// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';

// --- FUNCIÓN GET para obtener UN solo producto ---
export async function GET(request, { params }) {
    const { id } = params;
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// --- FUNCIÓN DELETE para ELIMINAR un producto ---
export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
        return NextResponse.json({ message: "Producto eliminado" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// --- FUNCIÓN PUT para ACTUALIZAR un producto ---
export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const body = await request.json();
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, body);

        return NextResponse.json({ message: "Producto actualizado" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}