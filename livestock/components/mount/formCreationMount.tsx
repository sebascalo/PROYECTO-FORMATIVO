"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import ButtonCreate from "../ui/buttonCreate";

export default function FormCreationMount() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bovinos, setBovinos] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    idBovine: "",
    bullId: "",
    breedingDate: "",
    serviceNumber: "",
    bovineCondition: "",
    observations: "",
    idResponsible: "",
  });

  useEffect(() => {
    const fetchBovinos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cattle/CattleAll");
        const resJson = await response.json();
        setBovinos(resJson.info || []);
      } catch (error) {
        console.error("Error fetching bovinos:", error);
      }
    };
    fetchBovinos();
  }, []);

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
      bullId: "",
      breedingDate: "",
      serviceNumber: "",
      bovineCondition: "",
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
      bullId: formData.bullId ? parseInt(formData.bullId) : null,
      serviceNumber: formData.serviceNumber
        ? parseInt(formData.serviceNumber)
        : null,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/mount/CreateMount", {
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
          : "No se pudo guardar la monta. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Monta</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Monta Natural
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear una nueva monta natural.
        </DialogDescription>

        <form
          id="mount-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="idBovine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vaca (Hembra):
              </label>
              <select
                id="idBovine"
                name="idBovine"
                value={formData.idBovine}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una vaca</option>
                {bovinos.map((bovino: any) => (
                  <option key={bovino.id} value={bovino.id}>
                    {bovino.name || `ID: ${bovino.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="bullId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Toro (Macho):
              </label>
              <select
                id="bullId"
                name="bullId"
                value={formData.bullId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un toro</option>
                {bovinos.map((bovino: any) => (
                  <option key={bovino.id} value={bovino.id}>
                    {bovino.name || `ID: ${bovino.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="breedingDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Monta:
              </label>
              <input
                type="date"
                id="breedingDate"
                name="breedingDate"
                value={formData.breedingDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label
                htmlFor="serviceNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de Servicio:
              </label>
              <input
                type="number"
                id="serviceNumber"
                name="serviceNumber"
                value={formData.serviceNumber}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 1"
              />
            </div>

            <div>
              <label
                htmlFor="bovineCondition"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Condición de la Vaca:
              </label>
              <select
                id="bovineCondition"
                name="bovineCondition"
                value={formData.bovineCondition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una condición</option>
                <option value="Celo">Celo</option>
                <option value="Quieta">Quieta</option>
                <option value="Rechaza">Rechaza</option>
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
            form="mount-create-form"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Monta"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}