// src/components/Counter.js
"use client"; // <--- ¡MUY IMPORTANTE! Indica que es un Componente de Cliente

import { useState } from 'react';
import styles from './Counter.module.css';

const Counter = ({ initialValue = 1, maxStock = 10 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    if (count < maxStock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) { // No permitir menos de 1
      setCount(count - 1);
    }
  };

  return (
    <div className={styles.counter}>
      <button onClick={decrement} className={styles.button}>-</button>
      <span className={styles.count}>{count}</span>
      <button onClick={increment} className={styles.button}>+</button>
    </div>
  );
};

export default Counter;