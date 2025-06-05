// src/app/(shop)/catalog/loading.js
import styles from './Catalog.module.css'; // Puedes reusar o crear estilos específicos

// Estilos básicos para el esqueleto de ProductCard
const skeletonCardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1.5rem',
  textAlign: 'center',
  width: '250px', // Mantén consistencia con ProductCard
  backgroundColor: '#f0f0f0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  height: '320px' // Aproximado al ProductCard
};

const skeletonImageStyle = {
  width: '150px',
  height: '150px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  margin: '0 auto'
};

const skeletonTextStyle = {
  height: '20px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  width: '80%',
  margin: '0 auto'
};

const skeletonButtonSyle = {
    height: '40px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    width: '120px',
    margin: '0 auto'
}

const SkeletonProductCard = () => (
  <div style={skeletonCardStyle}>
    <div style={skeletonImageStyle}></div>
    <div style={{...skeletonTextStyle, width: '70%'}}></div>
    <div style={{...skeletonTextStyle, width: '50%'}}></div>
    <div style={skeletonButtonSyle}></div>
  </div>
);

export default function CatalogLoading() {
  // Muestra una cuadrícula de tarjetas esqueleto
  return (
    <div>
      <h1>Cargando Catálogo de Productos...</h1>
      <div className={styles.catalogGrid}>
        {Array.from({ length: 6 }).map((_, index) => ( // Muestra 6 esqueletos
          <SkeletonProductCard key={index} />
        ))}
      </div>
    </div>
  );
}