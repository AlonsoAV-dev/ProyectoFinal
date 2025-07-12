import React, { useState, useEffect } from "react";
import carritoApi from "../../api/carritoApi.js";
import itemCarritoApi from "../../api/itemCarritoApi.js";
 // Asegúrate de tener este API para manejar los items del carrito
const handleAddToCart = async (producto) => {
    // 1. Obtener el ID del usuario (puede venir del contexto o estado)
    const usuarioId = 1;

    // 2. Buscar el carrito del usuario
    let carrito = await carritoApi.findByUsuario(usuarioId);

    // 3. Si no tiene carrito, lo creas
    if (!carrito) {
        carrito = await carritoApi.create({ idUsuario: usuarioId });
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
    };

export default handleAddToCart;
