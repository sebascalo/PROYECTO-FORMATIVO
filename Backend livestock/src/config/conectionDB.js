const {Sequelize} = require('sequelize');

const db = new Sequelize(
        database = "Livestock_completo",
        username = "root",
        password = "dylan2008",
    {

        dialect: "mysql",
        host: "localhost",
        port: 3306
    }
);

module.exports = db;