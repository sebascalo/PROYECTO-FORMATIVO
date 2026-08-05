const vacunation = require('../models/vacunationModel');

// Crear vacunación
const vacunationCreate = async (data) => {
    try {
        const newVacunation = await vacunation.create(data);
        return newVacunation;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todas las vacunaciones
const vacunationsGetAll = async () => {
    try {
        const vacunations = await vacunation.findAll();
        return vacunations;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener vacunación por ID
const getVacunationById = async (id) => {
    try {
        const vacunationid = await vacunation.findOne({ where: { id } });
        return vacunationid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Inactivar vacunación
const vacunationDelete = async (id) => {
    try {
        const vacunationDelete = await vacunation.destroy({ where: { id } });
        return vacunationDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar vacunación
const vacunationUpdate = async (id, data) => {
    try {
        const vacunationToUpdate = await vacunation.findOne({ where: { id } });
        if (!vacunationToUpdate) {
            return null;
        }
        await vacunationToUpdate.update(data);
        return vacunationToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    vacunationCreate,
    vacunationsGetAll,
    getVacunationById,
    vacunationDelete,
    vacunationUpdate
};
