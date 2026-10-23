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

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
  status: "Active" | "Inactive";
}

export default function FormCreationVacunation() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_Bovine: "",
    vaccination_date: new Date().toISOString().split("T")[0],
    applied_dose: "",
    vaccine_lot: "",
    medicine_name: "",
    idResponsible: "",
    observations: "",
  });

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [loadingCattles, setLoadingCattles] = useState(true);
  const [cattlesError, setCattlesError] = useState<string | null>(null);

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
      vaccination_date: new Date().toISOString().split("T")[0],
      applied_dose: "",
      vaccine_lot: "",
      medicine_name: "",
      idResponsible: "",
      observations: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 👇 Validaciones previas
    if (!formData.id_Bovine) return setError("Debes seleccionar un bovino");
    if (!formData.vaccination_date) return setError("La fecha es obligatoria");
    if (!formData.applied_dose.trim())
      return setError("La dosis aplicada es obligatoria");
    if (!formData.vaccine_lot.trim())
      return setError("El lote de la vacuna es obligatorio");
    if (!formData.medicine_name.trim())
      return setError("El nombre del medicamento es obligatorio");
    if (!formData.idResponsible)
      return setError("Debes seleccionar un responsable");

    if (new Date(formData.vaccination_date) > new Date())
      return setError("La fecha no puede ser futura");

    const datosEnviar = {
      id_Bovine: Number(formData.id_Bovine),
      vaccination_date: formData.vaccination_date,
      applied_dose: formData.applied_dose,
      vaccine_lot: formData.vaccine_lot,
      medicine_name: formData.medicine_name,
      idResponsible: Number(formData.idResponsible),
      observations: formData.observations || null,
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/vacunation/CreateVacunation",
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
          : "No se pudo guardar la vacunación.",
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
        <ButtonCreate>Agregar Vacunación</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Vacunación
        </DialogTitle>
        <form
          id="vacunation-create-form"
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

            {/* FECHA */}
            <div>
              <label
                htmlFor="vaccination_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de Vacunación:
              </label>
              <input
                type="date"
                id="vaccination_date"
                name="vaccination_date"
                value={formData.vaccination_date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            {/* DOSIS */}
            <div>
              <label
                htmlFor="applied_dose"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dosis Aplicada (ml):
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

            {/* LOTE */}
            <div>
              <label
                htmlFor="vaccine_lot"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Lote de Vacuna:
              </label>
              <input
                type="text"
                id="vaccine_lot"
                name="vaccine_lot"
                value={formData.vaccine_lot}
                onChange={handleChange}
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: LOT-2026-A"
              />
            </div>

            {/* MEDICAMENTO */}
            <div>
              <label
                htmlFor="medicine_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Medicamento:
              </label>
              <input
                type="text"
                id="medicine_name"
                name="medicine_name"
                value={formData.medicine_name}
                onChange={handleChange}
                maxLength={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: Ivermectina"
              />
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
                Complete los campos para crear una nueva vacunación.
              </p>
              <p className="text-sm text-gray-500">
                {formData.observations.length}/100
              </p>
            </div>
          </div>
        </form>

        {/* 👇 Oculto para accesibilidad */}
        <DialogDescription className="sr-only">
          Complete los campos para crear una nueva vacunación.
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
              form="vacunation-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Vacunación"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}