const responsibleModel= require('../models/responsibleModel');

// Crear responsable
const createResponsible = async (data) => {
    try {
        const newResponsible = await responsibleModel.create(data);
        return newResponsible;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}   

// Obtener todos los responsables
const getAllResponsibles = async () => {
    try {
        const responsibles = await responsibleModel.findAll();
        return responsibles;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

// Obtener responsable por id
const getResponsibleById = async (id) => { 
    try {
        const responsible = await responsibleModel.findByPk(id);
        return responsible;
    } catch (error) {
        console.error(error);
    }
}

// Inactivar responsable
const deleteResponsible = async (id) => {
    try {
        const deletedRows = await responsibleModel.destroy({ where: { id } });
        return deletedRows;
    } catch (error) {
        console.error(error);
    }
}

// Actualizar responsable
const updateResponsible = async (id, data) => {
    try {
        const updatedResponsible = await responsibleModel.update(data, { where: { id } });
        return updatedResponsible;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createResponsible,
    getAllResponsibles,
    getResponsibleById,
    deleteResponsible,
    updateResponsible,
};