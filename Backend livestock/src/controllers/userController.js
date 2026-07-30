const { getUserById, userCreate, userUpdate, userDelete, usersGetAll } = require("../services/userService");
const Response = require("../functions/response");

// obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await usersGetAll(); // Llama al servicio
        const response = new Response("Usuarios obtenidos exitosamente", users, null);
        res.status(200);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllUsers:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// obtener un usuario por id
const getAllUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del usuario es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el usuario", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { id };
        const user = await getUserById(id);
        var response = new Response(`Usuario ${id} obtenido exitosamente`, user, null);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllUsersById:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// crear usuario
const createUser = async (req, res) => {
    try {
        const { name, email, password, documentId, postJob } = req.body;
        var errors = [];
        
        if (!name || name.trim() === "") errors.push("El nombre del usuario es obligatorio");
        if (!email || email.trim() === "") errors.push("El correo del usuario es obligatorio");
        if (!password || password.trim() === "") errors.push("La contraseña es obligatoria");
        if (!documentId || documentId.trim() === "") errors.push("El documento de identidad es obligatorio");
        if (!postJob || postJob.trim() === "") errors.push("El cargo del usuario es obligatorio");
        
        if (errors.length > 0) {
            var response = new Response("Error al crear el usuario", null, errors); 
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { name, email, password, documentId, postJob };
        const user = await userCreate(data);
        var response = new Response("Usuario creado exitosamente", user, null); 
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createUser:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, documentId, postJob } = req.body;
        var errors = [];
        
        if (!id) errors.push("El ID del usuario es obligatorio");
        if (!name || name.trim() === "") errors.push("El nombre del usuario es obligatorio");
        if (!email || email.trim() === "") errors.push("El correo del usuario es obligatorio");
        if (!password || password.trim() === "") errors.push("La contraseña es obligatoria");
        if (!documentId || documentId.trim() === "") errors.push("El documento de identidad es obligatorio");
        if (!postJob || postJob.trim() === "") errors.push("El cargo del usuario es obligatorio");
        
        if (errors.length > 0) {
            var response = new Response("Error al actualizar el usuario", null, errors); 
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { name, email, password, documentId, postJob };
        const user = await userUpdate(id, data);
        var response = new Response(`Usuario ${id} actualizado exitosamente`, user, null); 
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateUser:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

// inactivar usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del usuario es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el usuario", null, errors); 
            res.status(400);
            res.json(response.json);
            return;
        }
        const user = await userDelete(id);
        var response = new Response(`Usuario ${id} inactivado exitosamente`, { id }, null); 
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteUser:", error);
        const errorResponse = new Response("Error interno del servidor", null, [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getAllUsers, 
    getAllUsersById,
    createUser,
    updateUser,
    deleteUser
};