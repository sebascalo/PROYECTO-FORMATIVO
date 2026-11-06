const userRole = require('../models/userRoleModel');

const userRoleCreate = async (data) => {
    try {
        return await userRole.create(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const userRolesGetAll = async (limit, offset) => {
    try {
        return await userRole.findAll({ offset: offset, limit: limit });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUserRoleById = async (id) => {
    try {
        return await userRole.findOne({ where: { id } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const userRoleDelete = async (id) => {
    try {
        return await userRole.destroy({ where: { id } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// En este caso particular, actualizar un user_role suele ser cambiar el roleId
const userRoleUpdate = async (id, data) => {
    try {
        const userRoleToUpdate = await userRole.findOne({ where: { id } });
        if (!userRoleToUpdate) return null;
        await userRoleToUpdate.update(data);
        return userRoleToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { userRoleCreate, userRolesGetAll, getUserRoleById, userRoleDelete, userRoleUpdate };