require('dotenv').config();
const {Sequelize} = require('sequelize');

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);

module.exports = db;

// IMPORTANTE:
// Cada desarrollador debe crear su propio archivo .env
// dentro de la carpeta "Backend livestock" con estas variables para que funcione la db:
//
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=TU_CONTRASEÑA
// DB_NAME=livestock
//
// No subir el archivo .env a GitHub.