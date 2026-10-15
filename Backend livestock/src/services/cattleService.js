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
const cattlesGetAll = async (limit, offset) => {
    try {
        const cattles = await cattle.findAll({ offset: offset, limit: limit });
        return cattles;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener bovino por ID
const getCattleById = async (id_Bovine) => {
    try {
        const cattleid = await cattle.findOne({ where: { id_Bovine } });
        return cattleid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar bovino
const cattleDelete = async (id_Bovine) => {
    try {
        const cattleDelete = await cattle.destroy({ where: { id_Bovine } });
        return cattleDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar bovino
const cattleUpdate = async (id_Bovine, data) => {
    try {
        const cattleToUpdate = await cattle.findOne({ where: { id_Bovine } });
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