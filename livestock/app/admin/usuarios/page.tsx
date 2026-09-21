"use client";

import React, { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import FormCreationUser from "@/components/users/formCreation";

export default function AdminUsuariosPage(): React.JSX.Element {
  // Estados típicos del contenedor
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const handleSuccess = (): void => {
    setMensajeExito("¡Usuario creado correctamente!");
    setTimeout(() => setMensajeExito(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado principal del panel de administración */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-full uppercase tracking-wider mb-2">
              Panel Administrador
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Registro de Usuarios
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Crea nuevas cuentas de usuarios en la plataforma
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/admin/productos"
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition"
            >
              Ir a Usuarios
            </a>

            <button
              type="button"
              onClick={() => setModalAbierto(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              + Registrar Usuario
            </button>
          </div>
        </div>

        {/* Banner de alerta de confirmación */}
        {mensajeExito && (
          <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-r-lg flex items-center justify-between shadow-sm">
            <span className="font-medium text-sm">{mensajeExito}</span>
            <button
              type="button"
              onClick={() => setMensajeExito(null)}
              className="text-emerald-500 hover:text-emerald-700 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* Invocación del componente con props tipados */}
        <FormCreationUser
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
