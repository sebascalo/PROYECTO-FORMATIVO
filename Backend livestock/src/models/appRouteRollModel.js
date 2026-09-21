const {DataTypes} = require('sequelize');
const db = require('../config/conectionDB');

const appRouteRoll = db.define('app_routes_roll', {
    id_app_routes_roll: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    id_app_routes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_roll: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});
module.exports = appRouteRoll;