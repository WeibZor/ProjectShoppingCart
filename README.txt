Estructura

carrito-compras/
│
├── assets/                   → Recursos estáticos
│   ├── img/                  → Imágenes de productos, logos, íconos
│   ├── videos/               → Material audiovisual (opcional)
│   └── css/
│       └── styles.css        → Estilos globales y específicos por componentes
│
├── controllers/              → Lógica de negocio y manipulación del DOM
│   ├── Cliente.js
│   ├── Producto.js
│   ├── Laptop.js
│   ├── Smartphone.js
│   ├── Accesorio.js
│   ├── CarritoCompra.js
│   ├── Orden.js
│   └── app.js                → Punto de entrada principal para eventos y renderizado
│
├── views/                    → Vistas HTML
│   ├── index.html            → Inicio de sesión y registro
│   ├── catalogo.html         → Catálogo de productos
│   ├── carrito.html          → Carrito de compras
│   └── orden.html            → Resumen de la orden
│
└── README.md                 → Documentación técnica del proyecto


-------------------------------------------------------------------------------------------

Trabajo en Equipo:

Integrante 1
- Base en HTML + lógica en JS (POO)
- Construir la estructura principal en HTML (pantallas de inicio de sesión y registro).
- Crear las clases en JavaScript: Cliente y Producto (superclase).
- Implementar métodos de Cliente (registrar, iniciarSesion, modificarDatos).
- Implementar Producto con atributos básicos y método mostrarInfo().

Integrante 2
- Base en CSS + lógica en JS (herencia y polimorfismo)
- Diseñar estilos generales y responsivos para las pantallas de Inicio y Catálogo.
- Definir paleta de colores, tipografías y botones principales.
- Implementar subclases en JavaScript: Laptop, Smartphone y Accesorio, aplicando herencia y polimorfismo.
- Asegurar que mostrarInfo() en cada producto se sobrescriba con información específica.

Integrante 3
- Base en DOM + lógica en JS (carrito y orden)
- Construir estructura en HTML para Catálogo, Carrito y Orden.
- Implementar la clase CarritoCompra (agregarProducto, eliminarProducto, actualizarCantidad, calcularTotal).
- Implementar la clase Orden (generarOrden, mostrarResumen).
- Programar manipulación del DOM: mostrar productos dinámicamente, actualizar carrito en tiempo real, mostrar total y resumen de orden.