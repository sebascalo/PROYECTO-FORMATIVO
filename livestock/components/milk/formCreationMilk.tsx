"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import ButtonCreate from "../ui/buttonCreate";

export default function FormCreationMilk() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    idBovine: "",
    milkingDate: new Date().toISOString().split("T")[0],
    shift: "Mañana",
    litersQuantity: "",
    milkQuality: "",
    observations: "",
    idResponsible: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setFormData({
      idBovine: "",
      milkingDate: new Date().toISOString().split("T")[0],
      shift: "Mañana",
      litersQuantity: "",
      milkQuality: "",
      observations: "",
      idResponsible: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const datosEnviar = {
      ...formData,
      litersQuantity: formData.litersQuantity
        ? parseFloat(formData.litersQuantity)
        : null,
      idBovine: formData.idBovine ? parseInt(formData.idBovine) : null,
      idResponsible: formData.idResponsible
        ? parseInt(formData.idResponsible)
        : null,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/milk/CreateMilk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEnviar),
        },
      );

      if (!response.ok) {
        let backendMessage = "";
        try {
          const errorBody = await response.json();
          backendMessage =
            errorBody?.message || errorBody?.error || JSON.stringify(errorBody);
        } catch {
          backendMessage = await response.text();
        }
        console.error("Respuesta del servidor:", response.status, backendMessage);
        throw new Error(
          `El servidor respondió ${response.status}: ${backendMessage || "sin detalle"}`,
        );
      }

      limpiarFormulario();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar la producción. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Producción</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Producción de Leche
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear una nueva producción de leche.
        </DialogDescription>

        <form
          id="milk-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="idBovine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bovino (ID):
              </label>
              <input
                type="number"
                id="idBovine"
                name="idBovine"
                value={formData.idBovine}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 1"
              />
            </div>

            <div>
              <label
                htmlFor="milkingDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Ordeño:
              </label>
              <input
                type="date"
                id="milkingDate"
                name="milkingDate"
                value={formData.milkingDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label
                htmlFor="shift"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Turno:
              </label>
              <select
                id="shift"
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="litersQuantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cantidad (Litros):
              </label>
              <input
                type="number"
                id="litersQuantity"
                name="litersQuantity"
                value={formData.litersQuantity}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 25.5"
              />
            </div>

            <div>
              <label
                htmlFor="milkQuality"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Calidad de Leche:
              </label>
              <select
                id="milkQuality"
                name="milkQuality"
                value={formData.milkQuality}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una calidad</option>
                <option value="Excelente">Excelente</option>
                <option value="Buena">Buena</option>
                <option value="Regular">Regular</option>
                <option value="Mala">Mala</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="idResponsible"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Responsable (ID):
              </label>
              <input
                type="number"
                id="idResponsible"
                name="idResponsible"
                value={formData.idResponsible}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 3"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="observations"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Observaciones:
            </label>
            <textarea
              id="observations"
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              placeholder="Observaciones adicionales..."
            />
          </div>
        </form>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            form="milk-create-form"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Producción"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}