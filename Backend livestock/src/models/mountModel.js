const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const mount = db.define("mount", {
  id_mount: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cow: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
    comment: "Vaca que recibe el servicio",
  },
  id_bull: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
    comment: "Toro que realiza el servicio",
  },
  breedingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  serviceNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

module.exports = mount;