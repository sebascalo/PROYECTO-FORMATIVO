const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const birth = db.define("birth", {
    id_birth: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Bovine: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // ❌ id_pasture eliminado
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_race: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    birthweight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    observations: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    idResponsible: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'responsibles',
            key: 'idResponsible'
        }
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