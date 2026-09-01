const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require('../services/userService');

const  Response = require("../functions/response");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "akhkjlvcakjhjlf666";

// Inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      const response = new Response(
        "Error en login",
        null,
        "Correo o contraseña vacíos"
      );

      return res.status(400).json(response);
    }

    const user = await getUserByEmail(email);

    // Si no existe el usuario
    if (!user) {
      const response = new Response(
        "Error en login",
        null,
        "Usuario y contraseña incorrectos"
      );

      return res.status(400).json(response.json);
    }

    // Comparar contraseña
    const match = bcrypt.compareSync(password, user.password);

    // Si la contraseña es incorrecta
    if (!match) {
      const response = new Response(
        "Error en login",
        null,
        "Usuario y contraseña incorrectos"
      );

      return res.status(400).json(response.json);
    }

    // Generar token SOLO si la contraseña es correcta
    const token = jwt.sign(
      { user: email },
      JWT_KEY_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const response = new Response(
      "login successful",
      { token },
      null
    );

    return res.json(response.success);

  } catch (error) {
    console.error("Error en login:", error);

    const errorResponse = new Response(
      "Error interno del servidor",
      null,
      [
        {
          message: error.message || "Ocurrió un error inesperado",
        },
      ]
    );

    return res.status(500).json(errorResponse.json);
  }
};


// recuperar contraseña
const resetPassword = (req, res) => {
  const { email } = req.body;
  if (email == "") {
    res.status(400);
    const response = new Response(
      "Error recuperación contraseña",
      null,
      "El correo es obligatorio",
    );
    return res.json(response);
  }
  const response = new Response(
    "Solicitud de recuperación enviada",
    { email },
    null,
  );
  return res.json(response.success);
};

//validar recuperación de contraseña
const validateResetPassword = (req, res) => {
  const { token } = req.body;
  if (token == "") {
    res.status(400);
    const response = new Response(
      "Error validando recuperación",
      null,
      "Token requerido",
    );

    return res.json(response);
  }

  const response = new Response(
    "Token válido",
    {
      token,
    },
    null,
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
      "Las contraseñas son obligatorias",
    );

    return res.json(response);
  }

  if (password != confirmPassword) {
    res.status(400);

    const response = new Response(
      "Error cambiando contraseña",
      null,
      "Las contraseñas no coinciden",
    );

    return res.json(response);
  }

  // Aquí puedes agregar la lógica para actualizar la contraseña en la base de datos
  const response = new Response(
    "Contraseña actualizada correctamente",
    null,
    null,
  );

  return res.json(response.success);
};

module.exports = {
  login,
  resetPassword,
  validateResetPassword,
  newPassword,
};
