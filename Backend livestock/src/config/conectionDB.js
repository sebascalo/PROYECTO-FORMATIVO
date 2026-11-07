const {Sequelize} = require('sequelize');

const db = new Sequelize(
        database = "livestock",
        username = "root",
        password = "1029145208",
    {

        dialect: "mysql",
        host: "localhost",
        port: 3306
    }
);

module.exports = db;