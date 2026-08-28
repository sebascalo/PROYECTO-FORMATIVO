const { DataTypes } = require("sequelize");
const db = require("../config/ConectionDB");

const vacunation = db.define("vacunation", {
  // campos de la tabla de vacunacion
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idBovine: {
    type: DataTypes.STRING, //Bovino vacunado
    allowNull: false,
    unique: true,
  },
  vaccination_date: {
    type: DataTypes.DATE, //fecha de vacunacion
    allowNull: false,
  },
  applied_dose: {
    type: DataTypes.STRING, //dosis aplicada
    allowNull: false,
  },
  // CAMBIO: application_site → vaccine_lot
  vaccine_lot: {
    type: DataTypes.STRING, //lote de la vacuna
    allowNull: false,
  },
  // NUEVO CAMPO: nombre del medicamento
  medicine_name: {
    type: DataTypes.STRING, //nombre del medicamento
    allowNull: false,
  },
  idResponsible: {
    type: DataTypes.STRING, //nombre del responsable de la vacunacion
    allowNull: false,
  },
  observations: {
    type: DataTypes.STRING, //observaciones adicionales sobre la vacunacion
    allowNull: true,
  },
  createdAt: { // Fecha de creación del registro
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
  },
  updatedAt: { // Fecha de última actualización del registro
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
  }
});
module.exports = vacunation;