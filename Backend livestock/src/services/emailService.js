require("dotenv").config();
const nodemailer = require("nodemailer");
const { createLog } = require("../functions/log");

// Configuración del transporte SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Función para enviar un correo electrónico
const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    await createLog(error);
    throw error;
  }
};
module.exports = {sendEmail};
