// src/app/(shop)/cart/page.js
"use client"; // <-- ¡MUY IMPORTANTE! Para usar hooks

import Link from 'next/link';
import Image from 'next/image';
import styles from './Cart.module.css';
import { useCart } from '@/context/CartContext'; // <-- IMPORTAMOS el hook del contexto

export default function CartPage() {
  // Obtenemos los items y la función para remover desde el contexto
  const { cartItems, removeFromCart } = useCart(); 

  // Calculamos el subtotal y total BASADO EN LOS ITEMS DEL CONTEXTO
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal; 

  return (
    <div className={styles.cartContainer}>
      <h1>Tu Carrito de Compras</h1>

      {/* Verificamos si hay items en el CONTEXTO */}
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Tu carrito está actualmente vacío.</p>
          <Link href="/catalog" className={styles.continueShopping}>
            ¡Empieza a comprar!
          </Link>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.tableWrapper}>
            <table className={styles.cartTable}>
              <thead>
                <tr>
                  <th colSpan="2">Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Iteramos sobre los items del CONTEXTO */}
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        width={50} 
                        height={50} 
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      {/* Botón para eliminar, llama a removeFromCart del CONTEXTO */}
                      <button 
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.id)} // <-- AÑADIMOS onClick
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.summary}>
            <h2>Resumen del Pedido</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}