const { milkCreate, milkUpdate, milkDelete, getMilkById } = require("../services/milkService");
const Response = require("../functions/response");

const getAllMilks = (req, res) => {
    const body = req.body
    console.log("Body recibido:", body);
    res.status(201);
    res.json({ message: 'Obteniendo todas las producciones de leche' });
}

const getAllMilksById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID de la produccion de leche es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response(false, "error al obtener la produccion de leche", errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id }
        const milk = await getMilkById(data)
        var response = new Response(true, "Produccion de leche obtenida exitosamente", milk);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllMilksById:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

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
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response(false, "error al crear la produccion de leche", errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { idBovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible }
        const milk = await milkCreate(data)
        var response = new Response(true, "Produccion de leche creada exitosamente", milk);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createMilk:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
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
        if (!idResponsible || idResponsible.trim() === "") {
            errors.push("El responsable es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response(false, "error al actualizar la produccion de leche", errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id, idBovine, milkingDate, shift, litersQuantity, milkQuality, observations, idResponsible }
        const milk = await milkUpdate(data)
        var response = new Response(true, "Produccion de leche actualizada exitosamente", milk);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateMilk:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
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
            var response = new Response(false, "error al eliminar la produccion de leche", errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        data = { id }
        const milk = await milkDelete(data)
        var response = new Response(true, "Produccion de leche eliminada exitosamente", milk);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteMilk:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
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