const express = require('express');
const router = express.Router();
const {getAllCattle, getCattleById, createCattle, updateCattle, deleteCattle} = require("../controllers/cattleController");

/**
 * @swagger
 * /api/cattleAll:
 *   get:
 *     summary: Obtener todos los bovinos
 *     description: Retorna una lista de todos los bovinos registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de bovinos obtenida exitosamente
 */

// Rutas para bovino
router.get("/cattleAll", getAllCattle); 

/**
 * @swagger
 * /api/cattle/{id}:
 *   get:
 *     summary: Obtener bovino por ID
 *     description: Retorna un bovino según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del bovino
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bovino encontrado
 */
 
// Rutas para bovino con id
router.get("/cattle/:id",  getCattleById);

/**
 * @swagger
 * /api/cattle:
 *   post:
 *     summary: Crear bovino
 *     description: Crea un nuevo bovino en el sistema.
 *     responses:
 *       200:
 *         description: Bovino creado exitosamente
 */

// Rutas para crear una nueva reproducción
router.post("/cattle", createCattle);

/**
 * @swagger
 * /api/cattle/{id}:
 *   put:
 *     summary: Actualizar bovino
 *     description: Actualiza un bovino según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del bovino
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bovino actualizado exitosamente
 */

// Rutas para actualizar un bovino existente
router.put("/cattle/:id", updateCattle);

/**
 * @swagger
 * /api/cattle/{id}:
 *   delete:
 *     summary: Inactivar bovino
 *     description: Inactiva un bovino según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del bovino
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bovino inactivado exitosamente
 */

// Rutas para inactivar un bovino existente
router.delete("/cattle/:id", deleteCattle);

module.exports = router;