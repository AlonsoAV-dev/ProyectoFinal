import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Usuario from "./user.js";

const Carrito = sequelize.define('carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
});

Carrito.belongsTo(Usuario, { foreignKey: 'idUsuario', onDelete: 'CASCADE' });
Usuario.hasOne(Carrito, { foreignKey: 'idUsuario' });

export default Carrito;