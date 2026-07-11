const cattleController = require("../controllers/cattleController");


// obtener todos los bovinos
const getAllCattle = async (req, res) => {
    const cattles = await cattleService.getAllCattle();

    const response = new Response(
        true,
        "Bovinos obtenidos exitosamente",
        cattles
    );

    res.status(200).json(response.json);
};

// obtener bovino por id
const getCattleById = async (req, res) => {
    const { id } = req.params;

    var errors = [];

    if (!id) {
        errors.push("El ID del bovino es obligatorio");
    }

    if (errors.length > 0) {
        const response = new Response(
            false,
            "Error al obtener el bovino",
            errors
        );

        return res.status(400).json(response.json);
    }

    const cattle = await cattleService.getCattleById(id);

    if (!cattle) {
        const response = new Response(
            false,
            "Bovino no encontrado",
            null
        );

        return res.status(404).json(response.json);
    }

    const response = new Response(
        true,
        "Bovino obtenido exitosamente",
        cattle
    );

    res.status(200).json(response.json);
};

// crear bovino
const createCattle = async (req, res) => {
    const {
        name,
        raze,
        entrydate,
        paddock,
        birthdate,
        photo,
        currentweight,
        classificationbytype,
        state
    } = req.body;

    var errors = [];

    if (!name || name.trim() === "") {
        errors.push("El nombre del bovino es obligatorio");
    }
    if (!raze || raze.trim() === "") {
        errors.push("La raza del bovino es obligatoria");
    }
    if (!entrydate || entrydate.trim() === "") {
        errors.push("La fecha de ingreso es obligatoria");
    }
    if (!paddock || paddock.trim() === "") {
        errors.push("El potrero es obligatorio");
    }
    if (!birthdate || birthdate.trim() === "") {
        errors.push("La fecha de nacimiento es obligatoria");
    }
    if (!currentweight) {
        errors.push("El peso actual es obligatorio");
    }
    if (!classificationbytype || classificationbytype.trim() === "") {
        errors.push("La clasificación es obligatoria");
    }
    if (!state || state.trim() === "") {
        errors.push("El estado es obligatorio");
    }

    if (errors.length > 0) {
        const response = new Response(
            false,
            "Error al crear el bovino",
            errors
        );

        return res.status(400).json(response.json);
    }

    const data = {
        name,
        raze,
        entrydate,
        paddock,
        birthdate,
        photo,
        currentweight,
        classificationbytype,
        state
    };

    const cattle = await cattleService.cattleCreate(data);

    const response = new Response(
        true,
        "Bovino creado exitosamente",
        cattle
    );

    res.status(201).json(response.json);
};

// actualizar bovino
const updateCattle = async (req, res) => {
    const { id } = req.params;

    var errors = [];

    if (!id) {
        errors.push("El ID del bovino es obligatorio");
    }

    const {
        name,
        raze,
        entrydate,
        paddock,
        birthdate,
        photo,
        currentweight,
        classificationbytype,
        state
    } = req.body;

    if (errors.length > 0) {
        const response = new Response(
            false,
            "Error al actualizar el bovino",
            errors
        );

        return res.status(400).json(response.json);
    }

    const data = {
        id,
        name,
        raze,
        entrydate,
        paddock,
        birthdate,
        photo,
        currentweight,
        classificationbytype,
        state
    };

    const cattle = await cattleService.cattleUpdate(id, data);

    const response = new Response(
        true,
        "Bovino actualizado exitosamente",
        cattle
    );

    res.status(200).json(response.json);
};

// eliminar bovino
const deleteCattle = async (req, res) => {
    const { id } = req.params;

    var errors = [];

    if (!id) {
        errors.push("El ID del bovino es obligatorio");
    }

    if (errors.length > 0) {
        const response = new Response(
            false,
            "Error al eliminar el bovino",
            errors
        );

        return res.status(400).json(response.json);
    }

    const cattle = await cattleService.cattleDelete(id);

    const response = new Response(
        true,
        "Bovino inactivado exitosamente",
        cattle
    );

    res.status(200).json(response.json);
};

module.exports = {
    getAllCattle,
    getCattleById,
    createCattle,
    updateCattle,
    deleteCattle
};