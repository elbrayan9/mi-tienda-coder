// src/components/ProductCard.js
import Link from 'next/link';
import Image from 'next/image'; // Usamos Next/Image
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={150}
        height={150}
        className={styles.image}
      />
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.price}>${product.price}</p>
      <Link href={`/product/${product.slug}`} className={styles.link}>
        Ver Detalles
      </Link>
    </div>
  );
};

export default ProductCard;