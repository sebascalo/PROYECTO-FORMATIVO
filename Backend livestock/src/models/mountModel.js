const { DataTypes } = require('sequelize');
const sequelize = require('../config/conectionDB');

const mount = sequelize.define('mount', {
    // Campos específicos para Monta Natural (RF08)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único de la monta'
    },
    idBovine: { //id de la vaca
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'bovinos',
            key: 'id'
        },
        comment: 'Hembra que recibe el servicio'
    },
    bullId: {//id del toro
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'bovinos',
            key: 'id'
        },
        comment: 'Macho reproductor utilizado'
    },
     breedingDate: {//fecha de la monta
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: 'Día del servicio'
    },
    serviceNumber: {//número de servicio
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '1º, 2º, 3º, etc.'
    },
    bovineCondition: {//condición de la vaca
        type: DataTypes.ENUM('Celo', 'Quieta', 'Rechaza'),
        allowNull: false,
        comment: 'Condición de la vaca: Celo, Quieta, Rechaza'
    },
    observations: {//observaciones
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Comentarios adicionales'
    },
    idResponsible: {//responsable
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Quién supervisó la monta'
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

module.exports = mount;