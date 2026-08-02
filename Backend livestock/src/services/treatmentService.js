const treatment = require('../models/treatmentModel');

// Crear tratamiento
const treatmentCreate = async (data) => {
    try {
        const newTreatment = await treatment.create(data);
        return newTreatment;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener todos los tratamientos
const treatmentsGetAll = async () => {
    try {
        const treatments = await treatment.findAll();
        return treatments;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Obtener tratamiento por ID
const getTreatmentById = async (id) => {
    try {
        const treatmentid = await treatment.findOne({ where: { id } });
        return treatmentid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Eliminar tratamiento
const treatmentDelete = async (id) => {
    try {
        const treatmentDelete = await treatment.destroy({ where: { id } });
        return treatmentDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Actualizar tratamiento
const treatmentUpdate = async (id, data) => {
    try {
        const treatmentToUpdate = await treatment.findOne({ where: { id } });
        if (!treatmentToUpdate) {
            return null;
        }
        await treatmentToUpdate.update(data);
        return treatmentToUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    treatmentCreate,
    treatmentsGetAll,
    getTreatmentById,
    treatmentDelete,
    treatmentUpdate
};