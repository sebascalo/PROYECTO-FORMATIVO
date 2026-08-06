const express = require('express');
const router = express.Router();
const { getAllBirths, getAllBirthsById, createBirth, updateBirth, deleteBirth } = require("../controllers/birthController");
const ValidateToken = require("../middlewares/handlerToken");

/**
 * @swagger
 * /api/BirthAll:
 *   get:
 *     summary: Obtener todos los nacimientos
 *     description: Retorna una lista de todos los nacimientos registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de nacimientos obtenida exitosamente
 */

// Rutas para nacimientos
router.get("/BirthAll", ValidateToken, getAllBirths);

/**
 * @swagger
 * /api/BirthById/{id}:
 *   get:
 *     summary: Obtener nacimiento por ID
 *     description: Retorna un nacimiento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del nacimiento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nacimiento encontrado
 */

// Rutas para nacimientos con id
router.get("/BirthById/:id", ValidateToken, getAllBirthsById);

/**
 * @swagger
 * /api/CreateBirth:
 *   post:
 *     summary: Crear nacimiento
 *     description: Crea un nuevo nacimiento en el sistema.
 *     responses:
 *       200:
 *         description: Nacimiento creado exitosamente
 */

// Rutas para crear un nuevo nacimiento
router.post("/CreateBirth", ValidateToken, createBirth);

/**
 * @swagger
 * /api/UpdateBirth/{id}:
 *   put:
 *     summary: Actualizar nacimiento
 *     description: Actualiza un nacimiento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del nacimiento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nacimiento actualizado exitosamente
 */

// Rutas para actualizar un nacimiento existente
router.put("/UpdateBirth/:id", ValidateToken, updateBirth);

/**
 * @swagger
 * /api/DeleteBirth/{id}:
 *   delete:
 *     summary: Eliminar nacimiento
 *     description: Elimina un nacimiento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del nacimiento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nacimiento eliminado exitosamente
 */

// Rutas para eliminar un nacimiento existente
router.delete("/DeleteBirth/:id", ValidateToken, deleteBirth);

module.exports = router;