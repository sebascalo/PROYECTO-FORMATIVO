const { treatmentCreate, treatmentUpdate, treatmentDelete, getTreatmentById, treatmentsGetAll } = require("../services/treatmentService");
const Response = require("../functions/response");

// Obtener todos los registros de tratamientos
const getAllTreatments = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const treatments = await treatmentsGetAll(limit, offset);
        const response = new Response("Registros de tratamientos obtenidos exitosamente", treatments, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllTreatments:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllTreatmentsById = async (req, res) => {
    try {
        const { id_treatment } = req.params;
        var errors = [];
        if (!id_treatment) {
            errors.push("El ID del tratamiento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el tratamiento", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const treatment = await getTreatmentById(id_treatment);
        var response = new Response(`Tratamiento ${id_treatment} obtenido exitosamente`, treatment, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllTreatmentsById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createTreatment = async (req, res) => {
    try {
        console.log("📥 [BACK] Body recibido:", req.body);
        const { id_Bovine, treatment_date, medication_used, applied_dose, application_route, associated_diagnosis, treatment_duration, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!treatment_date || String(treatment_date).trim() === "") {
            errors.push("La fecha del tratamiento es obligatoria");
        }
        if (!medication_used || String(medication_used).trim() === "") {
            errors.push("El medicamento utilizado es obligatorio");
        }
        if (!applied_dose || String(applied_dose).trim() === "") {
            errors.push("La dosis aplicada es obligatoria");
        }
        if (!application_route || String(application_route).trim() === "") {
            errors.push("La vía de administración es obligatoria");
        }
        if (!associated_diagnosis || String(associated_diagnosis).trim() === "") {
            errors.push("El diagnóstico asociado es obligatorio");
        }
        if (!treatment_duration || String(treatment_duration).trim() === "") {
            errors.push("La duración del tratamiento es obligatoria");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable del tratamiento es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el tratamiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = { id_Bovine, treatment_date, medication_used, applied_dose, application_route, associated_diagnosis, treatment_duration, observations, idResponsible };
        console.log("📥 [BACK] data a guardar:", data);
        const treatment = await treatmentCreate(data);
        var response = new Response("Tratamiento creado exitosamente", treatment, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createTreatment:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateTreatment = async (req, res) => {
    try {
        const { id_treatment } = req.params;
        const { id_Bovine, treatment_date, medication_used, applied_dose, application_route, associated_diagnosis, treatment_duration, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_treatment) {
            errors.push("El ID del tratamiento es obligatorio");
        }
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!treatment_date || String(treatment_date).trim() === "") {
            errors.push("La fecha del tratamiento es obligatoria");
        }
        if (!medication_used || String(medication_used).trim() === "") {
            errors.push("El medicamento utilizado es obligatorio");
        }
        if (!applied_dose || String(applied_dose).trim() === "") {
            errors.push("La dosis aplicada es obligatoria");
        }
        if (!application_route || String(application_route).trim() === "") {
            errors.push("La vía de administración es obligatoria");
        }
        if (!associated_diagnosis || String(associated_diagnosis).trim() === "") {
            errors.push("El diagnóstico asociado es obligatorio");
        }
        if (!treatment_duration || String(treatment_duration).trim() === "") {
            errors.push("La duración del tratamiento es obligatoria");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable del tratamiento es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el tratamiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = { id_Bovine, treatment_date, medication_used, applied_dose, application_route, associated_diagnosis, treatment_duration, observations, idResponsible };
        const treatment = await treatmentUpdate(id_treatment, data);
        var response = new Response(`Tratamiento ${id_treatment} actualizado exitosamente`, treatment, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateTreatment:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteTreatment = async (req, res) => {
    try {
        const { id_treatment } = req.params;
        var errors = [];
        if (!id_treatment) {
            errors.push("El ID del tratamiento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el tratamiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const treatment = await treatmentDelete(id_treatment);
        var response = new Response(`Tratamiento ${id_treatment} eliminado exitosamente`, { id_treatment }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteTreatment:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllTreatments,
    getAllTreatmentsById,
    createTreatment,
    updateTreatment,
    deleteTreatment
};