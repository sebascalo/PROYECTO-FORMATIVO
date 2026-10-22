const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const { getUserByEmail, updateForEmailUser, getUserByToken} = require('../services/userService');
const User = require("../models/userModel");
const { sendEmail } = require("../services/emailService");

const  Response = require("../functions/response");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "akhkjlvcakjhjlf666";

// Inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == "" || password == "") {
      const response = new Response(
        "Error correo o contraseña vacios",
        null,
        "Correo o contraseña vacíos"
      );
      return res.status(400).json(response);
    }
    const user = await getUserByEmail(email);
    if (!user) {
      const response = new Response(
        "Error correo o contraseña incorrectos",
        null,
        "Usuario y contraseña incorrectos"
      );
      return res.status(400).json(response.json);
    }

    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      const response = new Response(
        "Error correo o contraseña incorrectos",
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
const resetPassword = async (req, res) => {
  try {
  const { email } = req.body;

  if (email == "") {
    res.status(400);
    const response = new Response(
      "Error recuperación contraseña",
      null,
      "El usurio no contiene informacion",
    );
    return res.json(response);
  }
  const user = await getUserByEmail(email);
  if (!user) {
    res.status(400);
    const response = new Response(
      "Usuario no encontrado",
      null,
      "El correo proporcionado no está registrado",
    );
    return res.json(response);
  }
  const token = Buffer.from(user.uuid).toString("base64");
  let data = {
    resetPasswordToken: token,
    solNewPassword: true
  };
  await updateForEmailUser(email, data);

  const routeTemplate = path.join(process.cwd(), "public", "recuperarPassword.json");
  const resetPasswordTemplate = fs.readFileSync(routeTemplate);
  const dataTemaplate = JSON.parse(resetPasswordTemplate);

  let htmlModific = fs.readFileSync(dataTemaplate.html, "utf-8");
  for (const key in dataTemaplate.params) {
    if (key === "@link") {
      htmlModific = htmlModific.replace(`{{${key}}}`, `${dataTemaplate.params[key]}=${token}`);
      continue;
    }
    htmlModific = htmlModific.replace(`{{${key}}}`, dataTemaplate.params[key]);
  }
    htmlModific = htmlModific.replace("{{@name}}", user.name);

  console.log("HTML Modificado:", email);
  await sendEmail(email, dataTemaplate.subject, null, htmlModific);

  const response = new Response(
    "Correo de recuperación enviado",
    {token},
  );
  return res.status(200).json(response.json);
  } catch (error) {
    console.error("Error en resetPassword:", error);
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

//validar recuperación de contraseña
const validateResetPassword = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      const response = new Response(
        "Error validando recuperación",
        null,
        "Token requerido",
      );
      return res.status(400).json(response.json);
    }
    // El token debe existir y la solicitud debe estar activa
    const user = await getUserByToken(token);
    if (!user) {
      const response = new Response(
        "Error validando recuperación",
        null,
        "El token es inválido o ya fue utilizado",
      );
      return res.status(400).json(response.json);
    }

    const response = new Response("Token válido", { token }, null);
    return res.json(response.success);

  } catch (error) {
    console.error("Error validando token:", error);
    const response = new Response(
      "Error interno del servidor",
      null,
      "Ocurrió un error al validar el token",
    );
    return res.status(500).json(response.json);
  }
};

// nueva contraseña
const newPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    // Validar campos
    if (!token || !password || !confirmPassword) {
      const response = new Response(
        "Error cambiando contraseña",
        null,
        "El token y las contraseñas son obligatorios",
      );
      return res.status(400).json(response.json);
    }

    // Validar contraseñas
    if (password !== confirmPassword) {
      const response = new Response(
        "Error cambiando contraseña",
        null,
        "Las contraseñas no coinciden",
      );
      return res.status(400).json(response.json);
    }

    // Buscar usuario por token (y que tenga solicitud activa)
    const user = await getUserByToken(token);

    if (!user) {
      const response = new Response(
        "Error cambiando contraseña",
        null,
        "El token es inválido o ya fue utilizado",
      );
      return res.status(400).json(response.json);
    }

    // Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar contraseña y limpiar la solicitud de recuperación
    user.password = hashedPassword;
    user.resetPasswordToken = null;
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
    return res.status(500).json(response.json);
  }
};

module.exports = {
  login,
  resetPassword,
  validateResetPassword,
  newPassword,
};
