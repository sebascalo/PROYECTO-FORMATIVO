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

export default function FormCreationFood() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    food_name: "",
    food_type: "",
    unit_measure: "",
    stock_quantity: "",
    cost_per_unit: "",
    supplier: "",
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
      food_name: "",
      food_type: "",
      unit_measure: "",
      stock_quantity: "",
      cost_per_unit: "",
      supplier: "",
      observations: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const datosEnviar = {
      ...formData,
      stock_quantity: formData.stock_quantity
        ? parseFloat(formData.stock_quantity)
        : null,
      cost_per_unit: formData.cost_per_unit
        ? parseFloat(formData.cost_per_unit)
        : null,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/food/CreateFood", {
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
          : "No se pudo guardar el alimento. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Alimento</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Alimento
        </DialogTitle>
        <DialogDescription>
          Complete los campos para crear un nuevo alimento.
        </DialogDescription>

        <form
          id="food-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="food_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre del Alimento:
              </label>
              <input
                type="text"
                id="food_name"
                name="food_name"
                value={formData.food_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Maíz"
              />
            </div>

            <div>
              <label
                htmlFor="food_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Alimento:
              </label>
              <select
                id="food_type"
                name="food_type"
                value={formData.food_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione un tipo</option>
                <option value="Pasto">Pasto</option>
                <option value="Concentrado">Concentrado</option>
                <option value="Silo">Silo</option>
                <option value="Forraje">Forraje</option>
                <option value="Suplemento">Suplemento</option>
                <option value="Mineral">Mineral</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="unit_measure"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Unidad de Medida:
              </label>
              <select
                id="unit_measure"
                name="unit_measure"
                value={formData.unit_measure}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una unidad</option>
                <option value="kg">Kilogramos (kg)</option>
                <option value="lb">Libras (lb)</option>
                <option value="g">Gramos (g)</option>
                <option value="L">Litros (L)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="Unidad">Unidad</option>
                <option value="Saco">Saco</option>
                <option value="Bulto">Bulto</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="stock_quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cantidad en Stock:
              </label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 1000"
              />
            </div>

            <div>
              <label
                htmlFor="cost_per_unit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Costo por Unidad ($):
              </label>
              <input
                type="number"
                id="cost_per_unit"
                name="cost_per_unit"
                value={formData.cost_per_unit}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 1500"
              />
            </div>

            <div>
              <label
                htmlFor="supplier"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Proveedor:
              </label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Agronegocios SAS"
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
            form="food-create-form"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Guardando..." : "Guardar Alimento"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}