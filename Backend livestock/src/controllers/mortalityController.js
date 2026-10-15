const { mortalityCreate, mortalityUpdate, mortalityDelete, getMortalityById, mortalitiesGetAll } = require("../services/mortalityService");
const Response = require("../functions/response");

// Obtener todos los registros de mortalidad
const getAllMortalities = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const mortalities = await mortalitiesGetAll(limit, offset);
        const response = new Response("Registros de mortalidad obtenidos exitosamente", mortalities, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllMortalities:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllMortalitiesById = async (req, res) => {
    try {
        const { id_mortality } = req.params;
        var errors = [];
        if (!id_mortality) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el registro de mortalidad", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mortality = await getMortalityById(id_mortality);
        var response = new Response(`Registro de mortalidad ${id_mortality} obtenido exitosamente`, mortality, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllMortalitiesById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createMortality = async (req, res) => {
    try {
        console.log("📥 [BACK] Body recibido:", req.body);
        const { id_Bovine, dateofdeath, idResponsible, fateoftheanimal, observations } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!dateofdeath || String(dateofdeath).trim() === "") {
            errors.push("La fecha de muerte es obligatoria");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable del registro es obligatorio");
        }
        if (!fateoftheanimal || String(fateoftheanimal).trim() === "") {
            errors.push("El destino del animal es obligatorio");
        }
        if (fateoftheanimal && !["Enterrado", "Incinerado", "Vendido para consumo", "Desechado", "Estudio"].includes(fateoftheanimal)) {
            errors.push("El destino del animal no es válido");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el registro de mortalidad", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = { id_Bovine, dateofdeath, idResponsible, fateoftheanimal, observations };
        console.log("📥 [BACK] data a guardar:", data);
        const mortality = await mortalityCreate(data);
        var response = new Response("Registro de mortalidad creado exitosamente", mortality, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createMortality:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateMortality = async (req, res) => {
    try {
        const { id_mortality } = req.params;
        const { id_Bovine, dateofdeath, idResponsible, fateoftheanimal, observations } = req.body;
        var errors = [];
        
        if (!id_mortality) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!dateofdeath || String(dateofdeath).trim() === "") {
            errors.push("La fecha de muerte es obligatoria");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("El responsable del registro es obligatorio");
        }
        if (!fateoftheanimal || String(fateoftheanimal).trim() === "") {
            errors.push("El destino del animal es obligatorio");
        }
        if (fateoftheanimal && !["Enterrado", "Incinerado", "Vendido para consumo", "Desechado", "Estudio"].includes(fateoftheanimal)) {
            errors.push("El destino del animal no es válido");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el registro de mortalidad", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = { id_Bovine, dateofdeath, idResponsible, fateoftheanimal, observations };
        const mortality = await mortalityUpdate(id_mortality, data);
        var response = new Response(`Registro de mortalidad ${id_mortality} actualizado exitosamente`, mortality, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateMortality:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteMortality = async (req, res) => {
    try {
        const { id_mortality } = req.params;
        var errors = [];
        if (!id_mortality) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el registro de mortalidad", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const mortality = await mortalityDelete(id_mortality);
        var response = new Response(`Registro de mortalidad ${id_mortality} eliminado exitosamente`, { id_mortality }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteMortality:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllMortalities,
    getAllMortalitiesById,
    createMortality,
    updateMortality,
    deleteMortality
};