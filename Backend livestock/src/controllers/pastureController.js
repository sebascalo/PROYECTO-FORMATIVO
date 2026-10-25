const { pastureCreate, pastureUpdate, pastureDelete, getPastureById, pasturesGetAll } = require("../services/pastureService");
const Response = require("../functions/response");

const getAllPastures = async (req, res) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const offset = req.query.offset ? Number(req.query.offset) : 0; 
        const pastures = await pasturesGetAll(limit, offset);
        res.status(200).json(new Response("Registros de potreros obtenidos exitosamente", pastures, null).json);
    } catch (error) {
        console.error("Error en getAllPastures:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const getAllPasturesById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json(new Response("Error", null, ["El ID es obligatorio"]).json);
        const pasture = await getPastureById(id);
        res.status(200).json(new Response(`Potrero ${id} obtenido exitosamente`, pasture, null).json);
    } catch (error) {
        console.error("Error en getAllPasturesById:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const createPasture = async (req, res) => {
    try {
        const { name, extension, forageCapacity, pastureType, cattleEntryDate, cattleExitDate, currentStatus, observations } = req.body;
        var errors = [];
        
        if (!name || name.trim() === "") errors.push("El nombre del potrero es obligatorio");
        if (!extension || extension.toString().trim() === "" || isNaN(extension)) errors.push("El tamaño es obligatorio y debe ser un número");
        if (!forageCapacity || forageCapacity.toString().trim() === "" || isNaN(forageCapacity)) errors.push("El aforo es obligatorio y debe ser un número");
        if (!pastureType || pastureType.trim() === "") errors.push("El tipo de pastura es obligatorio");
        if (!currentStatus || currentStatus.trim() === "") errors.push("El estado actual es obligatorio");
        
        if (errors.length > 0) return res.status(400).json(new Response("Error al crear el potrero", null, errors).json);

        // 👇 Forzamos active: true por defecto
        const data = { 
            name, 
            extension, 
            forageCapacity, 
            pastureType, 
            cattleEntryDate, 
            cattleExitDate, 
            currentStatus, 
            observations,
            active: true 
        };
        
        const pasture = await pastureCreate(data);
        res.status(201).json(new Response("Potrero creado exitosamente", pasture, null).json);
    } catch (error) {
        console.error("Error en createPasture:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const updatePasture = async (req, res) => {
    try {
        const { id } = req.params;
        // 👇 Recibimos active
        const { name, extension, forageCapacity, pastureType, cattleEntryDate, cattleExitDate, currentStatus, observations, active } = req.body;
        var errors = [];
        
        if (!id) errors.push("El ID del potrero es obligatorio");
        if (!name || name.trim() === "") errors.push("El nombre del potrero es obligatorio");
        if (!extension || extension.toString().trim() === "" || isNaN(extension)) errors.push("El tamaño es obligatorio");
        if (!forageCapacity || forageCapacity.toString().trim() === "" || isNaN(forageCapacity)) errors.push("El aforo es obligatorio");
        if (!pastureType || pastureType.trim() === "") errors.push("El tipo de pastura es obligatorio");
        if (!currentStatus || currentStatus.trim() === "") errors.push("El estado actual es obligatorio");
        
        if (errors.length > 0) return res.status(400).json(new Response("Error al actualizar el potrero", null, errors).json);

        // 👇 Actualizamos active solo si viene
        const data = { 
            name, 
            extension, 
            forageCapacity, 
            pastureType, 
            cattleEntryDate, 
            cattleExitDate, 
            currentStatus, 
            observations,
            ...(active !== undefined && { active })
        };
        
        const pasture = await pastureUpdate(id, data);
        res.status(200).json(new Response(`Potrero ${id} actualizado exitosamente`, pasture, null).json);
    } catch (error) {
        console.error("Error en updatePasture:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const deletePasture = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json(new Response("Error", null, ["El ID es obligatorio"]).json);
        await pastureDelete(id);
        res.status(200).json(new Response(`Potrero ${id} eliminado exitosamente`, { id }, null).json);
    } catch (error) {
        console.error("Error en deletePasture:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

module.exports = { getAllPastures, getAllPasturesById, createPasture, updatePasture, deletePasture };