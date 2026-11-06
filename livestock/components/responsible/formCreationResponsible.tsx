
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import { type Responsible } from "./columns";

interface FormCreationResponsibleProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  responsibleToEdit?: Responsible | null;
}

export default function FormCreationResponsible({
  isOpen,
  onClose,
  onSuccess,
  responsibleToEdit = null,
}: FormCreationResponsibleProps): React.JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    phoneNumber: "",
    status: "Active",
  });

  const isEditing = Boolean(responsibleToEdit);

  useEffect(() => {
    if (responsibleToEdit) {
      setFormData({
        fullName: responsibleToEdit.fullName ?? "",
        role: responsibleToEdit.role ?? "",
        email: responsibleToEdit.email ?? "",
        phoneNumber: responsibleToEdit.phoneNumber ?? "",
        status: responsibleToEdit.status ?? "Active",
      });
    } else {
      limpiarFormulario();
    }
  }, [responsibleToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const soloNumeros = value.replace(/\D/g, "");
      const recortado = soloNumeros.slice(0, 10);

      setFormData((prev) => ({ ...prev, [name]: recortado }));
      if (error) setError(null);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      fullName: "",
      role: "",
      email: "",
      phoneNumber: "",
      status: "Active",
    });

    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.phoneNumber.length !== 10) {
      return setError(
        "El número de teléfono debe tener exactamente 10 dígitos",
      );
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const url = isEditing
        ? `http://localhost:3000/api/responsible/UpdateResponsible/${responsibleToEdit?.idResponsible}`
        : "http://localhost:3000/api/responsible/CreateResponsible";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let backendMessage = "";

        try {
          const errorBody = await response.json();

          if (Array.isArray(errorBody?.errors)) {
            backendMessage = errorBody.errors
              .map((e: { message?: string } | string) =>
                typeof e === "string"
                  ? e
                  : e.message ?? String(e),
              )
              .join(" | ");
          } else {
            backendMessage =
              errorBody?.message ||
              errorBody?.error ||
              JSON.stringify(errorBody);
          }
        } catch {
          backendMessage = await response.text();
        }

        throw new Error(
          `El servidor respondió ${response.status}: ${
            backendMessage || "sin detalle"
          }`,
        );
      }

      limpiarFormulario();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el responsable. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      limpiarFormulario();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          {isEditing ? "Editar Responsable" : "Crear Responsable"}
        </DialogTitle>

        <form
          id="responsible-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* NOMBRE */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre Completo:
              </label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            {/* ROL */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rol:
              </label>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un rol</option>
                <option value="Veterinario">Veterinario</option>
                <option value="Administrador">Administrador</option>
                <option value="Operario">Operario</option>
                <option value="Gerente">Gerente</option>
                <option value="Asistente">Asistente</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email:
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="ejemplo@correo.com"
              />
            </div>

            {/* TELÉFONO */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Teléfono:
              </label>

              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 3001234567"
              />
            </div>
          </div>
        </form>

        <p className="text-sm text-gray-600 -mt-2">
          Complete los campos para {isEditing ? "actualizar" : "crear"} un responsable.
        </p>

        <DialogDescription className="sr-only">
          Formulario para crear o editar un responsable.
        </DialogDescription>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && (
            <p className="text-sm text-red-600 text-center font-medium">
              ⚠️ {error}
            </p>
          )}

          <div className="flex flex-row gap-2 w-full">
            <button
              type="button"
              onClick={() => {
                limpiarFormulario();
                onClose();
              }}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="responsible-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                  ? "Actualizar Responsable"
                  : "Guardar Responsable"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
