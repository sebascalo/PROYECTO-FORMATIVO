const reproductionModels = require('../models/ReproductionModel');

// Crear reproduction
const createReproduction = async (data) => {
    try {
        const newReproduction = await reproductionModels.create(data);
        return newReproduction;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}   

// Obtener todos los reproductions 
const getAllReproductions = async () => {
    try {
        const reproductions = await reproductionModels.findAll();
        return reproductions;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

// Obtener reproduction por id
const getReproductionById = async (id) => { 
    try {
        const reproduction = await reproductionModels.findByPk(id);
        return reproduction;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Inactivar reproduction
const deleteReproduction = async (id) => {
    try {
        const deletedRows = await reproductionModels.destroy({ where: { id } });
        return deletedRows;
    } catch (error) {
        console.error(error);
        
    }
}

// Actualizar reproduction
const updateReproduction = async (id, data) => {
    try {
        const updatedReproduction = await reproductionModels.update(data, { where: { id } });
        return updatedReproduction;
    } catch (error) {
        console.error(error);
        
    }
}

module.exports = {
    createReproduction,
    getAllReproductions,
    getReproductionById,
    deleteReproduction,
    updateReproduction,
};      