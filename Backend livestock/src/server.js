const express = require("express");

const helmet = require("helmet");
const morgan = require("morgan");

// Swagger
const swagger = require("./docs/swagger");

// DB
const db = require("./config/conectionDB");

// Rutas
const userRoute = require("./routes/userRoute");
const pastureRoute = require("./routes/pastureRoute");
const responsibleRoute = require("./routes/responsibleRoute");
const reproductionRoute = require("./routes/reproductionRoute");
const nutritionRoute = require("./routes/nutritionRoute");
const healthRoute = require("./routes/healthRoute");
const cattleRoute = require("./routes/cattleRoute");
const milkRoute = require("./routes/milkRoute");
const authRoute = require("./routes/authRoute");

// Middlewares
const limiter = require("./middlewares/rateLimit");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

// Swagger
app.use("/api-docs", swagger);

// Ruta base
app.get("/", (req, res) => {
    res.json({
        message: "Bienvenido a livestock API",
    });
});

// Rutas API
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/pasture", pastureRoute);
app.use("/api/reproduction", reproductionRoute);
app.use("/api/responsible", responsibleRoute);
app.use("/api/nutrition", nutritionRoute);
app.use("/api/health", healthRoute);
app.use("/api/cattle", cattleRoute);
app.use("/api/milk", milkRoute);
app.use("/api/auth", authRoute);

// Ruta no encontrada
app.use((req, res, next) => {

    const error = new Error("Ruta no encontrada");

    error.status = 404;

    next(error);

});

// Manejo de errores
app.use(errorHandler);

// Inicializar servidor
const init = async () => {

    try {

        await db.authenticate();

        console.log("Conexión a DB exitosa.");

        app.listen(PORT, () => {

            console.log(
                `Servidor ejecutándose en el puerto ${PORT}`
            );

        });

    } catch (error) {

        console.error(error);

    }

};

init();