const { mortalityCreate, mortalityUpdate, mortalityDelete, getMortalityById, mortalitiesGetAll } = require("../services/mortalityService");
const Response = require("../functions/response");

// Obtener todos los registros de mortalidad
const getAllMortalities = async (req, res) => {
    try {
        const mortalities = await mortalitiesGetAll();
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
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el registro de mortalidad", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mortality = await getMortalityById(id)
        var response = new Response(`Registro de mortalidad ${id} obtenido exitosamente`, mortality, null);
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
        const { idBovine, dateofdeath, causeofdeath, responsible, fateoftheanimal, observations } = req.body;
        var errors = [];
        
        // Validaciones
        if (!idBovine || idBovine.trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!dateofdeath || dateofdeath.trim() === "") {
            errors.push("La fecha de muerte es obligatoria");
        }
        if (!causeofdeath || causeofdeath.trim() === "") {
            errors.push("La causa de muerte es obligatoria");
        }
        if (!responsible || responsible.trim() === "") {
            errors.push("El responsable del registro es obligatorio");
        }
        if (!fateoftheanimal || fateoftheanimal.trim() === "") {
            errors.push("El destino del animal es obligatorio");
        }
        // Validar que fateoftheanimal sea uno de los valores permitidos
        if (fateoftheanimal && !["Enterrado", "Incinerado", "Vendido para consumo"].includes(fateoftheanimal)) {
            errors.push("El destino del animal debe ser: Enterrado, Incinerado o Vendido para consumo");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el registro de mortalidad", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, dateofdeath, causeofdeath, responsible, fateoftheanimal, observations }
        const mortality = await mortalityCreate(data)
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
        const { id } = req.params;
        const { idBovine, dateofdeath, causeofdeath, responsible, fateoftheanimal, observations } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }
        if (!idBovine || idBovine.trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!dateofdeath || dateofdeath.trim() === "") {
            errors.push("La fecha de muerte es obligatoria");
        }
        if (!causeofdeath || causeofdeath.trim() === "") {
            errors.push("La causa de muerte es obligatoria");
        }
        if (!responsible || responsible.trim() === "") {
            errors.push("El responsable del registro es obligatorio");
        }
        if (!fateoftheanimal || fateoftheanimal.trim() === "") {
            errors.push("El destino del animal es obligatorio");
        }
        if (fateoftheanimal && !["Enterrado", "Incinerado", "Vendido para consumo"].includes(fateoftheanimal)) {
            errors.push("El destino del animal debe ser: Enterrado, Incinerado o Vendido para consumo");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el registro de mortalidad", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { idBovine, dateofdeath, causeofdeath, responsible, fateoftheanimal, observations }
        const mortality = await mortalityUpdate(id, data)
        var response = new Response(`Registro de mortalidad ${id} actualizado exitosamente`, mortality, null);
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
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el registro de mortalidad", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const mortality = await mortalityDelete(id)
        var response = new Response(`Registro de mortalidad ${id} eliminado exitosamente`, { id }, null);
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