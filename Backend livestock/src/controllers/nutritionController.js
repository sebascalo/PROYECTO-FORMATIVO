const { nutritionCreate, nutritionUpdate, nutritionDelete, getNutritionById, nutritionsGetAll } = require("../services/nutritionService");
const Response = require("../functions/response");

// Obtener todos los registros de nutrición
const getAllNutritions = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const nutritions = await nutritionsGetAll(limit, offset);
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
        const { id_nutrition } = req.params;
        var errors = [];
        if (!id_nutrition) {
            errors.push("El ID del registro de nutrición es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el registro de nutrición", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const nutrition = await getNutritionById(id_nutrition);
        var response = new Response(`Registro de nutrición ${id_nutrition} obtenido exitosamente`, nutrition, null);
        res.status(200);
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
        const { id_Bovine, id_food, quantity, frequency, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("La identificación del bovino es obligatoria");
        if (!id_food || String(id_food).trim() === "") errors.push("El código del alimento es obligatorio");
        if (!quantity || String(quantity).trim() === "") errors.push("La cantidad de alimento es obligatoria");
        if (!frequency || String(frequency).trim() === "") errors.push("La frecuencia de alimentación es obligatoria");
        if (frequency && !["Mañana", "Tarde", "Noche", "Mañana y Tarde", "Mañana, Tarde y Noche"].includes(frequency)) {
            errors.push("La frecuencia no es válida");
        }
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable de la nutrición es obligatorio");

        if (errors.length > 0) {
            var response = new Response("Error al crear el registro de nutrición", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        // 👇 Forzamos active: true por defecto
        const data = { id_Bovine, id_food, quantity, frequency, idResponsible, active: true };
        const nutrition = await nutritionCreate(data);
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
        const { id_nutrition } = req.params;
        // 👇 Recibimos active
        const { id_Bovine, id_food, quantity, frequency, idResponsible, active } = req.body;
        var errors = [];
        
        if (!id_nutrition) errors.push("El ID del registro de nutrición es obligatorio");
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("La identificación del bovino es obligatoria");
        if (!id_food || String(id_food).trim() === "") errors.push("El código del alimento es obligatorio");
        if (!quantity || String(quantity).trim() === "") errors.push("La cantidad de alimento es obligatoria");
        if (!frequency || String(frequency).trim() === "") errors.push("La frecuencia de alimentación es obligatoria");
        if (frequency && !["Mañana", "Tarde", "Noche", "Mañana y Tarde", "Mañana, Tarde y Noche"].includes(frequency)) {
            errors.push("La frecuencia no es válida");
        }
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable de la nutrición es obligatorio");

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el registro de nutrición", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        // 👇 Actualizamos active solo si viene
        const data = { 
            id_Bovine, 
            id_food, 
            quantity, 
            frequency, 
            idResponsible,
            ...(active !== undefined && { active })
        };
        const nutrition = await nutritionUpdate(id_nutrition, data);
        var response = new Response(`Registro de nutrición ${id_nutrition} actualizado exitosamente`, nutrition, null);
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
        const { id_nutrition } = req.params;
        if (!id_nutrition) return res.status(400).json(new Response("Error al eliminar el registro de nutrición", null, ["El ID es obligatorio"]).json);
        
        await nutritionDelete(id_nutrition);
        var response = new Response(`Registro de nutrición ${id_nutrition} eliminado exitosamente`, { id_nutrition }, null);
        res.status(200);
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