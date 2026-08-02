const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Swagger
const swagger = require("./docs/swagger");

// DB
const db = require("./config/conectionDB");

// Servicio de correo
const { sendEmail } = require("./services/emailService");

// Rutas
const userRoute = require("./routes/userRoute");
//sebastian
const pastureRoute = require("./routes/pastureRoute");
const milkRoute = require("./routes/milkRoute");
//stefany
const cattleRoute = require("./routes/cattleRoute");
const weighingRoute =require("./routes/weighingRoute");
//dylan
const nutritionRoute = require("./routes/nutritionRoute");
const vacunationRoute = require("./routes/vacunationRoute");
const treatment = require("./routes/treatmentRoute");
//yeison
const responsibleRoute = require("./routes/responsibleRoute");
const reproductionRoute = require("./routes/reproductionRoute");
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


//dylan
app.use("/api/nutrition", nutritionRoute);
app.use("/api/vacunation", vacunationRoute);
app.use("/api/treatment", treatment);

//yeison
app.use("/api/reproduction", reproductionRoute);
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

    // Enviar correo de prueba
    // await sendEmail(
    //   "sebastiancalderon5204@gmail.com",
    //   "Correo de prueba",
    //   "Hola mundo",
    //   "<>h1>Hola mundo</h1>"
    // );

    // Enviar correo de bienvenida
    // const nombre = "Sebastian";
    // await sendEmail(
    //     "sebastiancalderon5204@gmail.com",
    //     "Correo de Bienvenida a Livestock",
    //     "Correo de bienvenida a Livestock",
    //    `
    //             <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1448E6; border-radius: 12px; overflow: hidden;">

    //                 <!-- HEADER CON FONDO AZUL -->
    //                 <div style="background: #1448E6; padding: 40px 30px 20px 30px; text-align: center;">
    //                     <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
    //                         Bienvenido a Livestock
    //                     </h1>
    //                 </div>

    //                 <!-- CUERPO CON FONDO BLANCO -->
    //                 <div style="background: #ffffff; padding: 35px 30px 30px 30px; border-radius: 12px 12px 0 0; margin: 0 12px;">

    //                     <!-- Saludo -->
    //                     <p style="color: #1448E6; font-size: 20px; font-weight: 600; margin: 0 0 6px 0;">
    //                         ¡Hola, ${nombre}!
    //                     </p>

    //                     <p style="color: #364153; font-size: 15px; line-height: 1.8; margin: 0 0 16px 0;">
    //                         Gracias por registrarte en <strong style="color: #1448E6;">Livestock</strong>.
    //                         Ahora formas parte de una nueva forma de hacer ganadería, más inteligente y conectada.
    //                     </p>

    //                     <!-- Botón -->
    //                     <div style="text-align: center; margin: 28px 0 20px 0;">
    //                         <a href=""
    //                            style="background: #2B7FFF; color: #ffffff; padding: 14px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(43, 127, 255, 0.3);">
    //                             Empezar Ahora
    //                         </a>
    //                     </div>

    //                     <!-- Línea divisoria -->
    //                     <div style="border-top: 1px solid #D1D5DC; margin: 20px 0 12px 0;"></div>

    //                     <!-- Fecha y footer -->
    //                     <div style="display: flex; justify-content: space-between; align-items: center;">
    //                         <p style="color: #6A7282; font-size: 12px; margin: 0;">
    //                             ${new Date().toLocaleDateString('es-CO', {
    //                                 day: 'numeric',
    //                                 month: 'long',
    //                                 year: 'numeric'
    //                             })}
    //                         </p>
    //                     </div>
    //                 </div>

    //                 <!-- FOOTER AZUL -->
    //                 <div style="background: #1448E6; padding: 16px 30px; text-align: center;">
    //                     <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">
    //                         © ${new Date().getFullYear()} Gestiona tu ganado de manera eficiente con Livestock.
    //                     </p>
    //                 </div>
    //             </div>
    //         `
    // );

    // Enviar correo de recuperacion de contraseña
    // const nombre = "Sebastian";
    // await sendEmail(
    //     "sebastiancalderon5204@gmail.com",
    //     "Recuperación de contraseña",
    //     "Recuperación de contraseña",
    //     `
    //             <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1448E6; border-radius: 12px; overflow: hidden;">

    //                 <!-- HEADER CON FONDO AZUL -->
    //                 <div style="background: #1448E6; padding: 40px 30px 20px 30px; text-align: center;">
    //                     <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
    //                         Livestock
    //                     </h1>
    //                 </div>

    //                 <!-- CUERPO CON FONDO BLANCO -->
    //                 <div style="background: #ffffff; padding: 35px 30px 30px 30px; border-radius: 12px 12px 0 0; margin: 0 12px;">

    //                     <!-- Saludo -->
    //                     <p style="color: #1448E6; font-size: 20px; font-weight: 600; margin: 0 0 6px 0;">
    //                         ¡Hola, ${nombre}!
    //                     </p>

    //                     <p style="color: #364153; font-size: 15px; line-height: 1.8; margin: 0 0 12px 0;">
    //                         Hemos recibido una solicitud para recuperar la contraseña de tu cuenta en <strong style="color: #1448E6;">Livestock</strong>.
    //                     </p>

    //                     <p style="color: #6A7282; font-size: 14px; line-height: 1.8; margin: 0 0 20px 0;">
    //                         Haz clic en el botón de abajo para crear una nueva contraseña.
    //                     </p>

    //                     <!-- Aviso de seguridad -->
    //                     <div style="background: #fff8e6; padding: 14px 18px; border-radius: 8px; border-left: 4px solid #f5a623; margin: 0 0 24px 0;">
    //                         <p style="color: #8a6d1f; font-size: 13px; margin: 0; line-height: 1.6;">
    //                             ⏰ Este enlace expirará en <strong>1 hora</strong> por seguridad.
    //                         </p>
    //                         <p style="color: #8a6d1f; font-size: 13px; margin: 4px 0 0 0; line-height: 1.6;">
    //                             Si no solicitaste este cambio, ignora este mensaje.
    //                         </p>
    //                     </div>

    //                     <!-- Botón -->
    //                     <div style="text-align: center; margin: 28px 0 24px 0;">
    //                         <a href=""
    //                            style="background: #2B7FFF; color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(43, 127, 255, 0.3);">
    //                             Recuperar contraseña
    //                         </a>
    //                     </div>

    //                     <!-- Línea divisoria -->
    //                     <div style="border-top: 1px solid #D1D5DC; margin: 20px 0 12px 0;"></div>

    //                     <!-- Fecha y footer -->
    //                     <div style="display: flex; justify-content: space-between; align-items: center;">
    //                         <p style="color: #6A7282; font-size: 12px; margin: 0;">
    //                             ${new Date().toLocaleDateString('es-CO', {
    //                                 day: 'numeric',
    //                                 month: 'long',
    //                                 year: 'numeric'
    //                             })}
    //                         </p>
    //                     </div>
    //                 </div>

    //                 <!-- FOOTER AZUL -->
    //                 <div style="background: #1448E6; padding: 16px 30px; text-align: center;">
    //                     <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">
    //                         © ${new Date().getFullYear()} Gestiona tu ganado de manera eficiente con Livestock.
    //                     </p>
    //                 </div>
    //             </div>
    //         `
    // );

    // // Enviar correo de notificacion de registro exitoso
    // const nombre = "Sebastian";
    // const to = "sebastiancalderon5204@gmail.com";
    // await sendEmail(
    //   "sebastiancalderon5204@gmail.com",
    //   "Notificación de registro exitoso",
    //   "Notificación de registro exitoso",
    //   `
    //             <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1448E6; border-radius: 12px; overflow: hidden;">
                    
    //                 <!-- HEADER CON FONDO AZUL -->
    //                 <div style="background: #1448E6; padding: 40px 30px 20px 30px; text-align: center;">
    //                     <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
    //                         Livestock
    //                     </h1>
    //                 </div>
                    
    //                 <!-- CUERPO CON FONDO BLANCO -->
    //                 <div style="background: #ffffff; padding: 35px 30px 30px 30px; border-radius: 12px 12px 0 0; margin: 0 12px;">
                        
    //                     <!-- Saludo -->
    //                     <p style="color: #1448E6; font-size: 20px; font-weight: 600; margin: 0 0 6px 0;">
    //                         ¡Felicidades, ${nombre}! 
    //                     </p>
                        
    //                     <p style="color: #364153; font-size: 15px; line-height: 1.8; margin: 0 0 12px 0;">
    //                         Tu registro en <strong style="color: #1448E6;">Livestock</strong> ha sido completado exitosamente.
    //                     </p>
                        
    //                     <p style="color: #6A7282; font-size: 14px; line-height: 1.8; margin: 0 0 16px 0;">
    //                         Ya puedes comenzar a gestionar tu ganado de forma digital y eficiente.
    //                     </p>
                        
    //                     <!-- Datos de la cuenta -->
    //                     <div style="background: #f0f4f9; padding: 18px 22px; border-radius: 8px; margin: 16px 0 20px 0;">
    //                         <p style="color: #364153; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">
    //                              Datos de tu cuenta:
    //                         </p>
    //                         <ul style="color: #6A7282; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px; list-style: none;">
    //                             <li> <strong>Usuario:</strong> ${nombre}</li>
    //                             <li> <strong>Email:</strong> ${to}</li>
    //                             <li> <strong>Fecha de registro:</strong> ${new Date().toLocaleDateString(
    //                               "es-CO",
    //                               {
    //                                 day: "numeric",
    //                                 month: "long",
    //                                 year: "numeric",
    //                               },
    //                             )}</li>
    //                         </ul>
    //                     </div>
                        
    //                     <!-- Botón -->
    //                     <div style="text-align: center; margin: 28px 0 20px 0;">
    //                         <a href="" 
    //                            style="background: #2B7FFF; color: #ffffff; padding: 14px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(43, 127, 255, 0.3);">
    //                             Ir al panel de control
    //                         </a>
    //                     </div>
                        
    //                     <!-- Línea divisoria -->
    //                     <div style="border-top: 1px solid #D1D5DC; margin: 20px 0 12px 0;"></div>
                        
    //                     <!-- Fecha y footer -->
    //                     <div style="display: flex; justify-content: space-between; align-items: center;">
    //                         <p style="color: #6A7282; font-size: 12px; margin: 0;">
    //                             ${new Date().toLocaleDateString("es-CO", {
    //                               day: "numeric",
    //                               month: "long",
    //                               year: "numeric",
    //                             })}
    //                         </p>
    //                     </div>
    //                 </div>
                    
    //                 <!-- FOOTER AZUL -->
    //                 <div style="background: #1448E6; padding: 16px 30px; text-align: center;">
    //                     <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">
    //                         © ${new Date().getFullYear()} Gestiona tu ganado de manera eficiente con Livestock.
    //                     </p>
    //                 </div>
    //             </div>
    //         `,
    // );

    // console.log("Correo enviado correctamente.");

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
