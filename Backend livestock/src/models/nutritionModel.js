const { DataTypes } = require('sequelize');
const db = require('../config/ConectionDB');

const nutrition = db.define('nutrition', {
    id_nutrition: { // ID de nutrición
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Bovine: { // Bovino
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_food: { // Alimento
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: { // Cantidad
        type: DataTypes.STRING,
        allowNull: false
    },
    frequency: { // Frecuencia
        type: DataTypes.STRING,
        allowNull: false
    },
    idResponsible: { // Responsable
        type: DataTypes.INTEGER,
        allowNull: false,
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

module.exports = nutrition;