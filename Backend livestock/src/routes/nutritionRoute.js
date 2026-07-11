const express = require('express');
const router = express.Router();
const {getAllNutritions, getNutritionById, createNutrition, updateNutrition, deleteNutrition} = require("../controllers/nutritionController");

/**
 * @swagger
 * /api/nutritionAll:
 *   get:
 *     summary: Obtener todas las nutriciones
 *     description: Retorna una lista de todas las nutriciones registradas en el sistema.
 *     responses:
 *       200:
 *         description: Lista de nutriciones obtenida exitosamente
 */

//Consultar todos
router.get('/nutritionAll', getAllNutritions);

/**
 * @swagger
 * /api/nutrition/{id}:
 *   get:
 *     summary: Obtener nutrición por ID
 *     description: Retorna una nutrición según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la nutrición
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nutrición encontrada
 */

//consulta individual
router.get('/nutrition/:id', getNutritionById);

/**
 * @swagger
 * /api/nutrition:
 *   post:
 *     summary: Crear nutrición
 *     description: Crea una nueva nutrición en el sistema.
 *     responses:
 *       200:
 *         description: Nutrición creada exitosamente
 */

//Crear
router.post('/nutrition', createNutrition);

/**
 * @swagger
 * /api/nutrition/{id}:
 *   put:
 *     summary: Actualizar nutrición
 *     description: Actualiza una nutrición según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la nutrición
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nutrición actualizada exitosamente
 */

//Actualizar
router.put('/nutrition/:id', updateNutrition);

/**
 * @swagger
 * /api/nutrition/{id}:
 *   delete:
 *     summary: Inactivar nutrición
 *     description: Inactiva una nutrición según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la nutrición
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nutrición inactivada exitosamente
 */

//Inactivar nutrición
router.delete('/nutrition/:id', deleteNutrition);

module.exports = router;