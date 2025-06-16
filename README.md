# Mi Tienda Coder - Proyecto Final

Este es un proyecto de e-commerce full-stack desarrollado para el curso de Next.js. La aplicación es un sitio web autoadministrable que permite la venta y gestión de productos, utilizando Next.js para el frontend y el backend, y Firebase para los servicios de base de datos, autenticación y almacenamiento de archivos.

## Características Principales

* **Catálogo de Productos**: Página de catálogo generada dinámicamente desde Firestore, con la capacidad de filtrar productos por categoría.
* **Detalle de Producto**: Páginas de detalle generadas dinámicamente para cada producto, con selector de cantidad y control de stock.
* **Carrito de Compras**: Funcionalidad completa de carrito de compras, con estado persistente en el navegador del usuario.
* **Proceso de Checkout**: Flujo de finalización de compra que genera órdenes en la base de datos para usuarios autenticados.
* **Panel de Administración Protegido**: Una sección `/admin` privada, accesible solo mediante login.
* **Gestión de Productos (CRUD)**: Desde el panel de administración, el usuario puede Crear, Leer, Actualizar y Eliminar productos del catálogo, incluyendo la subida de imágenes.
* **Autenticación**: Sistema de login con email y contraseña utilizando Firebase Authentication.

## Tecnologías Utilizadas

* **Next.js**: Framework de React con renderizado del lado del servidor (SSR) y App Router.
* **React**: Biblioteca para construir la interfaz de usuario.
* **Firebase**:
    * **Cloud Firestore**: Como base de datos NoSQL para productos y órdenes.
    * **Authentication**: Para la gestión de usuarios y protección de rutas.
    * **Storage**: Para el almacenamiento y servicio de las imágenes de los productos.
* **CSS Modules**: Para el estilizado de componentes de forma modular.

## Configuración del Proyecto

Para poder ejecutar este proyecto localmente, necesitarás tus propias credenciales de un proyecto de Firebase.

### Pasos para la Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
    cd mi-tienda-coder
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Crear el archivo de variables de entorno:**
    Crea un archivo llamado `.env.local` en la raíz del proyecto.

4.  **Añadir tus credenciales:**
    Abre el archivo `.env.local` y añade las siguientes variables con las credenciales de tu propio proyecto de Firebase. Puedes encontrar estas claves en la configuración de tu proyecto en la consola de Firebase.

    ```
    # URL para el entorno de desarrollo
    NEXT_PUBLIC_APP_URL=http://localhost:3000

    # Credenciales de tu proyecto de Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=12345...
    NEXT_PUBLIC_FIREBASE_APP_ID=1:12345...
    ```

5.  **Configurar Firebase:**
    * Asegúrate de haber habilitado los servicios de **Authentication** (con el proveedor de Email/Contraseña), **Cloud Firestore** y **Storage** en tu proyecto de Firebase.
    * Verifica que las **Reglas de Seguridad** tanto de Firestore como de Storage estén configuradas correctamente para permitir las operaciones de lectura y escritura necesarias.

6.  **Ejecutar el proyecto:**
    ```bash
    npm run dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación funcionando.

## 🚀 Despliegue en Vercel

Puedes ver el proyecto funcionando en vivo en el siguiente enlace:

**[https://TU_URL_DE_VERCEL_AQUI.vercel.app/](https://mi-tienda-coder.vercel.app/)**
