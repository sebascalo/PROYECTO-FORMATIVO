const { foodCreate, foodUpdate, foodDelete, getFoodById, foodsGetAll } = require("../services/foodService");
const Response = require("../functions/response");

// Obtener todos los registros de alimentos
const getAllFoods = async (req, res) => {
    try {
        const foods = await foodsGetAll();
        const response = new Response("Registros de alimentos obtenidos exitosamente", foods, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllFoods:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllFoodsById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del alimento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el alimento", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const food = await getFoodById(id)
        var response = new Response(`Alimento ${id} obtenido exitosamente`, food, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllFoodsById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createFood = async (req, res) => {
    try {
        const { food_name, food_type, unit_measure, stock_quantity, cost_per_unit, supplier, observations, active } = req.body;
        var errors = [];
        
        // Validaciones
        if (!food_name || food_name.trim() === "") {
            errors.push("El nombre del alimento es obligatorio");
        }
        if (!food_type || food_type.trim() === "") {
            errors.push("El tipo de alimento es obligatorio");
        }
        if (!unit_measure || unit_measure.trim() === "") {
            errors.push("La unidad de medida es obligatoria");
        }
        if (!stock_quantity || stock_quantity.toString().trim() === "" || isNaN(stock_quantity)) {
            errors.push("La cantidad en stock es obligatoria y debe ser un número");
        }
        if (stock_quantity && stock_quantity < 0) {
            errors.push("La cantidad en stock no puede ser negativa");
        }
        if (!cost_per_unit || cost_per_unit.toString().trim() === "" || isNaN(cost_per_unit)) {
            errors.push("El costo por unidad es obligatorio y debe ser un número");
        }
        if (cost_per_unit && cost_per_unit < 0) {
            errors.push("El costo por unidad no puede ser negativo");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el alimento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { food_name, food_type, unit_measure, stock_quantity, cost_per_unit, supplier, observations, active }
        const food = await foodCreate(data)
        var response = new Response("Alimento creado exitosamente", food, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createFood:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { food_name, food_type, unit_measure, stock_quantity, cost_per_unit, supplier, observations, active } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID del alimento es obligatorio");
        }
        if (!food_name || food_name.trim() === "") {
            errors.push("El nombre del alimento es obligatorio");
        }
        if (!food_type || food_type.trim() === "") {
            errors.push("El tipo de alimento es obligatorio");
        }
        if (!unit_measure || unit_measure.trim() === "") {
            errors.push("La unidad de medida es obligatoria");
        }
        if (!stock_quantity || stock_quantity.toString().trim() === "" || isNaN(stock_quantity)) {
            errors.push("La cantidad en stock es obligatoria y debe ser un número");
        }
        if (stock_quantity && stock_quantity < 0) {
            errors.push("La cantidad en stock no puede ser negativa");
        }
        if (!cost_per_unit || cost_per_unit.toString().trim() === "" || isNaN(cost_per_unit)) {
            errors.push("El costo por unidad es obligatorio y debe ser un número");
        }
        if (cost_per_unit && cost_per_unit < 0) {
            errors.push("El costo por unidad no puede ser negativo");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el alimento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { food_name, food_type, unit_measure, stock_quantity, cost_per_unit, supplier, observations, active }
        const food = await foodUpdate(id, data)
        var response = new Response(`Alimento ${id} actualizado exitosamente`, food, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateFood:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del alimento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el alimento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const food = await foodDelete(id)
        var response = new Response(`Alimento ${id} eliminado exitosamente`, { id }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteFood:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllFoods,
    getAllFoodsById,
    createFood,
    updateFood,
    deleteFood
};