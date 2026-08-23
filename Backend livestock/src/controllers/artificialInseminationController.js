const { artificialInseminationCreate, artificialInseminationUpdate, artificialInseminationDelete, getArtificialInseminationById, artificialInseminationsGetAll } = require("../services/artificialInseminationService");
const Response = require("../functions/response");

// Obtener todos los registros de inseminaciones artificiales
const getAllArtificialInseminations = async (req, res) => {
    try {
        const artificialInseminations = await artificialInseminationsGetAll();
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
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID de la inseminación artificial es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener la inseminación artificial", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const artificialInsemination = await getArtificialInseminationById(id)
        var response = new Response(`Inseminación artificial ${id} obtenida exitosamente`, artificialInsemination, null);
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
        const { idBovine, inseminationDate, semenID, donorBull, raze, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!idBovine || idBovine.toString().trim() === "" || isNaN(idBovine)) {
            errors.push("La identificación del bovino es obligatoria y debe ser un número");
        }
        if (!inseminationDate || inseminationDate.trim() === "") {
            errors.push("La fecha de inseminación es obligatoria");
        }
        if (!semenID || semenID.trim() === "") {
            errors.push("El código o lote de la pajilla es obligatorio");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable de la inseminación es obligatorio");
        }
        if (!raze || raze.trim() === "") {
            errors.push("La raza de la pajilla es obligatoria");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear la inseminación artificial", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, inseminationDate, semenID, donorBull, raze, observations, idResponsible }
        const artificialInsemination = await artificialInseminationCreate(data)
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
        const { id } = req.params;
        const { idBovine, inseminationDate, semenID, donorBull, raze, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID de la inseminación artificial es obligatorio");
        }
        if (!idBovine || idBovine.toString().trim() === "" || isNaN(idBovine)) {
            errors.push("La identificación del bovino es obligatoria y debe ser un número");
        }
        if (!inseminationDate || inseminationDate.trim() === "") {
            errors.push("La fecha de inseminación es obligatoria");
        }
        if (!semenID || semenID.trim() === "") {
            errors.push("El código o lote de la pajilla es obligatorio");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable de la inseminación es obligatorio");
        }
        if (!raze || raze.trim() === "") {
            errors.push("La raza de la pajilla es obligatoria");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar la inseminación artificial", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, inseminationDate, semenID, donorBull, raze, observations, idResponsible }
        const artificialInsemination = await artificialInseminationUpdate(id, data)
        var response = new Response(`Inseminación artificial ${id} actualizada exitosamente`, artificialInsemination, null);
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
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID de la inseminación artificial es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar la inseminación artificial", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const artificialInsemination = await artificialInseminationDelete(id)
        var response = new Response(`Inseminación artificial ${id} eliminada exitosamente`, { id }, null);
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