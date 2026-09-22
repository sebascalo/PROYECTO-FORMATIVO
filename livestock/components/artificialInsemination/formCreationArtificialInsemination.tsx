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

export default function FormCreationArtificialInsemination() {
  const [formData, setFormData] = useState({
    idBovine: "",
    inseminationDate: new Date().toISOString().split("T")[0],
    semenID: "",
    donorBull: "",
    semenDose: "",
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
      donorBull: "",
      semenDose: "",
      observations: "",
      idResponsible: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const datosEnviar = {
      ...formData,
      idBovine: parseInt(formData.idBovine),
      semenDose: formData.semenDose ? parseFloat(formData.semenDose) : null,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/artificialInsemination/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEnviar),
        },
      );

      limpiarFormulario();
    } catch (error) {
      console.error("Error:", error);
      limpiarFormulario();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
          <CirclePlus className="w-8 h-8 mr-2 text-green-600" /> Agregar
          Inseminación Artificial
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Inseminación Artificial
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear una nueva inseminación artificial.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="semenID"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Código del Semen:
              </label>
              <input
                type="text"
                id="semenID"
                name="semenID"
                value={formData.semenID}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: T-001"
              />
            </div>

            <div>
              <label
                htmlFor="donorBull"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Toro Donante:
              </label>
              <input
                type="text"
                id="donorBull"
                name="donorBull"
                value={formData.donorBull}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Toro Negro"
              />
            </div>

            <div>
              <label
                htmlFor="semenDose"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dosis:
              </label>
              <input
                type="number"
                id="semenDose"
                name="semenDose"
                value={formData.semenDose}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 0.5"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Observaciones adicionales..."
            />
          </div>
        </form>
        <DialogFooter>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Guardar Inseminación Artificial
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
