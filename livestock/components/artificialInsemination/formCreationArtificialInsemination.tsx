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

export default function FormCreationArtificialInsemination() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_madre: "",
    id_toro: "",
    inseminationDate: new Date().toISOString().split("T")[0],
    semenID: "",
    id_race: "",
    servicio: "",
    observations: "",
    idResponsible: "",
  });

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [loadingCattles, setLoadingCattles] = useState(true);
  const [cattlesError, setCattlesError] = useState<string | null>(null);

  const [races, setRaces] = useState<Race[]>([]);
  const [loadingRaces, setLoadingRaces] = useState(true);

  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [loadingResponsibles, setLoadingResponsibles] = useState(true);

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
        setCattlesError(
          err instanceof Error ? err.message : "No se pudieron cargar bovinos",
        );
      } finally {
        setLoadingCattles(false);
      }
    };
    fetchCattles();
  }, []);

  // 👇 Cargar razas
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/race/RaceAll?limit=100",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error razas");
        const activeRaces = (resJson.info ?? []).filter(
          (r: Race) => r.active === "Active",
        );
        setRaces(activeRaces);
      } catch (err) {
        console.error("Error razas:", err);
      } finally {
        setLoadingRaces(false);
      }
    };
    fetchRaces();
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
        if (!response.ok) throw new Error(resJson?.message || "Error responsables");
        
        const activeResponsibles = (resJson.info ?? []).filter(
          (r: Responsible) => r.status === "Active",
        );
        setResponsibles(activeResponsibles);
      } catch (err) {
        console.error("Error responsables:", err);
      } finally {
        setLoadingResponsibles(false);
      }
    };
    fetchResponsibles();
  }, []);

  // Filtros para los selects de madre y toro
  const mothers = cattles.filter((c) => c.sex === "Hembra");
  const bulls = cattles.filter((c) => c.sex === "Macho");

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
      id_madre: "",
      id_toro: "",
      inseminationDate: new Date().toISOString().split("T")[0],
      semenID: "",
      id_race: "",
      servicio: "",
      observations: "",
      idResponsible: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 👇 Validaciones
    if (!formData.id_madre) return setError("Debes seleccionar una madre");
    if (!formData.inseminationDate) return setError("La fecha es obligatoria");
    if (!formData.semenID.trim()) return setError("El código de pajilla es obligatorio");
    if (!formData.id_race) return setError("Debes seleccionar una raza");
    if (!formData.idResponsible) return setError("Debes seleccionar un responsable");

    if (new Date(formData.inseminationDate) > new Date())
      return setError("La fecha no puede ser futura");

    const datosEnviar = {
      id_madre: Number(formData.id_madre),
      id_toro: formData.id_toro ? Number(formData.id_toro) : null,
      inseminationDate: formData.inseminationDate,
      semenID: formData.semenID,
      id_race: Number(formData.id_race),
      // 👇 Agregamos "Servicio " automáticamente
      servicio: formData.servicio ? `Servicio ${formData.servicio}` : null,
      observations: formData.observations || null,
      idResponsible: Number(formData.idResponsible),
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/artificialInsemination/CreateArtificialInsemination",
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
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || "Error al guardar");
      }

      limpiarFormulario();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      setError(error instanceof Error ? error.message : "No se pudo guardar.");
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
        <ButtonCreate>Agregar Inseminación</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Inseminación Artificial
        </DialogTitle>
        <form
          id="insemination-create-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* ID MADRE */}
            <div>
              <label htmlFor="id_madre" className="block text-sm font-medium text-gray-700 mb-1">
                ID Madre:
              </label>
              <select
                id="id_madre"
                name="id_madre"
                value={formData.id_madre}
                onChange={handleChange}
                disabled={loadingCattles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white disabled:opacity-60"
              >
                <option value="">{loadingCattles ? "Cargando..." : "Seleccione una madre"}</option>
                {mothers.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>
                    {c.id_Bovine} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ID TORO */}
            <div>
              <label htmlFor="id_toro" className="block text-sm font-medium text-gray-700 mb-1">
                ID Toro (donante):
              </label>
              <select
                id="id_toro"
                name="id_toro"
                value={formData.id_toro}
                onChange={handleChange}
                disabled={loadingCattles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white disabled:opacity-60"
              >
                <option value="">{loadingCattles ? "Cargando..." : "Seleccione un toro"}</option>
                {bulls.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>
                    {c.id_Bovine} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* FECHA */}
            <div>
              <label htmlFor="inseminationDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Inseminación:
              </label>
              <input
                type="date"
                id="inseminationDate"
                name="inseminationDate"
                value={formData.inseminationDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* CÓDIGO SEMEN */}
            <div>
              <label htmlFor="semenID" className="block text-sm font-medium text-gray-700 mb-1">
                Código o Lote de la Pajilla:
              </label>
              <input
                type="text"
                id="semenID"
                name="semenID"
                value={formData.semenID}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: T-001"
              />
            </div>

            {/* RAZA */}
            <div>
              <label htmlFor="id_race" className="block text-sm font-medium text-gray-700 mb-1">
                Raza de la Pajilla:
              </label>
              <select
                id="id_race"
                name="id_race"
                value={formData.id_race}
                onChange={handleChange}
                disabled={loadingRaces}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white disabled:opacity-60"
              >
                <option value="">Seleccione una raza</option>
                {races.map((r) => (
                  <option key={r.id_race} value={r.id_race}>
                    {r.name_race}
                  </option>
                ))}
              </select>
            </div>

            {/* SERVICIO (Solo número) */}
            <div>
              <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-1">
                Número de Servicio:
              </label>
              <input
                type="number"
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: 1"
              />
            </div>

            {/* RESPONSABLE */}
            <div className="col-span-2">
              <label htmlFor="idResponsible" className="block text-sm font-medium text-gray-700 mb-1">
                Responsable:
              </label>
              <select
                id="idResponsible"
                name="idResponsible"
                value={formData.idResponsible}
                onChange={handleChange}
                disabled={loadingResponsibles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white disabled:opacity-60"
              >
                <option value="">{loadingResponsibles ? "Cargando..." : "Seleccione un responsable"}</option>
                {responsibles.map((r) => (
                  <option key={r.idResponsible} value={r.idResponsible}>
                    {r.fullName} - {r.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* OBSERVACIONES */}
          <div>
            <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">
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
                  onClick={() => setFormData((prev) => ({ ...prev, observations: "" }))}
                  className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>

        <DialogDescription className="sr-only">
          Complete los campos para crear una inseminación.
        </DialogDescription>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && <p className="text-sm text-red-600 text-center font-medium">⚠️ {error}</p>}
          <div className="flex flex-row gap-2 w-full">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 font-medium py-2 px-4 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="insemination-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700"
            >
              {isSubmitting ? "Guardando..." : "Guardar Inseminación"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}