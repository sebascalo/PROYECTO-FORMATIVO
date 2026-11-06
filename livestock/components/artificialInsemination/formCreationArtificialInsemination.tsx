"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import type { ArtificialInsemination } from "./columns";

interface Cattle {
  id_Bovine: number;
  name: string;
  sex: string;
  active: boolean | number;
}

interface Race {
  id_race: number;
  name_race: string;
  active: "Active" | "Inactive";
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
  status: "Active" | "Inactive";
}

interface FormCreationArtificialInseminationProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  inseminationToEdit?: ArtificialInsemination | null;
}

const initialFormData = {
  id_madre: "",
  id_toro: "",
  inseminationDate: new Date().toISOString().split("T")[0],
  semenID: "",
  id_race: "",
  servicio: "",
  observations: "",
  idResponsible: "",
};

export default function FormCreationArtificialInsemination({
  isOpen,
  onClose,
  onSuccess,
  inseminationToEdit,
}: FormCreationArtificialInseminationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState(initialFormData);

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [loadingCattles, setLoadingCattles] = useState(true);

  const [races, setRaces] = useState<Race[]>([]);
  const [loadingRaces, setLoadingRaces] = useState(true);

  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [loadingResponsibles, setLoadingResponsibles] = useState(true);

  const isEditing = !!inseminationToEdit;

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
          (c: Cattle) =>
            c.active === true || Number(c.active) === 1,
        );

        setCattles(activeCattles);
      } catch (err) {
        console.error("Error al cargar bovinos:", err);
      } finally {
        setLoadingCattles(false);
      }
    };

    fetchCattles();
  }, []);

  // Cargar razas
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/race/RaceAll?limit=100",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const resJson = await response.json();

        if (!response.ok) {
          throw new Error(resJson?.message || "Error razas");
        }

        const activeRaces = (resJson.info ?? []).filter(
          (r: Race) => r.active === "Active",
        );

        setRaces(activeRaces);
      } catch (err) {
        console.error("Error al cargar razas:", err);
      } finally {
        setLoadingRaces(false);
      }
    };

    fetchRaces();
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
          throw new Error(
            resJson?.message || "Error responsables",
          );
        }

        const activeResponsibles = (resJson.info ?? []).filter(
          (r: Responsible) => r.status === "Active",
        );

        setResponsibles(activeResponsibles);
      } catch (err) {
        console.error("Error al cargar responsables:", err);
      } finally {
        setLoadingResponsibles(false);
      }
    };

    fetchResponsibles();
  }, []);

  // Cargar los datos cuando se selecciona una inseminación
  useEffect(() => {
    if (isOpen && inseminationToEdit) {
      const numeroServicio = inseminationToEdit.servicio
        ?.replace(/^Servicio\s*/i, "")
        .trim();

      setFormData({
        id_madre: String(inseminationToEdit.id_madre ?? ""),
        id_toro: inseminationToEdit.id_toro
          ? String(inseminationToEdit.id_toro)
          : "",
        inseminationDate: inseminationToEdit.inseminationDate
          ? inseminationToEdit.inseminationDate.split("T")[0]
          : "",
        semenID: inseminationToEdit.semenID ?? "",
        id_race: String(inseminationToEdit.id_race ?? ""),
        servicio: numeroServicio ?? "",
        observations: inseminationToEdit.observations ?? "",
        idResponsible: String(
          inseminationToEdit.idResponsible ?? "",
        ),
      });

      setError(null);
    } else if (isOpen && !inseminationToEdit) {
      limpiarFormulario();
    }
  }, [isOpen, inseminationToEdit]);

  // Filtros para madre y toro
  const mothers = cattles.filter((c) => c.sex === "Hembra");
  const bulls = cattles.filter((c) => c.sex === "Macho");

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

  const limpiarFormulario = () => {
    setFormData({
      ...initialFormData,
      inseminationDate: new Date().toISOString().split("T")[0],
    });

    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_madre) {
      return setError("Debes seleccionar una madre");
    }

    if (!formData.inseminationDate) {
      return setError("La fecha es obligatoria");
    }

    if (!formData.semenID.trim()) {
      return setError("El código de pajilla es obligatorio");
    }

    if (!formData.id_race) {
      return setError("Debes seleccionar una raza");
    }

    if (!formData.idResponsible) {
      return setError("Debes seleccionar un responsable");
    }

    if (new Date(formData.inseminationDate) > new Date()) {
      return setError("La fecha no puede ser futura");
    }

    const datosEnviar = {
      id_madre: Number(formData.id_madre),
      id_toro: formData.id_toro
        ? Number(formData.id_toro)
        : null,
      inseminationDate: formData.inseminationDate,
      semenID: formData.semenID,
      id_race: Number(formData.id_race),
      servicio: formData.servicio
        ? `Servicio ${formData.servicio}`
        : null,
      observations: formData.observations || null,
      idResponsible: Number(formData.idResponsible),
    };

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const url = isEditing
        ? `http://localhost:3000/api/artificialInsemination/UpdateArtificialInsemination/${inseminationToEdit?.id_artifInse}`
        : "http://localhost:3000/api/artificialInsemination/CreateArtificialInsemination";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosEnviar),
      });

      const responseJson = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          responseJson?.message ||
            (isEditing
              ? "Error al actualizar la inseminación"
              : "Error al guardar la inseminación"),
        );
      }

      limpiarFormulario();
      onClose();
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo guardar la información.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isSubmitting) {
      limpiarFormulario();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="text-center text-2xl font-bold">
          {isEditing
            ? "Editar Inseminación Artificial"
            : "Crear Inseminación Artificial"}
        </DialogTitle>

        <form
          id="insemination-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* ID MADRE */}
            <div>
              <label
                htmlFor="id_madre"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                ID Madre:
              </label>

              <select
                id="id_madre"
                name="id_madre"
                value={formData.id_madre}
                onChange={handleChange}
                disabled={loadingCattles}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 disabled:opacity-60"
              >
                <option value="">
                  {loadingCattles
                    ? "Cargando..."
                    : "Seleccione una madre"}
                </option>

                {mothers.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>
                    {c.id_Bovine} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ID TORO */}
            <div>
              <label
                htmlFor="id_toro"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                ID Toro (donante):
              </label>

              <select
                id="id_toro"
                name="id_toro"
                value={formData.id_toro}
                onChange={handleChange}
                disabled={loadingCattles}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 disabled:opacity-60"
              >
                <option value="">
                  {loadingCattles
                    ? "Cargando..."
                    : "Seleccione un toro"}
                </option>

                {bulls.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>
                    {c.id_Bovine} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* FECHA */}
            <div>
              <label
                htmlFor="inseminationDate"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Fecha de Inseminación:
              </label>

              <input
                type="date"
                id="inseminationDate"
                name="inseminationDate"
                value={formData.inseminationDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* CÓDIGO SEMEN */}
            <div>
              <label
                htmlFor="semenID"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Código o Lote de la Pajilla:
              </label>

              <input
                type="text"
                id="semenID"
                name="semenID"
                value={formData.semenID}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Ej: T-001"
              />
            </div>

            {/* RAZA */}
            <div>
              <label
                htmlFor="id_race"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Raza de la Pajilla:
              </label>

              <select
                id="id_race"
                name="id_race"
                value={formData.id_race}
                onChange={handleChange}
                disabled={loadingRaces}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 disabled:opacity-60"
              >
                <option value="">
                  {loadingRaces
                    ? "Cargando..."
                    : "Seleccione una raza"}
                </option>

                {races.map((r) => (
                  <option key={r.id_race} value={r.id_race}>
                    {r.name_race}
                  </option>
                ))}
              </select>
            </div>

            {/* SERVICIO */}
            <div>
              <label
                htmlFor="servicio"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Número de Servicio:
              </label>

              <input
                type="number"
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                min="1"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Ej: 1"
              />
            </div>

            {/* RESPONSABLE */}
            <div className="col-span-2">
              <label
                htmlFor="idResponsible"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Responsable:
              </label>

              <select
                id="idResponsible"
                name="idResponsible"
                value={formData.idResponsible}
                onChange={handleChange}
                disabled={loadingResponsibles}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 disabled:opacity-60"
              >
                <option value="">
                  {loadingResponsibles
                    ? "Cargando..."
                    : "Seleccione un responsable"}
                </option>

                {responsibles.map((r) => (
                  <option
                    key={r.idResponsible}
                    value={r.idResponsible}
                  >
                    {r.fullName} - {r.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* OBSERVACIONES */}
          <div>
            <label
              htmlFor="observations"
              className="mb-1 block text-sm font-medium text-gray-700"
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
                className="w-full resize-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-12"
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
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
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
          Complete los campos para crear o editar una inseminación.
        </DialogDescription>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && (
            <p className="text-center text-sm font-medium text-red-600">
              ⚠️ {error}
            </p>
          )}

          <div className="flex w-full flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                limpiarFormulario();
                onClose();
              }}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="insemination-form"
              disabled={isSubmitting}
              className="flex-1 rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-60"
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                  ? "Actualizar Inseminación"
                  : "Guardar Inseminación"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}