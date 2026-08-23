const { mountCreate, mountUpdate, mountDelete, getMountById, mountsGetAll } = require("../services/mountService");
const Response = require("../functions/response");

// Obtener todos los registros de montas naturales
const getAllMounts = async (req, res) => {
    try {
        const mounts = await mountsGetAll();
        const response = new Response("Registros de montas naturales obtenidos exitosamente", mounts, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllMounts:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllMountsById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID de la monta natural es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener la monta natural", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mount = await getMountById(id)
        var response = new Response(`Monta natural ${id} obtenida exitosamente`, mount, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllMountsById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createMount = async (req, res) => {
    try {
        const { idBovine, bullId, breedingDate, serviceNumber, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!idBovine || idBovine.toString().trim() === "" || isNaN(idBovine)) {
            errors.push("La identificación de la hembra es obligatoria y debe ser un número");
        }
        if (!bullId || bullId.toString().trim() === "" || isNaN(bullId)) {
            errors.push("La identificación del toro es obligatoria y debe ser un número");
        }
        if (!breedingDate || breedingDate.trim() === "") {
            errors.push("La fecha de monta es obligatoria");
        }
        if (!serviceNumber || serviceNumber.toString().trim() === "" || isNaN(serviceNumber)) {
            errors.push("El número de servicio es obligatorio y debe ser un número");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable de la monta es obligatorio");
        }
        // Validar que bovineCondition sea uno de los valores permitidos
        if (bovineCondition && !["Celo", "Quieta", "Rechaza"].includes(bovineCondition)) {
            errors.push("La condición de la vaca debe ser: Celo, Quieta o Rechaza");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear la monta natural", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, bullId, breedingDate, serviceNumber, observations, idResponsible }
        const mount = await mountCreate(data)
        var response = new Response("Monta natural creada exitosamente", mount, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createMount:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateMount = async (req, res) => {
    try {
        const { id } = req.params;
        const { idBovine, bullId, breedingDate, serviceNumber, observations, idResponsible } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID de la monta natural es obligatorio");
        }
        if (!idBovine || idBovine.toString().trim() === "" || isNaN(idBovine)) {
            errors.push("La identificación de la hembra es obligatoria y debe ser un número");
        }
        if (!bullId || bullId.toString().trim() === "" || isNaN(bullId)) {
            errors.push("La identificación del toro es obligatoria y debe ser un número");
        }
        if (!breedingDate || breedingDate.trim() === "") {
            errors.push("La fecha de monta es obligatoria");
        }
        if (!serviceNumber || serviceNumber.toString().trim() === "" || isNaN(serviceNumber)) {
            errors.push("El número de servicio es obligatorio y debe ser un número");
        }
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable de la monta es obligatorio");
        }
        if (bovineCondition && !["Celo", "Quieta", "Rechaza"].includes(bovineCondition)) {
            errors.push("La condición de la vaca debe ser: Celo, Quieta o Rechaza");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar la monta natural", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, bullId, breedingDate, serviceNumber, bovineCondition, observations, idResponsible }
        const mount = await mountUpdate(id, data)
        var response = new Response(`Monta natural ${id} actualizada exitosamente`, mount, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateMount:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteMount = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID de la monta natural es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar la monta natural", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const mount = await mountDelete(id)
        var response = new Response(`Monta natural ${id} eliminada exitosamente`, { id }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteMount:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllMounts,
    getAllMountsById,
    createMount,
    updateMount,
    deleteMount
};