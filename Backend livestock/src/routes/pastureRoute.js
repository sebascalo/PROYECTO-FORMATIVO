const express = require ('express');
const router = express.Router();
const {getAllPastures, getAllPasturesById, createPasture, updatePasture, deletePasture} = require("../controllers/pastureController");

/**
 * @swagger
 * /api/pastureAll:
 *   get:
 *     summary: Obtener todos los potreros
 *     description: Retorna una lista de todos los potreros registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de potreros obtenida exitosamente
 */

//Rutas para potreros
router.get("/pastureAll", getAllPastures); 

/**
 * @swagger
 * /api/pasture/{id}:
 *   get:
 *     summary: Obtener potrero por ID
 *     description: Retorna un potrero según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del potrero
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Potrero encontrado
 */

//Rutas para potreros con id
router.get("/pasture/:id", getAllPasturesById);

/**
 * @swagger
 * /api/pasture:
 *   post:
 *     summary: Crear potrero
 *     description: Crea un nuevo potrero en el sistema.
 *     responses:
 *       200:
 *         description: Potrero creado exitosamente
 */

//Rutas para crear un nuevo potrero
router.post("/pasture", createPasture);

/**
 * @swagger
 * /api/pasture/{id}:
 *   put:
 *     summary: Actualizar potrero
 *     description: Actualiza un potrero según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del potrero
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Potrero actualizado exitosamente
 */

//Rutas para actualizar un potrero existente
router.put("/pasture/:id", updatePasture);

/**
 * @swagger
 * /api/pasture/{id}:
 *   delete:
 *     summary: Inactivar potrero
 *     description: Inactiva un potrero según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del potrero
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Potrero inactivado exitosamente
 */

//Rutas para inactivar un potrero existente
router.delete("/pasture/:id", deletePasture);

module.exports= router;