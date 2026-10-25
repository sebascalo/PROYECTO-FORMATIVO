const { mountCreate, mountUpdate, mountDelete, getMountById, mountsGetAll } = require("../services/mountService");
const Response = require("../functions/response");

const getAllMounts = async (req, res) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const offset = req.query.offset ? Number(req.query.offset) : 0;

        const mounts = await mountsGetAll(limit, offset);
        const response = new Response("Registros de montas naturales obtenidos exitosamente", mounts, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en getAllMounts:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
};

const getAllMountsById = async (req, res) => {
    try {
        const { id_mount } = req.params;
        if (!id_mount) return res.status(400).json(new Response("Error", null, ["El ID es obligatorio"]).json);
        
        const mount = await getMountById(id_mount);
        res.status(200).json(new Response(`Monta natural ${id_mount} obtenida exitosamente`, mount, null).json);
    } catch (error) {
        console.error("Error en getAllMountsById:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const createMount = async (req, res) => {
    try {
        const { id_cow, id_bull, breedingDate, serviceNumber, observations, idResponsible } = req.body;
        var errors = [];

        if (!id_cow || String(id_cow).trim() === "" || isNaN(id_cow)) errors.push("La vaca es obligatoria");
        if (!id_bull || String(id_bull).trim() === "" || isNaN(id_bull)) errors.push("El toro es obligatorio");
        if (!breedingDate || String(breedingDate).trim() === "") errors.push("La fecha de monta es obligatoria");
        if (!serviceNumber || String(serviceNumber).trim() === "" || isNaN(serviceNumber)) errors.push("El número de servicio es obligatorio");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");

        if (errors.length > 0) return res.status(400).json(new Response("Error al crear la monta natural", null, errors).json);

        // 👇 Forzamos active: true por defecto
        const data = {
            id_cow,
            id_bull,
            breedingDate,
            serviceNumber,
            observations,
            idResponsible,
            active: true
        };
        
        const mount = await mountCreate(data);
        res.status(201).json(new Response("Monta natural creada exitosamente", mount, null).json);
    } catch (error) {
        console.error("Error en createMount:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const updateMount = async (req, res) => {
    try {
        const { id_mount } = req.params;
        const { id_cow, id_bull, breedingDate, serviceNumber, observations, idResponsible, active } = req.body;
        var errors = [];

        if (!id_mount) errors.push("El ID es obligatorio");
        if (!id_cow || String(id_cow).trim() === "" || isNaN(id_cow)) errors.push("La vaca es obligatoria");
        if (!id_bull || String(id_bull).trim() === "" || isNaN(id_bull)) errors.push("El toro es obligatorio");
        if (!breedingDate || String(breedingDate).trim() === "") errors.push("La fecha es obligatoria");
        if (!serviceNumber || String(serviceNumber).trim() === "" || isNaN(serviceNumber)) errors.push("El servicio es obligatorio");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");

        if (errors.length > 0) return res.status(400).json(new Response("Error al actualizar la monta natural", null, errors).json);

        // 👇 Actualizamos active solo si viene
        const data = {
            id_cow,
            id_bull,
            breedingDate,
            serviceNumber,
            observations,
            idResponsible,
            ...(active !== undefined && { active })
        };
        
        const mount = await mountUpdate(id_mount, data);
        res.status(200).json(new Response(`Monta natural ${id_mount} actualizada exitosamente`, mount, null).json);
    } catch (error) {
        console.error("Error en updateMount:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const deleteMount = async (req, res) => {
    try {
        const { id_mount } = req.params;
        if (!id_mount) return res.status(400).json(new Response("Error al eliminar", null, ["El ID es obligatorio"]).json);
        
        await mountDelete(id_mount);
        res.status(200).json(new Response(`Monta natural ${id_mount} eliminada exitosamente`, { id_mount }, null).json);
    } catch (error) {
        console.error("Error en deleteMount:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

module.exports = { getAllMounts, getAllMountsById, createMount, updateMount, deleteMount };