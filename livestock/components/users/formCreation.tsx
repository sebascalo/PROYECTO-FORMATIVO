"use client";

import React, { useState } from "react";
import { API_USER_URL } from "@/api/config";

// 1. Tipo de los cargos permitidos
export type UserRole = "Administrador" | "Instructor" | "Pasante" | "Gestor";

// 2. Inferfaz de los datos que se envian al backend
interface UserPayload {
  name: string;
  email: string;
  password: string;
  documentId: string;
  postJob: string;
  verifyEmail: boolean;
  active: boolean;
}

// 3. Interfaz de la respuesta del servidor (Evita usar tipos implicitos)
interface ApiResponse {
  message?: string;
  data?: unknown;
  errors?: (string | { message: string })[] | null;
}

// 4. Interfaz de los props del componente
interface FormCreationUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormCreationUser({
  isOpen,
  onClose,
  onSuccess,
}: FormCreationUserProps): React.JSX.Element | null {
  // Todos los hooks se declaran SIEMPRE, sin importar isOpen (Rules of Hooks).
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [documentId, setDocumentId] = useState<string>("");
  const [postJob, setPostJob] = useState<UserRole>("Administrador");
  const [guardando, setGuardando] = useState<boolean>(false);

  if (!isOpen) return null;

  const limpiarFormulario = (): void => {
    setName("");
    setEmail("");
    setPassword("");
    setDocumentId("");
    setPostJob("Administrador");
  };

  const handleCerrar = (): void => {
    limpiarFormulario();
    onClose();
  };

  const gestionarForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setGuardando(true);

    if (!name.trim() || name.trim().length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      setGuardando(false);
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      alert("Por favor ingrese un correo electrónico válido.");
      setGuardando(false);
      return;
    }
    if (!password || password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      setGuardando(false);
      return;
    }
    if (!documentId.trim() || documentId.trim().length < 5) {
      alert("El documento de identidad debe tener al menos 5 caracteres.");
      setGuardando(false);
      return;
    }

    const userData: UserPayload = {
      name,
      email,
      password,
      documentId,
      postJob,
      verifyEmail: false,
      active: true,

    };

    try {
      const response = await fetch(`${API_USER_URL}/CreateUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || data.success === false) {
          const errorMsg = Array.isArray(data.errors) && data.errors.length > 0
            ? data.errors.join(", ")
            : (data.errors ||data.message || "Error al crear el usuario");
            throw new Error(errorMsg);
      }

      limpiarFormulario();
      onSuccess();
      onClose();
    } catch (error: unknown) {
      const mensaje =
        error instanceof Error
          ? error.message
          : "Error inesperado al crear usuario";
      alert("Error al registrar usuario: " + mensaje);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Registrar Nuevo Usuario</h3>
            <p className="text-xs text-slate-300">
              Completa los datos según el modelo de usuario
            </p>
          </div>
          <button
            type="button"
            onClick={handleCerrar}
            className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={(e) => {
            void gestionarForm(e);
          }}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Nombre Completo <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              minLength={3}
              maxLength={50}
              placeholder="Ej: Juan Pérez"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Correo Electrónico <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              maxLength={50}
              placeholder="juan@correo.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Contraseña <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              required
              minLength={6}
              maxLength={50}
              placeholder="********"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Documento de Identidad <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              minLength={5}
              maxLength={30}
              placeholder="Ej: 1012345678"
              value={documentId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDocumentId(e.target.value)
              }
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Cargo / Puesto <span className="text-rose-500">*</span>
            </label>
            <select
              value={postJob}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPostJob(e.target.value as UserRole)
              }
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Auxiliar">Auxiliar</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCerrar}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {guardando ? (
                <>
                  <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Guardando...
                </>
              ) : (
                "Guardar Usuario"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
