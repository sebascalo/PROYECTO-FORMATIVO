const { pastureCreate, pastureUpdate, pastureDelete, getPastureById, pasturesGetAll } = require("../services/pastureService");
const Response = require("../functions/response");

// Obtener todos los registros de potreros
const getAllPastures = async (req, res) => {
    try {
        const pastures = await pasturesGetAll();
        const response = new Response("Registros de potreros obtenidos exitosamente", pastures, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllPastures:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllPasturesById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del potrero es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el potrero", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const pasture = await getPastureById(id)
        var response = new Response(`Potrero ${id} obtenido exitosamente`, pasture, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllPasturesById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createPasture = async (req, res) => {
    try {
        // nombre del potrero
        // tamaño en hectáreas
        // capacidad máxima
        // tipo de pastura
        // estado actual
        // días de descanso
        // días de ocupación
        const { name, extension, maxCapacity, pastureType, currentStatus, restDays, occupationDays } = req.body;
        var errors = [];
        // Validaciones
        if (!name || name.trim() === "") {
            errors.push("El nombre del potrero es obligatorio");
        }
        if (!extension || extension.toString().trim() === "" || isNaN(extension)) {
            errors.push("El tamaño del potrero es obligatorio y debe ser un número");
        }
        if (!maxCapacity || maxCapacity.toString().trim() === "" || isNaN(maxCapacity)) {
            errors.push("La capacidad máxima es obligatoria y debe ser un número");
        }
        if (!pastureType || pastureType.trim() === "") {
            errors.push("El tipo de pastura es obligatorio");
        }
        if (!currentStatus || currentStatus.trim() === "") {
            errors.push("El estado actual es obligatorio");
        }
        if (!restDays || restDays.toString().trim() === "" || isNaN(restDays)) {
            errors.push("Los días de descanso son obligatorios y deben ser un número");
        }
        if (!occupationDays || occupationDays.toString().trim() === "" || isNaN(occupationDays)) {
            errors.push("Los días de ocupación son obligatorios y deben ser un número");
        }
        if (errors.length > 0) {
            var response = new Response("Error al crear el potrero", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { name, extension, maxCapacity, pastureType, currentStatus, restDays, occupationDays }
        const pasture = await pastureCreate(data)
        var response = new Response("Potrero creado exitosamente", pasture, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createPasture:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updatePasture = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, extension, maxCapacity, pastureType, currentStatus, restDays, occupationDays } = req.body;
        var errors = [];
        // Validaciones
        if (!id) {
            errors.push("El ID del potrero es obligatorio");
        }
        if (!name || name.trim() === "") {
            errors.push("El nombre del potrero es obligatorio");
        }
        if (!extension || extension.toString().trim() === "" || isNaN(extension)) {
            errors.push("El tamaño del potrero es obligatorio y debe ser un número");
        }
        if (!maxCapacity || maxCapacity.toString().trim() === "" || isNaN(maxCapacity)) {
            errors.push("La capacidad máxima es obligatoria y debe ser un número");
        }
        if (!pastureType || pastureType.trim() === "") {
            errors.push("El tipo de pastura es obligatorio");
        }
        if (!currentStatus || currentStatus.trim() === "") {
            errors.push("El estado actual es obligatorio");
        }
        if (!restDays || restDays.toString().trim() === "" || isNaN(restDays)) {
            errors.push("Los días de descanso son obligatorios y deben ser un número");
        }
        if (!occupationDays || occupationDays.toString().trim() === "" || isNaN(occupationDays)) {
            errors.push("Los días de ocupación son obligatorios y deben ser un número");
        }
        if (errors.length > 0) {
            var response = new Response("Error al actualizar el potrero", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { name, extension, maxCapacity, pastureType, currentStatus, restDays, occupationDays }
        const pasture = await pastureUpdate(id, data)
        var response = new Response(`Potrero ${id} actualizado exitosamente`, pasture, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updatePasture:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deletePasture = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del potrero es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el potrero", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id }
        const pasture = await pastureDelete(id)
        var response = new Response(`Potrero ${id} eliminado exitosamente`, { id }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deletePasture:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllPastures,
    getAllPasturesById,
    createPasture,
    updatePasture,
    deletePasture
};