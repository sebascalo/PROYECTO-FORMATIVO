const { mortalityCreate, mortalityUpdate, mortalityDelete, getMortalityById, mortalitiesGetAll } = require("../services/mortalityService");
const Response = require("../functions/response");

const getAllMortalities = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const mortalities = await mortalitiesGetAll(limit, offset);
        const response = new Response("Registros de salidas obtenidos exitosamente", mortalities, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllMortalities:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
};

const getAllMortalitiesById = async (req, res) => {
    try {
        const { id_mortality } = req.params;
        if (!id_mortality) {
            return res.status(400).json(new Response("Error al obtener la salida", null, ["El ID es obligatorio"]).json);
        }
        const exit = await getMortalityById(id_mortality);
        res.status(200).json(new Response(`Salida ${id_mortality} obtenida exitosamente`, exit, null).json);
    } catch (error) {
        console.error("Error en getAllMortalitiesById:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
}

const createMortality = async (req, res) => {
    try {
        // 👈 Recibimos id_Bovine
        const { id_Bovine, dateofExit, exitReason, idResponsible, observations } = req.body;
        var errors = [];
        
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El bovino es obligatorio");
        if (!dateofExit || String(dateofExit).trim() === "") errors.push("La fecha de salida es obligatoria");
        if (!exitReason || String(exitReason).trim() === "") errors.push("El motivo de salida es obligatorio");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");
        if (observations && observations.length > 255) errors.push("Las observaciones no pueden exceder los 255 caracteres");

        if (errors.length > 0) {
            return res.status(400).json(new Response("Error al crear la salida", null, errors).json);
        }
        
        const data = { id_Bovine, dateofExit, exitReason, idResponsible, observations };
        const exit = await mortalityCreate(data);
        res.status(201).json(new Response("Salida creada exitosamente", exit, null).json);
    } catch (error) {
        console.error("Error en createMortality:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
}

const updateMortality = async (req, res) => {
    try {
        const { id_mortality } = req.params;
        const { id_Bovine, dateofExit, exitReason, idResponsible, observations } = req.body;
        var errors = [];
        
        if (!id_mortality) errors.push("El ID es obligatorio");
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El bovino es obligatorio");
        if (!dateofExit || String(dateofExit).trim() === "") errors.push("La fecha de salida es obligatoria");
        if (!exitReason || String(exitReason).trim() === "") errors.push("El motivo de salida es obligatorio");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");

        if (errors.length > 0) {
            return res.status(400).json(new Response("Error al actualizar la salida", null, errors).json);
        }
        
        const data = { id_Bovine, dateofExit, exitReason, idResponsible, observations };
        const exit = await mortalityUpdate(id_mortality, data);
        res.status(200).json(new Response(`Salida ${id_mortality} actualizada exitosamente`, exit, null).json);
    } catch (error) {
        console.error("Error en updateMortality:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
}

const deleteMortality = async (req, res) => {
    try {
        const { id_mortality } = req.params;
        if (!id_mortality) return res.status(400).json(new Response("Error al eliminar la salida", null, ["El ID es obligatorio"]).json);
        
        await mortalityDelete(id_mortality);
        res.status(200).json(new Response(`Salida ${id_mortality} eliminada exitosamente`, { id_mortality }, null).json);
    } catch (error) {
        console.error("Error en deleteMortality:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
}

module.exports = {
    getAllMortalities,
    getAllMortalitiesById,
    createMortality,
    updateMortality,
    deleteMortality
};