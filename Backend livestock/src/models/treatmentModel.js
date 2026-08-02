    const { DataTypes } = require('sequelize');
    const db = require('../config/conectionDB');

    const treatment = db.define('treatment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idBovine: { // Bovino tratado
            type: DataTypes.STRING,
            allowNull: false
        },
        treatment_date: { // Fecha del tratamiento
            type: DataTypes.DATE,
            allowNull: false
        },
        medication_used: { // Medicamento utilizado en el tratamiento
            type: DataTypes.STRING,
            allowNull: false
        },
        applied_dose: { // Dosis administrada
            type: DataTypes.STRING,
            allowNull: false
        },
        application_route: { // Vía de administración del medicamento (oral, intramuscular, intravenosa)
            type: DataTypes.STRING,
            allowNull: false
        },
        associated_diagnosis: { // Enfermedad o condición que se está tratando
            type: DataTypes.STRING,
            allowNull: false
        },
        treatment_duration: { // Duración del tratamiento
            type: DataTypes.STRING,
            allowNull: false
        },
        treatment_result: { // Resultado del tratamiento
            type: DataTypes.STRING,
            allowNull: false
        },
        observations: { // Observaciones adicionales sobre el tratamiento
            type: DataTypes.STRING,
            allowNull: true
        },
        idResponsible: { // Nombre del responsable del tratamiento aplicado
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

    module.exports = treatment;