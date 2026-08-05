const express = require ('express');
const router = express.Router();
const {getAllPastures, getAllPasturesById, createPasture, updatePasture, deletePasture} = require("../controllers/pastureController");
const ValidateToken = require("../middlewares/handlerToken");

/**
 * @swagger
 * /api/PastureAll:
 *   get:
 *     summary: Obtener todos los potreros
 *     description: Retorna una lista de todos los potreros registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de potreros obtenida exitosamente
 */

//Rutas para potreros
router.get("/PastureAll", ValidateToken, getAllPastures); 

/**
 * @swagger
 * /api/PastureById/{id}:
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
router.get("/PastureById/:id", ValidateToken, getAllPasturesById);

/**
 * @swagger
 * /api/CreatePasture:
 *   post:
 *     summary: Crear potrero
 *     description: Crea un nuevo potrero en el sistema.
 *     responses:
 *       200:
 *         description: Potrero creado exitosamente
 */

//Rutas para crear un nuevo potrero
router.post("/CreatePasture", ValidateToken, createPasture);

/**
 * @swagger
 * /api/UpdatePasture/{id}:
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
router.put("/UpdatePasture/:id", ValidateToken, updatePasture);

/**
 * @swagger
 * /api/DeletePasture/{id}:
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

//Rutas para eliminar un potrero existente
router.delete("/DeletePasture/:id", ValidateToken, deletePasture);

module.exports= router;