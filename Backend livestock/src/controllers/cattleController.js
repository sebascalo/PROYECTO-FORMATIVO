const { cattleCreate, cattleUpdate, cattleDelete, getCattleById, cattlesGetAll } = require("../services/cattleService");
const Response = require("../functions/response");

const getAllCattles = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;
        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0;
        const cattles = await cattlesGetAll(limit, offset);
        const response = new Response("Registros de bovinos obtenidos exitosamente", cattles, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllCattles:", error);
        const errorResponse = new Response("Error interno del servidor", null, [{ message: error.message }]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllCattlesById = async (req, res) => {
    try {
        const { id_Bovine } = req.params;
        if (!id_Bovine) return res.status(400).json({ message: "El ID del bovino es obligatorio" });
        const cattle = await getCattleById(id_Bovine);
        const response = new Response(`Bovino ${id_Bovine} obtenido exitosamente`, cattle, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllCattlesById:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const createCattle = async (req, res) => {
    try {
        // ✅ Paso 2 y 3: Quitamos id_pasture, agregamos id_mother e id_father
        const { id_Bovine, name, id_race, sex, entrydate, id_mother, id_father, birthdate, photo, currentweight, classificationbytype, active } = req.body;
        var errors = [];

        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El ID del bovino es obligatorio");
        if (!name || String(name).trim() === "") errors.push("El nombre del bovino es obligatorio");
        if (!id_race || String(id_race).trim() === "") errors.push("El ID de la raza es obligatorio");
        if (!sex || String(sex).trim() === "") errors.push("El sexo del bovino es obligatorio");
        if (!entrydate || String(entrydate).trim() === "") errors.push("La fecha de ingreso es obligatoria");
        if (!birthdate || String(birthdate).trim() === "") errors.push("La fecha de nacimiento es obligatoria");
        if (!currentweight || String(currentweight).trim() === "" || isNaN(currentweight)) errors.push("El peso actual es obligatorio y debe ser un número");
        if (currentweight && currentweight <= 0) errors.push("El peso actual debe ser mayor a 0");
        if (!classificationbytype || String(classificationbytype).trim() === "") errors.push("La clasificación por tipo es obligatoria");
        if (!active) errors.push("El estado del bovino es obligatorio");
        
        // ✅ Paso 1: Validación de las nuevas clasificaciones
        const validClassifications = ["Toro", "Novilla levante", "Novilla vientre", "Ternero", "Vaca"];
        if (classificationbytype && !validClassifications.includes(classificationbytype)) {
            errors.push("La clasificación debe ser: Toro, Novilla levante, Novilla vientre, Ternero o Vaca");
        }

        if (errors.length > 0) {
            const response = new Response("Error al crear el bovino", null, errors);
            return res.status(400).json(response.json);
        }

        const data = {
            id_Bovine,
            name,
            id_race,
            sex,
            entrydate,
            // ❌ id_pasture eliminado
            id_mother: id_mother ? Number(id_mother) : null, // ✅ Nuevo
            id_father: id_father ? Number(id_father) : null, // ✅ Nuevo
            birthdate,
            photo,
            currentweight,
            classificationbytype,
            active: active === 'Activo' ? 1 : 0
        };
        
        const cattle = await cattleCreate(data);
        const response = new Response("Bovino creado exitosamente", cattle, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createCattle:", error);
        const errorResponse = new Response("Error interno del servidor", null, [{ message: error.message }]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateCattle = async (req, res) => {
    try {
        const { id_Bovine } = req.params;
        // ✅ Paso 2 y 3: Quitamos id_pasture, agregamos id_mother e id_father
        const { name, id_race, sex, entrydate, id_mother, id_father, birthdate, photo, currentweight, classificationbytype, active } = req.body;
        var errors = [];

        if (!id_Bovine || String(id_Bovine).trim() === "") errors.push("El ID del bovino es obligatorio");
        if (!name || String(name).trim() === "") errors.push("El nombre del bovino es obligatorio");
        if (!id_race || String(id_race).trim() === "") errors.push("El ID de la raza es obligatorio");
        if (!sex || String(sex).trim() === "") errors.push("El sexo es obligatorio");
        if (!entrydate || String(entrydate).trim() === "") errors.push("La fecha de ingreso es obligatoria");
        if (!birthdate || String(birthdate).trim() === "") errors.push("La fecha de nacimiento es obligatoria");
        if (!currentweight || String(currentweight).trim() === "" || isNaN(currentweight)) errors.push("El peso actual es obligatorio y debe ser un número");
        if (!classificationbytype || String(classificationbytype).trim() === "") errors.push("La clasificación por tipo es obligatoria");
        if (!active) errors.push("El estado del bovino es obligatorio");

        if (errors.length > 0) {
            const response = new Response("Error al actualizar el bovino", null, errors);
            return res.status(400).json(response.json);
        }

        const data = {
            name,
            id_race,
            sex,
            entrydate,
            // ❌ id_pasture eliminado
            id_mother: id_mother ? Number(id_mother) : null,
            id_father: id_father ? Number(id_father) : null,
            birthdate,
            photo,
            currentweight,
            classificationbytype,
            active: active === 'Activo' ? 1 : 0
        };
        const cattle = await cattleUpdate(id_Bovine, data);
        const response = new Response(`Bovino ${id_Bovine} actualizado exitosamente`, cattle, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateCattle:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const deleteCattle = async (req, res) => {
    try {
        const { id_Bovine } = req.params;
        if (!id_Bovine) return res.status(400).json({ message: "El ID es obligatorio" });
        await cattleDelete(id_Bovine);
        const response = new Response(`Bovino ${id_Bovine} eliminado exitosamente`, { id_Bovine }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteCattle:", error);
        res.status(500).json({ message: "Error interno", error: error.message });
    }
};

module.exports = {
    getAllCattles,
    getAllCattlesById,
    createCattle,
    updateCattle,
    deleteCattle
};