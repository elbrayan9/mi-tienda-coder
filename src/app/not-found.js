// src/app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>¡Oops! Página No Encontrada</h2>
      <p>La página que buscas no existe o fue movida.</p>
      <Link href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
        Volver al Inicio
      </Link>
    </div>
  );
}