const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const {Response} = require("../functions/response");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "akhkjlvcakjhjlf666";

//inicio de sesión
const login = (req, res) => {
  try {
  const { userName, password } = req.body;
  if ( userName == "" || password == "") {

      res.status(400);
      const response = new Response( "Error en login", null, "Usuario o contraseña vacíos");

      return res.json(response);
  }
  var token = jwt.sign({ user: userName }, JWT_KEY_SECRET, { expiresIn: "1h" });

  const response = new Response("login successful", { token }, null);
  res.json(response.success);
  } catch (error) {
    console.error("Error en login:", error);
    const errorResponse = new Response("Error interno del servidor", null, [
      { message: error.message || "Ocurrió un error inesperado" }
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

// recuperar contraseña
const resetPassword = (req, res) => {
  // Lógica para enviar correo electrónico de recuperación de contraseña
};

//validar recuperación de contraseña
const validateResetPassword = (req, res) => {
  // Lógica para validar la recuperación de contraseña
};

//nueva contraseña
const newPassword = (req, res) => {
  // Lógica para establecer una nueva contraseña
};

module.exports = {
  login,
  resetPassword,
  validateResetPassword,
  newPassword
};