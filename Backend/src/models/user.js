import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const user = sequelize.define('user', {
    id: {  
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true, // Hacer opcional para registro básico
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: true, // Hacer opcional para registro básico
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true, // Hacer opcional para registro básico
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    nombreDeUsuario: {
      type: DataTypes.STRING,
      allowNull: true, // Hacer opcional, se puede generar automáticamente
      unique: true,
      field: 'nombredeusuario'
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false, // Campo que viene del formulario de registro
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaRegistro: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      defaultValue: 'Activo'
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
}
);

export default user;
