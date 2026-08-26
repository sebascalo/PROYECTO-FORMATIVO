const user = require('../models/userModel');

// crear usuario
const userCreate = async (data) => {
    try {
        const newUser = await user.create(data);
        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener todos los usuarios
const usersGetAll = async (limit,offset) => {
    try {
        const users = await user.findAll({offset: offset, limit: limit,});
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener usuario por id
const getUserById = async (userId) => {
    try {
        const userid = await user.findOne({ where: { userId } });
        return userid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar usuario
const userDelete = async (userId) => {
    try {
        const userDelete = await user.destroy({ where: { userId } });
        return userDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar usuario
const userUpdate = async (userId, data) => {
    try {
        // 1. Buscar el usuario
        const userToUpdate = await user.findOne({ where: { userId } });
        // 2. Si no existe, retornar null
        if (!userToUpdate) {
            return null;
        }
        // 3. Actualizar el usuario
        await userToUpdate.update(data);
        // 4. Retornar el usuario actualizado COMPLETO
        return userToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    userCreate,
    usersGetAll,
    getUserById,
    userDelete,
    userUpdate
}