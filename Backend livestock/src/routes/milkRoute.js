const express = require ('express');
const router = express.Router();
const {getAllMilks, getAllMilksById, createMilk, updateMilk, deleteMilk} = require("../controllers/milkController");
const ValidateToken = require("../middlewares/handlerToken");

/**
 * @swagger
 * /api/MilkAll:
 *   get:
 *     summary: Obtener todas las producciones de leche
 *     description: Retorna una lista de todas las producciones de leche registradas en el sistema.
 *     responses:
 *       200:
 *         description: Lista de producciones de leche obtenida exitosamente
 */

//Rutas para produccion de leche
router.get("/MilkAll", ValidateToken, getAllMilks);

/**
 * @swagger
 * /api/MilkById/{id}:
 *   get:
 *     summary: Obtener producción de leche por ID
 *     description: Retorna una producción de leche según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la producción de leche
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producción de leche encontrada
 */

//Rutas para produccion de leche con id
router.get("/MilkById/:id", ValidateToken, getAllMilksById);

/**
 * @swagger
 * /api/CreateMilk:
 *   post:
 *     summary: Crear producción de leche
 *     description: Crea una nueva producción de leche en el sistema.
 *     responses:
 *       200:
 *         description: Producción de leche creada exitosamente
 */

//Rutas para crear nueva produccion de leche
router.post("/CreateMilk", ValidateToken, createMilk);

/**
 * @swagger
 * /api/UpdateMilk/{id}:
 *   put:
 *     summary: Actualizar producción de leche
 *     description: Actualiza una producción de leche según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la producción de leche
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producción de leche actualizada exitosamente
 */

//Rutas para actualizar una produccion de leche existente
router.put("/UpdateMilk/:id", ValidateToken, updateMilk);

/**
 * @swagger
 * /api/DeleteMilk/{id}:
 *   delete:
 *     summary: Inactivar producción de leche
 *     description: Inactiva una producción de leche según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la producción de leche
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producción de leche inactivada exitosamente
 */

//Rutas para inactivar una produccion de leche existente
router.delete("/DeleteMilk/:id", ValidateToken, deleteMilk);

module.exports= router;