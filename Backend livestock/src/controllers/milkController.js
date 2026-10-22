const { milkCreate, milkUpdate, milkDelete, getMilkById, milksGetAll } = require("../services/milkService");
const Response = require("../functions/response");

const getAllMilks = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const milks = await milksGetAll(limit, offset);
        res.status(200).json(new Response("Registros de leche obtenidos exitosamente", milks, null).json);
    } catch (error) {
        console.error("Error en getAllMilks:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const getAllMilksById = async (req, res) => {
    try {
        const { id_milk } = req.params;
        if (!id_milk) return res.status(400).json(new Response("Error al obtener la producción", null, ["El ID es obligatorio"]).json);
        const milk = await getMilkById(id_milk);
        res.status(200).json(new Response(`Producción ${id_milk} obtenida exitosamente`, milk, null).json);
    } catch (error) {
        console.error("Error en getAllMilksById:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const createMilk = async (req, res) => {
    try {
        // ❌ Quitamos milkQuality
        const { id_Bovine, milkingDate, shift, litersQuantity, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El ID de la vaca es obligatorio");
        if (!milkingDate || String(milkingDate).trim() === "") errors.push("La fecha de ordeño es obligatoria");
        if (!shift || String(shift).trim() === "") errors.push("El turno es obligatorio");
        if (!["Mañana", "Tarde", "Noche"].includes(shift)) errors.push("El turno debe ser: Mañana, Tarde o Noche");
        if (!litersQuantity || String(litersQuantity).trim() === "" || isNaN(litersQuantity)) errors.push("La cantidad de litros es obligatoria y debe ser un número");
        if (litersQuantity && litersQuantity <= 0) errors.push("La cantidad de litros debe ser mayor a 0");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");

        if (errors.length > 0) return res.status(400).json(new Response("Error al crear la producción", null, errors).json);
        
        const data = { id_Bovine, milkingDate, shift, litersQuantity, observations, idResponsible };
        const milk = await milkCreate(data);
        res.status(201).json(new Response("Producción creada exitosamente", milk, null).json);
    } catch (error) {
        console.error("Error en createMilk:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const updateMilk = async (req, res) => {
    try {
        const { id_milk } = req.params;
        const { id_Bovine, milkingDate, shift, litersQuantity, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_milk) errors.push("El ID es obligatorio");
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El ID de la vaca es obligatorio");
        if (!milkingDate || String(milkingDate).trim() === "") errors.push("La fecha de ordeño es obligatoria");
        if (!shift || String(shift).trim() === "") errors.push("El turno es obligatorio");
        if (!litersQuantity || String(litersQuantity).trim() === "" || isNaN(litersQuantity)) errors.push("La cantidad de litros es obligatoria");

        if (errors.length > 0) return res.status(400).json(new Response("Error al actualizar la producción", null, errors).json);
        
        const data = { id_Bovine, milkingDate, shift, litersQuantity, observations, idResponsible };
        const milk = await milkUpdate(id_milk, data);
        res.status(200).json(new Response(`Producción ${id_milk} actualizada exitosamente`, milk, null).json);
    } catch (error) {
        console.error("Error en updateMilk:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const deleteMilk = async (req, res) => {
    try {
        const { id_milk } = req.params;
        if (!id_milk) return res.status(400).json(new Response("Error al eliminar", null, ["El ID es obligatorio"]).json);
        await milkDelete(id_milk);
        res.status(200).json(new Response(`Producción ${id_milk} eliminada exitosamente`, { id_milk }, null).json);
    } catch (error) {
        console.error("Error en deleteMilk:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

module.exports = { getAllMilks, getAllMilksById, createMilk, updateMilk, deleteMilk };