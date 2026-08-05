const express = require('express');
const router = express.Router();
const { getAllNutritions, getAllNutritionsById, createNutrition, updateNutrition, deleteNutrition } = require("../controllers/nutritionController");

/**
 * @swagger
 * /api/NutritionAll:
 *   get:
 *     summary: Obtener todos los registros de nutrición
 *     description: Retorna una lista de todos los registros de nutrición en el sistema.
 *     responses:
 *       200:
 *         description: Lista de registros de nutrición obtenida exitosamente
 */

// Rutas para nutrición
router.get("/NutritionAll", getAllNutritions);

/**
 * @swagger
 * /api/NutritionById/{id}:
 *   get:
 *     summary: Obtener registro de nutrición por ID
 *     description: Retorna un registro de nutrición según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de nutrición
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de nutrición encontrado
 */

// Rutas para nutrición con id
router.get("/NutritionById/:id", getAllNutritionsById);

/**
 * @swagger
 * /api/CreateNutrition:
 *   post:
 *     summary: Crear registro de nutrición
 *     description: Crea un nuevo registro de nutrición en el sistema.
 *     responses:
 *       200:
 *         description: Registro de nutrición creado exitosamente
 */

// Rutas para crear un nuevo registro de nutrición
router.post("/CreateNutrition", createNutrition);

/**
 * @swagger
 * /api/UpdateNutrition/{id}:
 *   put:
 *     summary: Actualizar registro de nutrición
 *     description: Actualiza un registro de nutrición según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de nutrición
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de nutrición actualizado exitosamente
 */

// Rutas para actualizar un registro de nutrición existente
router.put("/UpdateNutrition/:id", updateNutrition);

/**
 * @swagger
 * /api/DeleteNutrition/{id}:
 *   delete:
 *     summary: Eliminar registro de nutrición
 *     description: Elimina un registro de nutrición según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de nutrición
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de nutrición eliminado exitosamente
 */

// Rutas para eliminar un registro de nutrición existente
router.delete("/DeleteNutrition/:id", deleteNutrition);

module.exports = router;