// src/app/test-image/page.js
import Image from 'next/image';

export default function TestImagePage() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Página de Prueba de Imagen</h1>
      <p>Si todo está bien configurado, deberías ver una imagen aquí abajo:</p>
      <div style={{ marginTop: '30px', border: '2px solid blue', padding: '10px' }}>
        <Image
          src="https://via.placeholder.com/150/007bff/FFFFFF?Text=Test!"
          alt="Imagen de Prueba"
          width={150}
          height={150}
        />
      </div>
      <p style={{ marginTop: '20px' }}>
        Esta imagen viene de 'via.placeholder.com', el mismo sitio que usamos en el carrito.
      </p>
    </div>
  );
}