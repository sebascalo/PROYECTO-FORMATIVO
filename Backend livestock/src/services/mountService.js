const mount = require('../models/mountModel');

// Crear monta natural
const mountCreate = async (data) => {
    try {
        const newMount = await mount.create(data);
        return newMount;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todas las montas naturales
const mountsGetAll = async (limit, offset) => {
    try {
        const mounts = await mount.findAll({ offset: offset, limit: limit });
        return mounts;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener monta natural por ID
const getMountById = async (id_mount) => {
    try {
        const mountid = await mount.findOne({ where: { id_mount } });
        return mountid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar monta natural
const mountDelete = async (id_mount) => {
    try {
        const mountDelete = await mount.destroy({ where: { id_mount } });
        return mountDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar monta natural
const mountUpdate = async (id_mount, data) => {
    try {
        const mountToUpdate = await mount.findOne({ where: { id_mount } });
        if (!mountToUpdate) {
            return null;
        }
        await mountToUpdate.update(data);
        return mountToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    mountCreate,
    mountsGetAll,
    getMountById,
    mountDelete,
    mountUpdate
};