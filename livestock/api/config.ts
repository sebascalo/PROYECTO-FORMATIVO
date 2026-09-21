/**
 * Configuración centralizada de API para la aplicación frontend.
 * PORT del backend (server.js) = 3001 por defecto.
 * Rutas montadas en server.js: app.use("/api/user", userRoute)
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const API_USER_URL = `${API_BASE_URL}/user`;
