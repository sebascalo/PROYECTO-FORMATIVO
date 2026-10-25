const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const exit = db.define("exit", {
    id_mortality: { // ID de salida
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Bovine: { // Bovino
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cattles',
            key: 'id_Bovine'
        }
    },
    dateofExit: { // Fecha de salida
        type: DataTypes.DATE,
        allowNull: false
    },
    exitReason: { // Motivo de salida
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
    observations: { // Observaciones
        type: DataTypes.STRING,
        allowNull: true
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

module.exports = exit;