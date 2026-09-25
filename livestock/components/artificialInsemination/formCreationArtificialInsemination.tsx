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

export default function FormCreationArtificialInsemination() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    idBovine: "",
    inseminationDate: new Date().toISOString().split("T")[0],
    semenID: "",
    raze: "",                 // 🔧 nuevo (reemplaza a donorBull y semenDose)
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
      inseminationDate: new Date().toISOString().split("T")[0],
      semenID: "",
      raze: "",
      observations: "",
      idResponsible: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const datosEnviar = {
      ...formData,
      idBovine: formData.idBovine ? parseInt(formData.idBovine) : null,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/artificialInsemination/CreateArtificialInsemination",
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
          : "No se pudo guardar la inseminación. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Inseminación</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Inseminación Artificial
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear una nueva inseminación artificial.
        </DialogDescription>

        <form
          id="insemination-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="idBovine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bovino (Vaca):
              </label>
              <input
                type="number"
                id="idBovine"
                name="idBovine"
                value={formData.idBovine}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="ID del bovino"
              />
            </div>

            <div>
              <label
                htmlFor="inseminationDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Inseminación:
              </label>
              <input
                type="date"
                id="inseminationDate"
                name="inseminationDate"
                value={formData.inseminationDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label
                htmlFor="semenID"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Código o Lote de la Pajilla:
              </label>
              <input
                type="text"
                id="semenID"
                name="semenID"
                value={formData.semenID}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: T-001"
              />
            </div>

            <div>
              <label
                htmlFor="raze"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Raza de la Pajilla:
              </label>
              <select
                id="raze"
                name="raze"
                value={formData.raze}
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
            form="insemination-create-form"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Inseminación"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}