const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const { login, resetPassword, validateResetPassword, newPassword } = require("../controllers/authController");

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

// Rutas para restablecer contraseña
// Ruta para solicitar restablecimiento de contraseña
router.post('/reset-password', resetPassword);
// Ruta para validar el restablecimiento de contraseña
router.post('/validate-reset-password', validateResetPassword);
// Ruta para establecer una nueva contraseña
router.post('/new-password', newPassword);

module.exports = router;