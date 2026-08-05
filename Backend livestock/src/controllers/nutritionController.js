const { nutritionCreate, nutritionUpdate, nutritionDelete, getNutritionById, nutritionsGetAll } = require("../services/nutritionService");
const Response = require("../functions/response");

// Obtener todos los registros de nutrición
const getAllNutritions = async (req, res) => {
    try {
        const nutritions = await nutritionsGetAll();
        const response = new Response("Registros de nutrición obtenidos exitosamente", nutritions, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllNutritions:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllNutritionsById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del registro de nutrición es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el registro de nutrición", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const nutrition = await getNutritionById(id)
        var response = new Response(`Registro de nutrición ${id} obtenido exitosamente`, nutrition, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllNutritionsById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createNutrition = async (req, res) => {
    try {
        const { idBovine, idFood, food_type, quantity, frequency, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!idBovine || idBovine.trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!idFood || idFood.trim() === "") {
            errors.push("El código del alimento es obligatorio");
        }
        if (!food_type || food_type.trim() === "") {
            errors.push("El tipo de alimento es obligatorio");
        }
        if (!quantity || quantity.trim() === "") {
            errors.push("La cantidad de alimento es obligatoria");
        }
        if (!frequency || frequency.trim() === "") {
            errors.push("La frecuencia de alimentación es obligatoria");
        }
        if (frequency && !["Mañana", "Tarde", "Noche"].includes(frequency)) {
            errors.push("La frecuencia debe ser: Mañana, Tarde o Noche");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable de la nutrición es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el registro de nutrición", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, idFood, food_type, quantity, frequency, idResponsible }
        const nutrition = await nutritionCreate(data)
        var response = new Response("Registro de nutrición creado exitosamente", nutrition, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createNutrition:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateNutrition = async (req, res) => {
    try {
        const { id } = req.params;
        const { idBovine, idFood, food_type, quantity, frequency, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID del registro de nutrición es obligatorio");
        }
        if (!idBovine || idBovine.trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!idFood || idFood.trim() === "") {
            errors.push("El código del alimento es obligatorio");
        }
        if (!food_type || food_type.trim() === "") {
            errors.push("El tipo de alimento es obligatorio");
        }
        if (!quantity || quantity.trim() === "") {
            errors.push("La cantidad de alimento es obligatoria");
        }
        if (!frequency || frequency.trim() === "") {
            errors.push("La frecuencia de alimentación es obligatoria");
        }
        if (frequency && !["Mañana", "Tarde", "Noche"].includes(frequency)) {
            errors.push("La frecuencia debe ser: Mañana, Tarde o Noche");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable de la nutrición es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el registro de nutrición", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, idFood, food_type, quantity, frequency, idResponsible }
        const nutrition = await nutritionUpdate(id, data)
        var response = new Response(`Registro de nutrición ${id} actualizado exitosamente`, nutrition, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateNutrition:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteNutrition = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del registro de nutrición es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el registro de nutrición", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const nutrition = await nutritionDelete(id)
        var response = new Response(`Registro de nutrición ${id} eliminado exitosamente`, { id }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteNutrition:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllNutritions,
    getAllNutritionsById,
    createNutrition,
    updateNutrition,
    deleteNutrition
};