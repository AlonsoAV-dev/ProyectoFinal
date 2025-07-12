import React from "react";
import carritoApi from "../../api/carritoApi.js";
import itemCarritoApi from "../../api/itemCarritoApi.js";
import userApi from "../../api/usuarioApi.js"; // 

const handleAddToCart = async (producto) => {
    const usuarioId = userApi.getUserSession()?.id; // ✅ correcto

    if (!usuarioId) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        return false;
    }

    // 2. Buscar el carrito del usuario
    let carrito = await carritoApi.findByUsuario(usuarioId);

    // Si no hay carrito o no tiene ID (por precaución)
    if (!carrito || !carrito.id) {
        carrito = await carritoApi.create({ idUsuario: usuarioId });
        console.log("✅ Carrito creado para el usuario", usuarioId);
    }
    // 3.1 Buscar todos los items del carrito
    const items = await itemCarritoApi.findByCarrito(carrito.id);

    // 4. Verificar si ya existe el producto en el carrito
    const itemExistente = items.find(item => item.idProducto == producto.id);

    if (itemExistente) {
        // Si ya existe, actualizar cantidad (+1)
        await itemCarritoApi.update({
        id: itemExistente.id,
        cantidad: itemExistente.cantidad + 1
        });
    } else {
        // Si no existe, crear nuevo item
        await itemCarritoApi.create({
        idCarrito: carrito.id,
        idProducto: producto.id,
        cantidad: 1
        });
    }

    console.log("Producto agregado o actualizado en el carrito");
    return true;
    };

export default handleAddToCart;
