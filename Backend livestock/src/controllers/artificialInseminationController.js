const { artificialInseminationCreate, artificialInseminationUpdate, artificialInseminationDelete, getArtificialInseminationById, artificialInseminationsGetAll } = require("../services/artificialInseminationService");
const Response = require("../functions/response");

// Obtener todos los registros de inseminaciones artificiales
const getAllArtificialInseminations = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const artificialInseminations = await artificialInseminationsGetAll(limit, offset);
        const response = new Response("Registros de inseminaciones artificiales obtenidos exitosamente", artificialInseminations, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllArtificialInseminations:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllArtificialInseminationsById = async (req, res) => {
    try {
        const { id_artifInse } = req.params;
        var errors = [];
        if (!id_artifInse) {
            errors.push("El ID de la inseminación artificial es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener la inseminación artificial", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const artificialInsemination = await getArtificialInseminationById(id_artifInse);
        var response = new Response(`Inseminación artificial ${id_artifInse} obtenida exitosamente`, artificialInsemination, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllArtificialInseminationsById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createArtificialInsemination = async (req, res) => {
    try {
        console.log("📥 [BACK] Body recibido:", req.body);
        const { id_Bovine, inseminationDate, semenID, id_race, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "" || isNaN(id_Bovine)) {
            errors.push("La identificación del bovino es obligatoria y debe ser un número");
        }
        if (!inseminationDate || String(inseminationDate).trim() === "") {
            errors.push("La fecha de inseminación es obligatoria");
        }
        if (!semenID || String(semenID).trim() === "") {
            errors.push("El código o lote de la pajilla es obligatorio");
        }
        if (!id_race || String(id_race).trim() === "") {
            errors.push("La raza de la pajilla es obligatoria");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable de la inseminación es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear la inseminación artificial", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = { id_Bovine, inseminationDate, semenID, id_race, observations, idResponsible };
        console.log("📥 [BACK] data a guardar:", data);
        const artificialInsemination = await artificialInseminationCreate(data);
        var response = new Response("Inseminación artificial creada exitosamente", artificialInsemination, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createArtificialInsemination:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateArtificialInsemination = async (req, res) => {
    try {
        const { id_artifInse } = req.params;
        const { id_Bovine, inseminationDate, semenID, id_race, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_artifInse) {
            errors.push("El ID de la inseminación artificial es obligatorio");
        }
        if (!id_Bovine || String(id_Bovine).trim() === "" || isNaN(id_Bovine)) {
            errors.push("La identificación del bovino es obligatoria y debe ser un número");
        }
        if (!inseminationDate || String(inseminationDate).trim() === "") {
            errors.push("La fecha de inseminación es obligatoria");
        }
        if (!semenID || String(semenID).trim() === "") {
            errors.push("El código o lote de la pajilla es obligatorio");
        }
        if (!id_race || String(id_race).trim() === "") {
            errors.push("La raza de la pajilla es obligatoria");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable de la inseminación es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar la inseminación artificial", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = { id_Bovine, inseminationDate, semenID, id_race, observations, idResponsible };
        const artificialInsemination = await artificialInseminationUpdate(id_artifInse, data);
        var response = new Response(`Inseminación artificial ${id_artifInse} actualizada exitosamente`, artificialInsemination, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateArtificialInsemination:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteArtificialInsemination = async (req, res) => {
    try {
        const { id_artifInse } = req.params;
        var errors = [];
        if (!id_artifInse) {
            errors.push("El ID de la inseminación artificial es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar la inseminación artificial", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const artificialInsemination = await artificialInseminationDelete(id_artifInse);
        var response = new Response(`Inseminación artificial ${id_artifInse} eliminada exitosamente`, { id_artifInse }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteArtificialInsemination:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllArtificialInseminations,
    getAllArtificialInseminationsById,
    createArtificialInsemination,
    updateArtificialInsemination,
    deleteArtificialInsemination
};