const { DataTypes } = require('sequelize');
const db = require('../config/ConectionDB');

const nutrition = db.define('nutrition', {
    id_nutrition: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Bovine: { // Número de arete o identificador único del animal
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_food: { // Código del alimento del catálogo de alimentos
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: { // Cantidad en kg, litros según el tipo de alimento
        type: DataTypes.STRING,
        allowNull: false
    },
    frequency: { // Frecuencia de alimentación (mañana, tarde, noche)
        type: DataTypes.STRING,
        allowNull: false
    },
    idResponsible: { // Nombre del responsable de la nutrición
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'responsibles',
            key: 'idResponsible'
        }
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

module.exports = nutrition;