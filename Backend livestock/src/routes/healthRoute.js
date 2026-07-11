const express = require('express');
const router = express.Router();
const {getAllHealth, getAllHealthById, createHealth, updateHealth, deleteHealth} = require("../controllers/healthController");

/**
 * @swagger
 * /api/healthAll:
 *   get:
 *     summary: Obtener todos los registros de salud
 *     description: Retorna una lista de todos los registros de salud registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de registros de salud obtenida exitosamente
 */

//Consultar todos registros de salud
router.get('/healthAll', getAllHealth);

/**
 * @swagger
 * /api/health/{id}:
 *   get:
 *     summary: Obtener registro de salud por ID
 *     description: Retorna un registro de salud según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de salud
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de salud encontrado
 */

//consulta individual de salud por id
router.get('/health/:id', getAllHealthById);

/**
 * @swagger
 * /api/health:
 *   post:
 *     summary: Crear registro de salud
 *     description: Crea un nuevo registro de salud en el sistema.
 *     responses:
 *       200:
 *         description: Registro de salud creado exitosamente
 */

//Crear registro de salud
router.post('/health', createHealth);

/**
 * @swagger
 * /api/health/{id}:
 *   put:
 *     summary: Actualizar registro de salud
 *     description: Actualiza un registro de salud según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de salud
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de salud actualizado exitosamente
 */

//Actualizar registro de salud
router.put('/health/:id', updateHealth);

/**
 * @swagger
 * /api/health/{id}:
 *   delete:
 *     summary: Inactivar registro de salud
 *     description: Inactiva un registro de salud según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de salud
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de salud inactivado exitosamente
 */

//Inactivar registro de salud
router.delete('/health/:id', deleteHealth);

module.exports = router;