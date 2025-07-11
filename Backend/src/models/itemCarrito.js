import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Carrito from "./carrito.js";
import Producto from "./producto.js";

const ItemCarrito = sequelize.define("ItemCarrito", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCarrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carritos',
            key: 'id'
        }
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})
ItemCarrito.belongsTo(Carrito, {
    foreignKey: 'idCarrito',
    onDelete: 'CASCADE'
});
Carrito.hasMany(ItemCarrito, {
    foreignKey: 'idCarrito'
});

ItemCarrito.belongsTo(Producto, {
    foreignKey: 'idProducto',
    onDelete: 'CASCADE'
});
Producto.hasMany(ItemCarrito, {
    foreignKey: 'idProducto'
});

export default ItemCarrito;
