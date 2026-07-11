const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3000;

const swaggerOptions = {

    definition: {

        openapi: "3.0.0",

        info: {
            title: "API Livestock",
            version: "1.0.0",
            description: "Documentación de la API",
        },

        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],

        basePath: "/api",
        // JWT Authorization
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    // Rutas documentadas
    apis: [
        "./src/routes/authRoute.js",
        "./src/routes/breedingRoute.js",
        "./src/routes/cattleRoute.js",
        "./src/routes/healthRoute.js",
        "./src/routes/milkRoute.js",
        "./src/routes/nutritionRoute.js",
        "./src/routes/pastureRoute.js",
        "./src/routes/responsibleRoute.js",
        "./src/routes/userRoute.js"
    ],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = app;