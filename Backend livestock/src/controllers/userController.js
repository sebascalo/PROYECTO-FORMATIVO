const { getUserById, userCreate, UserUpdate, userDelete } = require("../services/userService");
const Response = require("../functions/response");

const getAllUsers = (req, res) => {
    const body = req.body;
    console.log("Body recibido:", body);
    res.status(201);
    res.json({ message: "Obteniendo todos los usuarios" });
};

const getAllUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del usuario es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response(false, "error al obtener el usurio", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { id };
        const user = await getUserById(data);
        var response = new Response(true, "Usuario obtenido exitosamente", user);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en getAllUsersById:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const createUser = async (req, res) => {
    try {
        // nombre
        // correo
        // contraseña
        // documento de identidad
        // cargo
        const { name, email, password, documentId, postJob } = req.body;
        var errors = [];
        // Validaciones
        if (!name || name.trim() === "") {
            errors.push("El nombre del usuario es obligatorio");
        }
        if (!email || email.trim() === "") {
            errors.push("El correo del usuario es obligatorio");
        }
        if (!password || password.trim() === "") {
            -errors.push("La contraseña es obligatoria");
        }
        if (!documentId || documentId.trim() === "") {
            errors.push("El documento de identidad es obligatorio");
        }
        if (!postJob || postJob.trim() === "") {
            errors.push("El cargo del usuario es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response(false, "error al crear el usurio", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { name, email, password, documentId, postJob };
        const user = await userCreate(data);
        var response = new Response(true, "Usuario creado exitosamente", user);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en createUser:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, documentId, postJob } = req.body;
        var errors = [];
        // Validaciones
        if (!id) {
            errors.push("El ID del usuario es obligatorio");
        }
        if (!name || name.trim() === "") {
            errors.push("El nombre del usuario es obligatorio");
        }
        if (!email || email.trim() === "") {
            errors.push("El correo del usuario es obligatorio");
        }
        if (!password || password.trim() === "") {
            -errors.push("La contraseña es obligatoria");
        }
        if (!documentId || documentId.trim() === "") {
            errors.push("El documento de identidad es obligatorio");
        }
        if (!postJob || postJob.trim() === "") {
            errors.push("El cargo del usuario es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response(false, "error al actualizar el usurio", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { id, name, email, password, documentId, postJob };
        const user = await UserUpdate(data);
        var response = new Response(true, "Usuario actualizado exitosamente", user);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en updateUser:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        var errors = [];
        if (!id) {
            errors.push("El ID del usuario es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response(false, "error al eliminar el usurio", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { id };
        const user = await userDelete(data);
        var response = new Response(true, "Usuario Inactivado exitosamente", user);
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error en deleteUser:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
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
