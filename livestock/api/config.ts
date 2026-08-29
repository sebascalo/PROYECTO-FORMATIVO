/**
 * Configuración centralizada de API para la aplicación frontend
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const API_USER_URL = `${API_BASE_URL}/user`;