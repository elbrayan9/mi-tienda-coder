// src/app/(shop)/product/[slug]/page.js
"use client"; // <-- Mantenemos esto para la interactividad

import { getProductBySlug } from '../../../../data/products'; // Solo necesitamos getProductBySlug aquí
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './ProductDetail.module.css';
import { useCart } from '@/context/CartContext'; 
import { useState } from 'react';

// NO MÁS generateStaticParams AQUÍ

export default function ProductDetailPage({ params }) {
  const { slug } = params;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
      // En "use client", podemos usar notFound() si se importa
      // o simplemente mostrar un mensaje.
      notFound(); 
      return null; // O return <div>Producto no encontrado</div>;
  }

  // Creamos el Counter local para manejar 'quantity'
  const CounterLocal = ({ maxStock }) => {
    const increment = () => setQuantity(q => (q < maxStock ? q + 1 : q));
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : q));
    
    const counterStyles = { 
        counter: { display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #ccc', borderRadius: '5px', padding: '0.5rem', width: 'fit-content', margin: '1rem 0' },
        button: { background: '#f0f0f0', border: 'none', borderRadius: '4px', width: '30px', height: '30px', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 },
        count: { fontSize: '1.2rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center'}
    };

    return (
      <div style={counterStyles.counter}>
        <button onClick={decrement} style={counterStyles.button}>-</button>
        <span style={counterStyles.count}>{quantity}</span>
        <button onClick={increment} style={counterStyles.button}>+</button>
      </div>
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); 
  };

  return (
    <div className={styles.container}>
      <Image
          src={product.imageUrl} 
          alt={product.name}
          width={300}
          height={300}
          className={styles.image}
      />
      <div className={styles.details}>
          <h1>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.category}>Categoría: {product.category}</p>
          <p className={styles.stock}>Stock: {product.stock}</p>
          <p className={styles.price}>${product.price}</p>

          <h4>Selecciona la cantidad:</h4>
          <CounterLocal maxStock={product.stock} /> 

          <button 
            className={styles.addToCartButton}
            onClick={handleAddToCart} 
          >
            Añadir al Carrito
          </button>
      </div>
    </div>
  );
}