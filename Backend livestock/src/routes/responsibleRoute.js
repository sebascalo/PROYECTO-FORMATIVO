const express = require('express');
const router = express.Router();
const {getAllResponsibles, getResponsibleById, createResponsible, updateResponsible, deleteResponsible} = require("../controllers/responsibleController");

/**
 * @swagger
 * /api/responsible:
 *   get:
 *     summary: Obtener todos los responsables
 *     description: Retorna una lista de todos los responsables registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de responsables obtenida exitosamente
 */

// Rutas para responsables
router.get("/responsible", getAllResponsibles);

/**
 * @swagger
 * /api/responsible/{id}:
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

// Rutas para responsable con id
router.get("/responsible/:id", getResponsibleById);

/**
 * @swagger
 * /api/responsible:
 *   post:
 *     summary: Crear responsable
 *     description: Crea un nuevo responsable en el sistema.
 *     responses:
 *       200:
 *         description: Responsable creado exitosamente
 */

// Rutas para crear un nuevo responsable
router.post("/responsible", createResponsible);

/**
 * @swagger
 * /api/responsible/{id}:
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
router.put("/responsible/:id", updateResponsible);

/**
 * @swagger
 * /api/responsible/{id}:
 *   delete:
 *     summary: Inactivar responsable
 *     description: Inactiva un responsable según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable inactivado exitosamente
 */

// Rutas para inactivar un responsable existente
router.delete("/responsible/:id", deleteResponsible);

module.exports = router;