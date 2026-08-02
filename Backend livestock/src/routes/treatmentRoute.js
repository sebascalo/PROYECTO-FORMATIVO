const express = require('express');
const router = express.Router();
const { getAllTreatments, getAllTreatmentsById, createTreatment, updateTreatment, deleteTreatment } = require("../controllers/treatmentController");

/**
 * @swagger
 * /api/TreatmentAll:
 *   get:
 *     summary: Obtener todos los tratamientos
 *     description: Retorna una lista de todos los tratamientos registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de tratamientos obtenida exitosamente
 */

// Rutas para tratamientos
router.get("/TreatmentAll", getAllTreatments);

/**
 * @swagger
 * /api/TreatmentById/{id}:
 *   get:
 *     summary: Obtener tratamiento por ID
 *     description: Retorna un tratamiento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tratamiento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tratamiento encontrado
 */

// Rutas para tratamientos con id
router.get("/TreatmentById/:id", getAllTreatmentsById);

/**
 * @swagger
 * /api/CreateTreatment:
 *   post:
 *     summary: Crear tratamiento
 *     description: Crea un nuevo tratamiento en el sistema.
 *     responses:
 *       200:
 *         description: Tratamiento creado exitosamente
 */

// Rutas para crear un nuevo tratamiento
router.post("/CreateTreatment", createTreatment);

/**
 * @swagger
 * /api/UpdateTreatment/{id}:
 *   put:
 *     summary: Actualizar tratamiento
 *     description: Actualiza un tratamiento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tratamiento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tratamiento actualizado exitosamente
 */

// Rutas para actualizar un tratamiento existente
router.put("/UpdateTreatment/:id", updateTreatment);

/**
 * @swagger
 * /api/DeleteTreatment/{id}:
 *   delete:
 *     summary: Eliminar tratamiento
 *     description: Elimina un tratamiento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tratamiento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tratamiento eliminado exitosamente
 */

// Rutas para eliminar un tratamiento existente
router.delete("/DeleteTreatment/:id", deleteTreatment);

module.exports = router;