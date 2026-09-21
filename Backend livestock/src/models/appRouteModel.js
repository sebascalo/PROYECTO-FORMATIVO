const {DataTypes} = require('sequelize');
const db = require('../config/conectionDB');

const appRoutes = db.define('app_routes', {
    id_app_routes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    name_route: {
        type: DataTypes.STRING,
        max: 45
    },
    route: {
        type: DataTypes.STRING,
        max: 255
    },
    active:{
        type: DataTypes.BOOLEAN,
    },
    icon: {
        type: DataTypes.STRING,
        max: 45
    }
});
module.exports = appRoutes;