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
const mortalitiesGetAll = async (limit, offset) => {
    try {
        const mortalities = await mortality.findAll({ offset: offset, limit: limit });
        return mortalities;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener registro de mortalidad por ID
const getMortalityById = async (id_mortality) => {
    try {
        const mortalityid = await mortality.findOne({ where: { id_mortality } });
        return mortalityid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar registro de mortalidad
const mortalityDelete = async (id_mortality) => {
    try {
        const mortalityDelete = await mortality.destroy({ where: { id_mortality } });
        return mortalityDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar registro de mortalidad
const mortalityUpdate = async (id_mortality, data) => {
    try {
        const mortalityToUpdate = await mortality.findOne({ where: { id_mortality } });
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