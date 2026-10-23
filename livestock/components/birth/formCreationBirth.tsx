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

export default function FormCreationBirth() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_Bovine: "",
    birthdate: new Date().toISOString().split("T")[0],
    sex: "",
    id_race: "",
    birthweight: "",
    observations: "",
    idResponsible: "",
  });

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [loadingCattles, setLoadingCattles] = useState(true);
  const [cattlesError, setCattlesError] = useState<string | null>(null);

  const [races, setRaces] = useState<Race[]>([]);
  const [loadingRaces, setLoadingRaces] = useState(true);
  const [racesError, setRacesError] = useState<string | null>(null);

  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [loadingResponsibles, setLoadingResponsibles] = useState(true);
  const [responsiblesError, setResponsiblesError] = useState<string | null>(null);

  // 👇 Cargar bovinos (solo hembras activas)
  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error bovinos");

        const femaleCattles = (resJson.info ?? []).filter(
          (c: Cattle) => c.sex === "Hembra" && (c.active === true || Number(c.active) === 1),
        );
        setCattles(femaleCattles);
      } catch (err) {
        setCattlesError(err instanceof Error ? err.message : "No se pudieron cargar bovinos");
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
        const response = await fetch("http://localhost:3000/api/race/RaceAll?limit=100", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error razas");
        const activeRaces = (resJson.info ?? []).filter((r: Race) => r.active === "Active");
        setRaces(activeRaces);
      } catch (err) {
        setRacesError(err instanceof Error ? err.message : "No se pudieron cargar razas");
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
        const response = await fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=200", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error responsables");
        const activeResponsibles = (resJson.info ?? []).filter((r: Responsible) => r.status === "Active");
        setResponsibles(activeResponsibles);
      } catch (err) {
        setResponsiblesError(err instanceof Error ? err.message : "No se pudieron cargar responsables");
      } finally {
        setLoadingResponsibles(false);
      }
    };
    fetchResponsibles();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const limpiarFormulario = () => {
    setFormData({
      id_Bovine: "",
      birthdate: new Date().toISOString().split("T")[0],
      sex: "",
      id_race: "",
      birthweight: "",
      observations: "",
      idResponsible: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_Bovine) return setError("Debes seleccionar una madre");
    if (!formData.birthdate) return setError("La fecha es obligatoria");
    if (!formData.sex) return setError("Debes seleccionar un sexo");
    if (!formData.id_race) return setError("Debes seleccionar una raza");

    const weight = parseFloat(formData.birthweight);
    if (isNaN(weight) || weight <= 0) return setError("El peso debe ser mayor a 0");
    if (!formData.idResponsible) return setError("Debes seleccionar un responsable");

    if (new Date(formData.birthdate) > new Date()) return setError("La fecha no puede ser futura");

    const datosEnviar = {
      id_Bovine: Number(formData.id_Bovine),
      // ❌ Quitamos id_pasture
      birthdate: formData.birthdate,
      sex: formData.sex,
      id_race: Number(formData.id_race),
      birthweight: weight,
      observations: formData.observations || null,
      idResponsible: Number(formData.idResponsible),
      active: true,
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/birth/CreateBirth", {
        method: "POST",
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
            backendMessage = errorBody.errors.map((e: any) => typeof e === "string" ? e : e.message).join(" | ");
          } else {
            backendMessage = errorBody?.message || errorBody?.error || JSON.stringify(errorBody);
          }
        } catch {
          backendMessage = await response.text();
        }
        throw new Error(`El servidor respondió ${response.status}: ${backendMessage}`);
      }

      limpiarFormulario();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      setError(error instanceof Error ? error.message : "No se pudo guardar el nacimiento.");
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
        <ButtonCreate>Agregar Parto</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Parto
        </DialogTitle>
        <form id="birth-create-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* MADRE */}
            <div>
              <label htmlFor="id_Bovine" className="block text-sm font-medium text-gray-700 mb-1">Madre:</label>
              <select
                id="id_Bovine"
                name="id_Bovine"
                value={formData.id_Bovine}
                onChange={handleChange}
                disabled={loadingCattles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">{loadingCattles ? "Cargando madres..." : "Seleccione una madre"}</option>
                {cattles.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>{c.id_Bovine} - {c.name}</option>
                ))}
              </select>
              {cattlesError && <p className="text-xs text-red-600 mt-1">{cattlesError}</p>}
            </div>

            {/* FECHA */}
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            {/* SEXO */}
            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">Sexo:</label>
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

            {/* RAZA */}
            <div>
              <label htmlFor="id_race" className="block text-sm font-medium text-gray-700 mb-1">Raza:</label>
              <select
                id="id_race"
                name="id_race"
                value={formData.id_race}
                onChange={handleChange}
                disabled={loadingRaces}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">{loadingRaces ? "Cargando razas..." : "Seleccione una raza"}</option>
                {races.map((r) => (
                  <option key={r.id_race} value={r.id_race}>{r.name_race}</option>
                ))}
              </select>
              {racesError && <p className="text-xs text-red-600 mt-1">{racesError}</p>}
            </div>

            {/* PESO */}
            <div>
              <label htmlFor="birthweight" className="block text-sm font-medium text-gray-700 mb-1">Peso al Nacer (kg):</label>
              <input
                type="number"
                id="birthweight"
                name="birthweight"
                value={formData.birthweight}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 35.5"
              />
            </div>

            {/* RESPONSABLE */}
            <div>
              <label htmlFor="idResponsible" className="block text-sm font-medium text-gray-700 mb-1">Responsable:</label>
              <select
                id="idResponsible"
                name="idResponsible"
                value={formData.idResponsible}
                onChange={handleChange}
                disabled={loadingResponsibles}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">{loadingResponsibles ? "Cargando responsables..." : "Seleccione un responsable"}</option>
                {responsibles.map((r) => (
                  <option key={r.idResponsible} value={r.idResponsible}>{r.fullName} - {r.role}</option>
                ))}
              </select>
              {responsiblesError && <p className="text-xs text-red-600 mt-1">{responsiblesError}</p>}
            </div>
          </div>

          {/* OBSERVACIONES */}
          <div>
            <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">Observaciones:</label>
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
                  onClick={() => setFormData((prev) => ({ ...prev, observations: "" }))}
                  className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-600">Complete los campos para crear un nuevo parto.</p>
              <p className="text-xs text-gray-500">{formData.observations.length}/100</p>
            </div>
          </div>
        </form>

        <DialogDescription className="sr-only">Complete los campos para crear un nuevo parto.</DialogDescription>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {error && <p className="text-sm text-red-600 text-center font-medium">⚠️ {error}</p>}
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
              form="birth-create-form"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Nacimiento"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}