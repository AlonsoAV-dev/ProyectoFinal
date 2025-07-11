import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Comercio from "./comercio.js";

const Experiencia = sequelize.define("experiencia", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    experiencia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comercio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    costo: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha_expiracion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    usado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

export default Experiencia;
