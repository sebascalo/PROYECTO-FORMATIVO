const Response = require("../functions/response");

const getAllNutritions = (req, res) => {
    res.json({ message: 'Obteniendo todos los registros de nutrición' });
}

const getNutritionById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Obteniendo la nutrición con ID ${id}` });
}
const createNutrition = (req, res) => {
    // Campos típicos de nutrición:
    // - animalId: ID del animal
    // - fecha: fecha de alimentación
    // - tipoAlimento: tipo de alimento (concentrado, forraje, etc.)
    // - cantidad: cantidad suministrada
    // - unidad: unidad de medida (kg, lb, etc.)
    // - observaciones: novedades o incidencias
    // - operarioId: ID del operario responsable
    const { 
        animalId, 
        fecha, 
        tipoAlimento, 
        cantidad, 
        unidad, 
        observaciones, 
        operarioId 
    } = req.body;
    const errores = [];
    // Validaciones
    if (!animalId || animalId.trim() === "") {
        errores.push("El ID del animal es obligatorio");
    }
    if (!fecha || fecha.trim() === "") {
        errores.push("La fecha de alimentación es obligatoria");
    } else if (isNaN(Date.parse(fecha))) {
        errores.push("La fecha no es válida");
    }
    if (!tipoAlimento || tipoAlimento.trim() === "") {
        errores.push("El tipo de alimento es obligatorio");
    }
    if (!cantidad || cantidad.toString().trim() === "") {
        errores.push("La cantidad de alimento es obligatoria");
    } else if (isNaN(cantidad)) {
        errores.push("La cantidad debe ser un número");
    }
    if (!unidad || unidad.trim() === "") {
        errores.push("La unidad de medida es obligatoria");
    }
    if (!operarioId || operarioId.trim() === "") {
        errores.push("El ID del operario encargado es obligatorio");
    }
    if (errores.length > 0) {
        const response = new Response(
            "Faltan datos obligatorios para crear el registro de nutrición", 
            null, 
            errores
        );
        return res.status(400).json(response.failed);
    }
    res.json({ 
        success: true,
        message: 'Creando una nueva nutrición',
        data: req.body
    });
}
const updateNutrition = (req, res) => {
    const { id } = req.params;
    const { 
        animalId, 
        fecha, 
        tipoAlimento, 
        cantidad, 
        unidad, 
        observaciones, 
        operarioId 
    } = req.body;
    const errores = [];
    if (!animalId || animalId.trim() === "") {
        errores.push("El ID del animal es obligatorio");
    }
    if (!fecha || fecha.trim() === "") {
        errores.push("La fecha de alimentación es obligatoria");
    } else if (isNaN(Date.parse(fecha))) {
        errores.push("La fecha no es válida");
    }
    if (!tipoAlimento || tipoAlimento.trim() === "") {
        errores.push("El tipo de alimento es obligatorio");
    }
    if (!cantidad || cantidad.toString().trim() === "") {
        errores.push("La cantidad de alimento es obligatoria");
    } else if (isNaN(cantidad)) {
        errores.push("La cantidad debe ser un número");
    }
    if (!unidad || unidad.trim() === "") {
        errores.push("La unidad de medida es obligatoria");
    }
    if (!operarioId || operarioId.trim() === "") {
        errores.push("El ID del operario encargado es obligatorio");
    }
    if (errores.length > 0) {
        const response = new Response(
            "Faltan datos para actualizar el registro de nutrición", 
            null, 
            errores
        );
        return res.status(400).json(response.failed);
    }
    res.json({ 
        success: true,
        message: `Actualizando la nutrición con ID ${id}`,
        data: req.body
    });
}
const deleteNutrition = (req, res) => {
    const { id } = req.params;
    const { 
        animalId, 
        fecha, 
        tipoAlimento, 
        cantidad, 
        unidad, 
        observaciones, 
        operarioId 
    } = req.body;
    
    const errores = [];
    if (!animalId || animalId.trim() === "") {
        errores.push("El ID del animal es obligatorio para eliminar");
    }
    if (!fecha || fecha.trim() === "") {
        errores.push("La fecha de alimentación es obligatoria para eliminar");
    } else if (isNaN(Date.parse(fecha))) {
        errores.push("La fecha no es válida");
    }
    if (!tipoAlimento || tipoAlimento.trim() === "") {
        errores.push("El tipo de alimento es obligatorio para eliminar");
    }
    if (!cantidad || cantidad.toString().trim() === "") {
        errores.push("La cantidad de alimento es obligatoria para eliminar");
    } else if (isNaN(cantidad)) {
        errores.push("La cantidad debe ser un número");
    }
    if (!unidad || unidad.trim() === "") {
        errores.push("La unidad de medida es obligatoria para eliminar");
    }
    if (!operarioId || operarioId.trim() === "") {
        errores.push("El ID del operario encargado es obligatorio para eliminar");
    }
    if (errores.length > 0) {
        const response = new Response(
            "Faltan datos obligatorios para eliminar el registro de nutrición", 
            null, 
            errores
        );
        return res.status(400).json(response.failed);
    }
    res.json({ 
        success: true,
        message: `Eliminando la nutrición con ID ${id}` 
    });
}
module.exports = {
    getAllNutritions,
    getNutritionById,
    createNutrition,
    updateNutrition,
    deleteNutrition
};