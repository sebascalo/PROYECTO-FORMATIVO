const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const artificialInsemination = db.define("artificialInsemination", {
  id_artifInse: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_Bovine: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cattles",       // 👈 antes decía "bovinos"
      key: "id_Bovine",       // 👈 antes decía "id"
    },
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