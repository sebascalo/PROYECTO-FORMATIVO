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

export default function FormCreationMortality() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    idBovine: "",
    dateofdeath: "",
    causeofdeath: "",
    responsible: "",
    fateoftheanimal: "",
    observations: "",
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
      dateofdeath: "",
      causeofdeath: "",
      responsible: "",
      fateoftheanimal: "",
      observations: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/mortality/CreateMortality",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
          : "No se pudo guardar la mortalidad. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Mortalidad</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Mortalidad
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear una nueva mortalidad.
        </DialogDescription>

        <form
          id="mortality-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="idBovine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bovino:
              </label>
              <input
                type="text"
                id="idBovine"
                name="idBovine"
                value={formData.idBovine}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: G-001"
              />
            </div>

            <div>
              <label
                htmlFor="dateofdeath"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Muerte:
              </label>
              <input
                type="date"
                id="dateofdeath"
                name="dateofdeath"
                value={formData.dateofdeath}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label
                htmlFor="causeofdeath"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Causa de Muerte:
              </label>
              <select
                id="causeofdeath"
                name="causeofdeath"
                value={formData.causeofdeath}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una causa</option>
                <option value="Enfermedad">Enfermedad</option>
                <option value="Accidente">Accidente</option>
                <option value="Parto">Complicaciones de parto</option>
                <option value="Vejez">Vejez</option>
                <option value="Parásitos">Parásitos</option>
                <option value="Desnutrición">Desnutrición</option>
                <option value="Intoxicación">Intoxicación</option>
                <option value="Depredador">Depredador</option>
                <option value="Desconocida">Desconocida</option>
                <option value="Otra">Otra</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="responsible"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Responsable:
              </label>
              <input
                type="text"
                id="responsible"
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Dr. Juan Pérez"
              />
            </div>

            <div>
              <label
                htmlFor="fateoftheanimal"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Destino del Animal:
              </label>
              <select
                id="fateoftheanimal"
                name="fateoftheanimal"
                value={formData.fateoftheanimal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un destino</option>
                <option value="Enterrado">Enterrado</option>
                <option value="Incinerado">Incinerado</option>
                <option value="Vendido para consumo">Vendido para consumo</option>
                <option value="Desechado">Desechado</option>
                <option value="Estudio">Estudio/Investigación</option>
              </select>
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
            form="mortality-create-form"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Mortalidad"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}