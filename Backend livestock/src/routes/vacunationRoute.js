const router = require('express').Router();
const { getAllVacunations, getAllVacunationsById, createVacunation, updateVacunation, deleteVacunation } = require("../controllers/vacunationController");
const ValidateToken = require("../middlewares/handlerToken");

/**
 * @swagger
 * /api/VacunationAll:
 *   get:
 *     summary: Obtener todas las vacunaciones
 *     description: Retorna una lista de todas las vacunaciones registradas en el sistema.
 *     responses:
 *       200:
 *         description: Lista de vacunaciones obtenida exitosamente
 */

// Rutas para vacunaciones
router.get("/VacunationAll", ValidateToken, getAllVacunations);

/**
 * @swagger
 * /api/VacunationById/{id}:
 *   get:
 *     summary: Obtener vacunación por ID
 *     description: Retorna una vacunación según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la vacunación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vacunación encontrada
 */

// Rutas para vacunaciones con id
router.get("/VacunationById/:id", ValidateToken, getAllVacunationsById);

/**
 * @swagger
 * /api/CreateVacunation:
 *   post:
 *     summary: Crear vacunación
 *     description: Crea una nueva vacunación en el sistema.
 *     responses:
 *       200:
 *         description: Vacunación creada exitosamente
 */

// Rutas para crear una nueva vacunación
router.post("/CreateVacunation", ValidateToken, createVacunation);

/**
 * @swagger
 * /api/UpdateVacunation/{id}:
 *   put:
 *     summary: Actualizar vacunación
 *     description: Actualiza una vacunación según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la vacunación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vacunación actualizada exitosamente
 */

// Rutas para actualizar una vacunación existente
router.put("/UpdateVacunation/:id", ValidateToken, updateVacunation);

/**
 * @swagger
 * /api/DeleteVacunation/{id}:
 *   delete:
 *     summary: Inactivar vacunación
 *     description: Inactiva una vacunación según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la vacunación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vacunación inactivada exitosamente
 */

// Rutas para eliminar una vacunación existente
router.delete("/DeleteVacunation/:id", ValidateToken, deleteVacunation);

module.exports = router;