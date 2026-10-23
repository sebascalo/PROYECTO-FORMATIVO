const { treatmentCreate, treatmentUpdate, treatmentDelete, getTreatmentById, treatmentsGetAll } = require("../services/treatmentService");
const Response = require("../functions/response");

const getAllTreatments = async (req, res) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const offset = req.query.offset ? Number(req.query.offset) : 0; 

        const treatments = await treatmentsGetAll(limit, offset);
        res.status(200).json(new Response("Registros de tratamientos obtenidos exitosamente", treatments, null).json);
    } catch (error) {
        console.error("Error en getAllTreatments:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
};

const getAllTreatmentsById = async (req, res) => {
    try {
        const { id_treatment } = req.params;
        if (!id_treatment) return res.status(400).json(new Response("Error al obtener el tratamiento", null, ["El ID es obligatorio"]).json);
        
        const treatment = await getTreatmentById(id_treatment);
        res.status(200).json(new Response(`Tratamiento ${id_treatment} obtenido exitosamente`, treatment, null).json);
    } catch (error) {
        console.error("Error en getAllTreatmentsById:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const createTreatment = async (req, res) => {
    try {
        // 👇 Agregamos vaccine_lot y withdrawal_time
        const { id_Bovine, treatment_date, medication_used, vaccine_lot, applied_dose, application_route, associated_diagnosis, treatment_duration, withdrawal_time, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("La identificación del bovino es obligatoria");
        if (!treatment_date || String(treatment_date).trim() === "") errors.push("La fecha del tratamiento es obligatoria");
        if (!medication_used || String(medication_used).trim() === "") errors.push("El medicamento utilizado es obligatorio");
        if (!applied_dose || String(applied_dose).trim() === "") errors.push("La dosis aplicada es obligatoria");
        if (!application_route || String(application_route).trim() === "") errors.push("La vía de administración es obligatoria");
        if (!associated_diagnosis || String(associated_diagnosis).trim() === "") errors.push("El diagnóstico asociado es obligatorio");
        if (!treatment_duration || String(treatment_duration).trim() === "") errors.push("La duración del tratamiento es obligatoria");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable del tratamiento es obligatorio");

        if (errors.length > 0) return res.status(400).json(new Response("Error al crear el tratamiento", null, errors).json);
        
        const data = { id_Bovine, treatment_date, medication_used, vaccine_lot, applied_dose, application_route, associated_diagnosis, treatment_duration, withdrawal_time, observations, idResponsible };
        const treatment = await treatmentCreate(data);
        res.status(201).json(new Response("Tratamiento creado exitosamente", treatment, null).json);
    } catch (error) {
        console.error("Error en createTreatment:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const updateTreatment = async (req, res) => {
    try {
        const { id_treatment } = req.params;
        const { id_Bovine, treatment_date, medication_used, vaccine_lot, applied_dose, application_route, associated_diagnosis, treatment_duration, withdrawal_time, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_treatment) errors.push("El ID del tratamiento es obligatorio");
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("La identificación del bovino es obligatoria");
        if (!treatment_date || String(treatment_date).trim() === "") errors.push("La fecha del tratamiento es obligatoria");
        if (!medication_used || String(medication_used).trim() === "") errors.push("El medicamento utilizado es obligatorio");
        if (!applied_dose || String(applied_dose).trim() === "") errors.push("La dosis aplicada es obligatoria");
        if (!application_route || String(application_route).trim() === "") errors.push("La vía de administración es obligatoria");
        if (!associated_diagnosis || String(associated_diagnosis).trim() === "") errors.push("El diagnóstico asociado es obligatorio");
        if (!treatment_duration || String(treatment_duration).trim() === "") errors.push("La duración del tratamiento es obligatoria");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable del tratamiento es obligatorio");

        if (errors.length > 0) return res.status(400).json(new Response("Error al actualizar el tratamiento", null, errors).json);
        
        const data = { id_Bovine, treatment_date, medication_used, vaccine_lot, applied_dose, application_route, associated_diagnosis, treatment_duration, withdrawal_time, observations, idResponsible };
        const treatment = await treatmentUpdate(id_treatment, data);
        res.status(200).json(new Response(`Tratamiento ${id_treatment} actualizado exitosamente`, treatment, null).json);
    } catch (error) {
        console.error("Error en updateTreatment:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const deleteTreatment = async (req, res) => {
    try {
        const { id_treatment } = req.params;
        if (!id_treatment) return res.status(400).json(new Response("Error al eliminar el tratamiento", null, ["El ID es obligatorio"]).json);
        
        await treatmentDelete(id_treatment);
        res.status(200).json(new Response(`Tratamiento ${id_treatment} eliminado exitosamente`, { id_treatment }, null).json);
    } catch (error) {
        console.error("Error en deleteTreatment:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

module.exports = { getAllTreatments, getAllTreatmentsById, createTreatment, updateTreatment, deleteTreatment };