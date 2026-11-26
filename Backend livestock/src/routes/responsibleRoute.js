const express = require('express');
const router = express.Router();
const { getAllResponsibles, getAllResponsiblesById, createResponsible, updateResponsible, deleteResponsible } = require("../controllers/responsibleController");
const ValidateToken = require("../middlewares/handlerToken");
const { authorizeRoles } = require("../middlewares/authMiddleware");

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
router.get("/ResponsibleAll", ValidateToken, authorizeRoles("admin", "instructor", "gestor", "pasante"), getAllResponsibles);

/**
 * @swagger
 * /api/ResponsibleById/{idResponsible}:
 *   get:
 *     summary: Obtener responsable por ID
 *     description: Retorna un responsable según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: idResponsible
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable encontrado
 */

// Rutas para responsables con id
router.get("/ResponsibleById/:idResponsible", ValidateToken, authorizeRoles("admin", "instructor", "gestor", "pasante"), getAllResponsiblesById);

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
router.post("/CreateResponsible", ValidateToken, authorizeRoles("admin", "instructor", "gestor", "pasante"), createResponsible);

/**
 * @swagger
 * /api/UpdateResponsible/{idResponsible}:
 *   put:
 *     summary: Actualizar responsable
 *     description: Actualiza un responsable según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: idResponsible
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable actualizado exitosamente
 */

// Rutas para actualizar un responsable existente
router.put("/UpdateResponsible/:idResponsible", ValidateToken, authorizeRoles("admin", "instructor", "gestor", "pasante"), updateResponsible);

/**
 * @swagger
 * /api/DeleteResponsible/{idResponsible}:
 *   delete:
 *     summary: Eliminar responsable
 *     description: Elimina un responsable según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: idResponsible
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable eliminado exitosamente
 */

// Rutas para eliminar un responsable existente
router.delete("/DeleteResponsible/:idResponsible", ValidateToken, authorizeRoles("admin", "instructor"), deleteResponsible);

module.exports = router;