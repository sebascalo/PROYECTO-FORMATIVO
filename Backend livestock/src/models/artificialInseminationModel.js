const { DataTypes } = require('sequelize');
const db = require('../config/conectionDB');

const artificialInsemination = db.define('artificialInsemination', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idBovine: { // Vaca a inseminar
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'bovinos',
            key: 'id'
        }
    },
    inseminationDate: { // Día del procedimiento
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    semenID: { // Código o lote de la pajilla
        type: DataTypes.STRING(100),
        allowNull: false
    },
    donorBull: { // Nombre o código del toro (opcional)
        type: DataTypes.STRING(100),
        allowNull: true
    },
    semenDose: { // Cantidad en cc o pajillas (opcional)
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    observations: { // Comentarios adicionales
        type: DataTypes.TEXT,
        allowNull: true
    },
    idResponsible: { // Quién realizó la inseminación
        type: DataTypes.STRING(100),
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

module.exports = artificialInsemination;