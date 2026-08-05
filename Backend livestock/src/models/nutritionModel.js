const { DataTypes } = require('sequelize');
const db = require('../config/ConectionDB');

const nutrition = db.define('nutrition', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idBovine: { // Número de arete o identificador único del animal
        type: DataTypes.STRING,
        allowNull: false
    },
    idFood: { // Código del alimento del catálogo de alimentos
        type: DataTypes.STRING,
        allowNull: false
    },
    food_type: { // Tipo de alimento (pasto, concentrado, silo, forraje, etc)
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false
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