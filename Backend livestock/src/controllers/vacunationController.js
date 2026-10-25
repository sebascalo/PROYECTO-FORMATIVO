const { 
    vacunationCreate, 
    vacunationUpdate, 
    vacunationDelete, 
    getVacunationById, 
    vacunationsGetAll 
} = require("../services/vacunationService");
const Response = require("../functions/response");

const getAllVacunations = async (req, res) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const offset = req.query.offset ? Number(req.query.offset) : 0; 
        const vacunations = await vacunationsGetAll(limit, offset);
        res.status(200).json(new Response("Registros de vacunaciones obtenidos exitosamente", vacunations, null).json);
    } catch (error) {
        console.error("Error en getAllVacunations:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
};

const getAllVacunationsById = async (req, res) => {
    try {
        const { id_vacunation } = req.params;
        if (!id_vacunation) return res.status(400).json(new Response("Error", null, ["El ID es obligatorio"]).json);
        
        const vacunation = await getVacunationById(id_vacunation);
        res.status(200).json(new Response(`Vacunación ${id_vacunation} obtenida exitosamente`, vacunation, null).json);
    } catch (error) {
        console.error("Error en getAllVacunationsById:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const createVacunation = async (req, res) => {
    try {
        const { id_Bovine, vaccination_date, applied_dose, vaccine_lot, medicine_name, idResponsible, observations } = req.body;
        var errors = [];

        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El identificador del bovino es obligatorio");
        if (!vaccination_date || String(vaccination_date).trim() === "") errors.push("La fecha de vacunación es obligatoria");
        if (!applied_dose || String(applied_dose).trim() === "") errors.push("La dosis aplicada es obligatoria");
        if (!vaccine_lot || String(vaccine_lot).trim() === "") errors.push("El lote de la vacuna es obligatorio");
        if (!medicine_name || String(medicine_name).trim() === "") errors.push("El nombre del medicamento es obligatorio");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");
        
        if (observations && observations.length > 255) errors.push("Las observaciones no pueden exceder los 255 caracteres");
        if (medicine_name && medicine_name.length > 100) errors.push("El nombre del medicamento no puede exceder los 100 caracteres");
        if (vaccine_lot && vaccine_lot.length > 50) errors.push("El lote de la vacuna no puede exceder los 50 caracteres");

        if (errors.length > 0) return res.status(400).json(new Response("Error al crear la vacunación", null, errors).json);

        // 👇 Forzamos active: true por defecto
        const data = { 
            id_Bovine, 
            vaccination_date, 
            applied_dose, 
            vaccine_lot,
            medicine_name,
            idResponsible, 
            observations,
            active: true 
        };
        
        const vacunation = await vacunationCreate(data);
        res.status(201).json(new Response("Vacunación creada exitosamente", vacunation, null).json);
    } catch (error) {
        console.error("Error en createVacunation:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const updateVacunation = async (req, res) => {
    try {
        const { id_vacunation } = req.params;
        const { id_Bovine, vaccination_date, applied_dose, vaccine_lot, medicine_name, idResponsible, observations, active } = req.body;
        var errors = [];

        if (!id_vacunation) errors.push("El ID de la vacunación es obligatorio");
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El identificador del bovino es obligatorio");
        if (!vaccination_date || String(vaccination_date).trim() === "") errors.push("La fecha de vacunación es obligatoria");
        if (!applied_dose || String(applied_dose).trim() === "") errors.push("La dosis aplicada es obligatoria");
        if (!vaccine_lot || String(vaccine_lot).trim() === "") errors.push("El lote de la vacuna es obligatorio");
        if (!medicine_name || String(medicine_name).trim() === "") errors.push("El nombre del medicamento es obligatorio");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");

        if (errors.length > 0) return res.status(400).json(new Response("Error al actualizar la vacunación", null, errors).json);

        // 👇 Actualizamos active solo si viene
        const data = { 
            id_Bovine, 
            vaccination_date, 
            applied_dose, 
            vaccine_lot,
            medicine_name,
            idResponsible, 
            observations,
            ...(active !== undefined && { active })
        };
        
        const vacunation = await vacunationUpdate(id_vacunation, data);
        res.status(200).json(new Response(`Vacunación ${id_vacunation} actualizada exitosamente`, vacunation, null).json);
    } catch (error) {
        console.error("Error en updateVacunation:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const deleteVacunation = async (req, res) => {
    try {
        const { id_vacunation } = req.params;
        if (!id_vacunation) return res.status(400).json(new Response("Error al eliminar la vacunación", null, ["El ID es obligatorio"]).json);
        
        await vacunationDelete(id_vacunation);
        res.status(200).json(new Response(`Vacunación ${id_vacunation} eliminada exitosamente`, { id_vacunation }, null).json);
    } catch (error) {
        console.error("Error en deleteVacunation:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

module.exports = {
    getAllVacunations,
    getAllVacunationsById,
    createVacunation,
    updateVacunation,
    deleteVacunation
};