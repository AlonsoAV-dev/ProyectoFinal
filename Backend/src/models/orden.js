import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuario from "./user.js";

const Orden = sequelize.define('orden', {
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
    fecha: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    subTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    metodoDeEntrega: {
        type: DataTypes.STRING,
    },
    nroTarjeta: {
        type: DataTypes.STRING,
    },
    tipoTarjeta: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Por entregar' // o el valor que tú quieras por defecto
    }
});

Orden.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  onDelete: 'CASCADE'
});

Usuario.hasMany(Orden, {
  foreignKey: 'idUsuario'
});

export default Orden;