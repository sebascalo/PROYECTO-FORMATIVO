"use client";

import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 👇 Estados para los ojitos
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const typePassword = showPassword ? "text" : "password";
  const typeConfirmPassword = showConfirmPassword ? "text" : "password";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    alert("Contraseña cambiada correctamente");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Nueva contraseña
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Ingresa tu nueva contraseña
        </p>

        <form onSubmit={handleSubmit}>
          {/* 👇 NUEVA CONTRASEÑA con ojito */}
          <div className="mb-4">
            <label className="block mb-2">Nueva contraseña</label>
            <div className="relative">
              <input
                type={typePassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva contraseña"
                className="w-full border rounded-md p-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Mostrar u ocultar contraseña"
              >
                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </button>
            </div>
          </div>

          {/* 👇 CONFIRMAR CONTRASEÑA con ojito */}
          <div className="mb-6">
            <label className="block mb-2">Confirmar contraseña</label>
            <div className="relative">
              <input
                type={typeConfirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                className="w-full border rounded-md p-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Mostrar u ocultar contraseña"
              >
                {showConfirmPassword ? (
                  <Eye size={18} />
                ) : (
                  <EyeClosed size={18} />
                )}
              </button>
            </div>
          </div>

          {/* 👇 Botón verde igual a los otros formularios */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium p-2 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}