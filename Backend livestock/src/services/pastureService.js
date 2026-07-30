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
const pasturesGetAll = async () => {
    try {
        const pastures = await pasture.findAll();
        return pastures;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}
// obtener potrero por id
const getPastureById = async (id) => {
    try {
        const pastureid = await pasture.findOne({ where: { id } });
        return pastureid;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
//inactivar potrero
const pastureDelete = async (id) => {
    try {
        const pastureDelete = await pasture.destroy({ where: { id } });
        return pastureDelete;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
// actualizar potrero
const pastureUpdate = async (id, data) => {
    try {
        const pastureToUpdate = await pasture.findOne({ where: { id } });
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