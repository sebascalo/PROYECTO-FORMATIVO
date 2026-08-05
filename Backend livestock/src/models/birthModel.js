const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const birth = db.define("birth", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    motheridentification: {
        type: DataTypes.STRING,
        allowNull: true
    },

    landidentification: {
        type: DataTypes.STRING,
        allowNull: true
    },

    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },

    sex: {
        type: DataTypes.STRING,
        allowNull: true
    },

    race: {
        type: DataTypes.STRING,
        allowNull: true
    },

    birthweight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    conditionatbirth: {
        type: DataTypes.STRING,
        allowNull: true
    },

    observations: {
        type: DataTypes.STRING,
        allowNull: true
    },

    responsible: {
        type: DataTypes.STRING,
        allowNull: true
    },

    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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

module.exports = birth;
