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
const birthsGetAll = async () => {
    try {
        const births = await birth.findAll();
        return births;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener nacimiento por ID
const getBirthById = async (id) => {
    try {
        const birthid = await birth.findOne({ where: { id } });
        return birthid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar nacimiento
const birthDelete = async (id) => {
    try {
        const birthDelete = await birth.destroy({ where: { id } });
        return birthDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar nacimiento
const birthUpdate = async (id, data) => {
    try {
        const birthToUpdate = await birth.findOne({ where: { id } });
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