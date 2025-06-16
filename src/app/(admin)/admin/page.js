// src/app/(admin)/admin/page.js
import styles from './Admin.module.css';
import Link from 'next/link';
import DeleteButton from './DeleteButton'; // Componente para el botón de eliminar

// Función para obtener los productos desde la API
async function getAdminProducts() {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/products`; 
  try {
    const response = await fetch(apiUrl, { 
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products for admin');
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { error: error.message };
  }
}

export default async function AdminPage() {
  const productsResult = await getAdminProducts();
  const sampleProducts = productsResult.error ? [] : productsResult;
  const fetchError = productsResult.error ? productsResult.error : null;

  return (
    <div className={styles.adminContainer}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al área de gestión de MiTienda.</p>

       <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <h2>Gestionar Productos</h2>
          <p>Añade, edita o elimina productos de tu catálogo.</p>
          {/* BOTÓN "AÑADIR" - AHORA ES UN ENLACE */}
          <Link href="/admin/add" className={styles.button}>
            Añadir Producto
          </Link>
        </div>
        <div className={styles.card}>
          <h2>Ver Pedidos</h2>
          <p>Revisa los pedidos recibidos y gestiona su estado.</p>
          <button className={styles.button} disabled>Ir a Pedidos</button>
        </div>
        <div className={styles.card}>
          <h2>Configuración</h2>
          <p>Ajusta la configuración general de la tienda.</p>
          <button className={styles.button} disabled>Ir a Configuración</button>
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
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sampleProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.price?.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      {/* BOTÓN "EDITAR" - AHORA ES UN ENLACE */}
                      <Link 
                        href={`/admin/edit/${product.id}`} 
                        className={`${styles.button} ${styles.buttonSmall}`}
                      >
                        Editar
                      </Link>
                      
                      {/* BOTÓN "ELIMINAR" - AHORA USA SU PROPIO COMPONENTE */}
                      <DeleteButton productId={product.id} />
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