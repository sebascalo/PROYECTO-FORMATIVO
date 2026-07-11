const { DataTypes } = require('sequelize');
const sequelize = require('../config/conectionDB');

const pasture = sequelize.define('pasture', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    extension: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    maxCapacity: {//capacidad_max
        type: DataTypes.FLOAT,
        allowNull: false
    },
    pastureType: {//tipo_pastura
        type: DataTypes.STRING,
        allowNull: false
    },
    currentStatus: {//estado_actual
        type: DataTypes.STRING,
        allowNull: false
    },
    restDays: {//dias_de_descanso
        type: DataTypes.INTEGER,
        allowNull: false
    },
    occupationDays: {//dias_de_ocupacion
        type: DataTypes.INTEGER,
        allowNull: false
    },
    active:{
        type: DataTypes.BOOLEAN,
         defaultValue: true     
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});
module.exports = pasture;