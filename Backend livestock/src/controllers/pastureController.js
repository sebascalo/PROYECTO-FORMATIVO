const { pastureCreate, pastureUpdate, pastureDelete, getPastureById } = require("../services/pastureService");
const Response = require("../functions/response");

const getAllPastures = (req, res) => {
    const body = req.body
    console.log("Body recibido:", body);
    res.status(201);
    res.json({ message: 'Obteniendo todos los potreros' });
}

const getAllPasturesById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del potrero es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response(false, "error al obtener el potrero", errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id }
        const pasture = await getPastureById(data)
        var response = new Response(true, "Potrero obtenido exitosamente", pasture);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllPasturesById:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
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
            var response = new Response(false, "error al crear el potrero", errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { name, extension, maxCapacity, pastureType, currentStatus, restDays, occupationDays }
        const pasture = await pastureCreate(data)
        var response = new Response(true, "Potrero creado exitosamente", pasture);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createPasture:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
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
            var response = new Response(false, "error al actualizar el potrero", errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id, name, extension, maxCapacity, pastureType, currentStatus, restDays, occupationDays }
        const pasture = await pastureUpdate(data)
        var response = new Response(true, "Potrero actualizado exitosamente", pasture);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updatePasture:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
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
            var response = new Response(false, "error al eliminar el potrero", errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id }
        const pasture = await pastureDelete(data)
        var response = new Response(true, "Potrero eliminado exitosamente", pasture);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deletePasture:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
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