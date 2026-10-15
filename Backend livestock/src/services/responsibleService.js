const responsible = require('../models/responsibleModel');

// Crear responsable
const responsibleCreate = async (data) => {
    try {
        const newResponsible = await responsible.create(data);
        return newResponsible;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todos los responsables
const responsiblesGetAll = async (limit, offset) => {
    try {
        const responsibles = await responsible.findAll({ offset: offset, limit: limit });
        return responsibles;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener responsable por ID
const getResponsibleById = async (idResponsible) => {
    try {
        const responsibleid = await responsible.findOne({ where: { idResponsible } });
        return responsibleid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar responsable
const responsibleDelete = async (idResponsible) => {
    try {
        const responsibleDelete = await responsible.destroy({ where: { idResponsible } });
        return responsibleDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar responsable
const responsibleUpdate = async (idResponsible, data) => {
    try {
        const responsibleToUpdate = await responsible.findOne({ where: { idResponsible } });
        if (!responsibleToUpdate) {
            return null;
        }
        await responsibleToUpdate.update(data);
        return responsibleToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    responsibleCreate,
    responsiblesGetAll,
    getResponsibleById,
    responsibleDelete,
    responsibleUpdate
};