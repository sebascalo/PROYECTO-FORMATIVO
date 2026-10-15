const { cattleCreate, cattleUpdate, cattleDelete, getCattleById, cattlesGetAll } = require("../services/cattleService");
const Response = require("../functions/response");

// Obtener todos los registros de bovinos
const getAllCattles = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;

        const limit = queryLimit ? Number(queryLimit) : 20;
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
        const { id_Bovine } = req.params;
        var errors = [];
        if (!id_Bovine) {
            errors.push("El ID del bovino es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el bovino", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const cattle = await getCattleById(id_Bovine);
        var response = new Response(`Bovino ${id_Bovine} obtenido exitosamente`, cattle, null);
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
};

const createCattle = async (req, res) => {
    try {
        console.log("📥 [BACK] Body recibido:", req.body);
        const { name, id_race, sex, entrydate, id_pasture, birthdate, photo, currentweight, classificationbytype, active } = req.body;
        var errors = [];

        // Validaciones
        if (!name || String(name).trim() === "") {
            errors.push("El nombre del bovino es obligatorio");
        }
        if (!id_race || String(id_race).trim() === "") {
            errors.push("El ID de la raza del bovino es obligatorio");
        }
        if (!sex || String(sex).trim() === "") {
            errors.push("El sexo del bovino es obligatorio");
        }
        if (!entrydate || String(entrydate).trim() === "") {
            errors.push("La fecha de ingreso es obligatoria");
        }
        if (!id_pasture || String(id_pasture).trim() === "") {
            errors.push("El potrero es obligatorio");
        }
        if (!birthdate || String(birthdate).trim() === "") {
            errors.push("La fecha de nacimiento es obligatoria");
        }
        if (!currentweight || String(currentweight).trim() === "" || isNaN(currentweight)) {
            errors.push("El peso actual es obligatorio y debe ser un número");
        }
        if (currentweight && currentweight <= 0) {
            errors.push("El peso actual debe ser mayor a 0");
        }
        if (!classificationbytype || String(classificationbytype).trim() === "") {
            errors.push("La clasificación por tipo es obligatoria");
        }
        if (!active) {
            errors.push("El estado del bovino es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el bovino", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        // 🔧 Conversión: 'Activo' -> 1, cualquier otra cosa -> 0
        const data = {
            name,
            id_race,
            sex,
            entrydate,
            id_pasture,
            birthdate,
            photo,
            currentweight,
            classificationbytype,
            active: active === 'Activo' ? 1 : 0
        };
        console.log("📥 [BACK] data a guardar:", data);
        const cattle = await cattleCreate(data);
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
};

const updateCattle = async (req, res) => {
    try {
        const { id_Bovine } = req.params;
        const { name, id_race, sex, entrydate, id_pasture, birthdate, photo, currentweight, classificationbytype, state, active } = req.body;
        var errors = [];

        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("El ID del bovino es obligatorio");
        }
        if (!name || String(name).trim() === "") {
            errors.push("El nombre del bovino es obligatorio");
        }
        if (!id_race || String(id_race).trim() === "") {
            errors.push("El ID de la raza del bovino es obligatorio");
        }
        if (!sex || String(sex).trim() === "") {
            errors.push("El sexo del bovino es obligatorio");
        }
        if (!entrydate || String(entrydate).trim() === "") {
            errors.push("La fecha de ingreso es obligatoria");
        }
        if (!id_pasture || String(id_pasture).trim() === "") {
            errors.push("El potrero es obligatorio");
        }
        if (!birthdate || String(birthdate).trim() === "") {
            errors.push("La fecha de nacimiento es obligatoria");
        }
        if (!currentweight || String(currentweight).trim() === "" || isNaN(currentweight)) {
            errors.push("El peso actual es obligatorio y debe ser un número");
        }
        if (currentweight && currentweight <= 0) {
            errors.push("El peso actual debe ser mayor a 0");
        }
        if (!classificationbytype || String(classificationbytype).trim() === "") {
            errors.push("La clasificación por tipo es obligatoria");
        }
        if (!active) {
            errors.push("El estado del bovino es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el bovino", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        // 🔧 Conversión: 'Activo' -> 1, cualquier otra cosa -> 0
        const data = {
            name,
            id_race,
            sex,
            entrydate,
            id_pasture,
            birthdate,
            photo,
            currentweight,
            classificationbytype,
            active: active === 'Activo' ? 1 : 0
        };
        const cattle = await cattleUpdate(id_Bovine, data);
        var response = new Response(`Bovino ${id_Bovine} actualizado exitosamente`, cattle, null);
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
};

const deleteCattle = async (req, res) => {
    try {
        const { id_Bovine } = req.params;
        var errors = [];
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("El ID del bovino es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el bovino", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const cattle = await cattleDelete(id_Bovine);
        var response = new Response(`Bovino ${id_Bovine} eliminado exitosamente`, { id_Bovino: id_Bovine }, null);
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
};

module.exports = {
    getAllCattles,
    getAllCattlesById,
    createCattle,
    updateCattle,
    deleteCattle
};