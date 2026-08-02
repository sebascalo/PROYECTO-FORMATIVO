const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const weighing = db.define('weighing', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idBovine: { // Identificación del bovino
        type: DataTypes.STRING,
        allowNull: true
    },
    weighingdate: { // Fecha del pesaje del bovino
        type: DataTypes.DATE,
        allowNull: true
    },
    currentweight: { // Peso actual del bovino
        type: DataTypes.FLOAT,
        allowNull: true
    },
    profitorloss: { // Ganancia o pérdida de peso del bovino desde el último pesaje
        type: DataTypes.FLOAT,
        allowNull: true
    },
    bodycondition: { // Condición corporal del bovino (delgado, normal, gordo)
        type: DataTypes.STRING,
        allowNull: true
    },
    observations: { // Observaciones adicionales sobre el pesaje del bovino
        type: DataTypes.STRING,
        allowNull: true
    },
    idResponsible: { // Responsable del registro del pesaje del bovino
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: { // Fecha de creación del registro
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: { // Fecha de última actualización del registro
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = weighing;