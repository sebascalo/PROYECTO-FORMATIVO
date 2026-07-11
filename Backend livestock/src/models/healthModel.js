const { DataTypes } = require("sequelize");
const db = require("../config/ConectionDB");

const health = db.define("health", {
  // campos de la tabla de vacunacion
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  animal_identifier: {
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
  responsible: {
    type: DataTypes.STRING, //nombre del responsable de la vacunacion
    allowNull: false,
  },
  observations: {
    type: DataTypes.STRING, //observaciones adicionales sobre la vacunacion
    allowNull: true,
  },
  
  // // campos de la tabla de tratamientos
  // id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  // animal_identifier: {
  //   type: DataTypes.STRING, //Bovino tratado
  //   allowNull: false,
  //   unique: true,
  // },
  // treatment_date: {
  //   type: DataTypes.DATE, //fecha del tratamiento
  //   allowNull: false,
  // },
  // medication_used: {
  //   type: DataTypes.STRING, //medicamento utilizado en el tratamiento
  //   allowNull: false,
  // },
  // applied_dose: {
  //   type: DataTypes.STRING, //dosis administrada
  //   allowNull: false,
  // },
  // application_route: {
  //   type: DataTypes.STRING, //vía de administración del medicamento oral, intramuscular,intravenosa
  //   allowNull: false,
  // },
  // associated_diagnosis: {
  //   type: DataTypes.STRING, //enfermedad o condición que se está tratando
  //   allowNull: false,
  // },
  // treatment_duration: {
  //   type: DataTypes.STRING, //duración del tratamiento
  //   allowNull: false,
  // },
  // treatment_result: {
  //   type: DataTypes.STRING, //resultado del tratamiento
  //   allowNull: false,
  // },
  // observations: {
  //   type: DataTypes.STRING, //observaciones adicionales sobre el tratamiento
  //   allowNull: true,
  // },
  // responsible: {
  //   type: DataTypes.STRING, //nombre del responsable del tratamiento aplicado
  //   allowNull: false,
  // },
});
module.exports = health;
