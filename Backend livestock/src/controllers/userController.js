const { getUserById, userCreate, userUpdate, userDelete, usersGetAll } = require("../services/userService");
const Response = require("../functions/response");
const fs = require("fs");
const path = require("path");
const { sendEmail } = require("../services/emailService");

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
        const { userId } = req.params;
        var errors = [];
        if (!userId) {
            errors.push("El ID del usuario es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al obtener el usuario", null, errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        data = { userId };
        const user = await getUserById(userId);
        var response = new Response(`Usuario ${userId} obtenido exitosamente`, user, null);
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

        // Leer JSON
        const emailTemplatePath = path.join(process.cwd(),"public", "confirmEmail.json");
        const confirmTemplate = fs.readFileSync(emailTemplatePath,"utf-8");
        const dataTemplate = JSON.parse(confirmTemplate);

        // Leer HTML
        const htmlPath = path.join(process.cwd(), dataTemplate.html);
        let htmlModific = fs.readFileSync(htmlPath, "utf-8");

        // Datos dinámicos
        dataTemplate.params["@nombre"] = name;
        dataTemplate.params["@fecha"] = new Date().toLocaleDateString("es-CO");
        dataTemplate.params["@año"] = new Date().getFullYear();
        dataTemplate.params["link"] = ``;

        // Reemplazar variables
        for (const key in dataTemplate.params) {
            htmlModific = htmlModific.replaceAll(
                key,
                dataTemplate.params[key]
            );
        }
        
        // Mostrar el HTML en consola
        console.log("===== HTML DEL CORREO =====");
        console.log(htmlModific);
        console.log("===== FIN HTML =====");
        console.log("Enviando correo a:", email);

        await sendEmail(
            email,
            dataTemplate.subject,
            "Confirma tu correo electrónico",
            htmlModific
        );
        console.log("Correo enviado correctamente");

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
        const { userId } = req.params;
        const { name, email, password, documentId, postJob } = req.body;
        var errors = [];
        
        if (!userId) errors.push("El ID del usuario es obligatorio");
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
        const user = await userUpdate(userId, data);
        var response = new Response(`Usuario ${userId} actualizado exitosamente`, user, null); 
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
        const { userId } = req.params;
        var errors = [];
        if (!userId) {
            errors.push("El ID del usuario es obligatorio");
        }
        if (errors.length > 0) {
            var response = new Response("Error al eliminar el usuario", null, errors); 
            res.status(400);
            res.json(response.json);
            return;
        }
        const user = await userDelete(userId);
        var response = new Response(`Usuario ${userId} inactivado exitosamente`, { userId }, null); 
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