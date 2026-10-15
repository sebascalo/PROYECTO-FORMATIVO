const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const race = db.define("race", {
  id_race: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_race: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    // Estado (Activo/Inactivo)
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
    defaultValue: "Active",
  },
  createdAt: {
    // Fecha de creación del registro
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    // Fecha de última actualización del registro
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = race;