const { roleCreate, roleUpdate, roleDelete, getRoleById, rolesGetAll } = require("../services/roleService");
const Response = require("../functions/response");

const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesGetAll();
        const response = new Response("Roles obtenidos exitosamente", roles, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en getAllRoles:", error);
        const errorResponse = new Response("Error interno del servidor", null, [{ message: error.message }]);
        res.status(500).json(errorResponse.json);
    }
};

const getAllRolesById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "El ID es obligatorio" });
        const role = await getRoleById(id);
        const response = new Response(`Rol ${id} obtenido exitosamente`, role, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en getAllRolesById:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const createRole = async (req, res) => {
    try {
        const { name, description } = req.body;
        var errors = [];

        if (!name || String(name).trim() === "") errors.push("El nombre del rol es obligatorio");

        if (errors.length > 0) {
            const response = new Response("Error al crear el rol", null, errors);
            return res.status(400).json(response.json);
        }

        const data = { name, description };
        const role = await roleCreate(data);
        const response = new Response("Rol creado exitosamente", role, null);
        res.status(201).json(response.json);
    } catch (error) {
        console.error("Error en createRole:", error);
        const errorResponse = new Response("Error interno del servidor", null, [{ message: error.message }]);
        res.status(500).json(errorResponse.json);
    }
};

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        var errors = [];

        if (!name || String(name).trim() === "") errors.push("El nombre del rol es obligatorio");

        if (errors.length > 0) {
            const response = new Response("Error al actualizar el rol", null, errors);
            return res.status(400).json(response.json);
        }

        const data = { name, description };
        const role = await roleUpdate(id, data);
        const response = new Response(`Rol ${id} actualizado exitosamente`, role, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en updateRole:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "El ID es obligatorio" });
        await roleDelete(id);
        const response = new Response(`Rol ${id} eliminado exitosamente`, { id }, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en deleteRole:", error);
        res.status(500).json({ message: "Error interno", error: error.message });
    }
};

module.exports = { getAllRoles, getAllRolesById, createRole, updateRole, deleteRole };