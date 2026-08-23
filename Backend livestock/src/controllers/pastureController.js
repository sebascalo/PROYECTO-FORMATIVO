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
        // NOTA: Se actualizaron los campos según el nuevo modelo
        const { name, extension, forageCapacity, pastureType, cattleEntryDate, cattleExitDate, currentStatus, lastChemicalApplication } = req.body;
        
        var errors = [];
        // Validaciones actualizadas
        if (!name || name.trim() === "") {
            errors.push("El nombre del potrero es obligatorio");
        }
        if (!extension || extension.toString().trim() === "" || isNaN(extension)) {
            errors.push("El tamaño del potrero es obligatorio y debe ser un número");
        }
        if (!forageCapacity || forageCapacity.toString().trim() === "" || isNaN(forageCapacity)) {
            errors.push("El aforo (capacidad máxima) es obligatorio y debe ser un número");
        }
        if (!pastureType || pastureType.trim() === "") {
            errors.push("El tipo de pastura es obligatorio");
        }
        if (!currentStatus || currentStatus.trim() === "") {
            errors.push("El estado actual es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al crear el potrero", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }

        // Los campos de fecha y químico son opcionales, así que se pasan tal cual (pueden ser null)
        const data = { 
            name, 
            extension, 
            forageCapacity, 
            pastureType, 
            cattleEntryDate, 
            cattleExitDate, 
            currentStatus, 
            lastChemicalApplication 
        };

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
        const { name, extension, forageCapacity, pastureType, cattleEntryDate, cattleExitDate, currentStatus, lastChemicalApplication } = req.body;
        
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
        if (!forageCapacity || forageCapacity.toString().trim() === "" || isNaN(forageCapacity)) {
            errors.push("El aforo (capacidad máxima) es obligatorio y debe ser un número");
        }
        if (!pastureType || pastureType.trim() === "") {
            errors.push("El tipo de pastura es obligatorio");
        }
        if (!currentStatus || currentStatus.trim() === "") {
            errors.push("El estado actual es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al actualizar el potrero", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }

        const data = { 
            name, 
            extension, 
            forageCapacity, 
            pastureType, 
            cattleEntryDate, 
            cattleExitDate, 
            currentStatus, 
            lastChemicalApplication 
        };

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