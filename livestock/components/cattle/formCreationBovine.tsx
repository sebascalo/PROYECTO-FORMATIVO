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
interface Race {
  id_race: number;
  name_race: string;
  active: "Active" | "Inactive";
}

interface CattleBase {
  id_Bovine: number;
  name: string;
  sex: string;
}

export default function FormCreationCattle() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_Bovine: "",
    name: "",
    id_race: "",
    sex: "",
    entrydate: "",
    id_mother: "",
    id_father: "",
    birthdate: "",
    photo: "",
    currentweight: "",
    classificationbytype: "",
    active: "Activo",
  });

  // 👇 Estados para razas
  const [races, setRaces] = useState<Race[]>([]);
  const [loadingRaces, setLoadingRaces] = useState(true);

  // 👇 Estados para padre/madre (bovinos existentes)
  const [allCattles, setAllCattles] = useState<CattleBase[]>([]);

  // 👇 Cargar razas
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/race/RaceAll?limit=100", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson?.message || "Error al obtener razas");
        const activeRaces = (resJson.info ?? []).filter((r: Race) => r.active === "Active");
        setRaces(activeRaces);
      } catch (err) {
        console.error("Error razas:", err); // 👈 Cambiado a console.error
      } finally {
        setLoadingRaces(false);
      }
    };
    fetchRaces();
  }, []);

  // 👇 Cargar bovinos (para madres y padres)
  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resJson = await response.json();
        if (response.ok) {
          setAllCattles(resJson.info ?? []);
        }
      } catch (err) {
        console.error("Error cargando bovinos para padres:", err);
      }
    };
    fetchCattles();
  }, []);

  // Filtros para los select de padre y madre
  const mothers = allCattles.filter((c) => c.sex === "Hembra");
  const fathers = allCattles.filter((c) => c.sex === "Macho");

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
      name: "",
      id_race: "",
      sex: "",
      entrydate: "",
      id_mother: "",
      id_father: "",
      birthdate: "",
      photo: "",
      currentweight: "",
      classificationbytype: "",
      active: "Activo",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 👇 Validaciones
    if (!formData.id_Bovine.trim()) return setError("El ID / Arete del bovino es obligatorio");
    if (!formData.name.trim()) return setError("El nombre del bovino es obligatorio");
    if (!formData.id_race) return setError("Debes seleccionar una raza");
    if (!formData.sex) return setError("Debes seleccionar un sexo");
    if (!formData.entrydate) return setError("La fecha de ingreso es obligatoria");
    if (!formData.birthdate) return setError("La fecha de nacimiento es obligatoria");

    const weight = parseFloat(formData.currentweight);
    if (isNaN(weight) || weight <= 0) return setError("El peso debe ser un número mayor a 0");

    if (!formData.classificationbytype) return setError("Debes seleccionar una clasificación");
    if (!formData.active) return setError("Debes seleccionar un estado");

    if (new Date(formData.birthdate) > new Date(formData.entrydate)) {
      return setError("La fecha de nacimiento no puede ser posterior a la de ingreso");
    }

    if (new Date(formData.entrydate) > new Date()) {
      return setError("La fecha de ingreso no puede ser futura");
    }

    const datosEnviar = {
      id_Bovine: Number(formData.id_Bovine),
      name: formData.name,
      id_race: Number(formData.id_race),
      sex: formData.sex,
      entrydate: formData.entrydate,
      id_mother: formData.id_mother ? Number(formData.id_mother) : null,
      id_father: formData.id_father ? Number(formData.id_father) : null,
      birthdate: formData.birthdate,
      photo: formData.photo || null,
      currentweight: weight,
      classificationbytype: formData.classificationbytype,
      active: formData.active,
    };

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/cattle/CreateCattle", {
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
            backendMessage = errorBody.errors
              .map((e: { message?: string } | string) => (typeof e === "string" ? e : e.message ?? String(e)))
              .join(" | ");
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
      setError(error instanceof Error ? error.message : "No se pudo guardar el bovino.");
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
        <ButtonCreate>Agregar Bovino</ButtonCreate>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogTitle className="font-bold text-2xl text-center">
          Crear Bovino
        </DialogTitle>

        <form id="cattle-create-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* ID MANUAL */}
            <div>
              <label htmlFor="id_Bovine" className="block text-sm font-medium text-gray-700 mb-1">ID / Arete:</label>
              <input
                type="number"
                id="id_Bovine"
                name="id_Bovine"
                value={formData.id_Bovine}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
                placeholder="Ej: 1001"
              />
            </div>

            {/* NOMBRE */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
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

            {/* RAZA */}
            <div>
              <label htmlFor="id_race" className="block text-sm font-medium text-gray-700 mb-1">Raza:</label>
              <select
                id="id_race"
                name="id_race"
                value={formData.id_race}
                onChange={handleChange}
                disabled={loadingRaces}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">{loadingRaces ? "Cargando razas..." : "Seleccione una raza"}</option>
                {races.map((race) => (
                  <option key={race.id_race} value={race.id_race}>{race.name_race}</option>
                ))}
              </select>
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

            {/* PADRE (MACHO) */}
            <div>
              <label htmlFor="id_father" className="block text-sm font-medium text-gray-700 mb-1">Padre (Opcional):</label>
              <select
                id="id_father"
                name="id_father"
                value={formData.id_father}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Sin registrar</option>
                {fathers.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>{c.id_Bovine} - {c.name}</option>
                ))}
              </select>
            </div>

            {/* MADRE (HEMBRA) */}
            <div>
              <label htmlFor="id_mother" className="block text-sm font-medium text-gray-700 mb-1">Madre (Opcional):</label>
              <select
                id="id_mother"
                name="id_mother"
                value={formData.id_mother}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Sin registrar</option>
                {mothers.map((c) => (
                  <option key={c.id_Bovine} value={c.id_Bovine}>{c.id_Bovine} - {c.name}</option>
                ))}
              </select>
            </div>

            {/* FECHA INGRESO */}
            <div>
              <label htmlFor="entrydate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso:</label>
              <input
                type="date"
                id="entrydate"
                name="entrydate"
                value={formData.entrydate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043]"
              />
            </div>

            {/* FECHA NACIMIENTO */}
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

            {/* PESO */}
            <div>
              <label htmlFor="currentweight" className="block text-sm font-medium text-gray-700 mb-1">Peso Actual (kg):</label>
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

            {/* CLASIFICACIÓN */}
            <div>
              <label htmlFor="classificationbytype" className="block text-sm font-medium text-gray-700 mb-1">Clasificación:</label>
              <select
                id="classificationbytype"
                name="classificationbytype"
                value={formData.classificationbytype}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B6043]/30 focus:border-[#4B6043] bg-white"
              >
                <option value="">Seleccione una clasificación</option>
                <option value="Toro">Toro</option>
                <option value="Novilla levante">Novilla levante</option>
                <option value="Novilla vientre">Novilla vientre</option>
                <option value="Ternero">Ternero</option>
                <option value="Vaca">Vaca</option>
              </select>
            </div>

            {/* ESTADO */}
            <div>
              <label htmlFor="active" className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
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

            {/* FOTO */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">Foto (URL):</label>
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

        <p className="text-sm text-gray-600 -mt-2">Complete los campos para crear un nuevo bovino.</p>
        <DialogDescription className="sr-only">Complete los campos para crear un nuevo bovino.</DialogDescription>

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
              form="cattle-create-form"
              disabled={isSubmitting}
              className="flex-1 cursor-pointer bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Bovino"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}