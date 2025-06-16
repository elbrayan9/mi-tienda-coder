// src/app/(admin)/admin/edit/[id]/page.js
import { notFound } from 'next/navigation';
import EditProductForm from './EditProductForm'; // Crearemos este componente a continuación

// Función para obtener los datos de UN SOLO producto
async function getProduct(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, {
        cache: 'no-store', // Siempre queremos los datos más frescos para editar
    });

    if (!response.ok) {
        // Si el producto no existe (error 404), mostramos la página de "no encontrado"
        if (response.status === 404) {
            notFound();
        }
        throw new Error('Failed to fetch product');
    }

    return response.json();
}

export default async function EditProductPage({ params }) {
    const { id } = params;
    const product = await getProduct(id);

    return (
        <div>
            {/* Pasamos los datos del producto al componente del formulario */}
            <EditProductForm product={product} />
        </div>
    );
}