// src/app/(shop)/cart/page.js
"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './Cart.module.css';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartPage() {
  // OJO: He añadido todas las funciones que usas desde el contexto del carrito
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (!user) {
      alert("Por favor, inicia sesión para finalizar la compra.");
      router.push('/login');
      return;
    }

    setLoading(true);

    const orderData = {
        cartItems: cartItems,
        totalPrice: totalPrice,
        buyer: {
            id: user.uid,
            email: user.email,
        }
    };

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al crear la orden.");
        }

        clearCart();
        router.push(`/checkout/success/${data.orderId}`);

    } catch (error) {
        alert(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Tu Carrito de Compras</h1>

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
            {/* ESTA ES LA TABLA QUE FALTABA */}
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
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <Image 
                        src={item.imageUrl || "https://via.placeholder.com/50"} 
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
                      <button 
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.id)}
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
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className={styles.checkoutButton} 
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Finalizar Compra'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}