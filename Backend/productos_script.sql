-- Insertar categorías
INSERT INTO categoria (nombre, descripcion, estado, "createdAt", "updatedAt") VALUES
('Frutas y verduras', 'Productos frescos como frutas y vegetales', 'Activo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Lacteos y huevos', 'Productos derivados de la leche y huevos', 'Activo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Carnes, aves y pescados', 'Carnes frescas, aves y pescados', 'Activo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO productos (nombre, presentacion, descripcion, categoria, stock, precio, imagen,   "createdAt", "updatedAt") VALUES
('Uvas', '0,8kg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?', 'Frutas y verduras', 10, 6.90, '/assets/uvas.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP),

('Peras', '1kg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?', 'Frutas y verduras', 23, 4.50, '/assets/peras.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP),

('Manzanas Rojas', '0,3kg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?', 'Frutas y verduras', 21, 2.90, '/assets/manzanas.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP),

('Sandía', '1kg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?', 'Frutas y verduras', 10, 3.20, '/assets/Sandía.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP),

('Leche gloria', '8 unidades', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?', 'Lacteos y huevos', 30, 12.90, '/assets/leche_gloria.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP),

('Pollo entero fresco con menudencia', '2,2kg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?', 'Carnes, aves y pescados', 3, 21.50, '/assets/Pollo.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP),

('Papaya', '0,8kg', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?', 'Frutas y verduras', 15, 4.80, '/assets/papaya.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP);


INSERT INTO users (nombre, apellido, dni, direccion, ciudad, telefono, correo, nombreDeUsuario, password, "fechaRegistro", estado, img, "createdAt", "updatedAt")
VALUES 
('Juan', 'Perez', '12345678', 'ABC', 'abc', '92343244', 'juan.perez@gmail.com', 'JuanP123', 'hola123', '2025-01-20', 'Activo', './public/assets/user2.png', '2025-01-20 10:00:00', '2025-01-20 10:00:00'),

('María', 'Gómez', '23456789', 'Av. Central 456v', 'Lima', '98765432', 'maria.gomez@gmail.com', 'MariaG89', 'clave456', '2025-01-21', 'Activo', './public/assets/user3.png', '2025-01-21 11:30:00', '2025-01-21 11:30:00'),

('Luis', 'Ramírez', '34567890', 'Jr. Las Flores 789', 'Cusco', '91234567', 'luis.ramirez@yahoo.com', 'LuisR21', 'pass789', '2025-01-22', 'Inactivo', './public/assets/user1.png', '2025-01-22 09:15:00', '2025-01-22 09:15:00'),

('Ana', 'Torres', '45678901', 'Mz C Lote 5', 'Arequipa', '93456789', 'ana.torres@outlook.com', 'AnaT2025', 'torres123', '2025-01-23', 'Activo', './public/assets/user3.png', '2025-01-23 08:45:00', '2025-01-23 08:45:00'),

('Carlos', 'Sánchez', '56789012', 'Calle Lima 333', 'Trujillo', '99887766', 'carlos.s@gmail.com', 'CarlSanch', 'qwerty12', '2025-01-24', 'Activo', './public/assets/user2.png', '2025-01-24 14:20:00', '2025-01-24 14:20:00'),

('Valeria', 'Flores', '67890123', 'Av. Los Álamos 321', 'Chiclayo', '91122334', 'valeria.f@gmail.com', 'ValeF123', 'valepass', '2025-01-25', 'Activo', './public/assets/user3.png', '2025-01-25 12:10:00', '2025-01-25 12:10:00'),

('Diego', 'Luna', '78901234', 'Calle El Sol 100', 'Huancayo', '92233445', 'diego.luna@gmail.com', 'DgLuna', 'lunapass', '2025-01-26', 'Activo', './public/assets/user2.png', '2025-01-26 13:40:00', '2025-01-26 13:40:00'),

('Lucía', 'Reyes', '89012345', 'Jr. Primavera 55', 'Piura', '93344556', 'lucia.reyes@yahoo.com', 'LuciaR', 'reyespw', '2025-01-27', 'Inactivo', './public/assets/user3.png', '2025-01-27 15:25:00', '2025-01-27 15:25:00');


INSERT INTO "ordens"(
  "idUsuario", Fecha, Total, "subTotal", "metodoDeEntrega",
  "nroTarjeta", "tipoTarjeta", estado , "createdAt", "updatedAt"
)
VALUES 
(1, '2025-07-09', 80.90, 75.00, 'Delivery', '4111111111111111', 'Visa', 'Entregado','2025-07-09 10:30:00', '2025-07-09 10:30:00'),
(2, '2025-07-10', 125.00, 115.00, 'Retiro en tienda', '5500000000000004', 'MasterCard', 'Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00'),
(3, '2025-07-11', 60.40, 60.40, 'Delivery', '340000000000009', 'American Express', 'Entregado','2025-07-11 11:15:00', '2025-07-11 11:15:00'),
(4, '2025-07-12', 95.50, 90.00, 'Delivery', '4111111111111111', 'Visa', 'Entregado','2025-07-12 09:45:00', '2025-07-12 09:45:00'),
(5, '2025-07-13', 130.00, 120.00, 'Delivery', '6011000000000004', 'Discover', 'Por entregar','2025-07-13 13:20:00', '2025-07-13 13:20:00'),
(6, '2025-07-14', 70.00, 65.00, 'Retiro en tienda', '4111111111111111', 'Visa', 'Entregado','2025-07-14 14:00:00', '2025-07-14 14:00:00'),
(7, '2025-07-15', 105.00, 100.00, 'Delivery', '5500000000000004', 'MasterCard', 'Entregado','2025-07-15 16:10:00', '2025-07-15 16:10:00'),
(8, '2025-07-16', 140.25, 130.25, 'Retiro en tienda', '340000000000009', 'American Express', 'Por entregar','2025-07-16 17:00:00', '2025-07-16 17:00:00'),
(1, '2025-07-01', 120.50, 100.50, 'Delivery', '4111111111111111', 'Visa','Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00'),
(2, '2025-07-02', 75.00, 70.00, 'Retiro en tienda', '5500000000000004', 'MasterCard','Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00'),
(3, '2025-07-03', 45.30, 45.30, 'Delivery', '340000000000009', 'American Express','Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00'),
(4, '2025-07-04', 89.99, 85.00, 'Delivery', '4111111111111111', 'Visa','Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00'),
(5, '2025-07-05', 150.00, 140.00, 'Retiro en tienda', '6011000000000004', 'Discover','Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00'),
(6, '2025-07-06', 60.75, 55.75, 'Delivery', '4111111111111111', 'Visa','Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00'),
(7, '2025-07-07', 110.20, 100.20, 'Delivery', '5500000000000004', 'MasterCard','Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00'),
(8, '2025-07-08', 95.60, 90.00, 'Retiro en tienda', '340000000000009', 'American Express','Entregado','2025-07-10 12:00:00', '2025-07-10 12:00:00');

INSERT INTO carritos ("idUsuario", "createdAt", "updatedAt")
VALUES 
(1, NOW(), NOW());
