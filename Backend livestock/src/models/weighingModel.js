const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const weighing = db.define('weighing', {
    id_weighing: { // ID del pesaje
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Bovine: { // Bovino
        type: DataTypes.STRING,
        allowNull: true
    },
    weighingdate: { // Fecha del pesaje
        type: DataTypes.DATE,
        allowNull: true
    },
    currentweight: { // Peso actual
        type: DataTypes.FLOAT,
        allowNull: true
    },
    profitorloss: { // Ganancia o pérdida
        type: DataTypes.FLOAT,
        allowNull: true
    },
    bodycondition: { // Condición corporal
        type: DataTypes.STRING,
        allowNull: true
    },
    observations: { // Observaciones
        type: DataTypes.STRING,
        allowNull: true
    },
    idResponsible: { // Responsable
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'responsibles',
            key: 'idResponsible'
        }
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

module.exports = weighing;