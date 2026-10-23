const { artificialInseminationCreate, artificialInseminationUpdate, artificialInseminationDelete, getArtificialInseminationById, artificialInseminationsGetAll } = require("../services/artificialInseminationService");
const Response = require("../functions/response");

const getAllArtificialInseminations = async (req, res) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const offset = req.query.offset ? Number(req.query.offset) : 0; 
        const artificialInseminations = await artificialInseminationsGetAll(limit, offset);
        res.status(200).json(new Response("Registros obtenidos exitosamente", artificialInseminations, null).json);
    } catch (error) {
        console.error("Error en getAllArtificialInseminations:", error);
        res.status(500).json(new Response("Error interno del servidor", null, [{ message: error.message }]).json);
    }
};

const getAllArtificialInseminationsById = async (req, res) => {
    try {
        const { id_artifInse } = req.params;
        if (!id_artifInse) return res.status(400).json(new Response("Error", null, ["El ID es obligatorio"]).json);
        const artificialInsemination = await getArtificialInseminationById(id_artifInse);
        res.status(200).json(new Response(`Inseminación ${id_artifInse} obtenida exitosamente`, artificialInsemination, null).json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const createArtificialInsemination = async (req, res) => {
    try {
        const { id_madre, id_toro, inseminationDate, semenID, id_race, servicio, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_madre || String(id_madre).trim() === "" || isNaN(id_madre)) errors.push("La madre es obligatoria");
        if (!inseminationDate || String(inseminationDate).trim() === "") errors.push("La fecha es obligatoria");
        if (!semenID || String(semenID).trim() === "") errors.push("El código de la pajilla es obligatorio");
        if (!id_race || String(id_race).trim() === "") errors.push("La raza es obligatoria");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");

        if (errors.length > 0) return res.status(400).json(new Response("Error al crear", null, errors).json);
        
        const data = { id_madre, id_toro: id_toro ? Number(id_toro) : null, inseminationDate, semenID, id_race, servicio, observations, idResponsible };
        const artificialInsemination = await artificialInseminationCreate(data);
        res.status(201).json(new Response("Inseminación creada exitosamente", artificialInsemination, null).json);
    } catch (error) {
        console.error("Error en createArtificialInsemination:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const updateArtificialInsemination = async (req, res) => {
    try {
        const { id_artifInse } = req.params;
        const { id_madre, id_toro, inseminationDate, semenID, id_race, servicio, observations, idResponsible } = req.body;
        var errors = [];
        
        if (!id_artifInse) errors.push("El ID es obligatorio");
        if (!id_madre || String(id_madre).trim() === "" || isNaN(id_madre)) errors.push("La madre es obligatoria");
        if (!inseminationDate || String(inseminationDate).trim() === "") errors.push("La fecha es obligatoria");
        if (!semenID || String(semenID).trim() === "") errors.push("El código es obligatorio");
        if (!id_race || String(id_race).trim() === "") errors.push("La raza es obligatoria");
        if (!idResponsible || String(idResponsible).trim() === "") errors.push("El responsable es obligatorio");

        if (errors.length > 0) return res.status(400).json(new Response("Error al actualizar", null, errors).json);
        
        const data = { id_madre, id_toro: id_toro ? Number(id_toro) : null, inseminationDate, semenID, id_race, servicio, observations, idResponsible };
        const artificialInsemination = await artificialInseminationUpdate(id_artifInse, data);
        res.status(200).json(new Response(`Inseminación actualizada`, artificialInsemination, null).json);
    } catch (error) {
        console.error("Error en updateArtificialInsemination:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

const deleteArtificialInsemination = async (req, res) => {
    try {
        const { id_artifInse } = req.params;
        if (!id_artifInse) return res.status(400).json(new Response("Error", null, ["El ID es obligatorio"]).json);
        await artificialInseminationDelete(id_artifInse);
        res.status(200).json(new Response(`Inseminación eliminada exitosamente`, { id_artifInse }, null).json);
    } catch (error) {
        console.error("Error en deleteArtificialInsemination:", error);
        res.status(500).json(new Response("Error interno", null, [{ message: error.message }]).json);
    }
}

module.exports = { getAllArtificialInseminations, getAllArtificialInseminationsById, createArtificialInsemination, updateArtificialInsemination, deleteArtificialInsemination };