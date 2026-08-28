const {DataTypes} = require('sequelize');
const db = require('../config/conectionDB');

const user = db.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false,
        unique: true
    },  
    password: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    documentId: {
        type: DataTypes.STRING,
        max: 30,
        min: 5,
        allowNull: false,
    },
    postJob:{
        type: DataTypes.STRING,
        max: 50,
        min: 7,
        allowNull: false
    },
    verifyEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active:{
        type: DataTypes.BOOLEAN,
         defaultValue: true     
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});
module.exports = user;