
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import { type Race } from "./columns";

interface FormCreationRaceProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  raceToEdit?: Race | null;
}

export default function FormCreationRace({
  isOpen,
  onClose,
  onSuccess,
  raceToEdit = null,
}: FormCreationRaceProps): React.JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name_race: "",
    active: "Active",
  });

  // Detectar si estamos en modo edición
  const isEditing = Boolean(raceToEdit);

  useEffect(() => {
    if (raceToEdit) {
      setFormData({
        name_race: raceToEdit.name_race ?? "",
        active: raceToEdit.active ?? "Active",
      });
    } else {
      limpiarFormulario();
    }
  }, [raceToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      name_race: "",
      active: "Active",
    });

    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const url = isEditing
        ? `http://localhost:3000/api/race/UpdateRace/${raceToEdit?.id_race}`
        : "http://localhost:3000/api/race/CreateRace";

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
                typeof e === "string" ? e : e.message ?? String(e),
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
          `El servidor respondió ${response.status}: ${backendMessage || "sin detalle"}`,
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
          : "No se pudo guardar la raza. Intenta de nuevo.",
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
          {isEditing ? "Editar Raza" : "Crear Raza"}
        </DialogTitle>

        <form
          id="race-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">

            {/* NOMBRE */}
            <div>
              <label
                htmlFor="name_race"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre de la Raza:
              </label>

              <input
                type="text"
                id="name_race"
                name="name_race"
                value={formData.name_race}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Holstein"
              />
            </div>

            {/* ESTADO */}
            <div>
              <label
                htmlFor="active"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Estado:
              </label>

              <select
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="Active">Activo</option>
                <option value="Inactive">Inactivo</option>
              </select>
            </div>

          </div>
        </form>

        <p className="text-sm text-gray-600 -mt-2">
          {isEditing
            ? "Modifique los campos de la raza seleccionada."
            : "Complete los campos para crear una nueva raza."}
        </p>

        <DialogDescription className="sr-only">
          Formulario para crear o editar una raza.
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
              form="race-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                  ? "Actualizar Raza"
                  : "Guardar Raza"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
