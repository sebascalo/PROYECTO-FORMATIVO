const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const pasture = db.define('pasture', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extension: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pastureType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currentStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restDays: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    occupationDays: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'pastures',
    timestamps: true
});

module.exports = pasture;