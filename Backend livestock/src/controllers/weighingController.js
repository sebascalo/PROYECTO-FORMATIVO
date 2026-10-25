const { weighingCreate, weighingUpdate, weighingDelete, getWeighingById, weighingsGetAll } = require("../services/weighingService");
const Response = require("../functions/response");
const Cattle = require("../models/cattleModel"); 

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
        const { id_Bovine, weighingdate, currentweight, profitorloss, bodycondition, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El identificador del bovino es obligatoria");
        if (!weighingdate || String(weighingdate).trim() === "") errors.push("La fecha del pesaje es obligatoria");
        if (!currentweight || String(currentweight).trim() === "" || isNaN(currentweight)) errors.push("El peso actual es obligatorio y debe ser un número");
        
        if (bodycondition && String(bodycondition).trim() !== "" && !["1 - Flaco", "2 - Delgado", "3 - Ideal", "4 - Gordo", "5 - Obeso"].includes(bodycondition)) {
            errors.push("La condición corporal no es válida");
        }
        
        if (observations && observations.length > 255) errors.push("Las observaciones no pueden exceder los 255 caracteres");
        if (idResponsible && String(idResponsible).trim() === "") errors.push("El responsable no puede estar vacío");

        if (errors.length > 0) {
            var response = new Response("Error al crear el pesaje", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        // 👇 Forzamos active: true por defecto al crear
        const data = { 
            id_Bovine, 
            weighingdate, 
            currentweight, 
            profitorloss, 
            bodycondition, 
            observations, 
            idResponsible,
            active: true 
        };
        
        const weighing = await weighingCreate(data)

        // Actualizar el peso del bovino en la tabla 'cattles'
        if (id_Bovine && currentweight) {
            await Cattle.update(
                { currentweight: currentweight },
                { where: { id_Bovine: id_Bovine } }
            );
        }

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
        const { id_Bovine, weighingdate, currentweight, profitorloss, bodycondition, observations, idResponsible, active } = req.body;
        var errors = [];
        
        if (!id_weighing) errors.push("El ID del pesaje es obligatorio");
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("La identificación del bovino es obligatoria");
        if (!weighingdate || String(weighingdate).trim() === "") errors.push("La fecha del pesaje es obligatoria");
        if (!currentweight || String(currentweight).trim() === "" || isNaN(currentweight)) errors.push("El peso actual es obligatorio y debe ser un número");
        
        if (bodycondition && String(bodycondition).trim() !== "" && !["1 - Flaco", "2 - Delgado", "3 - Ideal", "4 - Gordo", "5 - Obeso"].includes(bodycondition)) {
            errors.push("La condición corporal no es válida");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el pesaje", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        // Si active no viene, mantenemos el que ya tenía en la base de datos
        const data = { 
            id_Bovine, 
            weighingdate, 
            currentweight, 
            profitorloss, 
            bodycondition, 
            observations, 
            idResponsible,
            ...(active !== undefined && { active }) // 👈 Solo actualiza si envían el campo
        };
        
        const weighing = await weighingUpdate(id_weighing, data)

        if (id_Bovine && currentweight) {
            await Cattle.update(
                { currentweight: currentweight },
                { where: { id_Bovine: id_Bovine } }
            );
        }

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
        if (!id_weighing) errors.push("El ID del pesaje es obligatorio");
        if (errors.length > 0) return res.status(400).json(new Response("Error al eliminar el pesaje", null, errors).json);
        
        const weighing = await weighingDelete(id_weighing)
        var response = new Response(`Pesaje ${id_weighing} eliminado exitosamente`, { id_weighing }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteWeighing:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
}

module.exports = {
    getAllWeighings,
    getAllWeighingsById,
    createWeighing,
    updateWeighing,
    deleteWeighing
};