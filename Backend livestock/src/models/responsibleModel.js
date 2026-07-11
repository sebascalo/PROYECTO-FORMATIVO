const { DataTypes } = require('sequelize');
const sequelize = require('../config/conectionDB');

const responsible = sequelize.define('responsible', {
  // ID
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  // Nombre completo
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Name of the responsible person',
    validate: {
      len: [3, 100]
    }
  },

  // Tipo
  role: {
    type: DataTypes.ENUM('Instructor', 'Apprentice', 'Intern'),
    allowNull: false,
    comment: 'Instructor, Apprentice, Intern'
  },

  // Correo electrónico
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Email address',
    validate: {
      isEmail: true
    }
  },

  // Teléfono
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Contact number (optional)',
    validate: {
      len: [7, 15]
    }
  },

  // Estado
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active',
    comment: 'Active / Inactive'
  }

}, {
  // Opciones adicionales
  timestamps: true,
  tableName: 'responsibles'
});
module.exports = responsible;