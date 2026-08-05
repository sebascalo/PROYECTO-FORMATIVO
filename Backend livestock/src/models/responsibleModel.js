    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/conectionDB');

    const responsible = sequelize.define('responsible', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: { // Nombre completo del responsable
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Name of the responsible person',
            validate: {
                len: [3, 100]
            }
        },
        role: { // Tipo/rol del responsable
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: 'Role of the responsible person'
        },
        email: { // Correo electrónico del responsable
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'Email address',
            validate: {
                isEmail: true
            }
        },
        phoneNumber: { // Número de teléfono del responsable
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'Contact number (optional)',
            validate: {
                len: [7, 15]
            }
        },
        status: { // Estado del responsable (Activo/Inactivo)
            type: DataTypes.ENUM('Active', 'Inactive'),
            allowNull: false,
            defaultValue: 'Active',
            comment: 'Active / Inactive'
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

    module.exports = responsible;