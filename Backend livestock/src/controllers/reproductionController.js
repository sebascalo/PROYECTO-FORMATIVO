const { getAll, getById, create, update, remove } = require("../services/reproductionService");
const Response = require("../functions/response");

const getAllReproductions = async (req, res) => {
    try {
        const reproductions = await getAll();
        var response = new Response(true, "Registros de reproducción obtenidos exitosamente", reproductions);
        res.status(200).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al obtener los registros de reproducción", [error.message]);
        res.status(500).json(response.json);
    }
}

const getReproductionById = async (req, res) => {
    const { id } = req.params;
    var errores = [];

    if (!id) {
        errores.push("El ID del registro es obligatorio");
    }

    if (errores.length > 0) {
        var response = new Response(false, "Error al obtener el registro de reproducción", errores);
        return res.status(400).json(response.json);
    }

    try {
        const data = { id };
        const reproduction = await getById(data);
        var response = new Response(true, "Registro de reproducción obtenido exitosamente", reproduction);
        res.status(200).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al obtener el registro de reproducción", [error.message]);
        res.status(500).json(response.json);
    }
}

const createReproduction = async (req, res) => {
    const { 
        reproductionId,
        animalId,
        eventDate,
        eventType,
        toroId,
        serviceDate,
        inseminationDate,
        diagnosisDate,
        diagnosisResult,
        birthDate,
        observations,
        operatorId,
        veterinarianId
    } = req.body;
    var errores = [];

    if (!reproductionId || reproductionId.trim() === "") {
        errores.push("El ID del registro es obligatorio");
    }
    if (!animalId || animalId.trim() === "") {
        errores.push("El ID del animal es obligatorio");
    }
    if (!eventDate || eventDate.trim() === "") {
        errores.push("La fecha del evento es obligatoria");
    }
    if (!eventType || eventType.trim() === "") {
        errores.push("El tipo de evento es obligatorio");
    }
    if (!serviceDate || serviceDate.trim() === "") {
        errores.push("La fecha de servicio/monta es obligatoria");
    }
    if (!inseminationDate || inseminationDate.trim() === "") {
        errores.push("La fecha de inseminacion artificial es obligatoria");
    }
    if (!diagnosisDate || diagnosisDate.trim() === "") {
        errores.push("La fecha de diagnostico de gestacion es obligatoria");
    }
    if (!diagnosisResult || diagnosisResult.trim() === "") {
        errores.push("El resultado del diagnostico es obligatorio");
    }
    if (!birthDate || birthDate.trim() === "") {
        errores.push("La fecha del parto es obligatoria");
    }
    if (!operatorId || operatorId.trim() === "") {
        errores.push("El ID del operario es obligatorio");
    }
    if (!veterinarianId || veterinarianId.trim() === "") {
        errores.push("El ID del veterinario es obligatorio");
    }

    if (errores.length > 0) {
        var response = new Response(false, "Faltan datos obligatorios para crear la reproduccion", errores);
        return res.status(400).json(response.json);
    }

    try {
        const data = { 
            reproductionId, animalId, eventDate, eventType, toroId, 
            serviceDate, inseminationDate, diagnosisDate, diagnosisResult, 
            birthDate, observations, operatorId, veterinarianId 
        };
        const reproduction = await create(data);
        var response = new Response(true, "Registro de reproducción creado exitosamente", reproduction);
        res.status(201).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al crear el registro de reproducción", [error.message]);
        res.status(500).json(response.json);
    }
}

const updateReproduction = async (req, res) => {
    const { id } = req.params;
    const { 
        reproductionId,
        animalId,
        eventDate,
        eventType,
        toroId,
        serviceDate,
        inseminationDate,
        diagnosisDate,
        diagnosisResult,
        birthDate,
        observations,
        operatorId,
        veterinarianId
    } = req.body;
    var errores = [];

    if (!id) {
        errores.push("El ID de la URL es obligatorio");
    }
    if (!reproductionId || reproductionId.trim() === "") {
        errores.push("El ID del registro es obligatorio");
    }
    if (!animalId || animalId.trim() === "") {
        errores.push("El ID del animal es obligatorio");
    }
    if (!eventDate || eventDate.trim() === "") {
        errores.push("La fecha del evento es obligatoria");
    }
    if (!eventType || eventType.trim() === "") {
        errores.push("El tipo de evento es obligatorio");
    }
    if (!serviceDate || serviceDate.trim() === "") {
        errores.push("La fecha de servicio/monta es obligatoria");
    }
    if (!inseminationDate || inseminationDate.trim() === "") {
        errores.push("La fecha de inseminacion artificial es obligatoria");
    }
    if (!diagnosisDate || diagnosisDate.trim() === "") {
        errores.push("La fecha de diagnostico de gestacion es obligatoria");
    }
    if (!diagnosisResult || diagnosisResult.trim() === "") {
        errores.push("El resultado del diagnostico es obligatorio");
    }
    if (!birthDate || birthDate.trim() === "") {
        errores.push("La fecha del parto es obligatoria");
    }
    if (!operatorId || operatorId.trim() === "") {
        errores.push("El ID del operario es obligatorio");
    }
    if (!veterinarianId || veterinarianId.trim() === "") {
        errores.push("El ID del veterinario es obligatorio");
    }

    if (errores.length > 0) {
        var response = new Response(false, "Faltan datos obligatorios para actualizar la reproduccion", errores);
        return res.status(400).json(response.json);
    }

    try {
        const data = { 
            id, reproductionId, animalId, eventDate, eventType, toroId, 
            serviceDate, inseminationDate, diagnosisDate, diagnosisResult, 
            birthDate, observations, operatorId, veterinarianId 
        };
        const reproduction = await update(data);
        var response = new Response(true, "Registro de reproducción actualizado exitosamente", reproduction);
        res.status(200).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al actualizar el registro de reproducción", [error.message]);
        res.status(500).json(response.json);
    }
}

const deleteReproduction = async (req, res) => {
    const { id } = req.params;
    var errores = [];

    if (!id) {
        errores.push("El ID de la reproducción es obligatorio");
    }

    if (errores.length > 0) {
        var response = new Response(false, "Faltan datos obligatorios para eliminar la reproduccion", errores);
        return res.status(400).json(response.json);
    }

    try {
        const data = { id };
        const reproduction = await remove(data);
        var response = new Response(true, "Registro de reproducción eliminado exitosamente", reproduction);
        res.status(200).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al eliminar el registro de reproducción", [error.message]);
        res.status(500).json(response.json);
    }
}

module.exports = {
    getAllReproductions,
    getReproductionById,
    createReproduction,
    updateReproduction,
    deleteReproduction
};