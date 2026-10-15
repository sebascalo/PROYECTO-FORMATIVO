const birth = require('../models/birthModel');

// Crear nacimiento
const birthCreate = async (data) => {
    try {
        const newBirth = await birth.create(data);
        return newBirth;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todos los nacimientos
const birthsGetAll = async (limit, offset) => {
    try {
        const births = await birth.findAll({ offset: offset, limit: limit });
        return births;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener nacimiento por ID
const getBirthById = async (id_birth) => {
    try {
        const birthid = await birth.findOne({ where: { id_birth } });
        return birthid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar nacimiento
const birthDelete = async (id_birth) => {
    try {
        const birthDelete = await birth.destroy({ where: { id_birth } });
        return birthDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar nacimiento
const birthUpdate = async (id_birth, data) => {
    try {
        const birthToUpdate = await birth.findOne({ where: { id_birth } });
        if (!birthToUpdate) {
            return null;
        }
        await birthToUpdate.update(data);
        return birthToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    birthCreate,
    birthsGetAll,
    getBirthById,
    birthDelete,
    birthUpdate
};