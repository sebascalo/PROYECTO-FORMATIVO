const health = require('../models/healthModel'); 

//crear registro de salud
const createHealth = async (data) => {
    try {
        const newHealth = await health.create(data);
        return newHealth;
    }
    catch (error) {
        console.log(error);
            throw error;
    }
}

//obtener todos los registros de salud
const getAllHealth = async () => {
    try {
        const healths = await health.findAll();
        return healths;
    }
    catch (error) {
        console.log(error);
         throw error;
    }
}

//obtener registro de salud por id
const getHealthById = async (id) => {
    try {
        const healthId = await health.findOne({ where: { id } });
        return healthId;
    }
    catch (error) {
        console.log(error);
        
    }
}
//eliminar registro de salud
const deleteHealth = async (id) => {
    try {
        const deleteHealth = await health.destroy({ where: { id } });
        return deleteHealth;
    }
    catch (error) {
        console.log(error);
        
    }
}
//actualizar registro de salud
const updateHealth = async (id, data) => {
    try {
        const updateHealth = await health.update(data, { where: { id } });
        return updateHealth;
    }
    catch (error) {
        console.log(error);
    
    }
}
module.exports = {
    createHealth,
    getAllHealth,
    getHealthById,
    deleteHealth,
    updateHealth
}


