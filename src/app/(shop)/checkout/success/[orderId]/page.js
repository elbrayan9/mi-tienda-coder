// src/app/(shop)/checkout/success/[orderId]/page.js
import Link from 'next/link';

const styles = {
    container: { textAlign: 'center', padding: '50px', backgroundColor: '#f0fff4', border: '2px solid #28a745', borderRadius: '8px', maxWidth: '600px', margin: '50px auto' },
    title: { color: '#28a745' },
    orderId: { fontWeight: 'bold', backgroundColor: '#e9ecef', padding: '5px 10px', borderRadius: '5px', display: 'inline-block', margin: '1rem 0' },
    link: { display: 'inline-block', marginTop: '2rem', padding: '0.8rem 1.5rem', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }
};

export default function SuccessPage({ params }) {
    const { orderId } = params;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>¡Gracias por tu compra!</h1>
            <p>Tu pedido ha sido procesado con éxito.</p>
            <p>Tu número de orden es:</p>
            <p style={styles.orderId}>{orderId}</p>
            <Link href="/catalog" style={styles.link}>
                Seguir comprando
            </Link>
        </div>
    );
}