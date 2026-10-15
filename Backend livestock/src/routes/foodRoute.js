const express = require('express');
const router = express.Router();
const { getAllFoods, getAllFoodsById, createFood, updateFood, deleteFood } = require("../controllers/foodController");
const ValidateToken = require("../middlewares/handlerToken");

/**
 * @swagger
 * /api/FoodAll:
 *   get:
 *     summary: Obtener todos los alimentos
 *     description: Retorna una lista de todos los alimentos registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de alimentos obtenida exitosamente
 */

// Rutas para alimentos
router.get("/FoodAll", ValidateToken, getAllFoods);

/**
 * @swagger
 * /api/FoodById/{id_food}:
 *   get:
 *     summary: Obtener alimento por ID
 *     description: Retorna un alimento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id_food
 *         required: true
 *         description: ID del alimento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimento encontrado
 */

// Rutas para alimentos con id
router.get("/FoodById/:id_food", ValidateToken, getAllFoodsById);

/**
 * @swagger
 * /api/CreateFood:
 *   post:
 *     summary: Crear alimento
 *     description: Crea un nuevo alimento en el sistema.
 *     responses:
 *       200:
 *         description: Alimento creado exitosamente
 */

// Rutas para crear un nuevo alimento
router.post("/CreateFood", ValidateToken, createFood);

/**
 * @swagger
 * /api/UpdateFood/{id_food}:
 *   put:
 *     summary: Actualizar alimento
 *     description: Actualiza un alimento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id_food
 *         required: true
 *         description: ID del alimento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimento actualizado exitosamente
 */

// Rutas para actualizar un alimento existente
router.put("/UpdateFood/:id_food", ValidateToken, updateFood);

/**
 * @swagger
 * /api/DeleteFood/{id_food}:
 *   delete:
 *     summary: Eliminar alimento
 *     description: Elimina un alimento según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id_food
 *         required: true
 *         description: ID del alimento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimento eliminado exitosamente
 */

// Rutas para eliminar un alimento existente
router.delete("/DeleteFood/:id_food", ValidateToken, deleteFood);

module.exports = router;