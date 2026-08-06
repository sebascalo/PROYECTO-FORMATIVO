const express = require('express');
const router = express.Router();
const { getAllWeighings, getAllWeighingsById, createWeighing, updateWeighing, deleteWeighing } = require("../controllers/weighingController");
const ValidateToken = require("../middlewares/handlerToken");

/**
 * @swagger
 * /api/WeighingAll:
 *   get:
 *     summary: Obtener todos los pesajes
 *     description: Retorna una lista de todos los pesajes registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de pesajes obtenida exitosamente
 */

// Rutas para pesajes
router.get("/WeighingAll", ValidateToken, getAllWeighings);

/**
 * @swagger
 * /api/WeighingById/{id}:
 *   get:
 *     summary: Obtener pesaje por ID
 *     description: Retorna un pesaje según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pesaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pesaje encontrado
 */

// Rutas para pesajes con id
router.get("/WeighingById/:id", ValidateToken, getAllWeighingsById);

/**
 * @swagger
 * /api/CreateWeighing:
 *   post:
 *     summary: Crear pesaje
 *     description: Crea un nuevo pesaje en el sistema.
 *     responses:
 *       200:
 *         description: Pesaje creado exitosamente
 */

// Rutas para crear un nuevo pesaje
router.post("/CreateWeighing", ValidateToken, createWeighing);

/**
 * @swagger
 * /api/UpdateWeighing/{id}:
 *   put:
 *     summary: Actualizar pesaje
 *     description: Actualiza un pesaje según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pesaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pesaje actualizado exitosamente
 */

// Rutas para actualizar un pesaje existente
router.put("/UpdateWeighing/:id", ValidateToken, updateWeighing);

/**
 * @swagger
 * /api/DeleteWeighing/{id}:
 *   delete:
 *     summary: Inactivar pesaje
 *     description: Inactiva un pesaje según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pesaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pesaje inactivado exitosamente
 */

// Rutas para eliminar un pesaje existente
router.delete("/DeleteWeighing/:id", ValidateToken, deleteWeighing);

module.exports = router;