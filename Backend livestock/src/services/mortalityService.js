const mortality = require('../models/mortalityModel');

// Crear registro de mortalidad
const mortalityCreate = async (data) => {
    try {
        const newMortality = await mortality.create(data);
        return newMortality;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todos los registros de mortalidad
const mortalitiesGetAll = async () => {
    try {
        const mortalities = await mortality.findAll();
        return mortalities;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener registro de mortalidad por ID
const getMortalityById = async (id) => {
    try {
        const mortalityid = await mortality.findOne({ where: { id } });
        return mortalityid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar registro de mortalidad
const mortalityDelete = async (id) => {
    try {
        const mortalityDelete = await mortality.destroy({ where: { id } });
        return mortalityDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar registro de mortalidad
const mortalityUpdate = async (id, data) => {
    try {
        const mortalityToUpdate = await mortality.findOne({ where: { id } });
        if (!mortalityToUpdate) {
            return null;
        }
        await mortalityToUpdate.update(data);
        return mortalityToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    mortalityCreate,
    mortalitiesGetAll,
    getMortalityById,
    mortalityDelete,
    mortalityUpdate
};