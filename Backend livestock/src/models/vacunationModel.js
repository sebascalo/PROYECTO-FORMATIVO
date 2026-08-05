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
  application_site: {
    type: DataTypes.STRING, //lugar de aplicacion de la vacuna
    allowNull: false,
  },
  application_condition: {
    type: DataTypes.STRING, //condición en la que se aplicó la vacuna
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
