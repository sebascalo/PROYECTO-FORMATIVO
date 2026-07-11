const Response = require("../functions/response");

const getAllHealth = (req, res) => {
    res.json({ message: 'Obteniendo todos los registros de salud' });
}

const getAllHealthById = (req, res) => {
    const { id } = req.params;  // ✅ Agregar esta línea
    res.json({ message: `Obteniendo registro de salud por ID ${id}` });
}

const createHealth = (req, res) => {
    // Campos típicos de salud/sanidad:
    // - animalId: ID del animal
    // - fecha: fecha del evento
    // - tipoEvento: vacunación, desparasitación, tratamiento, etc.
    // - medicamento: nombre del medicamento
    // - dosis: cantidad aplicada
    // - viaAplicacion: oral, intramuscular, etc.
    // - fechaProxima: próxima aplicación (opcional)
    // - observaciones: novedades o incidencias (opcional)
    // - veterinarioId: ID del veterinario
    // - operarioId: ID del operario

    const { 
        animalId,
        fecha,
        tipoEvento,
        medicamento,
        dosis,
        viaAplicacion,
        fechaProxima,
        observaciones,
        veterinarioId,
        operarioId
    } = req.body;
    
    const errores = [];
    
    // Validaciones
    if (!animalId || animalId.trim() === "") {
        errores.push("El ID del animal es obligatorio");
    }
    
    if (!fecha || fecha.trim() === "") {
        errores.push("La fecha del evento es obligatoria");
    } else if (isNaN(Date.parse(fecha))) {
        errores.push("La fecha no es válida");
    }
    
    if (!tipoEvento || tipoEvento.trim() === "") {
        errores.push("El tipo de evento es obligatorio (vacunación, desparasitación, etc.)");
    }
    
    if (!medicamento || medicamento.trim() === "") {
        errores.push("El nombre del medicamento es obligatorio");
    }
    
    if (!dosis || dosis.toString().trim() === "") {
        errores.push("La dosis es obligatoria");
    } else if (isNaN(dosis)) {
        errores.push("La dosis debe ser un número");
    }
    
    if (!viaAplicacion || viaAplicacion.trim() === "") {
        errores.push("La vía de aplicación es obligatoria");
    }
    
    // Validar fecha próxima si viene
    if (fechaProxima && fechaProxima.trim() !== "" && isNaN(Date.parse(fechaProxima))) {
        errores.push("La fecha próxima no es válida");
    }
    
    if (!veterinarioId || veterinarioId.trim() === "") {
        errores.push("El ID del veterinario responsable es obligatorio");
    }
    
    if (!operarioId || operarioId.trim() === "") {
        errores.push("El ID del operario es obligatorio");
    }
    
    if (errores.length > 0) {
        const response = new Response(
            "Faltan datos obligatorios para crear el registro de salud", 
            null, 
            errores
        );
        return res.status(400).json(response.failed);
    }
    
    res.json({ 
        success: true,
        message: 'Creando un nuevo registro de salud',
        data: req.body
    });
}

const updateHealth = (req, res) => {
    const { id } = req.params;
    const { 
        animalId,
        fecha,
        tipoEvento,
        medicamento,
        dosis,
        viaAplicacion,
        fechaProxima,
        observaciones,
        veterinarioId,
        operarioId
    } = req.body;
    
    const errores = [];
    
    if (!animalId || animalId.trim() === "") {
        errores.push("El ID del animal es obligatorio");
    }
    
    if (!fecha || fecha.trim() === "") {
        errores.push("La fecha del evento es obligatoria");
    } else if (isNaN(Date.parse(fecha))) {
        errores.push("La fecha no es válida");
    }
    
    if (!tipoEvento || tipoEvento.trim() === "") {
        errores.push("El tipo de evento es obligatorio");
    }
    
    if (!medicamento || medicamento.trim() === "") {
        errores.push("El nombre del medicamento es obligatorio");
    }
    
    if (!dosis || dosis.toString().trim() === "") {
        errores.push("La dosis es obligatoria");
    } else if (isNaN(dosis)) {
        errores.push("La dosis debe ser un número");
    }
    
    if (!viaAplicacion || viaAplicacion.trim() === "") {
        errores.push("La vía de aplicación es obligatoria");
    }
    
    if (fechaProxima && fechaProxima.trim() !== "" && isNaN(Date.parse(fechaProxima))) {
        errores.push("La fecha próxima no es válida");
    }
    
    if (!veterinarioId || veterinarioId.trim() === "") {
        errores.push("El ID del veterinario responsable es obligatorio");
    }
    
    if (!operarioId || operarioId.trim() === "") {
        errores.push("El ID del operario es obligatorio");
    }
    
    if (errores.length > 0) {
        const response = new Response(
            "Faltan datos para actualizar el registro de salud", 
            null, 
            errores
        );
        return res.status(400).json(response.failed);
    }
    
    res.json({ 
        success: true,
        message: `Actualizando el registro de salud con ID ${id}`,
        data: req.body
    });
}

const deleteHealth = (req, res) => {
    const { id } = req.params;
    
    // Versión simplificada - solo validar ID
    if (!id) {
        const errores = ["El ID del registro de salud es obligatorio"];
        const response = new Response(
            "Faltan datos para eliminar el registro de salud", 
            null, 
            errores
        );
        return res.status(400).json(response.failed);
    }
    
    res.json({ 
        success: true,
        message: `Eliminando el registro de salud con ID ${id}` 
    });
}

module.exports = {
    getAllHealth,
    getAllHealthById,
    createHealth,
    updateHealth,
    deleteHealth
};