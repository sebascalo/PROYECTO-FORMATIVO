const milk = require('../models/milkModel');

// crear registro de leche
const milkCreate = async (data) => {
    try {
        const newMilk = await milk.create(data);
        return newMilk;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}
// obtener todos los registros de leche
const getAllMilks = async () => {
    try {
        const milks = await milk.findAll();
        return milks;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}
// obtener registro de leche por id
const getMilkById = async (id) => {
    try {
        const milkid = await milk.findOne({ where: { id } });
        return milkid;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
// inactivar registro de leche
const milkDelete = async (id) => {
    try {
        const milkDelete = await milk.destroy({ where: { id } });
        return milkDelete;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
// actualizar registro de leche
const milkUpdate = async (id, data) => {
    try {   
        const milkUpdate = await milk.update(data, { where: { id } });
        return milkUpdate;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    milkCreate,
    getAllMilks,
    getMilkById,
    milkDelete,
    milkUpdate
}