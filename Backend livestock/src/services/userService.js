const user = require('../models/userModel');

// crear usuario
const userCreate = async (data) => {
    try {
        const newUser = await user.create(data);
        return newUser;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}                                                                                                                   
// obtener todos los usuarios
const getAllUsers = async () => {
    try {
        const users = await user.findAll();
        return users;
    }catch (error) {
        console.log(error);
        throw error; 
    }
}
// obtener usuario por id
const getUserById = async (id) => {
    try {
        const userid = await user.findOne({ where: { id } });
        return userid;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
// eliminar usuario
const userDelete = async (id) => {
    try {
        const userDelete = await user.destroy({ where: { id } });
        return userDelete;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
// actualizar usuario
const UserUpdate = async (id, data) => {
    try {
        const UserUpdate = await user.update(data, { where: { id } });
        return UserUpdate;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    userCreate,
    getAllUsers,
    getUserById,
    userDelete,
    UserUpdate
}