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

export default function FormCreationBirth() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    motheridentification: "",
    landidentification: "",
    birthdate: "",
    sex: "",
    race: "",
    birthweight: "",
    conditionatbirth: "",
    observations: "",
    responsible: "",
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
      motheridentification: "",
      landidentification: "",
      birthdate: "",
      sex: "",
      race: "",
      birthweight: "",
      conditionatbirth: "",
      observations: "",
      responsible: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const datosEnviar = {
      ...formData,
      birthweight: formData.birthweight
        ? parseFloat(formData.birthweight)
        : null,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/birth/CreateBirth", {
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
          : "No se pudo guardar el nacimiento. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center px-4 py-2 bg-[#4B6043] text-white rounded-md hover:bg-[#405539] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4B6043]/40 focus:ring-offset-2 cursor-pointer">
          <CirclePlus className="w-5 h-5 mr-2" /> Agregar Nacimiento
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Nacimiento
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear un nuevo nacimiento.
        </DialogDescription>

        <form
          id="birth-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="motheridentification"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Identificación de la Madre:
              </label>
              <input
                type="text"
                id="motheridentification"
                name="motheridentification"
                value={formData.motheridentification}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: G-001"
              />
            </div>

            <div>
              <label
                htmlFor="landidentification"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Identificación del Potrero:
              </label>
              <input
                type="text"
                id="landidentification"
                name="landidentification"
                value={formData.landidentification}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: P-001"
              />
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sexo:
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un sexo</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="race"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Raza:
              </label>
              <select
                id="race"
                name="race"
                value={formData.race}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una raza</option>
                <option value="Holstein">Holstein</option>
                <option value="Jersey">Jersey</option>
                <option value="Brahmán">Brahmán</option>
                <option value="Hereford">Hereford</option>
                <option value="Angus">Angus</option>
                <option value="Cebú">Cebú</option>
                <option value="Criolla">Criolla</option>
                <option value="Otra">Otra</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="birthweight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Peso al Nacer (kg):
              </label>
              <input
                type="number"
                id="birthweight"
                name="birthweight"
                value={formData.birthweight}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 35.5"
              />
            </div>

            <div>
              <label
                htmlFor="conditionatbirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Condición al Nacer:
              </label>
              <select
                id="conditionatbirth"
                name="conditionatbirth"
                value={formData.conditionatbirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una condición</option>
                <option value="Sano">Sano</option>
                <option value="Debil">Débil</option>
                <option value="Prematuro">Prematuro</option>
                <option value="Con complicaciones">Con complicaciones</option>
                <option value="Fallecido">Fallecido</option>
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
            form="birth-create-form"
            disabled={isSubmitting}
            className="w-full bg-[#4B6043] text-white font-medium py-2 px-4 rounded-md hover:bg-[#405539] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4B6043]/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Nacimiento"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}