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

export default function FormCreationTreatment() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    idBovine: "",
    treatment_date: new Date().toISOString().split("T")[0],
    medication_used: "",
    applied_dose: "",
    application_route: "",
    associated_diagnosis: "",
    treatment_duration: "",
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
      treatment_date: new Date().toISOString().split("T")[0],
      medication_used: "",
      applied_dose: "",
      application_route: "",
      associated_diagnosis: "",
      treatment_duration: "",
      observations: "",
      idResponsible: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/treatment/CreateTreatment",
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
          : "No se pudo guardar el tratamiento. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center px-4 py-2 bg-[#4B6043] text-white rounded-md hover:bg-[#405539] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4B6043]/40 focus:ring-offset-2 cursor-pointer">
          <CirclePlus className="w-5 h-5 mr-2" /> Agregar Tratamiento
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Tratamiento
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear un nuevo tratamiento.
        </DialogDescription>

        <form
          id="treatment-create-form"
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
                htmlFor="treatment_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Tratamiento:
              </label>
              <input
                type="date"
                id="treatment_date"
                name="treatment_date"
                value={formData.treatment_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label
                htmlFor="medication_used"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Medicamento:
              </label>
              <input
                type="text"
                id="medication_used"
                name="medication_used"
                value={formData.medication_used}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Ivermectina"
              />
            </div>

            <div>
              <label
                htmlFor="applied_dose"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dosis Administrada:
              </label>
              <input
                type="text"
                id="applied_dose"
                name="applied_dose"
                value={formData.applied_dose}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 5 ml"
              />
            </div>

            <div>
              <label
                htmlFor="application_route"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vía de Administración:
              </label>
              <select
                id="application_route"
                name="application_route"
                value={formData.application_route}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una vía</option>
                <option value="Oral">Oral</option>
                <option value="Intramuscular">Intramuscular</option>
                <option value="Intravenosa">Intravenosa</option>
                <option value="Tópica">Tópica</option>
                <option value="Subcutánea">Subcutánea</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="associated_diagnosis"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Diagnóstico Asociado:
              </label>
              <input
                type="text"
                id="associated_diagnosis"
                name="associated_diagnosis"
                value={formData.associated_diagnosis}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Parásitos internos"
              />
            </div>

            <div>
              <label
                htmlFor="treatment_duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duración del Tratamiento:
              </label>
              <input
                type="text"
                id="treatment_duration"
                name="treatment_duration"
                value={formData.treatment_duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 5 días"
              />
            </div>

            <div>
              <label
                htmlFor="idResponsible"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Responsable:
              </label>
              <input
                type="text"
                id="idResponsible"
                name="idResponsible"
                value={formData.idResponsible}
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
            form="treatment-create-form"
            disabled={isSubmitting}
            className="w-full bg-[#4B6043] text-white font-medium py-2 px-4 rounded-md hover:bg-[#405539] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4B6043]/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Tratamiento"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}