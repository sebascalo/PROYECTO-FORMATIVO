const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const mount = db.define("mount", {
  id_mount: { // ID de la monta
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cow: { // Vaca
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
  },
  id_bull: { // Toro
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
  },
  breedingDate: { // Fecha de monta
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  serviceNumber: { // Número de servicio
    type: DataTypes.INTEGER,
    allowNull: false,
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

module.exports = mount;