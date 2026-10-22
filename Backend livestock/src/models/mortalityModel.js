const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const exit = db.define("exit", {
    id_mortality: { // Mantenemos este nombre para no romper la PK
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Bovine: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cattles',
            key: 'id_Bovine'
        }
    },
    dateofExit: { // Fecha de salida del bovino
        type: DataTypes.DATE,
        allowNull: false
    },
    exitReason: { // Razón de la salida del bovino (muerte, venta, sacrificio, etc.)
        type: DataTypes.STRING,
        allowNull: false
    },
    idResponsible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'responsibles',
            key: 'idResponsible'
        }
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: true
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

module.exports = exit;