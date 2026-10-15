const weighing = require('../models/weighingModel');

// Crear pesaje
const weighingCreate = async (data) => {
    try {
        const newWeighing = await weighing.create(data);
        return newWeighing;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todos los pesajes
const weighingsGetAll = async (limit, offset) => {
    try {
        const weighings = await weighing.findAll({ offset: offset, limit: limit });
        return weighings;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener pesaje por ID
const getWeighingById = async (id_weighing) => {
    try {
        const weighingid = await weighing.findOne({ where: { id_weighing } });
        return weighingid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Inactivar pesaje
const weighingDelete = async (id_weighing) => {
    try {
        const weighingDelete = await weighing.destroy({ where: { id_weighing } });
        return weighingDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar pesaje
const weighingUpdate = async (id_weighing, data) => {
    try {
        const weighingToUpdate = await weighing.findOne({ where: { id_weighing } });
        if (!weighingToUpdate) {
            return null;
        }
        await weighingToUpdate.update(data);
        return weighingToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    weighingCreate,
    weighingsGetAll,
    getWeighingById,
    weighingDelete,
    weighingUpdate
};