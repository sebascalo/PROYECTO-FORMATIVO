const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const cattle = db.define("cattle", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // Nombre del bovino
        type: DataTypes.STRING,
        allowNull: false
    },
    raze: { // Raza del bovino
        type: DataTypes.STRING,
        allowNull: false
    },
    entrydate: { // Fecha de ingreso del bovino
        type: DataTypes.DATE,
        allowNull: false
    },
    paddock: { // Potrero donde se encuentra el bovino
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: { // Fecha de nacimiento del bovino
        type: DataTypes.DATE,
        allowNull: false
    },
    photo: { // URL de la foto del bovino (opcional)
        type: DataTypes.STRING,
        allowNull: true
    },
    currentweight: { // Peso actual del bovino
        type: DataTypes.FLOAT,
        allowNull: false
    },
    classificationbytype: { // Clasificación del bovino por tipo (ej: lechero, carne, doble propósito)
        type: DataTypes.STRING,
        allowNull: false
    },
    state: { // Estado del bovino (ej: saludable, enfermo, en tratamiento)
        type: DataTypes.STRING,
        allowNull: false
    },
    active: { // Estado del bovino (activo/inactivo)
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

module.exports = cattle;