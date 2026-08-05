const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const mortality = db.define("mortality", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idBovine: { // Identificación del bovino
        type: DataTypes.STRING,
        allowNull: true
    },
    dateofdeath: { // Fecha de muerte del bovino
        type: DataTypes.DATE,
        allowNull: true
    },
    causeofdeath: { // Causa de muerte del bovino
        type: DataTypes.STRING,
        allowNull: true
    },
    responsible: { // Responsable del registro de la muerte del bovino
        type: DataTypes.STRING,
        allowNull: true
    },
    fateoftheanimal: { // Destino del animal después de la muerte (enterrado, incinerado, vendido para consumo)
        type: DataTypes.STRING,
        allowNull: true
    },
    observations: { // Observaciones adicionales sobre la muerte del bovino
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

module.exports = mortality;
    