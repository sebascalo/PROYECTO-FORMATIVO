const { DataTypes } = require("sequelize");
const sequelize = require("../config/conectionDB");

const milk = sequelize.define("milk", {
    id_milk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_Bovine: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cattles',
            key: 'id_Bovine'
        },
    },
    milkingDate: { // fechaOrdeño
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    shift: { // turno 
        type: DataTypes.ENUM('Mañana', 'Tarde', 'Noche'),
        allowNull: false,
    },
    litersQuantity: { // cantidadLitros
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    // ❌ milkQuality eliminado
    observations: { // observaciones
        type: DataTypes.STRING,
        allowNull: true,
    },
    idResponsible: { // responsable
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'responsibles',
            key: 'idResponsible'
        },
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true     
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});
module.exports = milk;