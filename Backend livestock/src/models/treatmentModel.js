const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const treatment = db.define("treatment", {
    id_treatment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Bovine: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    treatment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    medication_used: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vaccine_lot: { // 👈 NUEVO CAMPO
        type: DataTypes.STRING,
        allowNull: true
    },
    applied_dose: {
        type: DataTypes.STRING,
        allowNull: false
    },
    application_route: {
        type: DataTypes.STRING,
        allowNull: false
    },
    associated_diagnosis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    treatment_duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    withdrawal_time: { // 👈 NUEVO CAMPO
        type: DataTypes.STRING,
        allowNull: true
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idResponsible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'responsibles',
            key: 'idResponsible'
        }
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

module.exports = treatment;