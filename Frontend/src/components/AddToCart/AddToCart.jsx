

const handleAddToCart = async (producto) => {
  // 1. Obtener el ID del usuario (puede venir del contexto o estado)
  const usuarioId = 3;

  // 2. Buscar el carrito del usuario
  let carrito = await carritoApi.findByUsuario(usuarioId);

  // 3. Si no tiene carrito, lo creas
  if (!carrito) {
    carrito = await carritoApi.create({ idUsuario: usuarioId });
  }

  // 4. Crear item de carrito
  await itemCarritoApi.create({
    idCarrito: carrito.id,
    idProducto: producto.id,
    cantidad: 1, // o sumar si ya existe, depende de tu lógica
  });

  console.log("Producto agregado al carrito");
};
