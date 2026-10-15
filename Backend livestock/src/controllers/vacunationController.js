const { 
    vacunationCreate, 
    vacunationUpdate, 
    vacunationDelete, 
    getVacunationById, 
    vacunationsGetAll 
} = require("../services/vacunationService");
const Response = require("../functions/response");

// Obtener todos los registros de vacunaciones
const getAllVacunations = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const vacunations = await vacunationsGetAll(limit, offset);
        const response = new Response("Registros de vacunaciones obtenidos exitosamente", vacunations, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllVacunations:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Obtener una vacunación por ID
const getAllVacunationsById = async (req, res) => {
    try {
        const { id_vacunation } = req.params;
        var errors = [];
        
        if (!id_vacunation) {
            errors.push("El ID de la vacunación es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al obtener la vacunación", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        const vacunation = await getVacunationById(id_vacunation);
        var response = new Response(`Vacunación ${id_vacunation} obtenida exitosamente`, vacunation, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllVacunationsById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Crear una nueva vacunación
const createVacunation = async (req, res) => {
    try {
        console.log("📥 [BACK] Body recibido:", req.body);
        const { 
            id_Bovine, 
            vaccination_date, 
            applied_dose, 
            vaccine_lot,
            medicine_name,
            idResponsible, 
            observations 
        } = req.body;
        
        var errors = [];

        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("El identificador del bovino es obligatorio");
        }
        if (!vaccination_date || String(vaccination_date).trim() === "") {
            errors.push("La fecha de vacunación es obligatoria");
        }
        if (!applied_dose || String(applied_dose).trim() === "") {
            errors.push("La dosis aplicada es obligatoria");
        }
        if (!vaccine_lot || String(vaccine_lot).trim() === "") {
            errors.push("El lote de la vacuna es obligatorio");
        }
        if (!medicine_name || String(medicine_name).trim() === "") {
            errors.push("El nombre del medicamento es obligatorio");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (observations && observations.length > 255) {
            errors.push("Las observaciones no pueden exceder los 255 caracteres");
        }
        if (medicine_name && medicine_name.length > 100) {
            errors.push("El nombre del medicamento no puede exceder los 100 caracteres");
        }
        if (vaccine_lot && vaccine_lot.length > 50) {
            errors.push("El lote de la vacuna no puede exceder los 50 caracteres");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear la vacunación", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = { 
            id_Bovine, 
            vaccination_date, 
            applied_dose, 
            vaccine_lot,
            medicine_name,
            idResponsible, 
            observations 
        };
        console.log("📥 [BACK] data a guardar:", data);
        
        const vacunation = await vacunationCreate(data);
        var response = new Response("Vacunación creada exitosamente", vacunation, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createVacunation:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Actualizar una vacunación
const updateVacunation = async (req, res) => {
    try {
        const { id_vacunation } = req.params;
        const { 
            id_Bovine, 
            vaccination_date, 
            applied_dose, 
            vaccine_lot,
            medicine_name,
            idResponsible, 
            observations 
        } = req.body;
        
        var errors = [];

        if (!id_vacunation) {
            errors.push("El ID de la vacunación es obligatorio");
        }
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("El identificador del bovino es obligatorio");
        }
        if (!vaccination_date || String(vaccination_date).trim() === "") {
            errors.push("La fecha de vacunación es obligatoria");
        }
        if (!applied_dose || String(applied_dose).trim() === "") {
            errors.push("La dosis aplicada es obligatoria");
        }
        if (!vaccine_lot || String(vaccine_lot).trim() === "") {
            errors.push("El lote de la vacuna es obligatorio");
        }
        if (!medicine_name || String(medicine_name).trim() === "") {
            errors.push("El nombre del medicamento es obligatorio");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (observations && observations.length > 255) {
            errors.push("Las observaciones no pueden exceder los 255 caracteres");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar la vacunación", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = { 
            id_Bovine, 
            vaccination_date, 
            applied_dose, 
            vaccine_lot,
            medicine_name,
            idResponsible, 
            observations 
        };
        
        const vacunation = await vacunationUpdate(id_vacunation, data);
        var response = new Response(`Vacunación ${id_vacunation} actualizada exitosamente`, vacunation, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateVacunation:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Eliminar una vacunación
const deleteVacunation = async (req, res) => {
    try {
        const { id_vacunation } = req.params;
        var errors = [];
        
        if (!id_vacunation) {
            errors.push("El ID de la vacunación es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al eliminar la vacunación", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        await vacunationDelete(id_vacunation);
        var response = new Response(`Vacunación ${id_vacunation} eliminada exitosamente`, { id_vacunation }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteVacunation:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getAllVacunations,
    getAllVacunationsById,
    createVacunation,
    updateVacunation,
    deleteVacunation
};