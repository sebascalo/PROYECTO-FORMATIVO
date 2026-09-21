const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require('../services/userService');
const User = require("../models/userModel");

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
    if (!user) {
      const response = new Response(
        "Error en login",
        null,
        "Usuario y contraseña incorrectos"
      );
      return res.status(400).json(response.json);
    }

    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      const response = new Response(
        "Error en login",
        null,
        "Usuario y contraseña incorrectos"
      );

      return res.status(400).json(response.json);
    }

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

// nueva contraseña
const newPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validar campos
    if (!email || !password || !confirmPassword) {
      const response = new Response(
        "Error cambiando contraseña",
        null,
        "El correo y las contraseñas son obligatorios",
      );

      return res.status(400).json(response);
    }

    // Validar contraseñas
    if (password !== confirmPassword) {
      const response = new Response(
        "Error cambiando contraseña",
        null,
        "Las contraseñas no coinciden",
      );

      return res.status(400).json(response);
    }

    // Buscar usuario por correo
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // Verificar que exista
    if (!user) {
      const response = new Response(
        "Error cambiando contraseña",
        null,
        "Usuario no encontrado",
      );

      return res.status(404).json(response);
    }

    // Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar contraseña
    user.password = hashedPassword;

    // Ya no hay una solicitud pendiente de cambio
    user.solNewPassword = false;

    await user.save();

    const response = new Response(
      "Contraseña actualizada correctamente",
      null,
      null,
    );

    return res.json(response.success);

  } catch (error) {
    console.error("Error cambiando contraseña:", error);

    const response = new Response(
      "Error cambiando contraseña",
      null,
      "Ocurrió un error al actualizar la contraseña",
    );

    return res.status(500).json(response);
  }
};

module.exports = {
  login,
  resetPassword,
  validateResetPassword,
  newPassword,
};
