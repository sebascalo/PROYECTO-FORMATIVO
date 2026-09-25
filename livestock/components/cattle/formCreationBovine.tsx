"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogTitle
} from "../ui/dialog";
import ButtonCreate from "../ui/buttonCreate";

export default function FormCreationCattle() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    raze: "",
    sex: "",
    entrydate: "",
    paddock: "",
    birthdate: "",
    photo: "",
    currentweight: "",
    classificationbytype: "",
    active: "",
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
      name: "",
      raze: "",
      sex: "",
      entrydate: "",
      paddock: "",
      birthdate: "",
      photo: "",
      currentweight: "",
      classificationbytype: "",
      active: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const datosEnviar = {
      ...formData,
      currentweight: parseFloat(formData.currentweight),
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/cattle/CreateCattle", {
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
          backendMessage = errorBody?.message || errorBody?.error || JSON.stringify(errorBody);
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
          : "No se pudo guardar el bovino. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Bovino</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Bovino
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear un nuevo bovino.
        </DialogDescription>

        <form id="cattle-create-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Lola"
              />
            </div>

            <div>
              <label
                htmlFor="raze"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Raza:
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
                htmlFor="entrydate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Ingreso:
              </label>
              <input
                type="date"
                id="entrydate"
                name="entrydate"
                value={formData.entrydate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            <div>
              <label
                htmlFor="paddock"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Potrero:
              </label>
              <input
                type="text"
                id="paddock"
                name="paddock"
                value={formData.paddock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Potrero Norte"
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
                htmlFor="currentweight"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Peso Actual (kg):
              </label>
              <input
                type="number"
                id="currentweight"
                name="currentweight"
                value={formData.currentweight}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 450.5"
              />
            </div>

            <div>
              <label
                htmlFor="classificationbytype"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Clasificación:
              </label>
              <select
                id="classificationbytype"
                name="classificationbytype"
                value={formData.classificationbytype}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una clasificación</option>
                <option value="Lechero">Lechero</option>
                <option value="Carne">Carne</option>
                <option value="Doble propósito">Doble propósito</option>
              </select>
            </div>

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
                <option value="">Seleccione un estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Foto (URL):
              </label>
              <input
                type="text"
                id="photo"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="https://ejemplo.com/foto.jpg"
              />
            </div>
          </div>
        </form>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          <button
            type="submit"
            form="cattle-create-form"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Bovino"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}