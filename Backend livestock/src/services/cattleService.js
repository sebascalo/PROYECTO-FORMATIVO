const cattle = require('../models/cattle');

// crear registro de bovinos
const createCattle = async (data) => {
    try {   
        const newCattle = await cattle.create(data);
        return newCattle;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}

// obtener todos los registros de bovinos
const getAllCattles = async () => {
    try {
        const cattles = await cattle.findAll();
        return cattles;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}
// obtener registro de bovino por id
const getCattleById = async (id) => {
    try {
        const cattleid = await cattle.findOne({ where: { id } });
        return cattleid;
    }catch (error) {
        console.log(error);
    }
}
// eliminar registro de bovinos
const deleteCattle = async (id) => {
    try {
        const deleteCattle = await cattle.destroy({ where: { id } });
        return deleteCattle;
    }catch (error) {
        console.log(error);
    }
}
// actualizar registro de bovinos
const updateCattle = async (id, data) => {
    try {   
        const updateCattle = await cattle.update(data, { where: { id } });
        return updateCattle;
    }catch (error) {
        console.log(error);
    }
}
module.exports = {
    createCattle,
    getAllCattles,
    getCattleById,
    deleteCattle,
    updateCattle
}
