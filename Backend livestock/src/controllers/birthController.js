const { birthCreate, birthUpdate, birthDelete, getBirthById, birthsGetAll } = require("../services/birthService");
const Response = require("../functions/response");

// Obtener todos los registros de nacimientos
const getAllBirths = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        
        const limit = queryLimit ? Number(queryLimit) : 10;
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
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del nacimiento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el nacimiento", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const birth = await getBirthById(id)
        var response = new Response(`Nacimiento ${id} obtenido exitosamente`, birth, null);
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
        const { motheridentification, landidentification, birthdate, sex, race, birthweight, conditionatbirth, observations, responsible, active } = req.body;
        var errors = [];
        
        // Validaciones
        if (!motheridentification || motheridentification.trim() === "") {
            errors.push("La identificación de la madre es obligatoria");
        }
        if (!landidentification || landidentification.trim() === "") {
            errors.push("La identificación del potrero es obligatoria");
        }
        if (!birthdate || birthdate.trim() === "") {
            errors.push("La fecha de nacimiento es obligatoria");
        }
        if (!sex || sex.trim() === "") {
            errors.push("El sexo del bovino es obligatorio");
        }
        if (sex && !["Macho", "Hembra"].includes(sex)) {
            errors.push("El sexo debe ser Macho o Hembra");
        }
        if (!race || race.trim() === "") {
            errors.push("La raza del bovino es obligatoria");
        }
        if (!birthweight || birthweight.toString().trim() === "" || isNaN(birthweight)) {
            errors.push("El peso al nacer es obligatorio y debe ser un número");
        }
        if (birthweight && birthweight <= 0) {
            errors.push("El peso al nacer debe ser mayor a 0");
        }
        if (!conditionatbirth || conditionatbirth.trim() === "") {
            errors.push("La condición al nacer es obligatoria");
        }
        if (!responsible || responsible.trim() === "") {
            errors.push("El responsable del registro es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el nacimiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { motheridentification, landidentification, birthdate, sex, race, birthweight, conditionatbirth, observations, responsible, active }
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
        const { id } = req.params;
        const { motheridentification, landidentification, birthdate, sex, race, birthweight, conditionatbirth, observations, responsible, active } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID del nacimiento es obligatorio");
        }
        if (!motheridentification || motheridentification.trim() === "") {
            errors.push("La identificación de la madre es obligatoria");
        }
        if (!landidentification || landidentification.trim() === "") {
            errors.push("La identificación del potrero es obligatoria");
        }
        if (!birthdate || birthdate.trim() === "") {
            errors.push("La fecha de nacimiento es obligatoria");
        }
        if (!sex || sex.trim() === "") {
            errors.push("El sexo del bovino es obligatorio");
        }
        if (sex && !["Macho", "Hembra"].includes(sex)) {
            errors.push("El sexo debe ser Macho o Hembra");
        }
        if (!race || race.trim() === "") {
            errors.push("La raza del bovino es obligatoria");
        }
        if (!birthweight || birthweight.toString().trim() === "" || isNaN(birthweight)) {
            errors.push("El peso al nacer es obligatorio y debe ser un número");
        }
        if (birthweight && birthweight <= 0) {
            errors.push("El peso al nacer debe ser mayor a 0");
        }
        if (!conditionatbirth || conditionatbirth.trim() === "") {
            errors.push("La condición al nacer es obligatoria");
        }
        if (!responsible || responsible.trim() === "") {
            errors.push("El responsable del registro es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el nacimiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { motheridentification, landidentification, birthdate, sex, race, birthweight, conditionatbirth, observations, responsible, active }
        const birth = await birthUpdate(id, data)
        var response = new Response(`Nacimiento ${id} actualizado exitosamente`, birth, null);
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
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del nacimiento es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el nacimiento", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const birth = await birthDelete(id)
        var response = new Response(`Nacimiento ${id} eliminado exitosamente`, { id }, null);
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