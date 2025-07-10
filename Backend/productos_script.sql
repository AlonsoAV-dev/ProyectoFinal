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

INSERT INTO Usuarios (nombre, apellido, direccion, ciudad, telefono, correo, nombreDeUsuario, password, fechaRegistro, estado, img, createdAt, updatedAt)
VALUES 
('Juan', 'Perez', 'ABC', 'abc', '92343244', 'juan.perez@gmail.com', 'JuanP123', 'hola123', '2025-01-20', 'Activo', './public/assets/user2.png', '2025-01-20 10:00:00', '2025-01-20 10:00:00'),

('María', 'Gómez', 'Av. Central 456', 'Lima', '98765432', 'maria.gomez@gmail.com', 'MariaG89', 'clave456', '2025-01-21', 'Activo', './public/assets/user3.png', '2025-01-21 11:30:00', '2025-01-21 11:30:00'),

('Luis', 'Ramírez', 'Jr. Las Flores 789', 'Cusco', '91234567', 'luis.ramirez@yahoo.com', 'LuisR21', 'pass789', '2025-01-22', 'Inactivo', './public/assets/user4.png', '2025-01-22 09:15:00', '2025-01-22 09:15:00'),

('Ana', 'Torres', 'Mz C Lote 5', 'Arequipa', '93456789', 'ana.torres@outlook.com', 'AnaT2025', 'torres123', '2025-01-23', 'Activo', './public/assets/user5.png', '2025-01-23 08:45:00', '2025-01-23 08:45:00'),

('Carlos', 'Sánchez', 'Calle Lima 333', 'Trujillo', '99887766', 'carlos.s@gmail.com', 'CarlSanch', 'qwerty12', '2025-01-24', 'Activo', './public/assets/user6.png', '2025-01-24 14:20:00', '2025-01-24 14:20:00');
