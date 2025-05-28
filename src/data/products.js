// src/data/products.js
export const products = [
  {
    id: 1,
    slug: 'producto-estrella-1',
    name: 'Producto Increíble',
    price: 100,
    description: 'Este es el mejor producto que verás.',
    stock: 10,
    category: 'Tecnología',
    imageUrl: '/producto1.png' // <-- CAMBIADO
  },
  {
    id: 2,
    slug: 'gadget-genial-2',
    name: 'Gadget Genial',
    price: 75,
    description: 'Un gadget que no sabías que necesitabas.',
    stock: 5,
    category: 'Gadgets',
    imageUrl: '/producto2.png' // <-- CAMBIADO
  },
  {
    id: 3,
    slug: 'accesorio-util-3',
    name: 'Accesorio Útil',
    price: 30,
    description: 'Hará tu vida mucho más fácil.',
    stock: 20,
    category: 'Accesorios',
    imageUrl: '/producto3.png' // <-- CAMBIADO
  },
];

// ... (tus funciones getProducts y getProductBySlug)
export const getProducts = () => {
  return products;
};
export const getProductBySlug = (slug) => {
  return products.find(prod => prod.slug === slug);
};