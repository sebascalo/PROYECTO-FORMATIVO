const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const { login } = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login usuario
 *     description: Genera un token JWT para autenticación.
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */

// Ruta login
router.post('/login', login);

module.exports = router;