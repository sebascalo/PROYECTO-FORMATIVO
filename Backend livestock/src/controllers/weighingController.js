const { weighingCreate, weighingUpdate, weighingDelete, getWeighingById, weighingsGetAll } = require("../services/weighingService");
const Response = require("../functions/response");

// Obtener todos los registros de pesajes
const getAllWeighings = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const weighings = await weighingsGetAll(limit, offset);
        const response = new Response("Registros de pesajes obtenidos exitosamente", weighings, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllWeighings:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllWeighingsById = async (req, res) => {
    try {
        const { id_weighing } = req.params;
        var errors = [];
        if (!id_weighing) {
            errors.push("El ID del pesaje es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el pesaje", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const weighing = await getWeighingById(id_weighing);
        var response = new Response(`Pesaje ${id_weighing} obtenido exitosamente`, weighing, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllWeighingsById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createWeighing = async (req, res) => {
    try {
        console.log("📥 [BACK] Body recibido:", req.body);
        const { id_Bovine, weighingdate, currentweight, profitorloss, bodycondition, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("El identificador del bovino es obligatoria");
        }
        if (!weighingdate || String(weighingdate).trim() === "") {
            errors.push("La fecha del pesaje es obligatoria");
        }
        if (!currentweight || String(currentweight).trim() === "" || isNaN(currentweight)) {
            errors.push("El peso actual es obligatorio y debe ser un número");
        }
        if (profitorloss && String(profitorloss).trim() !== "" && isNaN(profitorloss)) {
            errors.push("La ganancia/pérdida debe ser un número");
        }
        if (bodycondition && String(bodycondition).trim() !== "" && !["Delgado", "Normal", "Gordo"].includes(bodycondition)) {
            errors.push("La condición corporal debe ser: Delgado, Normal o Gordo");
        }
        if (observations && observations.length > 255) {
            errors.push("Las observaciones no pueden exceder los 255 caracteres");
        }
        if (idResponsible && String(idResponsible).trim() === "") {
            errors.push("El responsable no puede estar vacío");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el pesaje", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = { id_Bovine, weighingdate, currentweight, profitorloss, bodycondition, observations, idResponsible }
        console.log("📥 [BACK] data a guardar:", data);
        const weighing = await weighingCreate(data)
        var response = new Response("Pesaje creado exitosamente", weighing, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createWeighing:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateWeighing = async (req, res) => {
    try {
        const { id_weighing } = req.params;
        const { id_Bovine, weighingdate, currentweight, profitorloss, bodycondition, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_weighing) {
            errors.push("El ID del pesaje es obligatorio");
        }
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!weighingdate || String(weighingdate).trim() === "") {
            errors.push("La fecha del pesaje es obligatoria");
        }
        if (!currentweight || String(currentweight).trim() === "" || isNaN(currentweight)) {
            errors.push("El peso actual es obligatorio y debe ser un número");
        }
        if (profitorloss && String(profitorloss).trim() !== "" && isNaN(profitorloss)) {
            errors.push("La ganancia/pérdida debe ser un número");
        }
        if (bodycondition && String(bodycondition).trim() !== "" && !["Delgado", "Normal", "Gordo"].includes(bodycondition)) {
            errors.push("La condición corporal debe ser: Delgado, Normal o Gordo");
        }
        if (observations && observations.length > 255) {
            errors.push("Las observaciones no pueden exceder los 255 caracteres");
        }
        if (idResponsible && String(idResponsible).trim() === "") {
            errors.push("El responsable no puede estar vacío");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el pesaje", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = { id_Bovine, weighingdate, currentweight, profitorloss, bodycondition, observations, idResponsible }
        const weighing = await weighingUpdate(id_weighing, data)
        var response = new Response(`Pesaje ${id_weighing} actualizado exitosamente`, weighing, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateWeighing:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteWeighing = async (req, res) => {
    try {
        const { id_weighing } = req.params;
        var errors = [];
        if (!id_weighing) {
            errors.push("El ID del pesaje es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el pesaje", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const weighing = await weighingDelete(id_weighing)
        var response = new Response(`Pesaje ${id_weighing} eliminado exitosamente`, { id_weighing }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteWeighing:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllWeighings,
    getAllWeighingsById,
    createWeighing,
    updateWeighing,
    deleteWeighing
};