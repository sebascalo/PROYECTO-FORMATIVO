"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { type Treatment } from "./columns";

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

interface FormCreationTreatmentProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  treatmentToEdit?: Treatment | null;
}

export default function FormCreationTreatment({
  isOpen,
  onClose,
  onSuccess,
  treatmentToEdit = null,
}: FormCreationTreatmentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id_Bovine: "",
    treatment_date: new Date().toISOString().split("T")[0],
    medication_used: "",
    vaccine_lot: "",
    applied_dose: "",
    application_route: "",
    associated_diagnosis: "",
    treatment_duration: "",
    withdrawal_time: "",
    observations: "",
    idResponsible: "",
  });

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [loadingCattles, setLoadingCattles] = useState(true);
  const [cattlesError, setCattlesError] = useState<string | null>(null);

  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [loadingResponsibles, setLoadingResponsibles] = useState(true);
  const [responsiblesError, setResponsiblesError] = useState<string | null>(
    null,
  );

  const isEditing = Boolean(treatmentToEdit);

  const limpiarFormulario = () => {
    setFormData({
      id_Bovine: "",
      treatment_date: new Date().toISOString().split("T")[0],
      medication_used: "",
      vaccine_lot: "",
      applied_dose: "",
      application_route: "",
      associated_diagnosis: "",
      treatment_duration: "",
      withdrawal_time: "",
      observations: "",
      idResponsible: "",
    });

    setError(null);
  };

  // Cargar los datos del tratamiento seleccionado
  useEffect(() => {
    if (treatmentToEdit) {
      setFormData({
        id_Bovine: String(treatmentToEdit.id_Bovine ?? ""),
        treatment_date: treatmentToEdit.treatment_date
          ? treatmentToEdit.treatment_date.split("T")[0]
          : "",
        medication_used: treatmentToEdit.medication_used ?? "",
        vaccine_lot: treatmentToEdit.vaccine_lot ?? "",
        applied_dose: treatmentToEdit.applied_dose ?? "",
        application_route: treatmentToEdit.application_route ?? "",
        associated_diagnosis: treatmentToEdit.associated_diagnosis ?? "",
        treatment_duration: treatmentToEdit.treatment_duration ?? "",
        withdrawal_time: treatmentToEdit.withdrawal_time ?? "",
        observations: treatmentToEdit.observations ?? "",
        idResponsible: String(treatmentToEdit.idResponsible ?? ""),
      });

      setError(null);
    } else {
      limpiarFormulario();
    }
  }, [treatmentToEdit, isOpen]);

  // Cargar bovinos
  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/cattle/CattleAll?limit=500",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson?.message || "Error bovinos");
        }

        const activeCattles = (resJson.info ?? []).filter(
          (c: Cattle) => c.active === true || Number(c.active) === 1,
        );

        setCattles(activeCattles);
      } catch (err) {
        setCattlesError(
          err instanceof Error ? err.message : "Error bovinos",
        );
      } finally {
        setLoadingCattles(false);
      }
    };

    fetchCattles();
  }, []);

  // Cargar responsables
  useEffect(() => {
    const fetchResponsibles = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/responsible/ResponsibleAll?limit=200",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson?.message || "Error responsables");
        }

        const activeResponsibles = (resJson.info ?? []).filter(
          (r: Responsible) => r.status === "Active",
        );

        setResponsibles(activeResponsibles);
      } catch (err) {
        setResponsiblesError(
          err instanceof Error ? err.message : "Error responsables",
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_Bovine) {
      return setError("Debes seleccionar un bovino");
    }

    if (!formData.treatment_date) {
      return setError("La fecha es obligatoria");
    }

    if (!formData.medication_used.trim()) {
      return setError("El medicamento es obligatorio");
    }

    if (!formData.applied_dose.trim()) {
      return setError("La dosis es obligatoria");
    }

    if (!formData.application_route) {
      return setError("Debes seleccionar una vía de administración");
    }

    if (!formData.associated_diagnosis.trim()) {
      return setError("El diagnóstico es obligatorio");
    }

    if (!formData.treatment_duration.trim()) {
      return setError("La duración es obligatoria");
    }

    if (!formData.idResponsible) {
      return setError("Debes seleccionar un responsable");
    }

    if (new Date(formData.treatment_date) > new Date()) {
      return setError("La fecha no puede ser futura");
    }

    const datosEnviar = {
      id_Bovine: Number(formData.id_Bovine),
      treatment_date: formData.treatment_date,
      medication_used: formData.medication_used,
      vaccine_lot: formData.vaccine_lot || null,
      applied_dose: formData.applied_dose,
      application_route: formData.application_route,
      associated_diagnosis: formData.associated_diagnosis,
      treatment_duration: formData.treatment_duration,
      withdrawal_time: formData.withdrawal_time || null,
      observations: formData.observations || null,
      idResponsible: Number(formData.idResponsible),
    };

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const url = isEditing
        ? `http://localhost:3000/api/treatment/UpdateTreatment/${treatmentToEdit?.id_treatment}`
        : "http://localhost:3000/api/treatment/CreateTreatment";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
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

          backendMessage = Array.isArray(errorBody?.errors)
            ? errorBody.errors
                .map((e: { message?: string } | string) =>
                  typeof e === "string" ? e : e.message || String(e),
                )
                .join(" | ")
            : errorBody?.message || errorBody?.error || "Error";
        } catch {
          backendMessage = await response.text();
        }

        throw new Error(
          `El servidor respondió ${response.status}: ${backendMessage}`,
        );
      }

      limpiarFormulario();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el tratamiento.",
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
          {isEditing ? "Editar Tratamiento" : "Crear Tratamiento"}
        </DialogTitle>

        <form
          id="treatment-create-form"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
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
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* MEDICAMENTO */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: Ivermectina"
              />
            </div>

            {/* LOTE */}
            <div>
              <label
                htmlFor="vaccine_lot"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Lote:
              </label>

              <input
                type="text"
                id="vaccine_lot"
                name="vaccine_lot"
                value={formData.vaccine_lot}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: LOTE-123"
              />
            </div>

            {/* DOSIS */}
            <div>
              <label
                htmlFor="applied_dose"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dosis Administrada (ml):
              </label>

              <input
                type="number"
                id="applied_dose"
                name="applied_dose"
                value={formData.applied_dose}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: 5"
              />
            </div>

            {/* VÍA */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="">Seleccione una vía</option>
                <option value="Oral">Oral</option>
                <option value="Intramuscular">Intramuscular</option>
                <option value="Intravenosa">Intravenosa</option>
                <option value="Tópica">Tópica</option>
                <option value="Subcutánea">Subcutánea</option>
              </select>
            </div>

            {/* DIAGNÓSTICO */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: Parásitos"
              />
            </div>

            {/* DURACIÓN */}
            <div>
              <label
                htmlFor="treatment_duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duración (días):
              </label>

              <input
                type="number"
                id="treatment_duration"
                name="treatment_duration"
                value={formData.treatment_duration}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: 5"
              />
            </div>

            {/* TIEMPO DE RETIRO */}
            <div>
              <label
                htmlFor="withdrawal_time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tiempo de Retiro (días):
              </label>

              <input
                type="number"
                id="withdrawal_time"
                name="withdrawal_time"
                value={formData.withdrawal_time}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: 10"
              />
            </div>

            {/* RESPONSABLE */}
            <div className="col-span-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
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
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md bg-white resize-none"
                placeholder="Escribe tus observaciones..."
              />

              {formData.observations.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      observations: "",
                    }))
                  }
                  className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>

        <DialogDescription className="sr-only">
          Complete los campos para registrar o actualizar un tratamiento.
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
              className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="treatment-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-60"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                  ? "Actualizar Tratamiento"
                  : "Guardar Tratamiento"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}