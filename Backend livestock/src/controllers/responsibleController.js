const { getAll, getById, create, update, remove } = require("../services/responsibleService");
const Response = require("../functions/response");

const getAllResponsibles = async (req, res) => {
    try {
        const responsibles = await getAll();
        var response = new Response(true, "Responsables obtenidos exitosamente", responsibles);
        res.status(200).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al obtener los responsables", [error.message]);
        res.status(500).json(response.json);
    }
}

const getResponsibleById = async (req, res) => {
    const { id } = req.params;
    var errors = [];

    if (!id) {
        errors.push("El ID del responsable es obligatorio");
    }

    if (errors.length > 0) {
        var response = new Response(false, "Error al obtener el responsable", errors);
        return res.status(400).json(response.json);
    }

    try {
        const data = { id };
        const responsible = await getById(data);
        var response = new Response(true, "Responsable obtenido exitosamente", responsible);
        res.status(200).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al obtener el responsable", [error.message]);
        res.status(500).json(response.json);
    }
}

const createResponsible = async (req, res) => {
    const { id, name, lastName, email, phone, position } = req.body;
    var errors = [];

    // Validaciones
    if (!id || id.trim() === "") {
        errors.push("El ID del responsable es obligatorio");
    }       
    if (!name || name.trim() === "") {
        errors.push("El nombre del responsable es obligatorio");
    }
    if (!lastName || lastName.trim() === "") {
        errors.push("El apellido del responsable es obligatorio");
    }
    if (!email || email.trim() === "") {
        errors.push("El correo electrónico del responsable es obligatorio");
    }
    if (!phone || String(phone).trim() === "" || isNaN(phone)) {
        errors.push("El número de teléfono del responsable es obligatorio y debe ser un número");
    }
    if (!position || position.trim() === "") {
        errors.push("El cargo del responsable es obligatorio");
    }

    if (errors.length > 0) {
        var response = new Response(false, "Error al crear el responsable", errors);
        return res.status(400).json(response.json);
    }

    try {
        const data = { id, name, lastName, email, phone, position };
        const responsible = await create(data);
        var response = new Response(true, "Responsable creado exitosamente", responsible);
        res.status(201).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al crear el responsable", [error.message]);
        res.status(500).json(response.json);
    }
}   

const updateResponsible = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, phone, position } = req.body;
    var errors = [];

    if (!id) {
        errors.push("El ID del responsable es obligatorio");
    }       
    if (!name || name.trim() === "") {
        errors.push("El nombre del responsable es obligatorio");
    }
    if (!lastName || lastName.trim() === "") {
        errors.push("El apellido del responsable es obligatorio");
    }
    if (!email || email.trim() === "") {
        errors.push("El correo electrónico del responsable es obligatorio");
    }
    if (!phone || String(phone).trim() === "" || isNaN(phone)) {
        errors.push("El número de teléfono del responsable es obligatorio y debe ser un número");
    }
    if (!position || position.trim() === "") {
        errors.push("El cargo del responsable es obligatorio");
    }

    if (errors.length > 0) {
        var response = new Response(false, "Error al actualizar el responsable", errors);
        return res.status(400).json(response.json);
    }

    try {
        const data = { id, name, lastName, email, phone, position };
        const responsible = await update(data);
        var response = new Response(true, "Responsable actualizado exitosamente", responsible);
        res.status(200).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al actualizar el responsable", [error.message]);
        res.status(500).json(response.json);
    }
}

const deleteResponsible = async (req, res) => {
    const { id } = req.params;
    var errors = [];

    if (!id) {
        errors.push("El ID del responsable es obligatorio");
    }       

    if (errors.length > 0) {
        var response = new Response(false, "Error al eliminar el responsable", errors);
        return res.status(400).json(response.json);
    }

    try {
        const data = { id };
        const responsible = await remove(data);
        var response = new Response(true, "Responsable eliminado exitosamente", responsible);
        res.status(200).json(response.json);
    } catch (error) {
        var response = new Response(false, "Error al eliminar el responsable", [error.message]);
        res.status(500).json(response.json);
    }
}

module.exports = {
    getAllResponsibles,
    getResponsibleById,
    createResponsible,
    updateResponsible,
    deleteResponsible
};