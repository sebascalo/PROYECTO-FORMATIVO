const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const artificialInsemination = db.define("artificialInsemination", {
  id_artifInse: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_madre: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
    comment: "Vaca que recibe la inseminación",
  },
  id_toro: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
    comment: "Toro donante o padre",
  },
  inseminationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  semenID: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_race: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "races",
      key: "id_race",
    },
  },
  servicio: { // 👈 NUEVO CAMPO
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  idResponsible: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "responsibles",
      key: "idResponsible",
    },
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

module.exports = artificialInsemination;