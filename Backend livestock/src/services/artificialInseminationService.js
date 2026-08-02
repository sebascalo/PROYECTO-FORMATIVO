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
const artificialInseminationsGetAll = async () => {
    try {
        const artificialInseminations = await artificialInsemination.findAll();
        return artificialInseminations;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener inseminación artificial por ID
const getArtificialInseminationById = async (id) => {
    try {
        const artificialInseminationid = await artificialInsemination.findOne({ where: { id } });
        return artificialInseminationid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar inseminación artificial
const artificialInseminationDelete = async (id) => {
    try {
        const artificialInseminationDelete = await artificialInsemination.destroy({ where: { id } });
        return artificialInseminationDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar inseminación artificial
const artificialInseminationUpdate = async (id, data) => {
    try {
        const artificialInseminationToUpdate = await artificialInsemination.findOne({ where: { id } });
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