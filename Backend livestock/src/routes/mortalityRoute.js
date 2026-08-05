const express = require('express');
const router = express.Router();
const { getAllMortalities, getAllMortalitiesById, createMortality, updateMortality, deleteMortality } = require("../controllers/mortalityController");

/**
 * @swagger
 * /api/MortalityAll:
 *   get:
 *     summary: Obtener todos los registros de mortalidad
 *     description: Retorna una lista de todos los registros de mortalidad en el sistema.
 *     responses:
 *       200:
 *         description: Lista de registros de mortalidad obtenida exitosamente
 */

// Rutas para mortalidad
router.get("/MortalityAll", getAllMortalities);

/**
 * @swagger
 * /api/MortalityById/{id}:
 *   get:
 *     summary: Obtener registro de mortalidad por ID
 *     description: Retorna un registro de mortalidad según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de mortalidad
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de mortalidad encontrado
 */

// Rutas para mortalidad con id
router.get("/MortalityById/:id", getAllMortalitiesById);

/**
 * @swagger
 * /api/CreateMortality:
 *   post:
 *     summary: Crear registro de mortalidad
 *     description: Crea un nuevo registro de mortalidad en el sistema.
 *     responses:
 *       200:
 *         description: Registro de mortalidad creado exitosamente
 */

// Rutas para crear un nuevo registro de mortalidad
router.post("/CreateMortality", createMortality);

/**
 * @swagger
 * /api/UpdateMortality/{id}:
 *   put:
 *     summary: Actualizar registro de mortalidad
 *     description: Actualiza un registro de mortalidad según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de mortalidad
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de mortalidad actualizado exitosamente
 */

// Rutas para actualizar un registro de mortalidad existente
router.put("/UpdateMortality/:id", updateMortality);

/**
 * @swagger
 * /api/DeleteMortality/{id}:
 *   delete:
 *     summary: Eliminar registro de mortalidad
 *     description: Elimina un registro de mortalidad según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de mortalidad
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de mortalidad eliminado exitosamente
 */

// Rutas para eliminar un registro de mortalidad existente
router.delete("/DeleteMortality/:id", deleteMortality);

module.exports = router;