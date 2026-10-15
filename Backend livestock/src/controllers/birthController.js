const { birthCreate, birthUpdate, birthDelete, getBirthById, birthsGetAll } = require("../services/birthService");
const Response = require("../functions/response");

// Obtener todos los registros de nacimientos
const getAllBirths = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const births = await birthsGetAll(limit, offset);
        const response = new Response("Registros de nacimientos obtenidos exitosamente", births, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllBirths:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllBirthsById = async (req, res) => {
    try {
        const { id_birth } = req.params;
        var errors = [];
        if (!id_birth) {
            errors.push("El ID del nacimiento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el nacimiento", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const birth = await getBirthById(id_birth);
        var response = new Response(`Nacimiento ${id_birth} obtenido exitosamente`, birth, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllBirthsById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createBirth = async (req, res) => {
    try {
        const { id_Bovine, id_pasture, birthdate, sex, id_race, birthweight, observations, idResponsible, active } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!id_pasture || String(id_pasture).trim() === "") {
            errors.push("La identificación del potrero es obligatoria");
        }
        if (!birthdate || String(birthdate).trim() === "") {
            errors.push("La fecha de nacimiento es obligatoria");
        }
        if (!sex || String(sex).trim() === "") {
            errors.push("El sexo del bovino es obligatorio");
        }
        if (sex && !["Macho", "Hembra"].includes(sex)) {
            errors.push("El sexo debe ser Macho o Hembra");
        }
        if (!id_race || String(id_race).trim() === "") {
            errors.push("La identificación de la raza es obligatoria");
        }
        if (!birthweight || String(birthweight).trim() === "" || isNaN(birthweight)) {
            errors.push("El peso al nacer es obligatorio y debe ser un número");
        }
        if (birthweight && birthweight <= 0) {
            errors.push("El peso al nacer debe ser mayor a 0");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("La identificación del responsable del registro es obligatoria");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el nacimiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = {
            id_Bovine,
            id_pasture,
            birthdate,
            sex,
            id_race,
            birthweight,
            observations,
            idResponsible,
            active: active !== undefined ? active : true
        };
        const birth = await birthCreate(data)
        var response = new Response("Nacimiento creado exitosamente", birth, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createBirth:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateBirth = async (req, res) => {
    try {
        const { id_birth } = req.params;
        const { id_Bovine, id_pasture, birthdate, sex, id_race, birthweight, observations, idResponsible, active } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id_birth || String(id_birth).trim() === "") {
            errors.push("El ID del nacimiento es obligatorio");
        }
        if (!id_Bovine || String(id_Bovine).trim() === "") {
            errors.push("La identificación del bovino es obligatoria");
        }
        if (!id_pasture || String(id_pasture).trim() === "") {
            errors.push("La identificación del potrero es obligatoria");
        }
        if (!birthdate || String(birthdate).trim() === "") {
            errors.push("La fecha de nacimiento es obligatoria");
        }
        if (!sex || String(sex).trim() === "") {
            errors.push("El sexo del bovino es obligatorio");
        }
        if (sex && !["Macho", "Hembra"].includes(sex)) {
            errors.push("El sexo debe ser Macho o Hembra");
        }
        if (!id_race || String(id_race).trim() === "") {
            errors.push("La identificación de la raza es obligatoria");
        }
        if (!birthweight || String(birthweight).trim() === "" || isNaN(birthweight)) {
            errors.push("El peso al nacer es obligatorio y debe ser un número");
        }
        if (birthweight && birthweight <= 0) {
            errors.push("El peso al nacer debe ser mayor a 0");
        }
        if (!idResponsible || String(idResponsible).trim() === "") {
            errors.push("La identificación del responsable del registro es obligatoria");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el nacimiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        const data = {
            id_Bovine,
            id_pasture,
            birthdate,
            sex,
            id_race,
            birthweight,
            observations,
            idResponsible,
            active: active !== undefined ? active : true
        };
        const birth = await birthUpdate(id_birth, data)
        var response = new Response(`Nacimiento ${id_birth} actualizado exitosamente`, birth, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateBirth:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteBirth = async (req, res) => {
    try {
        const { id_birth } = req.params;
        var errors = [];
        if (!id_birth || String(id_birth).trim() === "") {
            errors.push("El ID del nacimiento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el nacimiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const birth = await birthDelete(id_birth)
        var response = new Response(`Nacimiento ${id_birth} eliminado exitosamente`, { id_birth }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteBirth:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllBirths,
    getAllBirthsById,
    createBirth,
    updateBirth,
    deleteBirth
};