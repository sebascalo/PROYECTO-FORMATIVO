const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const pasture = db.define('pasture', {
    id_pasture: { // ID del potrero
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // Nombre
        type: DataTypes.STRING,
        allowNull: false
    },
    extension: { // Extensión
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    forageCapacity: { // Aforo
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pastureType: { // Tipo de pastura
        type: DataTypes.STRING,
        allowNull: false
    },
    cattleEntryDate: { // Ingreso del ganado
        type: DataTypes.DATE,
        allowNull: true
    },
    cattleExitDate: { // Salida del ganado
        type: DataTypes.DATE,
        allowNull: true
    },
    currentStatus: { // Estado actual
        type: DataTypes.STRING,
        allowNull: false
    },
    observations: { // Observaciones
        type: DataTypes.STRING,
        allowNull: true
    },
    active: { // Estado
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: { // Fecha de creación
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: { // Fecha de actualización
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = pasture;