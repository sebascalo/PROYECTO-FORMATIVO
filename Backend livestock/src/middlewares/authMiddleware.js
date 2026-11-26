const Response = require("../functions/response");

// Recibe los roles permitidos y devuelve el middleware
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {

        // Paso 1: verificar que ValidateToken haya cargado el usuario y su rol
        if (!req.user || !req.user.role) {
            const response = new Response("No se pudo verificar el rol del usuario", null, false);
            return res.status(403).json(response.json);
        }

        // Paso 2: comprobar si el rol del usuario está permitido
        if (!allowedRoles.includes(req.user.role)) {
            const response = new Response("No tienes permiso para realizar esta accion", null, false);
            return res.status(403).json(response.json);
        }

        // Paso 3: rol autorizado, continuar al controlador
        next();
    };
}

module.exports = { authorizeRoles };