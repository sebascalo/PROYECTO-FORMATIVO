const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const pasture = db.define('pasture', {
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
    // Última aplicación de fertilizante, herbicida o químico
    lastChemicalApplication: { 
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Nombre del último fertilizante, herbicida o químico aplicado'
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