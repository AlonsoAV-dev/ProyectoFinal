const ordenesEjemplo = [
  {
    id: '7231',
    usuario: 'Juan Perez',
    fecha: '20/01/2025',
    total: 0, // Se calculará
    estado: 'Entregado',
    direccionEnvio: 'Av. Los Incas 123, Surco, Lima',
    metodoPago: 'Tarjeta Visa **** 1234',
    historialEstados: [
      { fecha: '18/01/2025 10:00', estado: 'Procesando' },
      { fecha: '19/01/2025 08:30', estado: 'Enviado' },
      { fecha: '20/01/2025 14:15', estado: 'Entregado' },
    ],
    productos: [
      { idProd: 'P001', nombre: 'Manzanas Rojas', categoria: 'Frutas y verduras', cantidad: 10, precioUnitario: 1.50, total: 15.00, imagen: '/assets/Manzanas.png' },
      { idProd: 'P002', nombre: 'Leche Gloria', categoria: 'Lácteos y huevos', cantidad: 4, precioUnitario: 3.50, total: 14.00, imagen: '/assets/Leche_gloria.png' },
      { idProd: 'P003', nombre: 'Papaya', categoria: 'Frutas y verduras', cantidad: 1, precioUnitario: 7.00, total: 7.00, imagen: '/assets/papaya.png' },
      { idProd: 'P004', nombre: 'Sandía', categoria: 'Frutas y verduras', cantidad: 1, precioUnitario: 12.00, total: 12.00, imagen: '/assets/sandía.png' },
      { idProd: 'P005', nombre: 'Pollo entero fresco', categoria: 'Carnes, aves y pescados', cantidad: 1, precioUnitario: 25.00, total: 25.00, imagen: '/assets/Pollo.png' },
      { idProd: 'P006', nombre: 'Uvas', categoria: 'Frutas y verduras', cantidad: 2, precioUnitario: 4.50, total: 9.00, imagen: '/assets/uvas.png' },
      { idProd: 'P007', nombre: 'Arroz Costeño', categoria: 'Abarrotes', cantidad: 5, precioUnitario: 3.00, total: 15.00, imagen: '/assets/producto_arroz.png' },
    ]
  },
  {
    id: '7232',
    usuario: 'María González',
    fecha: '20/01/2025',
    total: 0, // Se calculará
    estado: 'Por entregar',
    direccionEnvio: 'Calle Las Begonias 456, Miraflores, Lima',
    metodoPago: 'Yape',
    historialEstados: [
      { fecha: '19/01/2025 15:00', estado: 'Procesando' },
      { fecha: '20/01/2025 09:00', estado: 'En preparación' },
    ],
    productos: [
      { idProd: 'P008', nombre: 'Yogurt Griego', categoria: 'Lácteos y huevos', cantidad: 6, precioUnitario: 2.50, total: 15.00, imagen: '/assets/producto_yogurt.png' },
      { idProd: 'P009', nombre: 'Pan de Molde Integral', categoria: 'Panadería', cantidad: 2, precioUnitario: 6.00, total: 12.00, imagen: '/assets/producto_pan_molde.png' },
    ]
  },
  {
    id: '7233',
    usuario: 'Marco Aurelio',
    fecha: '21/01/2025',
    total: 0, // Se calculará
    estado: 'Cancelado',
    direccionEnvio: 'Jr. De la Unión 789, Cercado de Lima',
    metodoPago: 'Efectivo (Pago contra entrega)',
    historialEstados: [
      { fecha: '20/01/2025 11:00', estado: 'Procesando' },
      { fecha: '21/01/2025 09:30', estado: 'Cancelado' },
    ],
    productos: [
      { idProd: 'P010', nombre: 'Atún Primor', categoria: 'Abarrotes', cantidad: 12, precioUnitario: 3.20, total: 38.40, imagen: '/assets/producto_atun.png' },
    ]
  },
  {
    id: '7234',
    usuario: 'Ana Díaz',
    fecha: '24/01/2025',
    total: 0, // Se calculará
    estado: 'En camino',
    direccionEnvio: 'Av. Javier Prado 1010, San Isidro, Lima',
    metodoPago: 'Tarjeta Mastercard **** 5678',
    historialEstados: [
        { fecha: '22/01/2025 16:00', estado: 'Procesando' },
        { fecha: '23/01/2025 10:00', estado: 'Enviado' },
        { fecha: '24/01/2025 08:00', estado: 'En camino' },
    ],
    productos: [
        { idProd: 'P011', nombre: 'Queso Edam', categoria: 'Lácteos y huevos', cantidad: 1, precioUnitario: 18.00, total: 18.00, imagen: '/assets/producto_queso_edam.png' },
        { idProd: 'P012', nombre: 'Jamón Inglés', categoria: 'Embutidos', cantidad: 0.5, precioUnitario: 20.00, total: 10.00, imagen: '/assets/producto_jamon.png' },
    ]
  },
  {
    id: '7235',
    usuario: 'Juan Perez', // Otra orden para Juan Perez
    fecha: '25/01/2025',
    total: 0, // Se calculará
    estado: 'Procesando',
    direccionEnvio: 'Av. Los Incas 123, Surco, Lima',
    metodoPago: 'Tarjeta Visa **** 1234',
    historialEstados: [
        { fecha: '25/01/2025 10:00', estado: 'Procesando' },
    ],
    productos: [
        { idProd: 'P001', nombre: 'Manzanas Rojas', categoria: 'Frutas y verduras', cantidad: 5, precioUnitario: 1.50, total: 7.50, imagen: '/assets/Manzanas.png' },
    ]
  }
];

// Calcular totales de las órdenes
ordenesEjemplo.forEach(orden => {
    orden.total = orden.productos.reduce((acc, producto) => acc + producto.total, 0);
});

export default ordenesEjemplo; 