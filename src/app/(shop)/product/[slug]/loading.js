// src/app/(shop)/product/[slug]/loading.js
// Puedes usar los estilos de ProductDetail o crear unos nuevos para el esqueleto
import styles from './ProductDetail.module.css'; 

const skeletonImageStyle = {
  width: '300px',
  height: '300px',
  backgroundColor: '#e0e0e0',
  borderRadius: '8px',
};

const skeletonTextStyle = (width = '100%', height = '20px') => ({
  height: height,
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  width: width,
  marginBottom: '1rem'
});


export default function ProductDetailLoading() {
  return (
    <div className={styles.container} aria-busy="true" aria-live="polite">
      {/* Esqueleto para la imagen */}
      <div style={skeletonImageStyle}></div>
      
      {/* Esqueleto para los detalles */}
      <div className={styles.details}>
        <div style={skeletonTextStyle('70%', '36px')}></div> {/* Título */}
        <div style={skeletonTextStyle()}></div> {/* Descripción línea 1 */}
        <div style={skeletonTextStyle('80%')}></div> {/* Descripción línea 2 */}
        <div style={skeletonTextStyle('60%')}></div> {/* Categoría */}
        <div style={skeletonTextStyle('40%')}></div> {/* Stock */}
        <div style={skeletonTextStyle('30%', '28px')}></div> {/* Precio */}
        <div style={{ marginTop: '1.5rem', ...skeletonTextStyle('150px', '45px') }}></div> {/* Botón */}
      </div>
    </div>
  );
}