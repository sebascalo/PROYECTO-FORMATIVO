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
        const vacunations = await vacunationsGetAll();
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
        const { id } = req.params;
        var errors = [];
        
        if (!id) {
            errors.push("El ID de la vacunación es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al obtener la vacunación", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        const vacunation = await getVacunationById(id);
        var response = new Response(`Vacunación ${id} obtenida exitosamente`, vacunation, null);
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
        const { 
            idBovine, 
            vaccination_date, 
            applied_dose, 
            application_site, 
            application_condition, 
            idResponsible, 
            observations 
        } = req.body;
        
        var errors = [];

        // Validaciones
        if (!idBovine || idBovine.trim() === "") {
            errors.push("El identificador del bovino es obligatorio");
        }
        if (!vaccination_date || vaccination_date.trim() === "") {
            errors.push("La fecha de vacunación es obligatoria");
        }
        if (!applied_dose || applied_dose.trim() === "") {
            errors.push("La dosis aplicada es obligatoria");
        }
        if (!application_site || application_site.trim() === "") {
            errors.push("El lugar de aplicación es obligatorio");
        }
        if (!application_condition || application_condition.trim() === "") {
            errors.push("La condición de aplicación es obligatoria");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (observations && observations.length > 255) {
            errors.push("Las observaciones no pueden exceder los 255 caracteres");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear la vacunación", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = { 
            idBovine, 
            vaccination_date, 
            applied_dose, 
            application_site, 
            application_condition, 
            idResponsible, 
            observations 
        };
        
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
        const { id } = req.params;
        const { 
            idBovine, 
            vaccination_date, 
            applied_dose, 
            application_site, 
            application_condition, 
            idResponsible, 
            observations 
        } = req.body;
        
        var errors = [];

        // Validaciones
        if (!id) {
            errors.push("El ID de la vacunación es obligatorio");
        }
        if (!idBovine || idBovine.trim() === "") {
            errors.push("El identificador del bovino es obligatorio");
        }
        if (!vaccination_date || vaccination_date.trim() === "") {
            errors.push("La fecha de vacunación es obligatoria");
        }
        if (!applied_dose || applied_dose.trim() === "") {
            errors.push("La dosis aplicada es obligatoria");
        }
        if (!application_site || application_site.trim() === "") {
            errors.push("El lugar de aplicación es obligatorio");
        }
        if (!application_condition || application_condition.trim() === "") {
            errors.push("La condición de aplicación es obligatoria");
        }
        if (!idResponsible || idResponsible.trim() === "") {
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
            idBovine, 
            vaccination_date, 
            applied_dose, 
            application_site, 
            application_condition, 
            idResponsible, 
            observations 
        };
        
        const vacunation = await vacunationUpdate(id, data);
        var response = new Response(`Vacunación ${id} actualizada exitosamente`, vacunation, null);
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
        const { id } = req.params;
        var errors = [];
        
        if (!id) {
            errors.push("El ID de la vacunación es obligatorio");
        }
        
        if (errors.length > 0) {
            var response = new Response("Error al eliminar la vacunación", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        await vacunationDelete(id);
        var response = new Response(`Vacunación ${id} eliminada exitosamente`, { id }, null);
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