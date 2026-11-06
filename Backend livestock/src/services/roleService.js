const role = require('../models/roleModel');

const roleCreate = async (data) => {
    try {
        return await role.create(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const rolesGetAll = async (limit, offset) => {
    try {
        return await role.findAll({ offset: offset, limit: limit });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getRoleById = async (id) => {
    try {
        return await role.findOne({ where: { id } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const roleDelete = async (id) => {
    try {
        return await role.destroy({ where: { id } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const roleUpdate = async (id, data) => {
    try {
        const roleToUpdate = await role.findOne({ where: { id } });
        if (!roleToUpdate) return null;
        await roleToUpdate.update(data);
        return roleToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { roleCreate, rolesGetAll, getRoleById, roleDelete, roleUpdate };