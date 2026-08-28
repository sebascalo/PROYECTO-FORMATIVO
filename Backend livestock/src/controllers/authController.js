const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { Response } = require("../functions/response");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "akhkjlvcakjhjlf666";

//inicio de sesión
const login = (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName == "" || password == "") {
      res.status(400);
      const response = new Response(
        "Error en login",
        null,
        "Usuario o contraseña vacíos",
      );

      return res.json(response);
    }
    var token = jwt.sign({ user: userName }, JWT_KEY_SECRET, {
      expiresIn: "1h",
    });

    const response = new Response("login successful", { token }, null);
    res.json(response.success);
  } catch (error) {
    console.error("Error en login:", error);
    const errorResponse = new Response("Error interno del servidor", null, [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

// recuperar contraseña
const resetPassword = (req, res) => {
  const { email } = req.body;
  if (email == "") {
    res.status(400);
    const response = new Response("Error recuperación contraseña",null,"El correo es obligatorio",);
    return res.json(response);
  }
  const response = new Response("Solicitud de recuperación enviada",{email,},null,);
  return res.json(response.success);
};

//validar recuperación de contraseña
const validateResetPassword = (req, res) => {
   const { token } = req.body;
    if (token == "") {
        res.status(400);
        const response = new Response("Error validando recuperación",null, "Token requerido"
        );

        return res.json(response);

    }


    const response = new Response(
        "Token válido",
        {
            token
        },
        null
    );


    return res.json(response.success);

};

//nueva contraseña
const newPassword = (req, res) => {
  const { password, confirmPassword } = req.body;


    if (password == "" || confirmPassword == "") {

        res.status(400);

        const response = new Response(
            "Error cambiando contraseña",
            null,
            "Las contraseñas son obligatorias"
        );

        return res.json(response);

    }


    if (password != confirmPassword) {

        res.status(400);

        const response = new Response(
            "Error cambiando contraseña",
            null,
            "Las contraseñas no coinciden"
        );

        return res.json(response);

    }


    const response = new Response(
        "Contraseña actualizada correctamente",
        null,
        null
    );


    return res.json(response.success);

};

module.exports = {
  login,
  resetPassword,
  validateResetPassword,
  newPassword,
};
