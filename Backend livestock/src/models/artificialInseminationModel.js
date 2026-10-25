const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const artificialInsemination = db.define("artificialInsemination", {
  id_artifInse: { // ID de inseminación
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_madre: { // Madre
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
  },
  id_toro: { // Toro
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
  },
  inseminationDate: { // Fecha de inseminación
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  semenID: { // Código de pajilla
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_race: { // Raza
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "races",
      key: "id_race",
    },
  },
  servicio: { // Servicio
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  observations: { // Observaciones
    type: DataTypes.TEXT,
    allowNull: true,
  },
  idResponsible: { // Responsable
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "responsibles",
      key: "idResponsible",
    },
  },
  active: { // Estado
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: { // Fecha de creación
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: { // Fecha de actualización
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = artificialInsemination;