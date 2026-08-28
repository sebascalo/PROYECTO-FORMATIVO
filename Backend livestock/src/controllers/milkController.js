const { milkCreate, milkUpdate, milkDelete, getMilkById, milksGetAll } = require("../services/milkService");
const Response = require("../functions/response");

// Obtener todos los registros
const getAllMilks = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 10;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const milks = await milksGetAll(limit, offset);
        const response = new Response("Registros de leche obtenidos exitosamente", milks, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllMilks:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// Obtener un registro por id
const getAllMilksById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID de la produccion de leche es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener la produccion de leche", null, errors);
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id }
        const milk = await getMilkById(id)
        var response = new Response(`Produccion de leche ${id} obtenida exitosamente`, milk, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllMilksById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

// Crear registro de leche
const createMilk = async (req, res) => {
    try {
        // ID de la vaca
        // fecha de ordeño
        // turno
        // cantidad de litros
        // calidad de la leche
        // observaciones
        // responsable
        const { idBovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible } = req.body;
        var errors = [];
        // Validaciones
        if (!idBovine || idBovine.toString().trim() === "") {
            errors.push("El ID de la vaca es obligatorio");
        }
        if (!milkingDate || milkingDate.trim() === "") {
            errors.push("La fecha de ordeño es obligatoria");
        }
        if (!shift || shift.trim() === "") {
            errors.push("El turno es obligatorio");
        }
        if (!litersQuantity || litersQuantity.toString().trim() === "" || isNaN(litersQuantity)) {
            errors.push("La cantidad de litros es obligatoria y debe ser un número");
        }
        if (!idResponsible || idResponsible.toString().trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al crear la produccion de leche", null, errors);
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { idBovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible }
        const milk = await milkCreate(data)
        var response = new Response("Produccion de leche creada exitosamente", milk, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createMilk:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateMilk = async (req, res) => {
    try {
        const { id } = req.params;
        const { idBovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible } = req.body;
        var errors = [];
        // Validaciones
        if (!id) {
            errors.push("El ID de la produccion de leche es obligatorio");
        }
        if (!idBovine || idBovine.toString().trim() === "") {
            errors.push("El ID de la vaca es obligatorio");
        }
        if (!milkingDate || milkingDate.trim() === "") {
            errors.push("La fecha de ordeño es obligatoria");
        }
        if (!shift || shift.trim() === "") {
            errors.push("El turno es obligatorio");
        }
        if (!litersQuantity || litersQuantity.toString().trim() === "" || isNaN(litersQuantity)) {
            errors.push("La cantidad de litros es obligatoria y debe ser un número");
        }
        if (!idResponsible || idResponsible.toString().trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al actualizar la produccion de leche", null, errors);
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id, idBovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible }
        const milk = await milkUpdate(id, data)
        var response = new Response(`Produccion de leche ${id} actualizada exitosamente`, milk, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateMilk:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteMilk = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID de la produccion de leche es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar la produccion de leche", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const milk = await milkDelete(id)
        var response = new Response(`Produccion de leche ${id} eliminada exitosamente`, {id}, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteMilk:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllMilks,
    getAllMilksById,
    createMilk,
    updateMilk,
    deleteMilk
};