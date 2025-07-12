import Sequelize from 'sequelize'

// NOTA: Cada desarrollador debe cambiar estas credenciales por las suyas locales
const hostname = 'localhost';
const username = 'postgres';
const password = 'admin'; // Tu contraseña de PostgreSQL
const database = 'E-commerce';
const port = 5432;
const dialect = 'postgres'

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    operatorsAliases: false,
    
});

export default sequelize;
