
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import { type Pasture } from "./columns";

interface FormCreationPastureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pastureToEdit?: Pasture | null;
}

export default function FormCreationPasture({
  isOpen,
  onClose,
  onSuccess,
  pastureToEdit = null,
}: FormCreationPastureProps): React.JSX.Element | null {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    extension: "",
    forageCapacity: "",
    pastureType: "",
    currentStatus: "",
    cattleEntryDate: "",
    cattleExitDate: "",
    observations: "",
  });

  const isEditing = Boolean(pastureToEdit);

  // Preparar las fechas para los inputs tipo date
  const formatDateInput = (date?: string | null) => {
    if (!date) return "";

    return date.slice(0, 10);
  };

  // Detectar si estamos creando o editando
  useEffect(() => {
    if (pastureToEdit) {
      setFormData({
        name: pastureToEdit.name ?? "",
        extension: String(pastureToEdit.extension ?? ""),
        forageCapacity: String(pastureToEdit.forageCapacity ?? ""),
        pastureType: pastureToEdit.pastureType ?? "",
        currentStatus: pastureToEdit.currentStatus ?? "",
        cattleEntryDate: formatDateInput(pastureToEdit.cattleEntryDate),
        cattleExitDate: formatDateInput(pastureToEdit.cattleExitDate),
        observations: pastureToEdit.observations ?? "",
      });
    } else {
      limpiarFormulario();
    }
  }, [pastureToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      name: "",
      extension: "",
      forageCapacity: "",
      pastureType: "",
      currentStatus: "",
      cattleEntryDate: "",
      cattleExitDate: "",
      observations: "",
    });

    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      return setError("El nombre es obligatorio");
    }

    if (
      !formData.extension ||
      isNaN(parseFloat(formData.extension))
    ) {
      return setError("La extensión debe ser un número");
    }

    if (
      !formData.forageCapacity ||
      isNaN(parseInt(formData.forageCapacity))
    ) {
      return setError("El aforo debe ser un número");
    }

    if (!formData.pastureType.trim()) {
      return setError("El tipo de pastura es obligatorio");
    }

    if (!formData.currentStatus) {
      return setError("El estado actual es obligatorio");
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const url = isEditing
        ? `http://localhost:3000/api/pasture/UpdatePasture/${pastureToEdit?.id_pasture}`
        : "http://localhost:3000/api/pasture/CreatePasture";

      const method = isEditing ? "PUT" : "POST";

      const datosEnviar = {
        ...(isEditing && {
          id_pasture: pastureToEdit?.id_pasture,
          active: pastureToEdit?.active,
        }),
        name: formData.name,
        extension: parseFloat(formData.extension),
        forageCapacity: parseInt(formData.forageCapacity),
        pastureType: formData.pastureType,
        currentStatus: formData.currentStatus,
        cattleEntryDate: formData.cattleEntryDate || null,
        cattleExitDate: formData.cattleExitDate || null,
        observations: formData.observations || null,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosEnviar),
      });

      if (!response.ok) {
        let backendMessage = "";

        try {
          const errorBody = await response.json();

          if (Array.isArray(errorBody?.errors)) {
            backendMessage = errorBody.errors
              .map((e: { message?: string } | string) =>
                typeof e === "string" ? e : e.message ?? String(e)
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
          }`
        );
      }

      limpiarFormulario();
      onSuccess();
      onClose();
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el potrero. Intenta de nuevo."
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
          {isEditing ? "Editar Potrero" : "Crear Potrero"}
        </DialogTitle>

        <form
          id="pasture-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">

            {/* NOMBRE */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre:
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: Potrero Norte"
              />
            </div>

            {/* EXTENSIÓN */}
            <div>
              <label
                htmlFor="extension"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Extensión (ha):
              </label>

              <input
                type="number"
                id="extension"
                name="extension"
                value={formData.extension}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: 2.5"
              />
            </div>

            {/* AFORO */}
            <div>
              <label
                htmlFor="forageCapacity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Aforo (Cap. Máx):
              </label>

              <input
                type="number"
                id="forageCapacity"
                name="forageCapacity"
                value={formData.forageCapacity}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: 20"
              />
            </div>

            {/* TIPO DE PASTURA */}
            <div>
              <label
                htmlFor="pastureType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Pastura:
              </label>

              <input
                type="text"
                id="pastureType"
                name="pastureType"
                value={formData.pastureType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: Hierba, Leguminosa, Kikuyo..."
              />
            </div>

            {/* ESTADO ACTUAL */}
            <div>
              <label
                htmlFor="currentStatus"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Estado Actual:
              </label>

              <select
                id="currentStatus"
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="">Seleccione un estado</option>
                <option value="activa">Activa</option>
                <option value="descanso">En Descanso</option>
              </select>
            </div>

            {/* INGRESO GANADO */}
            <div>
              <label
                htmlFor="cattleEntryDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ingreso Ganado:
              </label>

              <input
                type="date"
                id="cattleEntryDate"
                name="cattleEntryDate"
                value={formData.cattleEntryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* SALIDA GANADO */}
            <div>
              <label
                htmlFor="cattleExitDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Salida Ganado:
              </label>

              <input
                type="date"
                id="cattleExitDate"
                name="cattleExitDate"
                value={formData.cattleExitDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* OBSERVACIONES */}
            <div className="col-span-2">
              <label
                htmlFor="observations"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Observaciones:
              </label>

              <input
                type="text"
                id="observations"
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: Se aplicó glifosato el 15/08/2026..."
              />
            </div>

          </div>
        </form>

        <p className="text-sm text-gray-600 -mt-2">
          Complete los campos para {isEditing ? "actualizar" : "crear"} un potrero.
        </p>

        <DialogDescription className="sr-only">
          Formulario para crear o editar un potrero.
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
              className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-60"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="pasture-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 disabled:opacity-60"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                  ? "Actualizar Potrero"
                  : "Guardar Potrero"}
            </button>

          </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
