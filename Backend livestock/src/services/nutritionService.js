const nutrition = require('../models/nutritionModel');

//crear registro de nutricion
const createNutrition = async (data) => {
    try {
        const newNutrition = await nutrition.create(data);
        return newNutrition;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
//obtener todos los registros de nutricion
const getAllNutrition = async () => {
    try {
        const nutritions = await nutrition.findAll();
        return nutritions;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
//obtener registro de nutricion por id
const getNutritionById = async (id) => {
    try {
        const nutritionId = await nutrition.findOne({ where: { id } });
        return nutritionId;
    }
    catch (error) {
        console.log(error);
        
    }
}
//inactivar registro de nutricion
const deleteNutrition = async (id) => {
    try {
        const deleteNutrition = await nutrition.destroy({ where: { id } });
        return deleteNutrition;
    }
    catch (error) {
        console.log(error);
        
    }
}
//actualizar registro de nutricion
const updateNutrition = async (id, data) => {
    try {
        const updateNutrition = await nutrition.update(data, { where: { id } });
        return updateNutrition;
    }
    catch (error) {
        console.log(error);
        
    }
}
module.exports = {
    createNutrition,
    getAllNutrition,
    getNutritionById,
    deleteNutrition,
    updateNutrition
}