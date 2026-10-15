const pasture = require ('../models/pastureModel');

// crear potrero
const pastureCreate = async (data) => {
    try {
        const newPasture = await pasture.create(data);
        return newPasture;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}
// obtener todos los potreros
const pasturesGetAll = async (limit, offset) => {
    try {
        const pastures = await pasture.findAll({ offset: offset, limit: limit });
        return pastures;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}
// obtener potrero por id
const getPastureById = async (id_pasture) => {
    try {
        const pastureid = await pasture.findOne({ where: { id_pasture } });
        return pastureid;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
//inactivar potrero
const pastureDelete = async (id_pasture) => {
    try {
        const pastureDelete = await pasture.destroy({ where: { id_pasture } });
        return pastureDelete;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
// actualizar potrero
const pastureUpdate = async (id_pasture, data) => {
    try {
        const pastureToUpdate = await pasture.findOne({ where: { id_pasture } });
        if (!pastureToUpdate) {
            return null;
        }
        await pastureToUpdate.update(data);
        return pastureToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
module.exports = {
    pastureCreate,
    pasturesGetAll,
    getPastureById,
    pastureDelete,
    pastureUpdate
}