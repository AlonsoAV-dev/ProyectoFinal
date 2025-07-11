import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Comercio = sequelize.define("comercio", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

export default Comercio;
