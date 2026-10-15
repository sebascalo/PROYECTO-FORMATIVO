const express = require('express');
const router = express.Router();
const { getAllCattles, getAllCattlesById, createCattle, updateCattle, deleteCattle } = require("../controllers/cattleController");
const ValidateToken = require("../middlewares/handlerToken");

/**
 * @swagger
 * /api/CattleAll:
 *   get:
 *     summary: Obtener todos los bovinos
 *     description: Retorna una lista de todos los bovinos registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de bovinos obtenida exitosamente
 */

// Rutas para bovinos
router.get("/CattleAll", ValidateToken, getAllCattles);

/**
 * @swagger
 * /api/CattleById/{id_Bovine}:
 *   get:
 *     summary: Obtener bovino por ID
 *     description: Retorna un bovino según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id_Bovine
 *         required: true
 *         description: ID del bovino
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bovino encontrado
 */

// Rutas para bovinos con id
router.get("/CattleById/:id_Bovine", ValidateToken, getAllCattlesById);

/**
 * @swagger
 * /api/CreateCattle:
 *   post:
 *     summary: Crear bovino
 *     description: Crea un nuevo bovino en el sistema.
 *     responses:
 *       200:
 *         description: Bovino creado exitosamente
 */

// Rutas para crear un nuevo bovino
router.post("/CreateCattle", ValidateToken, createCattle);

/**
 * @swagger
 * /api/UpdateCattle/{id_Bovine}:
 *   put:
 *     summary: Actualizar bovino
 *     description: Actualiza un bovino según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id_Bovine
 *         required: true
 *         description: ID del bovino
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bovino actualizado exitosamente
 */

// Rutas para actualizar un bovino existente
router.put("/UpdateCattle/:id_Bovine", ValidateToken, updateCattle);

/**
 * @swagger
 * /api/DeleteCattle/{id_Bovine}:
 *   delete:
 *     summary: Eliminar bovino
 *     description: Elimina un bovino según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id_Bovine
 *         required: true
 *         description: ID del bovino
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bovino eliminado exitosamente
 */

// Rutas para eliminar un bovino existente
router.delete("/DeleteCattle/:id_Bovine", ValidateToken, deleteCattle);

module.exports = router;