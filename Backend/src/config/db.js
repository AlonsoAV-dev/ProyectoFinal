import Sequelize from 'sequelize'


const hostname = 'localhost';
const username = 'postgres';
const password = 'admin';
const database = 'e-commerce';
const port = 5432;
const dialect = 'postgres'

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    operatorsAliases: false,
    
});

export default sequelize;
