const rateLimit = require("express-rate-limit");

const limiter = rateLimit({

    windowMs: 60 * 1000, // 1 minuto
    max: 30,
    message: {
        success: false,
        message: "Demasiadas solicitudes. Intenta nuevamente en un minuto."
    }
});

module.exports = limiter;
