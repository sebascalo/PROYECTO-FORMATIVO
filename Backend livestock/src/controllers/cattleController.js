const { cattleCreate, cattleUpdate, cattleDelete, getCattleById, cattlesGetAll } = require("../services/cattleService");
const Response = require("../functions/response");

// Obtener todos los registros de bovinos
const getAllCattles = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const cattles = await cattlesGetAll(limit, offset);
        const response = new Response("Registros de bovinos obtenidos exitosamente", cattles, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllCattles:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllCattlesById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del bovino es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el bovino", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const cattle = await getCattleById(id)
        var response = new Response(`Bovino ${id} obtenido exitosamente`, cattle, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllCattlesById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createCattle = async (req, res) => {
    try {
        const { name, raze, sex, entrydate, paddock, birthdate, photo, currentweight, classificationbytype, active } = req.body;
        var errors = [];
        
        // Validaciones
        if (!name || name.trim() === "") {
            errors.push("El nombre del bovino es obligatorio");
        }
        if (!raze || raze.trim() === "") {
            errors.push("La raza del bovino es obligatoria");
        }
        if (!sex || sex.trim() === "") {
            errors.push("El sexo del bovino es obligatorio");
        }
        if (!entrydate || entrydate.trim() === "") {
            errors.push("La fecha de ingreso es obligatoria");
        }
        if (!paddock || paddock.trim() === "") {
            errors.push("El potrero es obligatorio");
        }
        if (!birthdate || birthdate.trim() === "") {
            errors.push("La fecha de nacimiento es obligatoria");
        }
        if (!currentweight || currentweight.toString().trim() === "" || isNaN(currentweight)) {
            errors.push("El peso actual es obligatorio y debe ser un número");
        }
        if (currentweight && currentweight <= 0) {
            errors.push("El peso actual debe ser mayor a 0");
        }
        if (!classificationbytype || classificationbytype.trim() === "") {
            errors.push("La clasificación por tipo es obligatoria");
        }
        if (!active || active.trim() === "") {
            errors.push("El estado del bovino es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el bovino", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { name, raze, sex, entrydate, paddock, birthdate, photo, currentweight, classificationbytype, active }
        const cattle = await cattleCreate(data)
        var response = new Response("Bovino creado exitosamente", cattle, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createCattle:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateCattle = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, raze, sex, entrydate, paddock, birthdate, photo, currentweight, classificationbytype, state, active } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID del bovino es obligatorio");
        }
        if (!name || name.trim() === "") {
            errors.push("El nombre del bovino es obligatorio");
        }
        if (!raze || raze.trim() === "") {
            errors.push("La raza del bovino es obligatoria");
        }
        if (!sex || sex.trim() === "") {
            errors.push("El sexo del bovino es obligatorio");
        }
        if (!entrydate || entrydate.trim() === "") {
            errors.push("La fecha de ingreso es obligatoria");
        }
        if (!paddock || paddock.trim() === "") {
            errors.push("El potrero es obligatorio");
        }
        if (!birthdate || birthdate.trim() === "") {
            errors.push("La fecha de nacimiento es obligatoria");
        }
        if (!currentweight || currentweight.toString().trim() === "" || isNaN(currentweight)) {
            errors.push("El peso actual es obligatorio y debe ser un número");
        }
        if (currentweight && currentweight <= 0) {
            errors.push("El peso actual debe ser mayor a 0");
        }
        if (!classificationbytype || classificationbytype.trim() === "") {
            errors.push("La clasificación por tipo es obligatoria");
        }
        if (!active || active.trim() === "") {
            errors.push("El estado del bovino es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el bovino", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { name, raze, sex, entrydate, paddock, birthdate, photo, currentweight, classificationbytype, active }
        const cattle = await cattleUpdate(id, data)
        var response = new Response(`Bovino ${id} actualizado exitosamente`, cattle, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateCattle:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteCattle = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del bovino es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el bovino", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const cattle = await cattleDelete(id)
        var response = new Response(`Bovino ${id} eliminado exitosamente`, { id }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteCattle:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllCattles,
    getAllCattlesById,
    createCattle,
    updateCattle,
    deleteCattle
};