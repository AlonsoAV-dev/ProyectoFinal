INSERT INTO comercios (nombre, "createdAt", "updatedAt") VALUES
('La Bisteca', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Casa Gourmet', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bodega del Valle', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Spa Relax', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Conciertos Rock', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Yoga Zen', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Aventura Montañosa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cine en Casa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO experiencia (imagen, experiencia, comercio, costo, fecha_expiracion, usado, "createdAt", "updatedAt") VALUES
('https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww', 'Cena para 2 en La Bisteca', 'La Bisteca', 100, '2025-12-05', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww', 'Clase de cocina en Casa Gourmet', 'Casa Gourmet', 50, '2025-01-15', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww', 'Tour de vinos en Bodega del Valle', 'Bodega del Valle', 75, '2025-03-20', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww', 'Masaje relajante en Spa Relax', 'Spa Relax', 60, '2025-02-10', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww', 'Entrada VIP a concierto de Rock', 'Conciertos Rock', 120, '2025-04-30', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww', 'Clase de yoga al aire libre', 'Yoga Zen', 30, '2025-05-25', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww', 'Excursión a la montaña con guía', 'Aventura Montañosa', 80, '2025-06-18', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww', 'Noche de cine en casa con palomitas', 'Cine en Casa', 20, '2025-07-01', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
