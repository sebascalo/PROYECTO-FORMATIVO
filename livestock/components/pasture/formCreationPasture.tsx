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
import { CirclePlus } from "lucide-react";

export default function FormCreationPasture() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    extension: "",
    forageCapacity: "",         // 🔧 antes: maxCapacity
    pastureType: "",
    currentStatus: "",
    cattleEntryDate: "",        // 🔧 nuevo
    cattleExitDate: "",         // 🔧 nuevo
    lastChemicalApplication: "",// 🔧 nuevo
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      lastChemicalApplication: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const datosEnviar = {
      ...formData,
      extension: parseFloat(formData.extension),
      forageCapacity: parseInt(formData.forageCapacity),
      // Las fechas vacías se mandan como null
      cattleEntryDate: formData.cattleEntryDate || null,
      cattleExitDate: formData.cattleExitDate || null,
      lastChemicalApplication: formData.lastChemicalApplication || null,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/pasture/CreatePasture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEnviar),
      });

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
          : "No se pudo guardar el potrero. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center px-4 py-2 bg-[#4B6043] text-white rounded-md hover:bg-[#405539] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4B6043]/40 focus:ring-offset-2 cursor-pointer">
          <CirclePlus className="w-5 h-5 mr-2" /> Agregar Potrero
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Potrero
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear un nuevo potrero.
        </DialogDescription>

        <form
          id="pasture-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Potrero Norte"
              />
            </div>

            <div>
              <label htmlFor="extension" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 2.5"
              />
            </div>

            <div>
              <label htmlFor="forageCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                Aforo (Cap. Máx):
              </label>
              <input
                type="number"
                id="forageCapacity"
                name="forageCapacity"
                value={formData.forageCapacity}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 20"
              />
            </div>

            <div>
              <label htmlFor="pastureType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Pastura:
              </label>
              <select
                id="pastureType"
                name="pastureType"
                value={formData.pastureType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un tipo</option>
                <option value="hierba">Hierba</option>
                <option value="leguminosa">Leguminosa</option>
              </select>
            </div>

            <div>
              <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                Estado Actual:
              </label>
              <select
                id="currentStatus"
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un estado</option>
                <option value="activa">Activa</option>
                <option value="descanso">En Descanso</option>
              </select>
            </div>

            <div>
              <label htmlFor="cattleEntryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Ingreso Ganado:
              </label>
              <input
                type="date"
                id="cattleEntryDate"
                name="cattleEntryDate"
                value={formData.cattleEntryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label htmlFor="cattleExitDate" className="block text-sm font-medium text-gray-700 mb-1">
                Salida Ganado:
              </label>
              <input
                type="date"
                id="cattleExitDate"
                name="cattleExitDate"
                value={formData.cattleExitDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label htmlFor="lastChemicalApplication" className="block text-sm font-medium text-gray-700 mb-1">
                Último Químico:
              </label>
              <input
                type="text"
                id="lastChemicalApplication"
                name="lastChemicalApplication"
                value={formData.lastChemicalApplication}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Glifosato - 15/08/2026"
              />
            </div>
          </div>
        </form>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            form="pasture-create-form"
            disabled={isSubmitting}
            className="w-full bg-[#4B6043] text-white font-medium py-2 px-4 rounded-md hover:bg-[#405539] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4B6043]/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Potrero"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}