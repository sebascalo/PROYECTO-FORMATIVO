const express = require("express");
const router = express.Router();
const ValidateToken = require("../middlewares/handlerToken");

const {
    getAllUsers,
    getAllUsersById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

/**
 * @swagger
 * /api/users/UserAll:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de todos los usuarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 */

// Obtener usuarios
router.get("/UserAll",ValidateToken, getAllUsers);

/**
 * @swagger
 * /api/users/UserById/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Retorna un usuario según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */

// Obtener usuario por ID
router.get("/UserById/:id",ValidateToken, getAllUsersById);

/**
 * @swagger
 * /api/user/CreateUser:
 *   post:
 *     summary: Crear usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 */

// Crear usuario
router.post("/CreateUser",ValidateToken, createUser);

/**
 * @swagger
 * /api/users/UpdateUser/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     description: Actualiza un usuario según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */

// Actualizar usuario
router.put("/UpdateUser/:id",ValidateToken, updateUser);

/**
 * @swagger
 * /api/users/DeleteUser/{id}:
 *   delete:
 *     summary: Inactivar usuario
 *     description: Inactiva un usuario según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario inactivado exitosamente
 */

// Inactivar usuario
router.delete("/DeleteUser/:id",ValidateToken, deleteUser);

module.exports = router;