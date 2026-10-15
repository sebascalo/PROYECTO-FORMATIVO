const { DataTypes } = require("sequelize");
const db = require("../config/ConectionDB");

const vacunation = db.define("vacunation", {
  id_vacunation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_Bovine: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // ❌ quitado unique: true (un bovino puede tener varias vacunaciones)
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
  },
  vaccination_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  applied_dose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vaccine_lot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicine_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idResponsible: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "responsibles",
      key: "idResponsible",
    },
  },
  observations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = vacunation;