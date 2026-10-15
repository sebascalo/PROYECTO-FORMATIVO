const {
    raceCreate,
    racesGetAll,
    getRaceById,
    raceUpdate,
    raceDelete
} = require("../services/raceService");
const Response = require("../functions/response");

const getAllRaces = async (req, res) => {
    try {
        let queryLimit = req.query.limit;
        let queryOffset = req.query.offset;

        const limit = queryLimit ? Number(queryLimit) : 20;
        const offset = queryOffset ? Number(queryOffset) : 0;
        const races = await racesGetAll(limit, offset);
        const response = new Response("Razas obtenidas exitosamente", races, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllRaces:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getRaceByIdController = async (req, res) => {
    try {
        const { id_race } = req.params;
        const errors = [];
        if (!id_race) {
            errors.push("El ID de la raza es obligatorio");
        }
        if (errors.length > 0) {
            const response = new Response("Error al obtener la raza", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const race = await getRaceById(id_race);
        if (!race) {
            const response = new Response("Raza no encontrada", null, [
                { message: "No existe una raza con ese ID" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }

        const response = new Response(`Raza ${id_race} obtenida exitosamente`, race, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getRaceByIdController:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const createRace = async (req, res) => {
    try {
        const { name_race, active } = req.body;
        const errors = [];
        if (typeof name_race !== "string" || !name_race.trim()) {
            errors.push("El nombre de la raza es obligatorio");
        }
        if (active && !["Active", "Inactive"].includes(active)) {
            errors.push("El estado debe ser Active o Inactive");
        }
        if (errors.length > 0) {
            const response = new Response("Error al crear la raza", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            name_race: name_race.trim(),
            active: active || "Active",
        };
        const race = await raceCreate(data);
        const response = new Response("Raza creada exitosamente", race, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createRace:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateRace = async (req, res) => {
    try {
        const { id_race } = req.params;
        const { name_race, active } = req.body;
        const errors = [];
        if (!id_race) {
            errors.push("El ID de la raza es obligatorio");
        }
        if (typeof name_race !== "string" || !name_race.trim()) {
            errors.push("El nombre de la raza es obligatorio");
        }
        if (active && !["Active", "Inactive"].includes(active)) {
            errors.push("El estado debe ser Active o Inactive");
        }
        if (errors.length > 0) {
            const response = new Response("Error al actualizar la raza", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            name_race: name_race.trim(),
            active: active || "Active",
        };
        const race = await raceUpdate(id_race, data);
        if (!race) {
            const response = new Response("Raza no encontrada", null, [
                { message: "No existe una raza con ese ID" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }

        const response = new Response(`Raza ${id_race} actualizada exitosamente`, race, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateRace:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteRace = async (req, res) => {
    try {
        const { id_race } = req.params;
        const errors = [];
        if (!id_race) {
            errors.push("El ID de la raza es obligatorio");
        }
        if (errors.length > 0) {
            const response = new Response("Error al eliminar la raza", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }

        const deleted = await raceDelete(id_race);
        if (!deleted) {
            const response = new Response("Raza no encontrada", null, [
                { message: "No existe una raza con ese ID" }
            ]);
            res.status(404);
            res.json(response.json);
            return;
        }

        const response = new Response(`Raza ${id_race} eliminada exitosamente`, { id_race }, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteRace:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getAllRaces,
    getRaceByIdController,
    createRace,
    updateRace,
    deleteRace
};