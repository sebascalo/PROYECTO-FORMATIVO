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
const milksGetAll = async (limit, offset) => {
    try {
        const milks = await milk.findAll({ offset: offset, limit: limit });
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
        // 1. Buscar el registro de leche
        const milkToUpdate = await milk.findOne({ where: { id } });
        // 2. Si no existe, retornar null
        if (!milkToUpdate) {
            return null;
        }
        // 3. Actualizar el registro de leche
        await milkToUpdate.update(data);
        // 4. Retornar el registro de leche actualizado COMPLETO
        return milkToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    milkCreate,
    milksGetAll,
    getMilkById,
    milkDelete,
    milkUpdate
}