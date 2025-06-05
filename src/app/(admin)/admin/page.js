// src/app/(admin)/admin/page.js
import styles from './Admin.module.css';

// Función para obtener productos desde nuestro API Route Handler
// Podrías crear un Route Handler específico para admin si necesitas más datos o seguridad
async function getAdminProducts() {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/products`; 
  
  const response = await fetch(apiUrl, { 
    cache: 'no-store', // Para admin, usualmente quieres datos frescos
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products for admin');
  }
  return response.json();
}


export default async function AdminPage() {
  let sampleProducts = [];
  let fetchError = null;

  try {
    sampleProducts = await getAdminProducts();
  } catch (error) {
    console.error("Error en AdminPage:", error);
    fetchError = error.message;
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al área de gestión de MiTienda.</p>

      {/* ... (resto de tus cards de dashboard) ... */}
       <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <h2>Gestionar Productos</h2>
          <p>Añade, edita o elimina productos de tu catálogo.</p>
          {/* Idealmente, este botón llevaría a una página específica de gestión de productos */}
          <button className={styles.button}>Ir a Productos</button>
        </div>
        <div className={styles.card}>
          <h2>Ver Pedidos</h2>
          <p>Revisa los pedidos recibidos y gestiona su estado.</p>
          <button className={styles.button}>Ir a Pedidos</button>
        </div>
        <div className={styles.card}>
          <h2>Configuración</h2>
          <p>Ajusta la configuración general de la tienda.</p>
          <button className={styles.button}>Ir a Configuración</button>
        </div>
      </div>


      <div className={styles.recentActivity}>
        <h2>Listado de Productos</h2>
        {fetchError && <p style={{color: 'red'}}>Error al cargar productos: {fetchError}</p>}
        {!fetchError && sampleProducts.length === 0 && <p>No hay productos para mostrar.</p>}
        {!fetchError && sampleProducts.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>ID Documento</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sampleProducts.map(product => (
                  <tr key={product.id}> {/* product.id aquí es el ID del documento de Firestore */}
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price?.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      {/* Estos botones necesitarían Client Components y más lógica para la funcionalidad */}
                      <button className={`${styles.button} ${styles.buttonSmall}`}>Editar</button>
                      <button className={`${styles.button} ${styles.buttonSmall} ${styles.buttonDanger}`}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}