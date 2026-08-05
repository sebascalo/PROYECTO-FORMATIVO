const cattle = require('../models/cattleModel');

// Crear bovino
const cattleCreate = async (data) => {
    try {
        const newCattle = await cattle.create(data);
        return newCattle;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todos los bovinos
const cattlesGetAll = async () => {
    try {
        const cattles = await cattle.findAll();
        return cattles;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener bovino por ID
const getCattleById = async (id) => {
    try {
        const cattleid = await cattle.findOne({ where: { id } });
        return cattleid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar bovino
const cattleDelete = async (id) => {
    try {
        const cattleDelete = await cattle.destroy({ where: { id } });
        return cattleDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar bovino
const cattleUpdate = async (id, data) => {
    try {
        const cattleToUpdate = await cattle.findOne({ where: { id } });
        if (!cattleToUpdate) {
            return null;
        }
        await cattleToUpdate.update(data);
        return cattleToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    cattleCreate,
    cattlesGetAll,
    getCattleById,
    cattleDelete,
    cattleUpdate
};