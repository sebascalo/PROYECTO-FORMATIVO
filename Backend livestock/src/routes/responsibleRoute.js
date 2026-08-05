const express = require('express');
const router = express.Router();
const { getAllResponsibles, getAllResponsiblesById, createResponsible, updateResponsible, deleteResponsible } = require("../controllers/responsibleController");

/**
 * @swagger
 * /api/ResponsibleAll:
 *   get:
 *     summary: Obtener todos los responsables
 *     description: Retorna una lista de todos los responsables registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de responsables obtenida exitosamente
 */

// Rutas para responsables
router.get("/ResponsibleAll", getAllResponsibles);

/**
 * @swagger
 * /api/ResponsibleById/{id}:
 *   get:
 *     summary: Obtener responsable por ID
 *     description: Retorna un responsable según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable encontrado
 */

// Rutas para responsables con id
router.get("/ResponsibleById/:id", getAllResponsiblesById);

/**
 * @swagger
 * /api/CreateResponsible:
 *   post:
 *     summary: Crear responsable
 *     description: Crea un nuevo responsable en el sistema.
 *     responses:
 *       200:
 *         description: Responsable creado exitosamente
 */

// Rutas para crear un nuevo responsable
router.post("/CreateResponsible", createResponsible);

/**
 * @swagger
 * /api/UpdateResponsible/{id}:
 *   put:
 *     summary: Actualizar responsable
 *     description: Actualiza un responsable según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable actualizado exitosamente
 */

// Rutas para actualizar un responsable existente
router.put("/UpdateResponsible/:id", updateResponsible);

/**
 * @swagger
 * /api/DeleteResponsible/{id}:
 *   delete:
 *     summary: Eliminar responsable
 *     description: Elimina un responsable según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable eliminado exitosamente
 */

// Rutas para eliminar un responsable existente
router.delete("/DeleteResponsible/:id", deleteResponsible);

module.exports = router;