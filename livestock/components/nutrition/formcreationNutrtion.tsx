"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import ButtonCreate from "../ui/buttonCreate";

// 👇 Tipos
interface Cattle {
  id_Bovine: number;
  name: string;
  active: boolean | number;
}

interface Food {
  id_food: number;
  food_name: string;
  food_type: string;
  active: boolean;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
  status: "Active" | "Inactive";
}

export default function FormCreationNutrition() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_Bovine: "",
    id_food: "",
    quantity: "",
    frequency: "",
    idResponsible: "",
  });

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [loadingCattles, setLoadingCattles] = useState(true);
  const [cattlesError, setCattlesError] = useState<string | null>(null);

  const [foods, setFoods] = useState<Food[]>([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [foodsError, setFoodsError] = useState<string | null>(null);

  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [loadingResponsibles, setLoadingResponsibles] = useState(true);
  const [responsiblesError, setResponsiblesError] = useState<string | null>(null);

  // 👇 Cargar bovinos
  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/cattle/CattleAll?limit=500",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error bovinos");

        const activeCattles = (resJson.info ?? []).filter(
          (c: Cattle) => c.active === true || Number(c.active) === 1,
        );
        setCattles(activeCattles);
      } catch (err) {
        console.error("Error bovinos:", err);
        setCattlesError(
          err instanceof Error ? err.message : "No se pudieron cargar bovinos",
        );
      } finally {
        setLoadingCattles(false);
      }
    };
    fetchCattles();
  }, []);

  // 👇 Cargar alimentos
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/food/FoodAll?limit=500",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error alimentos");

        const activeFoods = (resJson.info ?? []).filter(
          (f: Food) => f.active === true,
        );
        setFoods(activeFoods);
      } catch (err) {
        console.error("Error alimentos:", err);
        setFoodsError(
          err instanceof Error ? err.message : "No se pudieron cargar alimentos",
        );
      } finally {
        setLoadingFoods(false);
      }
    };
    fetchFoods();
  }, []);

  // 👇 Cargar responsables
  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/responsible/ResponsibleAll?limit=200",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const resJson = await response.json();
        if (!response.ok)
          throw new Error(resJson?.message || "Error responsables");

        const activeResponsibles = (resJson.info ?? []).filter(
          (r: Responsible) => r.status === "Active",
        );
        setResponsibles(activeResponsibles);
      } catch (err) {
        console.error("Error responsables:", err);
        setResponsiblesError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar responsables",
        );
      } finally {
        setLoadingResponsibles(false);
      }
    };
    fetchResponsibles();
  }, []);

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
      id_Bovine: "",
      id_food: "",
      quantity: "",
      frequency: "",
      idResponsible: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_Bovine) return setError("Debes seleccionar un bovino");
    if (!formData.id_food) return setError("Debes seleccionar un alimento");
    if (!formData.quantity.trim()) return setError("La cantidad es obligatoria");
    if (!formData.frequency) return setError("Debes seleccionar una frecuencia");
    if (!formData.idResponsible)
      return setError("Debes seleccionar un responsable");

    const datosEnviar = {
      id_Bovine: Number(formData.id_Bovine),
      id_food: Number(formData.id_food),
      quantity: formData.quantity,
      frequency: formData.frequency,
      idResponsible: Number(formData.idResponsible),
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/nutrition/CreateNutrition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(datosEnviar),
        },
      );

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
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar la nutrición.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) limpiarFormulario();
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Nutrición</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Nutrición
        </DialogTitle>
        <form
          id="nutrition-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* BOVINO */}
            <div>
              <label
                htmlFor="id_Bovine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bovino:
              </label>
              <select
                id="id_Bovine"
                name="id_Bovine"
                value={formData.id_Bovine}
                onChange={handleChange}
                disabled={loadingCattles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">
                  {loadingCattles
                    ? "Cargando bovinos..."
                    : cattlesError
                      ? "Error al cargar bovinos"
                      : "Seleccione un bovino"}
                </option>
                {cattles.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>
                    {c.id_Bovine} - {c.name}
                  </option>
                ))}
              </select>
              {cattlesError && (
                <p className="text-xs text-red-600 mt-1">{cattlesError}</p>
              )}
            </div>

            {/* ALIMENTO */}
            <div>
              <label
                htmlFor="id_food"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Alimento:
              </label>
              <select
                id="id_food"
                name="id_food"
                value={formData.id_food}
                onChange={handleChange}
                disabled={loadingFoods}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">
                  {loadingFoods
                    ? "Cargando alimentos..."
                    : foodsError
                      ? "Error al cargar alimentos"
                      : "Seleccione un alimento"}
                </option>
                {foods.map((f) => (
                  <option key={f.id_food} value={f.id_food}>
                    {f.food_name} ({f.food_type})
                  </option>
                ))}
              </select>
              {foodsError && (
                <p className="text-xs text-red-600 mt-1">{foodsError}</p>
              )}
            </div>

            {/* CANTIDAD */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cantidad:
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 5 kg"
              />
            </div>

            {/* FRECUENCIA */}
            <div>
              <label
                htmlFor="frequency"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Frecuencia:
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una frecuencia</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
                <option value="Mañana y Tarde">Mañana y Tarde</option>
                <option value="Mañana, Tarde y Noche">
                  Mañana, Tarde y Noche
                </option>
              </select>
            </div>

            {/* RESPONSABLE */}
            <div>
              <label
                htmlFor="idResponsible"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Responsable:
              </label>
              <select
                id="idResponsible"
                name="idResponsible"
                value={formData.idResponsible}
                onChange={handleChange}
                disabled={loadingResponsibles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">
                  {loadingResponsibles
                    ? "Cargando responsables..."
                    : responsiblesError
                      ? "Error al cargar responsables"
                      : "Seleccione un responsable"}
                </option>
                {responsibles.map((r) => (
                  <option key={r.idResponsible} value={r.idResponsible}>
                    {r.fullName} - {r.role}
                  </option>
                ))}
              </select>
              {responsiblesError && (
                <p className="text-xs text-red-600 mt-1">
                  {responsiblesError}
                </p>
              )}
            </div>
          </div>
        </form>

        {/* 👇 Descripción arriba a la izquierda */}
        <p className="text-sm text-gray-600 -mt-2">
          Complete los campos para crear una nueva nutrición.
        </p>

        {/* 👇 Oculto para accesibilidad */}
        <DialogDescription className="sr-only">
          Complete los campos para crear una nueva nutrición.
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
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="nutrition-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Nutrición"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}