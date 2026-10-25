const { DataTypes } = require("sequelize");
const db = require("../config/ConectionDB");

const vacunation = db.define("vacunation", {
  id_vacunation: { // ID de vacunación
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_Bovine: { // Bovino
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cattles",
      key: "id_Bovine",
    },
  },
  vaccination_date: { // Fecha de vacunación
    type: DataTypes.DATE,
    allowNull: false,
  },
  applied_dose: { // Dosis aplicada
    type: DataTypes.STRING,
    allowNull: false,
  },
  vaccine_lot: { // Lote de la vacuna
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicine_name: { // Medicamento
    type: DataTypes.STRING,
    allowNull: false,
  },
  idResponsible: { // Responsable
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "responsibles",
      key: "idResponsible",
    },
  },
  observations: { // Observaciones
    type: DataTypes.STRING,
    allowNull: true,
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

module.exports = vacunation;