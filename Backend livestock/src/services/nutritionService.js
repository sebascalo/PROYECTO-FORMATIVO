const nutrition = require('../models/nutritionModel');

// Crear registro de nutrición
const nutritionCreate = async (data) => {
    try {
        const newNutrition = await nutrition.create(data);
        return newNutrition;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todos los registros de nutrición
const nutritionsGetAll = async (limit, offset) => {
    try {
        const nutritions = await nutrition.findAll({ offset: offset, limit: limit });
        return nutritions;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener registro de nutrición por ID
const getNutritionById = async (id_nutrition) => {
    try {
        const nutritionid = await nutrition.findOne({ where: { id_nutrition } });
        return nutritionid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar registro de nutrición
const nutritionDelete = async (id_nutrition) => {
    try {
        const nutritionDelete = await nutrition.destroy({ where: { id_nutrition } });
        return nutritionDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar registro de nutrición
const nutritionUpdate = async (id_nutrition, data) => {
    try {
        const nutritionToUpdate = await nutrition.findOne({ where: { id_nutrition } });
        if (!nutritionToUpdate) {
            return null;
        }
        await nutritionToUpdate.update(data);
        return nutritionToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    nutritionCreate,
    nutritionsGetAll,
    getNutritionById,
    nutritionDelete,
    nutritionUpdate
};