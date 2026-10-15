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

// 👇 Tipo para bovinos (PK = id_Bovine)
interface Cattle {
  id_Bovine: number;
  name: string;
  raze: string;
  active: boolean | number;
}

// 👇 Tipo para responsables (PK = idResponsible)
interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
  email: string;
  status: "Active" | "Inactive";
}

export default function FormCreationWeighing() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    idBovine: "",
    weighingdate: new Date().toISOString().split("T")[0],
    currentweight: "",
    profitorloss: "",
    bodycondition: "",
    observations: "",
    idResponsible: "",
  });

  // 👇 Estados para bovinos
  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [loadingCattles, setLoadingCattles] = useState(true);
  const [cattlesError, setCattlesError] = useState<string | null>(null);

  // 👇 Estados para responsables
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [loadingResponsibles, setLoadingResponsibles] = useState(true);
  const [responsiblesError, setResponsiblesError] = useState<string | null>(
    null,
  );

  // 👇 Cargar bovinos al montar
  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/cattle/CattleAll?limit=500",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson?.message || "Error al obtener bovinos");
        }

        const activeCattles = (resJson.info ?? []).filter(
          (c: Cattle) => c.active === true || Number(c.active) === 1,
        );
        setCattles(activeCattles);
      } catch (err) {
        console.error("Error bovinos:", err);
        setCattlesError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar los bovinos",
        );
      } finally {
        setLoadingCattles(false);
      }
    };

    fetchCattles();
  }, []);

  // 👇 Cargar responsables al montar
  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/responsible/ResponsibleAll?limit=200",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson?.message || "Error al obtener responsables");
        }

        const activeResponsibles = (resJson.info ?? []).filter(
          (r: Responsible) => r.status === "Active",
        );
        setResponsibles(activeResponsibles);
      } catch (err) {
        console.error("Error responsables:", err);
        setResponsiblesError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar los responsables",
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
      idBovine: "",
      weighingdate: new Date().toISOString().split("T")[0],
      currentweight: "",
      profitorloss: "",
      bodycondition: "",
      observations: "",
      idResponsible: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 👇 VALIDACIONES PREVIAS
    if (!formData.idBovine) {
      setError("Debes seleccionar un bovino");
      return;
    }
    if (!formData.weighingdate) {
      setError("La fecha de pesaje es obligatoria");
      return;
    }

    const weight = parseFloat(formData.currentweight);
    if (isNaN(weight) || weight <= 0) {
      setError("El peso actual debe ser un número mayor a 0");
      return;
    }

    if (formData.profitorloss) {
      const pl = parseFloat(formData.profitorloss);
      if (isNaN(pl)) {
        setError("La ganancia/pérdida debe ser un número válido");
        return;
      }
    }

    if (
      formData.bodycondition &&
      !["Delgado", "Normal", "Gordo"].includes(formData.bodycondition)
    ) {
      setError("La condición corporal debe ser: Delgado, Normal o Gordo");
      return;
    }

    if (formData.observations && formData.observations.length > 100) {
      setError("Las observaciones no pueden exceder los 100 caracteres");
      return;
    }

    if (new Date(formData.weighingdate) > new Date()) {
      setError("La fecha de pesaje no puede ser una fecha futura");
      return;
    }

    // 👇 El backend espera id_Bovine e idResponsible
    const datosEnviar = {
      id_Bovine: formData.idBovine,
      weighingdate: formData.weighingdate,
      currentweight: weight,
      profitorloss: formData.profitorloss
        ? parseFloat(formData.profitorloss)
        : null,
      bodycondition: formData.bodycondition || null,
      observations: formData.observations || null,
      idResponsible: formData.idResponsible
        ? Number(formData.idResponsible)
        : null,
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/weighing/CreateWeighing",
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
          : "No se pudo guardar el pesaje. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      limpiarFormulario();
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ButtonCreate>Agregar Pesaje</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Pesaje
        </DialogTitle>
        <form
          id="weighing-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* BOVINO DINÁMICO */}
            <div>
              <label
                htmlFor="idBovine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bovino:
              </label>
              <select
                id="idBovine"
                name="idBovine"
                value={formData.idBovine}
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
                {cattles.map((cattle) => (
                  <option key={cattle.id_Bovine} value={cattle.id_Bovine}>
                    {cattle.id_Bovine} - {cattle.name}
                  </option>
                ))}
              </select>
              {cattlesError && (
                <p className="text-xs text-red-600 mt-1">{cattlesError}</p>
              )}
            </div>

            {/* FECHA PESAJE */}
            <div>
              <label
                htmlFor="weighingdate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Pesaje:
              </label>
              <input
                type="date"
                id="weighingdate"
                name="weighingdate"
                value={formData.weighingdate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            {/* PESO */}
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

            {/* GANANCIA/PÉRDIDA */}
            <div>
              <label
                htmlFor="profitorloss"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ganancia/Pérdida (kg):
              </label>
              <input
                type="number"
                id="profitorloss"
                name="profitorloss"
                value={formData.profitorloss}
                onChange={handleChange}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 5.5"
              />
            </div>

            {/* CONDICIÓN CORPORAL */}
            <div>
              <label
                htmlFor="bodycondition"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Condición Corporal:
              </label>
              <select
                id="bodycondition"
                name="bodycondition"
                value={formData.bodycondition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una condición</option>
                <option value="Delgado">Delgado</option>
                <option value="Normal">Normal</option>
                <option value="Gordo">Gordo</option>
              </select>
            </div>

            {/* RESPONSABLE DINÁMICO */}
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
                {responsibles.map((resp) => (
                  <option key={resp.idResponsible} value={resp.idResponsible}>
                    {resp.fullName} - {resp.role}
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

          {/* OBSERVACIONES */}
          <div>
            <label
              htmlFor="observations"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Observaciones:
            </label>
            <div className="relative">
              <textarea
                id="observations"
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                rows={2}
                maxLength={100}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white resize-none"
                placeholder="Escribe tus observaciones..."
              />
              {formData.observations.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, observations: "" }))
                  }
                  className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 text-white transition-colors"
                  aria-label="Limpiar observaciones"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-600">
                Complete los campos para crear un nuevo pesaje.
              </p>
              <p className="text-xs text-gray-500">
                {formData.observations.length}/100
              </p>
            </div>
          </div>
        </form>

        {/* 👇 Oculto para accesibilidad */}
        <DialogDescription className="sr-only">
          Complete los campos para crear un nuevo pesaje.
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
              form="weighing-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Pesaje"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}