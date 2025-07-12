import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import producto from "./producto.js"
import orden from "./orden.js"

const ItemOrden = sequelize.define("itemOrden", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idOrden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "ordens", // nombre real de la tabla `Orden`
      key: "id",
    },
  },
  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "productos", // nombre real de la tabla `Producto`
      key: "id",
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

ItemOrden.belongsTo(orden, {
    foreignKey: "idOrden",
    onDelete: "CASCADE",
});

ItemOrden.belongsTo(producto, {
    foreignKey: "idProducto",
    onDelete: "CASCADE",
});

orden.hasMany(ItemOrden, {
    foreignKey: "idOrden",
});

producto.hasMany(ItemOrden, {
    foreignKey: "idProducto",
});

export default ItemOrden;