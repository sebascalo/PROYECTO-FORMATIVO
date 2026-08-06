const express = require('express');
const router = express.Router();
const { getAllMounts, getAllMountsById, createMount, updateMount, deleteMount } = require("../controllers/mountController");
const ValidateToken = require("../middlewares/handlerToken");

/**
 * @swagger
 * /api/MountAll:
 *   get:
 *     summary: Obtener todas las montas naturales
 *     description: Retorna una lista de todas las montas naturales registradas en el sistema.
 *     responses:
 *       200:
 *         description: Lista de montas naturales obtenida exitosamente
 */

// Rutas para montas naturales
router.get("/MountAll", ValidateToken, getAllMounts);

/**
 * @swagger
 * /api/MountById/{id}:
 *   get:
 *     summary: Obtener monta natural por ID
 *     description: Retorna una monta natural según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la monta natural
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Monta natural encontrada
 */

// Rutas para montas naturales con id
router.get("/MountById/:id", ValidateToken, getAllMountsById);

/**
 * @swagger
 * /api/CreateMount:
 *   post:
 *     summary: Crear monta natural
 *     description: Crea una nueva monta natural en el sistema.
 *     responses:
 *       200:
 *         description: Monta natural creada exitosamente
 */

// Rutas para crear una nueva monta natural
router.post("/CreateMount", ValidateToken, createMount);

/**
 * @swagger
 * /api/UpdateMount/{id}:
 *   put:
 *     summary: Actualizar monta natural
 *     description: Actualiza una monta natural según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la monta natural
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Monta natural actualizada exitosamente
 */

// Rutas para actualizar una monta natural existente
router.put("/UpdateMount/:id", ValidateToken, updateMount);

/**
 * @swagger
 * /api/DeleteMount/{id}:
 *   delete:
 *     summary: Eliminar monta natural
 *     description: Elimina una monta natural según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la monta natural
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Monta natural eliminada exitosamente
 */

// Rutas para eliminar una monta natural existente
router.delete("/DeleteMount/:id", ValidateToken, deleteMount);

module.exports = router;