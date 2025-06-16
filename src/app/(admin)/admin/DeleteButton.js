"use client";

import styles from './Admin.module.css';
import { useRouter } from 'next/navigation';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function DeleteButton({ productId }) {
    const router = useRouter();

    const handleDelete = async () => {
        // 1. Mostramos en consola la ID que estamos intentando borrar
        console.log("Intentando eliminar el producto con ID:", productId);

        if (!productId) {
            alert("Error: ID de producto no válida.");
            return;
        }

        const confirmed = window.confirm(
            `¿Estás seguro de que quieres eliminar el producto con ID: ${productId}?`
        );

        if (confirmed) {
            try {
                const docRef = doc(db, "products", productId);
                await deleteDoc(docRef);
                alert("Producto eliminado con éxito."); // Añadimos una alerta de éxito
                router.refresh();
            } catch (error) {
                // 2. Mostramos el error completo de Firebase en la consola
                console.error("Error detallado al eliminar el producto:", error);
                alert(`Hubo un error al eliminar el producto. Revisa la consola para más detalles.`);
            }
        }
    };

    return (
        <button 
            onClick={handleDelete}
            className={`${styles.button} ${styles.buttonSmall} ${styles.buttonDanger}`}
        >
            Eliminar
        </button>
    );
}