const { DataTypes } = require('sequelize');
const sequelize = require('../config/conectionDB');

const reproduction = sequelize.define('reproduction', {
    // // Campos específicos para Inseminación Artificial (RF06)
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     comment: 'Identificador único de la inseminación'
    // },
    // animalID: { //id del animal
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'bovinos',
    //         key: 'id'
    //     },
    //     comment: 'Vaca a inseminar'
    // },
    // inseminationDate: {//fecha de inseminación
    //     type: DataTypes.DATEONLY,
    //     allowNull: false,
    //     comment: 'Día del procedimiento'
    // },
    // semenID: {//identificación del semen
    //     type: DataTypes.STRING(100),
    //     allowNull: false,
    //     comment: 'Código o lote de la pajilla'
    // },
    // donorBull: {//toro donante
    //     type: DataTypes.STRING(100),
    //     allowNull: true,
    //     comment: 'Nombre o código del toro (opcional)'
    // },
    // semenDose: {//dosis de semen
    //     type: DataTypes.DECIMAL(10, 2),
    //     allowNull: true,
    //     comment: 'Cantidad en cc o pajillas (opcional)'
    // },
    // observations: {//observaciones
    //     type: DataTypes.TEXT,
    //     allowNull: true,
    //     comment: 'Comentarios adicionales'
    // },
    // responsible: {//responsable de la inseminación
    //     type: DataTypes.STRING(100),
    //     allowNull: false,
    //     comment: 'Quién realizó la inseminación'
    // },
    
    // Campos específicos para Monta Natural (RF08)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único de la monta'
    },
    cowID: { //id de la vaca
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
    cowCondition: {//condición de la vaca
        type: DataTypes.ENUM('Celo', 'Quieta', 'Rechaza'),
        allowNull: false,
        comment: 'Condición de la vaca: Celo, Quieta, Rechaza'
    },
    observations: {//observaciones
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Comentarios adicionales'
    },
    responsible: {//responsable
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Quién supervisó la monta'
    }
});

module.exports = reproduction;