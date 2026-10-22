const { birthCreate, birthUpdate, birthDelete, getBirthById, birthsGetAll } = require("../services/birthService");
const Response = require("../functions/response");

const getAllBirths = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0; 

        const births = await birthsGetAll(limit, offset);
        res.status(200).json(new Response("Registros de nacimientos obtenidos exitosamente", births, null).json);
    } catch (error) {
        console.error("Error en getAllBirths:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
};

const getAllBirthsById = async (req, res) => {
    try {
        const { id_birth } = req.params;
        if (!id_birth) return res.status(400).json(new Response("Error al obtener el nacimiento", null, ["El ID es obligatorio"]).json);
        
        const birth = await getBirthById(id_birth);
        res.status(200).json(new Response(`Nacimiento ${id_birth} obtenido exitosamente`, birth, null).json);
    } catch (error) {
        console.error("Error en getAllBirthsById:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const createBirth = async (req, res) => {
    try {
        // ❌ Quitamos id_pasture
        const { id_Bovine, birthdate, sex, id_race, birthweight, observations, idResponsible, active } = req.body;
        var errors = [];
        
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("La identificación del bovino es obligatoria");
        if (!birthdate || String(birthdate).trim() === "") errors.push("La fecha de nacimiento es obligatoria");
        if (!sex || String(sex).trim() === "") errors.push("El sexo del bovino es obligatorio");
        if (sex && !["Macho", "Hembra"].includes(sex)) errors.push("El sexo debe ser Macho o Hembra");
        if (!id_race || String(id_race).trim() === "") errors.push("La identificación de la raza es obligatoria");
        if (!birthweight || String(birthweight).trim() === "" || isNaN(birthweight)) errors.push("El peso al nacer es obligatorio y debe ser un número");
        if (birthweight && birthweight <= 0) errors.push("El peso al nacer debe ser mayor a 0");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("La identificación del responsable es obligatoria");

        if (errors.length > 0) return res.status(400).json(new Response("Error al crear el nacimiento", null, errors).json);
        
        const data = {
            id_Bovine,
            // ❌ id_pasture eliminado
            birthdate,
            sex,
            id_race,
            birthweight,
            observations,
            idResponsible,
            active: active !== undefined ? active : true
        };
        
        const birth = await birthCreate(data);
        res.status(201).json(new Response("Nacimiento creado exitosamente", birth, null).json);
    } catch (error) {
        console.error("Error en createBirth:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

// (Haz lo mismo en updateBirth: quitar id_pasture del destructuring, validaciones y del objeto data)

const updateBirth = async (req, res) => {
    try {
        const { id_birth } = req.params;
        const { id_Bovine, birthdate, sex, id_race, birthweight, observations, idResponsible, active } = req.body;
        var errors = [];
        
        if (!id_birth) errors.push("El ID del nacimiento es obligatorio");
        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("La identificación del bovino es obligatoria");
        if (!birthdate || String(birthdate).trim() === "") errors.push("La fecha de nacimiento es obligatoria");
        if (!sex || String(sex).trim() === "") errors.push("El sexo del bovino es obligatorio");
        if (!id_race || String(id_race).trim() === "") errors.push("La identificación de la raza es obligatoria");
        if (!birthweight || String(birthweight).trim() === "" || isNaN(birthweight)) errors.push("El peso al nacer es obligatorio y debe ser un número");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("La identificación del responsable es obligatoria");

        if (errors.length > 0) return res.status(400).json(new Response("Error al actualizar el nacimiento", null, errors).json);
        
        const data = {
            id_Bovine,
            birthdate,
            sex,
            id_race,
            birthweight,
            observations,
            idResponsible,
            active: active !== undefined ? active : true
        };
        
        const birth = await birthUpdate(id_birth, data);
        res.status(200).json(new Response(`Nacimiento ${id_birth} actualizado exitosamente`, birth, null).json);
    } catch (error) {
        console.error("Error en updateBirth:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

const deleteBirth = async (req, res) => {
    try {
        const { id_birth } = req.params;
        if (!id_birth) return res.status(400).json(new Response("Error al eliminar el nacimiento", null, ["El ID es obligatorio"]).json);
        await birthDelete(id_birth);
        res.status(200).json(new Response(`Nacimiento ${id_birth} eliminado exitosamente`, { id_birth }, null).json);
    } catch (error) {
        console.error("Error en deleteBirth:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
};

module.exports = { getAllBirths, getAllBirthsById, createBirth, updateBirth, deleteBirth };