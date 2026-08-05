const { responsibleCreate, responsibleUpdate, responsibleDelete, getResponsibleById, responsiblesGetAll } = require("../services/responsibleService");
const Response = require("../functions/response");

// Obtener todos los registros de responsables
const getAllResponsibles = async (req, res) => {
    try {
        const responsibles = await responsiblesGetAll();
        const response = new Response("Registros de responsables obtenidos exitosamente", responsibles, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllResponsibles:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllResponsiblesById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del responsable es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el responsable", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const responsible = await getResponsibleById(id)
        var response = new Response(`Responsable ${id} obtenido exitosamente`, responsible, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllResponsiblesById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const createResponsible = async (req, res) => {
    try {
        const { fullName, role, email, phoneNumber, status } = req.body;
        var errors = [];
        
        // Validaciones
        if (!fullName || fullName.trim() === "") {
            errors.push("El nombre completo es obligatorio");
        }
        if (fullName && (fullName.length < 3 || fullName.length > 100)) {
            errors.push("El nombre debe tener entre 3 y 100 caracteres");
        }
        if (!role || role.trim() === "") {
            errors.push("El rol es obligatorio");
        }
        if (!email || email.trim() === "") {
            errors.push("El correo electrónico es obligatorio");
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("El correo electrónico no es válido");
        }
        if (phoneNumber && (phoneNumber.length < 7 || phoneNumber.length > 15)) {
            errors.push("El número de teléfono debe tener entre 7 y 15 caracteres");
        }
        if (status && !["Active", "Inactive"].includes(status)) {
            errors.push("El estado debe ser Active o Inactive");
        }

        if (errors.length > 0) {
            var response = new Response("Error al crear el responsable", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { fullName, role, email, phoneNumber, status }
        const responsible = await responsibleCreate(data)
        var response = new Response("Responsable creado exitosamente", responsible, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createResponsible:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const updateResponsible = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, role, email, phoneNumber, status } = req.body;
        var errors = [];
        
        // Validaciones
        if (!id) {
            errors.push("El ID del responsable es obligatorio");
        }
        if (!fullName || fullName.trim() === "") {
            errors.push("El nombre completo es obligatorio");
        }
        if (fullName && (fullName.length < 3 || fullName.length > 100)) {
            errors.push("El nombre debe tener entre 3 y 100 caracteres");
        }
        if (!role || role.trim() === "") {
            errors.push("El rol es obligatorio");
        }
        if (!email || email.trim() === "") {
            errors.push("El correo electrónico es obligatorio");
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("El correo electrónico no es válido");
        }
        if (phoneNumber && (phoneNumber.length < 7 || phoneNumber.length > 15)) {
            errors.push("El número de teléfono debe tener entre 7 y 15 caracteres");
        }
        if (status && !["Active", "Inactive"].includes(status)) {
            errors.push("El estado debe ser Active o Inactive");
        }

        if (errors.length > 0) {
            var response = new Response("Error al actualizar el responsable", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        
        data = { fullName, role, email, phoneNumber, status }
        const responsible = await responsibleUpdate(id, data)
        var response = new Response(`Responsable ${id} actualizado exitosamente`, responsible, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateResponsible:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

const deleteResponsible = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del responsable es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el responsable", null, errors)
            res.status(400)
            res.json(response.json);
            return;
        }
        const responsible = await responsibleDelete(id)
        var response = new Response(`Responsable ${id} eliminado exitosamente`, { id }, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteResponsible:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
}

module.exports = {
    getAllResponsibles,
    getAllResponsiblesById,
    createResponsible,
    updateResponsible,
    deleteResponsible
};