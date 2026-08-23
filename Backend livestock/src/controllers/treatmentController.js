const { treatmentCreate, treatmentUpdate, treatmentDelete, getTreatmentById, treatmentsGetAll } = require("../services/treatmentService");
const Response = require("../functions/response");

// Obtener todos los registros de tratamientos
const getAllTreatments = async (req, res) => {
    try {
        const treatments = await treatmentsGetAll();
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
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del tratamiento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el tratamiento", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const treatment = await getTreatmentById(id)
        var response = new Response(`Tratamiento ${id} obtenido exitosamente`, treatment, null);
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
        const { idBovine, treatment_date, medication_used, applied_dose, application_route, associated_diagnosis, treatment_duration, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!idBovine || idBovine.trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!treatment_date || treatment_date.trim() === "") {
            errors.push("La fecha del tratamiento es obligatoria");
        }
        if (!medication_used || medication_used.trim() === "") {
            errors.push("El medicamento utilizado es obligatorio");
        }
        if (!applied_dose || applied_dose.trim() === "") {
            errors.push("La dosis aplicada es obligatoria");
        }
        if (!application_route || application_route.trim() === "") {
            errors.push("La vía de administración es obligatoria");
        }
        if (!associated_diagnosis || associated_diagnosis.trim() === "") {
            errors.push("El diagnóstico asociado es obligatorio");
        }
        if (!treatment_duration || treatment_duration.trim() === "") {
            errors.push("La duración del tratamiento es obligatoria");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable del tratamiento es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el tratamiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, treatment_date, medication_used, applied_dose, application_route, associated_diagnosis, treatment_duration, observations, idResponsible }
        const treatment = await treatmentCreate(data)
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
        const { id } = req.params;
        const { idBovine, treatment_date, medication_used, applied_dose, application_route, associated_diagnosis, treatment_duration, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID del tratamiento es obligatorio");
        }
        if (!idBovine || idBovine.trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!treatment_date || treatment_date.trim() === "") {
            errors.push("La fecha del tratamiento es obligatoria");
        }
        if (!medication_used || medication_used.trim() === "") {
            errors.push("El medicamento utilizado es obligatorio");
        }
        if (!applied_dose || applied_dose.trim() === "") {
            errors.push("La dosis aplicada es obligatoria");
        }
        if (!application_route || application_route.trim() === "") {
            errors.push("La vía de administración es obligatoria");
        }
        if (!associated_diagnosis || associated_diagnosis.trim() === "") {
            errors.push("El diagnóstico asociado es obligatorio");
        }
        if (!treatment_duration || treatment_duration.trim() === "") {
            errors.push("La duración del tratamiento es obligatoria");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable del tratamiento es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el tratamiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, treatment_date, medication_used, applied_dose, application_route, associated_diagnosis, treatment_duration, observations, idResponsible }
        const treatment = await treatmentUpdate(id, data)
        var response = new Response(`Tratamiento ${id} actualizado exitosamente`, treatment, null);
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
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del tratamiento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el tratamiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const treatment = await treatmentDelete(id)
        var response = new Response(`Tratamiento ${id} eliminado exitosamente`, { id }, null);
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