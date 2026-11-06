const { userRoleCreate, userRoleUpdate, userRoleDelete, getUserRoleById, userRolesGetAll } = require("../services/userRoleService");
const Response = require("../functions/response");

const getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await userRolesGetAll();
        const response = new Response("Asignaciones de roles obtenidas exitosamente", userRoles, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en getAllUserRoles:", error);
        const errorResponse = new Response("Error interno del servidor", null, [{ message: error.message }]);
        res.status(500).json(errorResponse.json);
    }
};

const getAllUserRolesById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "El ID es obligatorio" });
        const userRole = await getUserRoleById(id);
        const response = new Response(`Asignación ${id} obtenida exitosamente`, userRole, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en getAllUserRolesById:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const createUserRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        var errors = [];

        if (!userId || String(userId).trim() === "") errors.push("El ID del usuario es obligatorio");
        if (!roleId || String(roleId).trim() === "") errors.push("El ID del rol es obligatorio");

        if (errors.length > 0) {
            const response = new Response("Error al asignar el rol", null, errors);
            return res.status(400).json(response.json);
        }

        const data = { userId, roleId };
        const userRole = await userRoleCreate(data);
        const response = new Response("Rol asignado exitosamente", userRole, null);
        res.status(201).json(response.json);
    } catch (error) {
        console.error("Error en createUserRole:", error);
        const errorResponse = new Response("Error interno del servidor", null, [{ message: error.message }]);
        res.status(500).json(errorResponse.json);
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, roleId } = req.body;
        
        // Validación simple opcional
        if (!userId && !roleId) {
             return res.status(400).json({ message: "Debe enviar userId o roleId para actualizar" });
        }

        const data = { userId, roleId };
        const userRole = await userRoleUpdate(id, data);
        const response = new Response(`Asignación ${id} actualizada exitosamente`, userRole, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en updateUserRole:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const deleteUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "El ID es obligatorio" });
        await userRoleDelete(id);
        const response = new Response(`Asignación ${id} eliminada exitosamente`, { id }, null);
        res.status(200).json(response.json);
    } catch (error) {
        console.error("Error en deleteUserRole:", error);
        res.status(500).json({ message: "Error interno", error: error.message });
    }
};

module.exports = { getAllUserRoles, getAllUserRolesById, createUserRole, updateUserRole, deleteUserRole };