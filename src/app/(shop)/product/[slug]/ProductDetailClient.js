// src/app/(shop)/product/[slug]/ProductDetailClient.js
"use client"; // Mantenemos esto porque es el componente interactivo

import Image from 'next/image';
import styles from './ProductDetail.module.css';
import { useCart } from '@/context/CartContext'; 
import { useState } from 'react';

// Este componente ahora recibe el producto directamente como prop
export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  // El estado para la cantidad sigue viviendo aquí
  const [quantity, setQuantity] = useState(1);

  // El `useEffect` para buscar datos ya no es necesario aquí.

  // El componente Counter local sigue siendo útil
  const CounterLocal = ({ maxStock }) => {
    const increment = () => setQuantity(q => (q < maxStock ? q + 1 : q));
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : q));
    
    // Puedes mantener tus estilos o usar los de tu componente Counter importado si lo prefieres
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
          src={product.imageUrl || "https://via.placeholder.com/300?text=No+Image"} 
          alt={product.name}
          width={300}
          height={300}
          className={styles.image}
          priority
      />
      <div className={styles.details}>
          <h1>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.category}>Categoría: {product.category}</p>
          <p className={styles.stock}>Stock: {product.stock}</p>
          <p className={styles.price}>${product.price?.toFixed(2)}</p>

          <h4>Selecciona la cantidad:</h4>
          <CounterLocal maxStock={product.stock} /> 

          <button 
            className={styles.addToCartButton}
            onClick={handleAddToCart} 
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Sin Stock" : "Añadir al Carrito"}
          </button>
      </div>
    </div>
  );
}