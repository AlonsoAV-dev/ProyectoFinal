INSERT INTO "productos" (
  nombre,
  presentacion,
  descripcion,
  categoria,
  precio,
  stock,
  imagen,
  "createdAt",
  "updatedAt"
) VALUES
(
  'Uvas',
  '0.8kg',
  'Uvas frescas y dulces, ideales para snack o postres.',
  'Frutas y verduras',
  6.90,
  10,
  '/public/assets/uvas.png',
    CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Manzanas',
  '1kg',
  'Manzanas rojas crocantes, de calidad premium.',
  'Frutas y verduras',
  7.50,
  15,
  '/public/assets/manzanas.png',
    CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Pan francés',
  '6 unidades',
  'Pan crocante ideal para desayunos o cenas.',
  'Panadería',
  4.00,
  30,
  '/public/assets/pan.png',
    CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Leche Gloria',
  '400ml',
  'Leche evaporada entera en lata.',
  'Lácteos',
  3.80,
  20,
  '/public/assets/leche.png',
    CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Arroz Costeño',
  '5kg',
  'Arroz superior de grano largo.',
  'Abarrotes',
  18.50,
  50,
  '/public/assets/arroz.png',
    CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
