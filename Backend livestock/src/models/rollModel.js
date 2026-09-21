const {DataTypes} = require('sequelize');
const db = require('../config/conectionDB');

const roll = db.define('roll', {
    id_roll: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    slug: {
        type: DataTypes.STRING,
        max: 45
    },
    name_roll: {
        type: DataTypes.STRING,
        max: 45
    }
});

module.exports = roll;