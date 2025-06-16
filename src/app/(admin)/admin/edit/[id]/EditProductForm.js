// src/app/(admin)/admin/edit/[id]/EditProductForm.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Usaremos los mismos estilos que en el formulario de añadir
const styles = {
    container: { maxWidth: '600px', margin: '50px auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    input: { padding: '0.8rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' },
    textarea: { padding: '0.8rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' },
    button: { padding: '0.8rem', fontSize: '1rem', color: '#fff', backgroundColor: '#28a745', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    buttonDisabled: { backgroundColor: '#aaa' },
    feedback: { marginTop: '1rem', textAlign: 'center' }
};

// El componente recibe el producto a editar como prop
export default function EditProductForm({ product }) {
    // Inicializamos el estado con los valores del producto existente
    const [values, setValues] = useState(product);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Enviamos una petición PUT al endpoint de la API con el ID del producto
            const response = await fetch(`/api/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    slug: values.slug,
                    description: values.description,
                    category: values.category,
                    price: Number(values.price),
                    stock: Number(values.stock),
                }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el producto.");
            }

            // Redirigir de vuelta al panel de admin principal
            router.push('/admin');
            router.refresh(); // Opcional: refresca los datos en la página de admin

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Editar Producto</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Nombre:</label>
                <input name="name" value={values.name} onChange={handleChange} style={styles.input} required />
                
                <label>Slug:</label>
                <input name="slug" value={values.slug} onChange={handleChange} style={styles.input} required />
                
                <label>Descripción:</label>
                <textarea name="description" value={values.description} onChange={handleChange} style={styles.textarea} required />
                
                <label>Categoría:</label>
                <input name="category" value={values.category} onChange={handleChange} style={styles.input} required />

                <label>Precio:</label>
                <input name="price" type="number" value={values.price} onChange={handleChange} style={styles.input} required />

                <label>Stock:</label>
                <input name="stock" type="number" value={values.stock} onChange={handleChange} style={styles.input} required />
                
                <p><strong>Nota:</strong> La edición de la imagen no está implementada en este formulario. Para cambiar la imagen, puedes eliminar y volver a crear el producto.</p>

                <button type="submit" style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button} disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar Producto'}
                </button>
            </form>
        </div>
    );
}