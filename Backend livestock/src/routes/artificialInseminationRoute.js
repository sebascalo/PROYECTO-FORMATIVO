const express = require('express');
const router = express.Router();
const { getAllArtificialInseminations, getAllArtificialInseminationsById, createArtificialInsemination, updateArtificialInsemination, deleteArtificialInsemination } = require("../controllers/artificialInseminationController");

/**
 * @swagger
 * /api/ArtificialInseminationAll:
 *   get:
 *     summary: Obtener todas las inseminaciones artificiales
 *     description: Retorna una lista de todas las inseminaciones artificiales registradas en el sistema.
 *     responses:
 *       200:
 *         description: Lista de inseminaciones artificiales obtenida exitosamente
 */

// Rutas para inseminaciones artificiales
router.get("/ArtificialInseminationAll", getAllArtificialInseminations);

/**
 * @swagger
 * /api/ArtificialInseminationById/{id}:
 *   get:
 *     summary: Obtener inseminación artificial por ID
 *     description: Retorna una inseminación artificial según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la inseminación artificial
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inseminación artificial encontrada
 */

// Rutas para inseminaciones artificiales con id
router.get("/ArtificialInseminationById/:id", getAllArtificialInseminationsById);

/**
 * @swagger
 * /api/CreateArtificialInsemination:
 *   post:
 *     summary: Crear inseminación artificial
 *     description: Crea una nueva inseminación artificial en el sistema.
 *     responses:
 *       200:
 *         description: Inseminación artificial creada exitosamente
 */

// Rutas para crear una nueva inseminación artificial
router.post("/CreateArtificialInsemination", createArtificialInsemination);

/**
 * @swagger
 * /api/UpdateArtificialInsemination/{id}:
 *   put:
 *     summary: Actualizar inseminación artificial
 *     description: Actualiza una inseminación artificial según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la inseminación artificial
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inseminación artificial actualizada exitosamente
 */

// Rutas para actualizar una inseminación artificial existente
router.put("/UpdateArtificialInsemination/:id", updateArtificialInsemination);

/**
 * @swagger
 * /api/DeleteArtificialInsemination/{id}:
 *   delete:
 *     summary: Eliminar inseminación artificial
 *     description: Elimina una inseminación artificial según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la inseminación artificial
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inseminación artificial eliminada exitosamente
 */

// Rutas para eliminar una inseminación artificial existente
router.delete("/DeleteArtificialInsemination/:id", deleteArtificialInsemination);

module.exports = router;