// src/app/(admin)/admin/page.js
import styles from './Admin.module.css';

// Datos simulados para la tabla
const sampleProducts = [
  { id: 1, name: 'Producto Increíble', price: 100, stock: 10 },
  { id: 2, name: 'Gadget Genial', price: 75, stock: 5 },
  { id: 3, name: 'Accesorio Útil', price: 30, stock: 20 },
];

export default function AdminPage() {
  return (
    <div className={styles.adminContainer}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al área de gestión de MiTienda.</p>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <h2>Gestionar Productos</h2>
          <p>Añade, edita o elimina productos de tu catálogo.</p>
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
        <h2>Actividad Reciente (Ejemplo: Productos)</h2>
        <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sampleProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button className={`${styles.button} ${styles.buttonSmall}`}>Editar</button>
                  <button className={`${styles.button} ${styles.buttonSmall} ${styles.buttonDanger}`}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}