"use client"; // Es un componente de cliente porque usa estado (useState)

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Estilos básicos para simplicidad
const styles = {
    container: { maxWidth: '600px', margin: '50px auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    input: { padding: '0.8rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' },
    textarea: { padding: '0.8rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' },
    button: { padding: '0.8rem', fontSize: '1rem', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    buttonDisabled: { backgroundColor: '#aaa' },
    feedback: { marginTop: '1rem', textAlign: 'center' }
};

// LA FUNCIÓN NO DEBE SER ASYNC
export default function AddProductPage() {
    const [values, setValues] = useState({ name: '', slug: '', description: '', category: '', price: 0, stock: 0 });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

        if (name === 'name') {
            const newSlug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setValues(prev => ({ ...prev, slug: newSlug }));
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!file) {
            setError("Por favor, selecciona una imagen para el producto.");
            return;
        }
        setLoading(true);

        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]));
        formData.append('image', file);

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al crear el producto");
            }

            setSuccess("¡Producto creado con éxito!");
            router.push('/admin');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Añadir Nuevo Producto</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input name="name" value={values.name} onChange={handleChange} placeholder="Nombre del producto" style={styles.input} required />
                <input name="slug" value={values.slug} onChange={handleChange} placeholder="Slug del producto" style={styles.input} required />
                <textarea name="description" value={values.description} onChange={handleChange} placeholder="Descripción" style={styles.textarea} required />
                <input name="category" value={values.category} onChange={handleChange} placeholder="Categoría" style={styles.input} required />
                <input name="price" type="number" value={values.price} onChange={handleChange} placeholder="Precio" style={styles.input} required />
                <input name="stock" type="number" value={values.stock} onChange={handleChange} placeholder="Stock" style={styles.input} required />
                <input type="file" onChange={handleFileChange} style={styles.input} required />
                
                <button type="submit" style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button} disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Producto'}
                </button>

                {error && <p style={{...styles.feedback, color: 'red'}}>{error}</p>}
                {success && <p style={{...styles.feedback, color: 'green'}}>{success}</p>}
            </form>
        </div>
    );
}