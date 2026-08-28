const food = require('../models/foodModel');

// Crear alimento
const foodCreate = async (data) => {
    try {
        const newFood = await food.create(data);
        return newFood;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todos los alimentos
const foodsGetAll = async (limit, offset) => {
    try {
        const foods = await food.findAll({ offset: offset, limit: limit });
        return foods;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener alimento por ID
const getFoodById = async (id) => {
    try {
        const foodid = await food.findOne({ where: { id } });
        return foodid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar alimento
const foodDelete = async (id) => {
    try {
        const foodDelete = await food.destroy({ where: { id } });
        return foodDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar alimento
const foodUpdate = async (id, data) => {
    try {
        const foodToUpdate = await food.findOne({ where: { id } });
        if (!foodToUpdate) {
            return null;
        }
        await foodToUpdate.update(data);
        return foodToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    foodCreate,
    foodsGetAll,
    getFoodById,
    foodDelete,
    foodUpdate
};