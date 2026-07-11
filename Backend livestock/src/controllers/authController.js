const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const {Response} = require("../functions/response");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "akhkjlvcakjhjlf666";

const login = (req, res) => {
  const { userName, password } = req.body;
  if ( userName == "" || password == "") {

      res.status(400);
      const response = new Response( "Error en login", null, "Usuario o contraseña vacíos");

      return res.json(response);
  }
  var token = jwt.sign({ user: userName }, JWT_KEY_SECRET, { expiresIn: "1h" });

  const response = new Response("login successful", { token }, null);
  res.json(response.success);
};
module.exports = {
  login
};