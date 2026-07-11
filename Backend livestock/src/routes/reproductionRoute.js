const express = require('express');
const router = express.Router();
const {getAllReproductions, getReproductionById, createReproduction, updateReproduction, deleteReproduction} = require("../controllers/reproductionController");

/**
 * @swagger
 * /api/reproduction:
 *   get:
 *     summary: Obtener todas las reproducciones
 *     description: Retorna una lista de todas las reproducciones registradas en el sistema.
 *     responses:
 *       200:
 *         description: Lista de reproducciones obtenida exitosamente
 */

// Rutas para reproducción
router.get("/reproduction", getAllReproductions);

/**
 * @swagger
 * /api/reproduction/{id}:
 *   get:
 *     summary: Obtener reproducción por ID
 *     description: Retorna una reproducción según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reproducción
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reproducción encontrada
 */

// Rutas para reproducción con id
router.get("/reproduction/:id", getReproductionById);

/**
 * @swagger
 * /api/reproduction:
 *   post:
 *     summary: Crear reproducción
 *     description: Crea una nueva reproducción en el sistema.
 *     responses:
 *       200:
 *         description: Reproducción creada exitosamente
 */

// Rutas para crear una nueva reproducción
router.post("/reproduction", createReproduction);

/**
 * @swagger
 * /api/reproduction/{id}:
 *   put:
 *     summary: Actualizar reproducción
 *     description: Actualiza una reproducción según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reproducción
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reproducción actualizada exitosamente
 */

// Rutas para actualizar una reproducción existente
router.put("/reproduction/:id", updateReproduction);

/**
 * @swagger
 * /api/reproduction/{id}:
 *   delete:
 *     summary: Inactivar reproducción
 *     description: Inactiva una reproducción según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reproducción
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reproducción inactivada exitosamente
 */

// Rutas para inactivar una reproducción existente
router.delete("/reproduction/:id", deleteReproduction);

module.exports = router;