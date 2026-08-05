const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const food = db.define("food", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    food_name: { // Nombre del alimento
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    food_type: { // Tipo de alimento (pasto, concentrado, silo, forraje, etc)
        type: DataTypes.STRING,
        allowNull: false
    },
    unit_measure: { // Unidad de medida (kg, litros, libras, etc)
        type: DataTypes.STRING,
        allowNull: false
    },
    stock_quantity: { // Cantidad en stock disponible
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cost_per_unit: { // Costo por unidad de medida
        type: DataTypes.FLOAT,
        allowNull: false
    },
    supplier: { // Proveedor del alimento
        type: DataTypes.STRING,
        allowNull: true
    },
    observations: { // Observaciones adicionales sobre el alimento
        type: DataTypes.STRING,
        allowNull: true
    },
    active: { // Estado del alimento (activo/inactivo)
        type: DataTypes.BOOLEAN,
        defaultValue: true
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

module.exports = food;