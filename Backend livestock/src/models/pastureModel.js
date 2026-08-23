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
    // 🔄 CAMBIO: Capacidad máxima -> Aforo (capacidad real de carga animal)
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
    // 🆕 CAMBIO: Fecha de ingreso del ganado al potrero
    cattleEntryDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    // 🆕 CAMBIO: Fecha de salida del ganado del potrero
    cattleExitDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    // Estado actual (ej: Descanso, Ocupado, Enmalecido)
    currentStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 🆕 CAMBIO: Aplicación de químicos/venenos (fertilizantes, herbicidas, etc)
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