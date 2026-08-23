const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

// Modelo: Nacimientos (birth)
const birth = db.define("birth", {

    // Identificador único y autoincremental del registro de nacimiento
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // Identificación de la madre (vaca) del becerro
    idbovine: {
        type: DataTypes.STRING,
        allowNull: true // Permite valores nulos
    },

    // Identificación del lote o terreno donde nació el animal
    landidentification: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Fecha en la que ocurrió el nacimiento
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },

    // Sexo del animal nacido (Macho/Hembra)
    sex: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Raza del animal nacido
    race: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Peso del animal al momento de nacer (en kg o lb)
    birthweight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    // CAMBIO: Se renombró 'conditionatbirth' por 'observation'
    observation: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    // Nombre de la persona responsable de atender el nacimiento
    idResponsible: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Estado del registro (activo o inactivo)
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Por defecto se crea como activo
    },

    // Fecha de creación del registro en el sistema
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    // Fecha de la última modificación del registro
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

});

module.exports = birth;