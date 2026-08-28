const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Swagger
const swagger = require("./docs/swagger");

// DB
const db = require("./config/conectionDB");

// Rutas
const userRoute = require("./routes/userRoute");
//sebastian
const pastureRoute = require("./routes/pastureRoute");
const milkRoute = require("./routes/milkRoute");
//stefany
const cattleRoute = require("./routes/cattleRoute");
const weighingRoute =require("./routes/weighingRoute");
const mortalityRoute = require("./routes/mortalityRoute");
const birthRoute = require("./routes/birthRoute");
//dylan
const nutritionRoute = require("./routes/nutritionRoute");
const foodRoute = require("./routes/foodRoute");
const vacunationRoute = require("./routes/vacunationRoute");
const treatment = require("./routes/treatmentRoute");
//yeison
const responsibleRoute = require("./routes/responsibleRoute");
const mountRoute = require("./routes/mountRoute");
const artificialInseminationRoute = require("./routes/artificialInseminationRoute");

const authRoute = require("./routes/authRoute");

// Middlewares

const limiter = require("./middlewares/rateLimit");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = process.env.PORT || 3001;

// Middlewares globales
app.use(express.json());
app.use(cors());
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
app.use("/api/user", userRoute);
//sebastian
app.use("/api/pasture", pastureRoute);
app.use("/api/milk", milkRoute);
//stefany
app.use("/api/cattle", cattleRoute);
app.use("/api/weighing", weighingRoute);
app.use("/api/mortality", mortalityRoute);
app.use("/api/birth", birthRoute);
//dylan
app.use("/api/nutrition", nutritionRoute);
app.use("/api/food", foodRoute);
app.use("/api/vacunation", vacunationRoute);
app.use("/api/treatment", treatment);
//yeison
app.use("/api/mount", mountRoute);
app.use("/api/responsible", responsibleRoute);
app.use("/api/artificialInsemination", artificialInseminationRoute);

app.use("/api/auth", authRoute);


// Ruta no encontrada
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");

  error.status = 404;

  next(error);
});

// Manejo de errores
app.use(errorHandler);

// Iniciar el servidor
const init = async () => {
  try {
    await db.authenticate();

    console.log("Conexión a DB exitosa.");
    
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
