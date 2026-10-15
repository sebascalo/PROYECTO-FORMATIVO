const artificialInsemination = require('../models/artificialInseminationModel');

// Crear inseminación artificial
const artificialInseminationCreate = async (data) => {
    try {
        const newArtificialInsemination = await artificialInsemination.create(data);
        return newArtificialInsemination;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todas las inseminaciones artificiales
const artificialInseminationsGetAll = async (limit, offset) => {
    try {
        const artificialInseminations = await artificialInsemination.findAll({ offset: offset, limit: limit });
        return artificialInseminations;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener inseminación artificial por ID
const getArtificialInseminationById = async (id_artifInse) => {
    try {
        const artificialInseminationid = await artificialInsemination.findOne({ where: { id_artifInse } });
        return artificialInseminationid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar inseminación artificial
const artificialInseminationDelete = async (id_artifInse) => {
    try {
        const artificialInseminationDelete = await artificialInsemination.destroy({ where: { id_artifInse } });
        return artificialInseminationDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar inseminación artificial
const artificialInseminationUpdate = async (id_artifInse, data) => {
    try {
        const artificialInseminationToUpdate = await artificialInsemination.findOne({ where: { id_artifInse } });
        if (!artificialInseminationToUpdate) {
            return null;
        }
        await artificialInseminationToUpdate.update(data);
        return artificialInseminationToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    artificialInseminationCreate,
    artificialInseminationsGetAll,
    getArtificialInseminationById,
    artificialInseminationDelete,
    artificialInseminationUpdate
};