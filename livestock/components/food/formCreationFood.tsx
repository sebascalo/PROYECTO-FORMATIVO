
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import { type Food } from "./columns";

interface FormCreationFoodProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  foodToEdit?: Food | null;
}

export default function FormCreationFood({
  isOpen,
  onClose,
  onSuccess,
  foodToEdit = null,
}: FormCreationFoodProps): React.JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    food_name: "",
    food_type: "",
    unit_measure: "",
    stock_quantity: "",
    cost_per_unit: "",
    supplier: "",
  });

  // Detectar si estamos editando
  const isEditing = Boolean(foodToEdit);

  // Cargar los datos del alimento seleccionado
  useEffect(() => {
    if (foodToEdit) {
      setFormData({
        food_name: foodToEdit.food_name ?? "",
        food_type: foodToEdit.food_type ?? "",
        unit_measure: foodToEdit.unit_measure ?? "",
        stock_quantity:
          foodToEdit.stock_quantity != null
            ? String(foodToEdit.stock_quantity)
            : "",
        cost_per_unit:
          foodToEdit.cost_per_unit != null
            ? String(foodToEdit.cost_per_unit)
            : "",
        supplier: foodToEdit.supplier ?? "",
      });
    } else {
      limpiarFormulario();
    }
  }, [foodToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      food_name: "",
      food_type: "",
      unit_measure: "",
      stock_quantity: "",
      cost_per_unit: "",
      supplier: "",
    });

    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const datosEnviar = {
      food_name: formData.food_name,
      food_type: formData.food_type,
      unit_measure: formData.unit_measure,
      stock_quantity: formData.stock_quantity
        ? parseFloat(formData.stock_quantity)
        : null,
      cost_per_unit: formData.cost_per_unit
        ? parseFloat(formData.cost_per_unit)
        : null,
      supplier: formData.supplier || null,
    };

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const url = isEditing
        ? `http://localhost:3000/api/food/UpdateFood/${foodToEdit?.id_food}`
        : "http://localhost:3000/api/food/CreateFood";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosEnviar),
      });

      if (!response.ok) {
        let backendMessage = "";

        try {
          const errorBody = await response.json();

          if (Array.isArray(errorBody?.errors)) {
            backendMessage = errorBody.errors
              .map((e: { message?: string } | string) =>
                typeof e === "string" ? e : e.message ?? String(e),
              )
              .join(" | ");
          } else {
            backendMessage =
              errorBody?.message ||
              errorBody?.error ||
              JSON.stringify(errorBody);
          }
        } catch {
          backendMessage = await response.text();
        }

        throw new Error(
          `El servidor respondió ${response.status}: ${backendMessage || "sin detalle"}`,
        );
      }

      limpiarFormulario();
      onSuccess();
      onClose();
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

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      limpiarFormulario();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          {isEditing ? "Editar Alimento" : "Crear Alimento"}
        </DialogTitle>

        <form
          id="food-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* NOMBRE */}
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

            {/* TIPO */}
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

            {/* UNIDAD */}
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

            {/* STOCK */}
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

            {/* COSTO */}
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

            {/* PROVEEDOR */}
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
        </form>

        <p className="text-sm text-gray-600 -mt-2">
          Complete los campos para {isEditing ? "actualizar" : "crear"} un
          alimento.
        </p>

        <DialogDescription className="sr-only">
          Formulario para crear o editar un alimento.
        </DialogDescription>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && (
            <p className="text-sm text-red-600 text-center font-medium">
              ⚠️ {error}
            </p>
          )}

          <div className="flex flex-row gap-2 w-full">
            <button
              type="button"
              onClick={() => {
                limpiarFormulario();
                onClose();
              }}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="food-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                  ? "Actualizar Alimento"
                  : "Guardar Alimento"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
