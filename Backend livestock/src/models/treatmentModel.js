const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const treatment = db.define("treatment", {
    id_treatment: { // ID del tratamiento
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Bovine: { // Bovino
        type: DataTypes.INTEGER,
        allowNull: false
    },
    treatment_date: { // Fecha del tratamiento
        type: DataTypes.DATE,
        allowNull: false
    },
    medication_used: { // Medicamento
        type: DataTypes.STRING,
        allowNull: false
    },
    vaccine_lot: { // Lote
        type: DataTypes.STRING,
        allowNull: true
    },
    applied_dose: { // Dosis
        type: DataTypes.STRING,
        allowNull: false
    },
    application_route: { // Vía
        type: DataTypes.STRING,
        allowNull: false
    },
    associated_diagnosis: { // Diagnóstico
        type: DataTypes.STRING,
        allowNull: false
    },
    treatment_duration: { // Duración
        type: DataTypes.STRING,
        allowNull: false
    },
    withdrawal_time: { // Tiempo de retiro
        type: DataTypes.STRING,
        allowNull: true
    },
    observations: { // Observaciones
        type: DataTypes.STRING,
        allowNull: true
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

module.exports = treatment;