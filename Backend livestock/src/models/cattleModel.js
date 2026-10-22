const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const cattle = db.define("cattle", {
    id_Bovine: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_race: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entrydate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // ❌ ELIMINADO: id_pasture
    // ✅ NUEVO: Padre y Madre
    id_mother: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "cattles",
            key: "id_Bovine"
        },
        comment: "Madre del bovino (Hembra)"
    },
    id_father: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "cattles",
            key: "id_Bovine"
        },
        comment: "Padre del bovino (Macho)"
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    currentweight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    classificationbytype: {
        type: DataTypes.STRING,
        allowNull: false
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

module.exports = cattle;