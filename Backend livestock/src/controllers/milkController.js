const { milkCreate, milkUpdate, milkDelete, getMilkById, milksGetAll } = require("../services/milkService");
const Response = require("../functions/response");

// Obtener todos los registros
const getAllMilks = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 20;
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
        const { id_milk } = req.params;
        var errors = [];
        if (!id_milk) {
            errors.push("El ID de la produccion de leche es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener la produccion de leche", null, errors);
            res.status(400)
            res.json(response.json);
            return;
        }
        const milk = await getMilkById(id_milk);
        var response = new Response(`Produccion de leche ${id_milk} obtenida exitosamente`, milk, null);
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
        console.log("📥 [BACK] Body recibido:", req.body);
        const { id_Bovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible } = req.body;
        var errors = [];
        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("El ID de la vaca es obligatorio");
        }
        if (!milkingDate || String(milkingDate).trim() === "") {
            errors.push("La fecha de ordeño es obligatoria");
        }
        if (!shift || String(shift).trim() === "") {
            errors.push("El turno es obligatorio");
        }
        if (!["Mañana", "Tarde", "Noche"].includes(shift)) {
            errors.push("El turno debe ser: Mañana, Tarde o Noche");
        }
        if (!litersQuantity || String(litersQuantity).trim() === "" || isNaN(litersQuantity)) {
            errors.push("La cantidad de litros es obligatoria y debe ser un número");
        }
        if (litersQuantity && litersQuantity <= 0) {
            errors.push("La cantidad de litros debe ser mayor a 0");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al crear la produccion de leche", null, errors);
            res.status(400)
            res.json(response.json);
            return;
        }
        const data = { id_Bovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible };
        console.log("📥 [BACK] data a guardar:", data);
        const milk = await milkCreate(data);
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
        const { id_milk } = req.params;
        const { id_Bovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible } = req.body;
        var errors = [];
        // Validaciones
        if (!id_milk) {
            errors.push("El ID de la produccion de leche es obligatorio");
        }
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("El ID de la vaca es obligatorio");
        }
        if (!milkingDate || String(milkingDate).trim() === "") {
            errors.push("La fecha de ordeño es obligatoria");
        }
        if (!shift || String(shift).trim() === "") {
            errors.push("El turno es obligatorio");
        }
        if (!["Mañana", "Tarde", "Noche"].includes(shift)) {
            errors.push("El turno debe ser: Mañana, Tarde o Noche");
        }
        if (!litersQuantity || String(litersQuantity).trim() === "" || isNaN(litersQuantity)) {
            errors.push("La cantidad de litros es obligatoria y debe ser un número");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al actualizar la produccion de leche", null, errors);
            res.status(400)
            res.json(response.json);
            return;
        }
        const data = { id_Bovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible };
        const milk = await milkUpdate(id_milk, data);
        var response = new Response(`Produccion de leche ${id_milk} actualizada exitosamente`, milk, null);
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
        const { id_milk } = req.params;
        var errors = [];
        if (!id_milk) {
            errors.push("El ID de la produccion de leche es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar la produccion de leche", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const milk = await milkDelete(id_milk);
        var response = new Response(`Produccion de leche ${id_milk} eliminada exitosamente`, { id_milk }, null);
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