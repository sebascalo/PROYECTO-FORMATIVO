const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const pasture = db.define('pasture', {
    id_pasture: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Nombre del potrero
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Extensión del terreno (hectáreas o m²)
    extension: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    // Capacidad máxima de animales que soporta el potrero
    forageCapacity: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Aforo: Capacidad máxima de animales que soporta el potrero'
    },
    // Tipo de pasto o forraje
    pastureType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Fecha de ingreso del ganado al potrero
    cattleEntryDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    // Fecha de salida del ganado del potrero
    cattleExitDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    // Estado actual (ej: Descanso, Ocupado, Enmalecido)
    currentStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Observaciones sobre el potrero
    observations: { // 👈 CAMBIO: antes lastChemicalApplication
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = pasture;